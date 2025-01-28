<template>
    <CRow class="justify-content-center mb-2">
        <CCol md="10">
            <div class="break-section">
                <div class="checkbox-wrapper">
                    <CFormCheck :model-value="hasBreak" @update:model-value="$emit('update:hasBreak', $event)"
                        hitArea="full" label="Have Break" class="custom-checkbox" />
                </div>
                <CRow v-if="hasBreak">
                    <CCol xs="4">
                        <div class="time-picker-container">
                            <label class="form-label">Break Start</label>
                            <div class="time-picker">
                                <VueDatePicker :model-value="timeBreakStart"
                                    @update:model-value="$emit('update:timeBreakStart', $event)" time-picker
                                    model-type="HH:mm" :enable-seconds="false" :is-24="true" placeholder="Select Time" auto-apply />
                            </div>
                        </div>
                    </CCol>
                    <CCol xs="4">
                        <div class="hours-display">
                            <label class="OT_hours">{{ totalBreakHours }} Hours</label>
                        </div>
                    </CCol>
                    <CCol xs="4">
                        <div class="time-picker-container">
                            <label class="form-label">Break End</label>
                            <div class="time-picker">
                                <VueDatePicker :model-value="timeBreakEnd"
                                    @update:model-value="$emit('update:timeBreakEnd', $event)" time-picker
                                    model-type="HH:mm" :enable-seconds="false" :is-24="true" placeholder="Select Time" auto-apply />
                            </div>
                        </div>
                    </CCol>
                </CRow>
            </div>
        </CCol>
    </CRow>
</template>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';

defineProps({
    hasBreak: {
        type: Boolean,
        default: false
    },
    timeBreakStart: String,
    timeBreakEnd: String,
    totalBreakHours: {
        type: String,
        default: '0.00'
    }
})
</script>