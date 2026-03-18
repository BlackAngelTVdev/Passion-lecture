<template>
    <div class="console-errors">
        <!-- Flash visual quand une erreur est loggée -->
        <div v-if="isFlashing" class="flash-indicator"></div>

        <!-- Liste des erreurs -->
        <transition-group name="error-list" tag="div" class="errors-container">
            <div v-for="error in errors" :key="error.id" :class="['error-item', `error-${error.type}`]">
                <div class="error-header">
                    <span class="error-type">{{ error.type.toUpperCase() }}</span>
                    <span class="error-time">{{ formatTime(error.timestamp) }}</span>
                    <button @click="removeError(error.id)" class="close-btn">×</button>
                </div>
                <div class="error-message">{{ error.message }}</div>
            </div>
        </transition-group>

        <!-- Bouton pour effacer les erreurs -->
        <button v-if="errors.length > 0" @click="clearErrors" class="clear-btn">
            Effacer les erreurs
        </button>
    </div>
</template>

<script setup lang="ts">
import { useConsoleFlash } from '@/composables/useConsoleFlash'

const { errors, isFlashing, clearErrors, removeError } = useConsoleFlash()

const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
}
</script>

<style scoped>
.console-errors {
    position: fixed;
    bottom: 20px;
    right: 20px;
    max-width: 400px;
    z-index: 9999;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
}

/* Flash visual - effet de flash au coin supérieur droit */
.flash-indicator {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    animation: flashEffect 0.5s ease-out;
    z-index: 10000;
}

@keyframes flashEffect {
    0% {
        background: rgba(255, 67, 54, 0.3);
    }

    100% {
        background: rgba(255, 67, 54, 0);
    }
}

.errors-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 500px;
    overflow-y: auto;
    padding-right: 5px;
}

.error-item {
    padding: 10px;
    border-radius: 4px;
    border-left: 4px solid;
    background: #f5f5f5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    animation: slideInRight 0.3s ease-out;
}

.error-item.error-error {
    border-left-color: #ff4335;
    background: #ffebee;
}

.error-item.error-warning {
    border-left-color: #ffa726;
    background: #fff3e0;
}

.error-item.error-info {
    border-left-color: #29b6f6;
    background: #e3f2fd;
}

.error-item.error-db-error {
    border-left-color: #d32f2f;
    background: #ffe0b2;
    font-weight: 500;
}

.error-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}

.error-type {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 10px;
}

.error-item.error-error .error-type {
    color: #d32f2f;
}

.error-item.error-warning .error-type {
    color: #f57c00;
}

.error-item.error-info .error-type {
    color: #1976d2;
}

.error-item.error-db-error .error-type {
    color: #e65100;
}

.error-time {
    font-size: 10px;
    color: #999;
}

.close-btn {
    background: none;
    border: none;
    color: #999;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    transition: all 0.2s;
}

.close-btn:hover {
    background: rgba(0, 0, 0, 0.1);
    color: #333;
}

.error-message {
    word-break: break-word;
    line-height: 1.4;
    color: #333;
    white-space: pre-wrap;
    overflow-x: auto;
}

.clear-btn {
    display: block;
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 11px;
    font-weight: 600;
    color: #666;
    transition: all 0.2s;
}

.clear-btn:hover {
    background: #f5f5f5;
    border-color: #999;
    color: #333;
}

/* Animations */
@keyframes slideInRight {
    from {
        transform: translateX(400px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.error-list-enter-active,
.error-list-leave-active {
    transition: all 0.3s ease;
}

.error-list-enter-from {
    transform: translateX(400px);
    opacity: 0;
}

.error-list-leave-to {
    transform: translateX(400px);
    opacity: 0;
}

/* Barre de défilement personnalisée */
.errors-container::-webkit-scrollbar {
    width: 6px;
}

.errors-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.errors-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.errors-container::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
