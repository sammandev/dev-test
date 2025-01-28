<template>
    <div class="overtime-form">
        <SummaryCards :weekly-hours="weeklyHours" :monthly-hours="monthlyHours" :employee-name="selectedEmployeeName" />

        <CCard class="mb-4">
            <CCardBody>
                <div v-if="loading" class="text-center my-3">
                    <CSpinner />
                    <div>Loading overtime data...</div>
                </div>
                <CForm v-else @submit.prevent="submitOvertimeRequest">
                    <CAlert v-if="error" color="danger" dismissible>
                        <div class="text-center my-3">{{ error }}</div>
                    </CAlert>

                    <CAlert v-if="submitSuccess" color="success" dismissible @close="submitSuccess = false">
                        <strong>Overtime Data Submitted Successfully!</strong>
                    </CAlert>

                    <CAlert v-if="submitError" color="danger" dismissible @close="submitError = null">
                        <strong>Error: {{ submitError }}</strong>
                    </CAlert>

                    <EmployeeSection :employees="activeEmployees" v-model:selectedEmployees="selectedEmployees"
                        :employeeOptions="employees" :employee-id="selectedEmployeeId"
                        :loading="loading || submitting" />

                    <ProjectSection v-model:projectName="selectedProjects" v-model:overtimeDate="selectedDate"
                        v-model:isHoliday="isHoliday" :projectOptions="projects" :loading="loading || submitting" />

                    <TimeSection v-model:timeStart="timeStart" v-model:timeEnd="timeEnd"
                        :totalHours="Number(totalHours)" :loading="loading || submitting" />

                    <BreakSection v-model:hasBreak="hasBreak" v-model:breakStart="timeBreakStart"
                        v-model:breakEnd="timeBreakEnd" :totalBreakHours="Number(totalBreakHours)"
                        :loading="loading || submitting" />

                    <ReasonSection v-model:overtimeReason="overtimeReason" v-model:overtimeDetails="overtimeDetail"
                        :loading="loading || submitting" />

                    <div class="d-grid gap-2 mt-2">
                        <div class="row">
                            <template v-if="hasExistingRequest">
                                <div class="col-md-6 mb-2">
                                    <CButton type="button" color="danger" class="w-100 text-white"
                                        :disabled="deleting || submitting" @click="deleteOvertimeRequest">
                                        {{ deleting ? 'Deleting...' : 'Delete Request' }}
                                    </CButton>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <CButton type="submit" color="primary" class="w-100"
                                        :disabled="loading || submitting">
                                        {{ submitting ? 'Submitting...' : 'Update Request' }}
                                    </CButton>
                                </div>
                            </template>
                            <template v-else>
                                <div class="col-12">
                                    <CButton type="submit" color="primary" class="w-100"
                                        :disabled="loading || submitting">
                                        {{ submitting ? 'Submitting...' : 'Submit Request' }}
                                    </CButton>
                                </div>
                            </template>
                        </div>
                    </div>
                </CForm>
            </CCardBody>
        </CCard>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useOvertimeForm } from '@/composables/useOvertimeForm'
import BreakSection from '@/components/ot/form/BreakSection.vue'
import EmployeeSection from '@/components/ot/form/EmployeeSection.vue'
import TimeSection from '@/components/ot/form/TimeSection.vue'
import ProjectSection from '@/components/ot/form/ProjectSection.vue'
import ReasonSection from '@/components/ot/form/ReasonSection.vue'
import SummaryCards from '@/components/ot/form/SummaryCards.vue'

const {
    // State
    projects,
    selectedProjects,
    employees,
    activeEmployees,
    selectedEmployees,
    selectedEmployeeId,
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
    weeklyHours,
    monthlyHours,

    // Computed
    totalHours,
    totalBreakHours,

    // Methods
    loadInitialData,
    submitOvertimeRequest,
    deleteOvertimeRequest
} = useOvertimeForm()

const selectedEmployeeName = computed(() => {
    const employee = employees.value.find(e => e.id === Number(selectedEmployees.value))
    return employee?.name || ''
})

onMounted(async () => {
    await loadInitialData()
})
</script>

<style scoped>
.alert {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.alert strong {
    display: block;
    width: 100%;
    text-align: center;
}

.form-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group>* {
    flex: 1 1 calc(50% - 1rem);
}

@media (max-width: 768px) {
    .form-group>* {
        flex: 1 1 100%;
    }
}
</style>

<style lang="scss">
@import '@/assets/styles/style.scss';
</style>