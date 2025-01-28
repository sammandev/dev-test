<template>
    <div class="col-md-12 mb-3">
        <div class="row align-items-center">
            <div class="col-md-5">
                <CFormLabel>Time Start*</CFormLabel>
                <VueDatePicker :model-value="timeStart" @update:model-value="$emit('update:timeStart', $event)"
                    time-picker model-type="HH:mm" :enable-seconds="false" :is-24="true" placeholder="Select Time"
                    :dark="isDark" auto-apply required />
            </div>
            <div class="col-md-2 text-center">
                <div class="mt-2">
                    <div>Total:</div>
                    <strong>{{ totalHours.toFixed(2) }} hour(s)</strong>
                </div>
            </div>
            <div class="col-md-5">
                <CFormLabel>Time End*</CFormLabel>
                <VueDatePicker :model-value="timeEnd" @update:model-value="$emit('update:timeEnd', $event)" time-picker
                    model-type="HH:mm" :enable-seconds="false" :is-24="true" placeholder="Select Time" :dark="isDark" auto-apply required />
            </div>
        </div>
    </div>
</template>

<script setup>
import { useDatepickerTheme } from '@/composables/useDatepickerTheme';
import VueDatePicker from '@vuepic/vue-datepicker';

const props = defineProps({
    timeStart: String,
    timeEnd: String,
    totalHours: Number,
    loading: Boolean
})

const emit = defineEmits(['update:timeStart', 'update:timeEnd', 'calculate'])

const { isDark, datepickerDarkStyles } = useDatepickerTheme()
</script>