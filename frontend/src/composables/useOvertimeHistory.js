import { ref, computed } from 'vue'
import api from '@/services/api'

export function useOvertimeHistory() {
  const loading = ref(false)
  const error = ref(null)
  const allRecords = ref([])
  const currentPage = ref(1)
  const perPage = ref(10)
  const employees = ref([])
  const projects = ref([])
  const selectedEmployee = ref('')
  const selectedProject = ref('')
  const dateRange = ref([])
  const searchQuery = ref('')
  const sortKey = ref('')
  const sortOrder = ref('asc')

  const activeEmployees = computed(() => 
    employees.value
        .filter((employee) => employee.is_enabled)
        .sort((a, b) => a.name.localeCompare(b.name))
  )

  const activeProjects = computed(() => 
    projects.value
        .filter((project) => project.is_enabled)
        .sort((a, b) => a.name.localeCompare(b.name))
  )

  const filteredRecords = computed(() => {
    let records = [...allRecords.value]

    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        records = records.filter(record =>
            record.employee_name.toLowerCase().includes(query) ||
            record.project_name.toLowerCase().includes(query) ||
            record.request_date.includes(query) ||
            record.time_start.includes(query) ||
            record.time_end.includes(query) ||
            record.total_hours.includes(query)
        )
    }

    // Sorting
    if (sortKey.value) {
        records.sort((a, b) => {
            let aVal = a[sortKey.value]
            let bVal = b[sortKey.value]

            // Handle different data types
            if (sortKey.value === 'request_date') {
                aVal = new Date(aVal).getTime()
                bVal = new Date(bVal).getTime()
            } else if (sortKey.value === 'total_hours') {
                aVal = parseFloat(aVal)
                bVal = parseFloat(bVal)
            } else {
                aVal = aVal.toString().toLowerCase()
                bVal = bVal.toString().toLowerCase()
            }

            const compareResult = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
            return sortOrder.value === 'asc' ? compareResult : -compareResult
        })
    }

    return records
  })

  // Client-side pagination
  const paginatedRecords = computed(() => {
    const start = (currentPage.value - 1) * Number(perPage.value)
    const end = start + Number(perPage.value)
    return filteredRecords.value.slice(start, end)
  })
  
  const totalRecords = computed(() => filteredRecords.value.length)
  const pageCount = computed(() => Math.ceil(filteredRecords.value.length / Number(perPage.value)))  

  const formatDateForApi = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  const formatTime = (time) => {
    if (!time) return '';
    return time.substring(0, 5);
}

  const fetchInitialData = async () => {
    try {
      const [empResponse, projResponse] = await Promise.all([api.getEmployees(), api.getProjects()])

      employees.value = empResponse.data
      projects.value = projResponse.data
    } catch (err) {
      error.value = 'Failed to load initial data'
      console.error(err)
    }
  }

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
        if (!employees.value.length || !projects.value.length) {
            await fetchInitialData()
        }

        const params = {
            employee: selectedEmployee.value,
            project: selectedProject.value
        }

        // Add date range parameters if they exist
        if (dateRange.value?.length === 2) {
            params.startDate = formatDateForApi(dateRange.value[0])
            params.endDate = formatDateForApi(dateRange.value[1])
        }

        const response = await api.getOvertimeHistory(params)
        allRecords.value = response.data
    } catch (err) {
        error.value = 'Failed to load overtime history'
        console.error(err)
    } finally {
        loading.value = false
    }
}

  const toggleSort = (key) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
  }

  const handlePageOrFilterChange = (resetPage = false) => {
    if (resetPage) {
      currentPage.value = 1
    }
  }

  const changeItemsPerPage = (newPerPage) => {
    perPage.value = newPerPage
    currentPage.value = 1
    fetchData()
  }

  const handlePagination = (newPage) => {
    currentPage.value = newPage
  }

  // Separate handlers for different types of changes
  const handlePageChange = () => {
    console.log('Page changed to:', currentPage.value)
  }

  const handleFilterChange = () => {
    currentPage.value = 1
    fetchData()
  }

  return {
    loading,
    error,
    overtimeRecords: paginatedRecords,
    totalRecords,
    currentPage,
    perPage,
    employees,
    projects,
    activeEmployees,
    activeProjects,
    selectedEmployee,
    selectedProject,
    dateRange,
    pageCount,
    fetchData,
    searchQuery,
    sortKey,
    sortOrder,
    toggleSort,
    handlePagination,
    handlePageChange,
    handleFilterChange,
    handlePageOrFilterChange,
    changeItemsPerPage
  }
}
