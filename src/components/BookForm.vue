<script setup lang="ts">
import { computed } from 'vue'

type BookFormModel = {
  title: string
  author: string
  category: string
  published: string | number
  nbpages: string | number
  editor: string
  resume: string
  extrait: string
  image: string
  userId?: number | null
}

const props = withDefaults(
  defineProps<{
    form: BookFormModel
    categories: string[]
    editeurs: string[]
    isLoading?: boolean
    mode?: 'create' | 'edit'
  }>(),
  {
    isLoading: false,
    mode: 'create',
  },
)

const emit = defineEmits<{
  submit: []
  cancel: []
  delete: []
}>()

const isEditMode = computed(() => props.mode === 'edit')
const submitLabel = computed(() => {
  if (props.isLoading) {
    return isEditMode.value ? 'Enregistrement...' : 'Publication...'
  }
  return isEditMode.value ? 'Enregistrer' : 'Publier'
})
</script>

<template>
  <form @submit.prevent="emit('submit')" class="add-form">
    <div class="form-row">
      <div class="form-group">
        <label for="title">Titre</label>
        <input id="title" v-model="form.title" type="text" required />
      </div>
      <div class="form-group">
        <label for="author">Nom complete de l'écrivain</label>
        <input id="author" v-model="form.author" type="text" required />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="category">Catégorie</label>
        <select id="category" v-model="form.category" required>
          <option value="" disabled>Sélectionner une catégorie</option>
          <option v-for="cat in categories.slice(1)" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="editor">Éditeur</label>
        <select id="editor" v-model="form.editor">
          <option value="" disabled>Sélectionner un éditeur</option>
          <option v-for="editeur in editeurs.slice(1)" :key="editeur" :value="editeur">
            {{ editeur }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="nbpages">Nombre de pages</label>
        <input id="nbpages" v-model="form.nbpages" type="number" min="1" />
      </div>
      <div class="form-group">
        <label for="published">Année d'édition</label>
        <input id="published" v-model="form.published" type="number" />
      </div>
    </div>

    <div class="form-row form-row-bottom">
      <div class="form-col-left">
        <div class="form-group">
          <label for="extrait">Lien d'un extrait</label>
          <input id="extrait" v-model="form.extrait" type="url" />
        </div>

        <div class="form-group">
          <label for="resume">Résumé de l'ouvrage</label>
          <textarea id="resume" v-model="form.resume" rows="13"></textarea>
        </div>
      </div>

      <div class="form-col-right">
        <div class="form-group">
          <label for="image">Couverture</label>
          <input id="image" v-model="form.image" type="url" placeholder="URL de l'image" />
        </div>

        <div class="preview-publish-row">
          <div class="image-preview">
            <img v-if="form.image" :src="form.image" alt="Couverture" />
            <span v-else class="image-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"></svg>
            </span>
          </div>

          <div class="publish-side">
            <template v-if="isEditMode">
              <button
                type="button"
                @click="emit('delete')"
                :disabled="isLoading"
                style="width: 100%"
              >
                {{ isLoading ? '...' : 'Supprimer' }}
              </button>

              <button class="button" type="submit" :disabled="isLoading" style="width: 100%">
                {{ submitLabel }}
              </button>

              <button class="button" type="button" @click="emit('cancel')" style="width: 100%">
                Annuler
              </button>
            </template>

            <template v-else>
              <button class="button" type="button" @click="emit('cancel')">Annuler</button>
              <button class="button" type="button" :disabled="isLoading" @click="emit('submit')">
                {{ submitLabel }}
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped src="@/assets/css/addBook.css"></style>
