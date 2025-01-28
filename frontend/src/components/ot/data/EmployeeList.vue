<template>
    <div class="employee-list">
        <h2>Employees List</h2>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error" class="text-danger">{{ error }}</div>
        <ul v-else class="list-unstyled">
            <li v-for="employee in employees" :key="employee.id" class="employee-item">
                ID: {{ employee.id }} - {{ employee.name }} 
                <span :class="employee.is_enabled ? 'text-success' : 'text-danger'">
                    ({{ employee.is_enabled ? 'Enabled' : 'Disabled' }})
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
import api from '@/services/api'

export default {
    name: 'EmployeeList',
    data() {
        return {
            employees: [],
            loading: true,
            error: null
        }
    },
    async created() {
        try {
            const response = await api.getEmployees()
            this.employees = response.data
        } catch (error) {
            this.error = 'Failed to load employees'
            console.error('Error:', error)
        } finally {
            this.loading = false
        }
    }
}
</script>

<style scoped>
.employee-list {
  color: var(--cui-body-color);
}

.employee-item {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--cui-border-color);
}
</style>