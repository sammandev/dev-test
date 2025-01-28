<template>
    <div class="row">
        <div class="col-md-6 mb-3">
            <CFormLabel>Employee Name*</CFormLabel>
            <CFormSelect class="text-center" :modelValue="selectedEmployees" @update:modelValue="handleEmployeeUpdate"
                :disabled="loading" required>
                <option value="">---SELECT EMPLOYEE---</option>
                <option v-for="employee in filteredEmployees" :key="employee.id" :value="employee.id">
                    {{ employee.name }}
                </option>
            </CFormSelect>
        </div>
        <div class="col-md-6 mb-3">
            <CFormLabel>Work ID</CFormLabel>
            <CFormInput :value="selectedEmployeeId" readonly disabled />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    selectedEmployees: [String, Number],
    employeeOptions: {
        type: Array,
        default: () => []
    },
    loading: Boolean
})

const emit = defineEmits(['update:selectedEmployees', 'employeeChanged'])

const selectedEmployeeId = computed(() => {
    const employee = props.employeeOptions.find(e => e.id === Number(props.selectedEmployees))
    return employee?.emp_id || ''
})

const handleEmployeeUpdate = (value) => {
    emit('update:selectedEmployees', value)
    emit('employeeChanged')
}

const filteredEmployees = computed(() =>
    props.employeeOptions
        .filter(employee => employee.is_enabled)
        .sort((a, b) => a.name.localeCompare(b.name))
)
</script>