import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDBStatus } from './useDBStatus'

export interface ConsoleError {
  type: 'error' | 'warning' | 'info' | 'db-error'
  message: string
  timestamp: number
  id: string
}

// Store global pour les erreurs
const errors = ref<ConsoleError[]>([])
const isFlashing = ref(false)
let flashTimeout: ReturnType<typeof setTimeout> | null = null

/**
 * Hook pour capturer et afficher les erreurs console avec un flash visual
 * Les erreurs sont affichées avec un effet de flash dans le coin supérieur droit
 */
export function useConsoleFlash() {
  const { setDBError } = useDBStatus()

  const addError = (error: ConsoleError) => {
    errors.value.push(error)
    
    // Flash visual - ajouter une classe au document
    document.documentElement.classList.add('console-flash')
    isFlashing.value = true
    
    // Retirer le flash après 500ms (animation)
    if (flashTimeout) clearTimeout(flashTimeout)
    flashTimeout = setTimeout(() => {
      document.documentElement.classList.remove('console-flash')
      isFlashing.value = false
    }, 500)
    
    // Si c'est une erreur DB, mettre à jour le statut
    if (error.type === 'db-error') {
      setDBError(error.message)
    }
    
    // Garder seulement les 10 dernières erreurs
    if (errors.value.length > 10) {
      errors.value.shift()
    }
  }

  const clearErrors = () => {
    errors.value = []
  }

  const removeError = (id: string) => {
    errors.value = errors.value.filter(e => e.id !== id)
  }

  onMounted(() => {
    // Intercepter console.error
    const originalError = console.error
    console.error = function(...args: any[]) {
      originalError.apply(console, args)
      const message = args.map(arg => 
        typeof arg === 'string' ? arg : JSON.stringify(arg)
      ).join(' ')
      
      // Déterminer si c'est une erreur DB
      const isDBError = message.includes('Erreur de connexion') || 
                       message.includes('Erreur réseau')
      
      addError({
        type: isDBError ? 'db-error' : 'error',
        message,
        timestamp: Date.now(),
        id: `error-${Date.now()}-${Math.random()}`
      })
    }

    // Intercepter console.warn
    const originalWarn = console.warn
    console.warn = function(...args: any[]) {
      originalWarn.apply(console, args)
      const message = args.map(arg => 
        typeof arg === 'string' ? arg : JSON.stringify(arg)
      ).join(' ')
      
      addError({
        type: 'warning',
        message,
        timestamp: Date.now(),
        id: `warning-${Date.now()}-${Math.random()}`
      })
    }

    // Capturer les erreurs non gérées
    const handleError = (event: ErrorEvent) => {
      event.preventDefault()
      
      const isDBError = event.message.includes('Erreur de connexion') ||
                       event.message.includes('Erreur réseau')
      
      addError({
        type: isDBError ? 'db-error' : 'error',
        message: `${event.message} at ${event.filename}:${event.lineno}:${event.colno}`,
        timestamp: Date.now(),
        id: `uncaught-${Date.now()}-${Math.random()}`
      })
    }

    window.addEventListener('error', handleError)

    // Capturer les promesses rejetées
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault()
      const message = typeof event.reason === 'string' 
        ? event.reason 
        : JSON.stringify(event.reason)
      
      const isDBError = message.includes('Erreur de connexion') ||
                       message.includes('Erreur réseau')
      
      addError({
        type: isDBError ? 'db-error' : 'error',
        message: `Unhandled Promise Rejection: ${message}`,
        timestamp: Date.now(),
        id: `rejection-${Date.now()}-${Math.random()}`
      })
    }

    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    // Cleanup
    onBeforeUnmount(() => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    })
  })

  return {
    errors,
    isFlashing,
    clearErrors,
    removeError
  }
}
