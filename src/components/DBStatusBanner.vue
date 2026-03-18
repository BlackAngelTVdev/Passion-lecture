<template>
    <transition name="db-status-fade">
        <div v-if="!dbStatus.isAvailable" class="db-status-banner">
            <div class="db-status-content">
                <span class="db-status-icon">⚠️</span>
                <div class="db-status-text">
                    <p class="db-status-title">{{ dbStatus.message }}</p>
                    <p class="db-status-details">
                        Les données actuelles proviennent de votre dernier chargement. Certaines modifications
                        pourraient ne pas être sauvegardées.
                    </p>
                </div>
                <button @click="clearError" class="db-status-close">×</button>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { useDBStatus } from '@/composables/useDBStatus'

const { dbStatus, clearError } = useDBStatus()
</script>

<style scoped>
.db-status-banner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #fff5f0 0%, #ffe8e0 100%);
    border-bottom: 2px solid #ff9999;
    padding: 12px 16px;
    z-index: 9998;
    box-shadow: 0 2px 8px rgba(255, 153, 153, 0.15);
}

.db-status-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    max-width: 1200px;
    margin: 0 auto;
    font-family: 'Bitter', serif;
}

.db-status-icon {
    font-size: 20px;
    flex-shrink: 0;
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.db-status-text {
    flex: 1;
    margin: 0;
}

.db-status-title {
    margin: 0 0 4px 0;
    font-weight: 700;
    color: #d97f5f;
    font-size: 14px;
}

.db-status-details {
    margin: 0 0 4px 0;
    color: #666;
    font-size: 12px;
    line-height: 1.4;
}

.db-status-error {
    margin: 4px 0 0 0;
    color: #c62828;
    font-size: 11px;
    font-family: 'Monaco', 'Menlo', monospace;
}

.db-status-close {
    background: none;
    border: none;
    color: #666;
    font-size: 20px;
    cursor: pointer;
    padding: 0 4px;
    flex-shrink: 0;
    transition: color 0.2s;
}

.db-status-close:hover {
    color: #d32f2f;
}

/* Animation */
.db-status-fade-enter-active,
.db-status-fade-leave-active {
    transition: all 0.3s ease;
}

.db-status-fade-enter-from,
.db-status-fade-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
</style>
