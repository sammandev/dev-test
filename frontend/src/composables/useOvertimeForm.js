import { useOvertimeState } from './useOvertimeState'
import { useOvertimeComputed } from './useOvertimeComputed'
import { useOvertimeValidation } from './useOvertimeValidation'
import { useOvertimeApi } from './useOvertimeApi'
import { useOvertimeWatchers } from './useOvertimeWatchers'

export function useOvertimeForm() {
    const state = useOvertimeState()
    const computed = useOvertimeComputed(state)
    const { validateForm } = useOvertimeValidation(state)
    const api = useOvertimeApi(state, computed)

    const apiWithValidation = {
        ...api,
        submitOvertimeRequest: () => api.submitOvertimeRequest(
            validateForm,
            computed.totalHours.value,
            computed.totalBreakHours.value
        )
    }

    useOvertimeWatchers(state, computed, apiWithValidation)

    return {
        ...state,
        ...computed,
        loadInitialData: api.loadInitialData,
        submitOvertimeRequest: apiWithValidation.submitOvertimeRequest,
        checkExistingRequest: api.checkExistingRequest,
        deleteOvertimeRequest: api.deleteOvertimeRequest
    }
}