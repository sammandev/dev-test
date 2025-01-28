<template>
    <div class="col-md-12 mb-1 d-flex justify-content-center">
        <div class="custom-checkbox-wrapper">
            <CFormCheck id="breakCheckbox" class="custom-checkbox" :modelValue="hasBreak"
                @update:modelValue="$emit('update:hasBreak', $event)" :disabled="loading" label="Take Break?" />
        </div>
    </div>
    <div v-if="hasBreak" class="col-md-12 mb-3">
        <div class="row align-items-center">
            <div class="col-md-5">
                <CFormLabel>Break Start*</CFormLabel>
                <VueDatePicker :model-value="breakStart" @update:model-value="handleBreakChange('breakStart', $event)"
                    time-picker model-type="HH:mm" :enable-seconds="false" :is-24="true" :disabled="loading"
                    placeholder="Select Time" :dark="isDark" auto-apply />
            </div>
            <div class="col-md-2 text-center">
                <div class="mt-2">
                    <div>Break Time:</div>
                    <strong>{{ totalBreakHours.toFixed(2) }} hour(s)</strong>
                </div>
            </div>
            <div class="col-md-5">
                <CFormLabel>Break End*</CFormLabel>
                <VueDatePicker :model-value="breakEnd" @update:model-value="handleBreakChange('breakEnd', $event)"
                    time-picker model-type="HH:mm" :enable-seconds="false" :is-24="true" :disabled="loading"
                    placeholder="Select Time" :dark="isDark" auto-apply />
            </div>
        </div>
    </div>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import { useDatepickerTheme } from '@/composables/useDatepickerTheme'

const props = defineProps({
    hasBreak: Boolean,
    breakStart: String,
    breakEnd: String,
    totalBreakHours: Number,
    loading: Boolean
})

const emit = defineEmits(['update:hasBreak', 'update:breakStart', 'update:breakEnd', 'calculate'])

const handleBreakChange = (type, value) => {
    emit(`update:${type}`, value)
    emit('calculate')
}

const { isDark } = useDatepickerTheme()
</script>

<style scoped>
.custom-checkbox-wrapper {
    /* margin-top: 10px; */
    margin: 5px;
    cursor: pointer;
}

:deep(.custom-checkbox .form-check-input) {
    border: 2px solid #6a6a6a;
    cursor: pointer;
    transition: all 0.2s ease;
}

:deep(.custom-checkbox .form-check-input:checked) {
    background-color: #321fdb;
    border-color: #321fdb;
}

:deep(.custom-checkbox .form-check-input:hover) {
    border-color: #321fdb;
}

:deep(.custom-checkbox .form-check-label) {
    font-weight: 500;
    cursor: pointer;
    user-select: none;
}
</style>