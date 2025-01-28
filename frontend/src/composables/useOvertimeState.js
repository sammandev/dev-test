import { ref } from 'vue'

export function useOvertimeState() {
    const projects = ref([])
    const selectedProjects = ref('')
    const employees = ref([])
    const selectedEmployees = ref('')
    const loading = ref(true)
    const submitSuccess = ref(false)
    const submitError = ref(null)
    const error = ref(null)
    const timeStart = ref('17:20')
    const timeEnd = ref('18:20')
    const hasBreak = ref(false)
    const timeBreakStart = ref('')
    const timeBreakEnd = ref('')
    const overtimeReason = ref('')
    const overtimeDetail = ref('')
    const submitting = ref(false)
    const deleting = ref(false)
    const hasExistingRequest = ref(false)
    const isHoliday = ref(false)
    const today = new Date().toISOString().split('T')[0]
    const selectedDate = ref(today)
    const weeklyHours = ref('0.00')
    const monthlyHours = ref('0.00')

    return {
        projects,
        selectedProjects,
        employees,
        selectedEmployees,
        loading,
        submitSuccess,
        submitError,
        error,
        timeStart,
        timeEnd,
        hasBreak,
        timeBreakStart,
        timeBreakEnd,
        overtimeReason,
        overtimeDetail,
        submitting,
        deleting,
        hasExistingRequest,
        selectedDate,
        isHoliday,
        today,
        weeklyHours,
        monthlyHours
    }
}