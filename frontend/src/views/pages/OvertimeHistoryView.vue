<template>
    <div class="overtime-history">
        <CCard class="mb-4">
            <CCardHeader>
                <strong>Overtime History</strong>
            </CCardHeader>
            <CCardBody>
                <div class="filters mb-4">
                    <div class="row g-3">
                        <div class="col-md-3">
                            <CFormSelect :model-value="perPage" @update:model-value="changeItemsPerPage" label="Items per page">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                            </CFormSelect>
                        </div>
                        <div class="col-md-3">
                            <CFormSelect v-model="selectedEmployee" label="Employee">
                                <option value="">All Employees</option>
                                <option v-for="emp in activeEmployees" :key="emp.id" :value="emp.id">
                                    {{ emp.name }}
                                </option>
                            </CFormSelect>
                        </div>
                        <div class="col-md-3">
                            <CFormSelect v-model="selectedProject" label="Project">
                                <option value="">All Projects</option>
                                <option v-for="proj in activeProjects" :key="proj.id" :value="proj.id">
                                    {{ proj.name }}
                                </option>
                            </CFormSelect>
                        </div>
                        <div class="col-md-3">
                            <CFormLabel>Date Range</CFormLabel>
                            <VueDatePicker v-model="dateRange" :dark="isDark" range format="yyyy-MM-dd"
                                :enable-time-picker="false" :min-date="new Date(2020, 0, 1)"
                                :max-date="new Date(2025, 11, 31)" auto-apply placeholder="Select date range" />
                        </div>

                        <div class="col-md-12 mt-4">
                            <CFormInput v-model="searchQuery" type="search" placeholder="Search records..."
                                aria-label="Search" />
                            <!-- <CButton color="primary" @click="fetchData">Search</CButton> -->
                        </div>
                    </div>
                </div>

                <div v-if="loading" class="text-center my-3">
                    <CSpinner />
                    <div>Loading overtime data...</div>
                </div>

                <div v-else-if="error" class="text-danger">
                    {{ error }}
                </div>

                <div v-else>
                    <TableSection :records="overtimeRecords" :sort-key="sortKey" :sort-order="sortOrder"
                        :tableHeadProps="{ color: 'light' }" @sort="toggleSort" />
                    <PaginationSection 
                        :current-page="currentPage" 
                        :page-count="pageCount"
                        @update:current-page="handlePagination" 
                    />
                </div>
            </CCardBody>
        </CCard>
    </div>
</template>

<script setup>
import { watch } from 'vue'
import { useOvertimeHistory } from '@/composables/useOvertimeHistory'
import { useDatepickerTheme } from '@/composables/useDatepickerTheme'
import TableSection from '@/components/ot/history/TableSection.vue'
import PaginationSection from '@/components/ot/history/PaginationSection.vue'
import VueDatePicker from '@vuepic/vue-datepicker'

const { isDark } = useDatepickerTheme()

const {
    loading,
    error,
    overtimeRecords,
    currentPage,
    perPage,
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
    changeItemsPerPage,
    handlePagination,
    handlePageChange,
    handleFilterChange
} = useOvertimeHistory()

watch(currentPage, () => {
    handlePageChange()
})

watch([selectedEmployee, selectedProject, dateRange, searchQuery], () => {
    handleFilterChange()
})

watch(perPage, () => {
    handleFilterChange()
})

fetchData()
</script>

<style lang="scss">
@import '@/assets/styles/style.scss';
</style>