<template>
  <div class="project-list">
    <h2>Projects List</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>
    <ul v-else class="list-unstyled">
      <li v-for="project in projects" :key="project.id" class="project-item">
        ID: {{ project.id }} - {{ project.name }} 
        <span :class="project.is_enabled ? 'text-success' : 'text-danger'">
          ({{ project.is_enabled ? 'Enabled' : 'Disabled' }})
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'

export default {
  name: 'ProjectList',
  data() {
    return {
      projects: [],
      loading: true,
      error: null
    }
  },
  async created() {
    try {
      const response = await api.getProjects()
      this.projects = response.data
    } catch (error) {
      this.error = 'Failed to load projects'
      console.error('Error:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.project-list {
  color: var(--cui-body-color);
}

.project-item {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--cui-border-color);
}
</style>