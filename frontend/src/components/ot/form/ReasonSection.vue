<template>
    <div class="row">
        <div class="col-md-12 mb-3">
            <CFormLabel>Overtime Reason*</CFormLabel>
            <CFormInput :modelValue="overtimeReason" @update:modelValue="$emit('update:overtimeReason', $event)"
                placeholder="Please provide reason for overtime request" :disabled="loading" required />
        </div>
        <div class="col-md-12 mb-3">
            <CFormLabel>Overtime Details*</CFormLabel>
            <CFormTextarea :modelValue="overtimeDetails" @update:modelValue="$emit('update:overtimeDetails', $event)"
                placeholder="Please provide details for overtime request" :disabled="loading" rows="3" required />
        </div>
    </div>
</template>

<script setup>
defineProps({
    overtimeReason: {
        type: String,
        default: ''
    },
    overtimeDetails: {
        type: String,
        default: ''
    },
    loading: Boolean
})

defineEmits(['update:overtimeReason', 'update:overtimeDetails'])
</script>