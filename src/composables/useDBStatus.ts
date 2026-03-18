import { ref } from 'vue'

export interface DBStatus {
  isAvailable: boolean
  message: string
  lastError: string | null
}

const dbStatus = ref<DBStatus>({
  isAvailable: true,
  message: 'Service en ligne',
  lastError: null
})

/**
 * Hook pour tracker le statut de la base de données
 * Affiche un message visuel quand la DB est indisponible
 */
export function useDBStatus() {
  const setDBError = (error: string) => {
    dbStatus.value.isAvailable = false
    dbStatus.value.lastError = error
    dbStatus.value.message = 'Connexion perdue'
  }

  const setDBAvailable = () => {
    dbStatus.value.isAvailable = true
    dbStatus.value.lastError = null
    dbStatus.value.message = 'Service en ligne'
  }

  const clearError = () => {
    dbStatus.value.lastError = null
  }

  return {
    dbStatus,
    setDBError,
    setDBAvailable,
    clearError
  }
}
