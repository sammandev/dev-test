<template>
    <div class="row">
        <div class="col-md-6 mb-3">
            <CFormLabel>Project Name*</CFormLabel>
            <CFormSelect class="text-center" :modelValue="projectName"
                @update:modelValue="$emit('update:projectName', $event)" :disabled="loading" required>
                <option value="">---SELECT PROJECT---</option>
                <option v-for="project in filteredProjects" :key="project.id" :value="project.id">
                    {{ project.name }}
                </option>
            </CFormSelect>
        </div>
        <div class="col-md-4 mb-3">
            <CFormLabel>Overtime Date*</CFormLabel>
            <VueDatePicker v-model="dateValue" :model-value="dateValue" @update:model-value="handleDateChange"
                :disabled="loading" :max-date="new Date()" format="yyyy/MM/dd" :enable-time-picker="false" auto-apply
                :dark="isDark" placeholder="YYYY/MM/DD" required />
        </div>
        <div class="col-md-2 mt-2">
            <CFormLabel style="font-weight: bold;">Overtime on Holiday?</CFormLabel>
            <div class="holiday-checkbox-wrapper">
                <CFormCheck class="holiday-checkbox" :modelValue="isHoliday" @update:modelValue="handleHolidayChange"
                    :disabled="loading" id="holidayCheck" label="YES" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useDatepickerTheme } from '@/composables/useDatepickerTheme'

const props = defineProps({
    projectName: [String, Number],
    overtimeDate: String,
    projectOptions: {
        type: Array,
        default: () => []
    },
    isHoliday: {
        type: Boolean,
        default: false
    },
    loading: Boolean
})

const emit = defineEmits(['update:projectName', 'update:overtimeDate', 'update:isHoliday'])

const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const dateValue = computed({
    get: () => props.overtimeDate ? new Date(props.overtimeDate) : null,
    set: (value) => handleDateChange(value)
})

const handleHolidayChange = (value) => {
    emit('update:isHoliday', value)
}

const handleDateChange = (value) => {
    const formattedDate = value ? formatDate(value) : ''
    emit('update:overtimeDate', formattedDate)
}

const { isDark } = useDatepickerTheme()

const filteredProjects = computed(() =>
    props.projectOptions
        .filter(project => project.is_enabled)
        .sort((a, b) => a.name.localeCompare(b.name))
)
</script>

<style scoped>
input[type="date"] {
    padding: 0.375rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    cursor: pointer;
}

.holiday-checkbox-wrapper {
    cursor: pointer;
}

:deep(.holiday-checkbox .form-check-input) {
    border: 2px solid #666;
    cursor: pointer;
    transition: all 0.2s ease;
}

:deep(.holiday-checkbox .form-check-input:checked) {
    background-color: #321fdb;
    border-color: #321fdb;
}

:deep(.holiday-checkbox .form-check-input:hover) {
    border-color: #321fdb;
}

:deep(.holiday-checkbox .form-check-label) {
    cursor: pointer;
}
</style>