<template>
    <CTable v-if="records.length" :columns="getSortableTable()" :items="getCenteredTableBody(records)" responsive striped hover>
        <template #employee_name="{ item }">{{ item.employee_name }}</template>
        <template #project_name="{ item }">{{ item.project_name }}</template>
        <template #request_date="{ item }">{{ formatDate(item.request_date) }}</template>
        <template #time_start="{ item }">{{ formatTime(item.time_start) }}</template>
        <template #time_end="{ item }">{{ formatTime(item.time_end) }}</template>
        <template #total_hours="{ item }">{{ item.total_hours }}</template>
    </CTable>
    <div v-else class="text-center my-3">
        No overtime records found.
    </div>
</template>

<script setup>
const props = defineProps({
    records: {
        type: Array,
        required: true
    },
    sortKey: {
        type: String,
        default: ''
    },
    sortOrder: {
        type: String,
        default: 'asc'
    }
})

const emit = defineEmits(['sort'])

const handleSort = (key) => {
    emit('sort', key)
}

const formatTime = (time) => {
    if (!time) return '';
    return time.substring(0, 5); // Only show HH:mm
}

const formatDate = (date) => {
    if (!date) return '';
    return date;
}

const getSortableTable = () => [
    {
        key: 'employee_name',
        label: `Employee ${getSortIndicator('employee_name')}`,
        _style: { cursor: 'pointer' },
        _props: { onClick: () => handleSort('employee_name') },
    },
    {
        key: 'project_name',
        label: `Project ${getSortIndicator('project_name')}`,
        _style: { cursor: 'pointer' },
        _props: { onClick: () => handleSort('project_name') },
    },
    {
        key: 'request_date',
        label: `Date ${getSortIndicator('request_date')}`,
        _style: { cursor: 'pointer', textAlign: 'center' },
        _props: { onClick: () => handleSort('request_date') },
    },
    {
        key: 'time_start',
        label: `Start Time ${getSortIndicator('time_start')}`,
        _style: { cursor: 'pointer', textAlign: 'center' },
        _props: { onClick: () => handleSort('time_start') },
    },
    {
        key: 'time_end',
        label: `End Time ${getSortIndicator('time_end')}`,
        _style: { cursor: 'pointer', textAlign: 'center' },
        _props: { onClick: () => handleSort('time_end') },
    },
    {
        key: 'total_hours',
        label: `Total Hours ${getSortIndicator('total_hours')}`,
        _style: { cursor: 'pointer', textAlign: 'center' },
        _props: { onClick: () => handleSort('total_hours') },
    }
]

const getSortIndicator = (key) => {
    if (props.sortKey !== key) return ' ♦'
    return props.sortOrder === 'asc' ? ' ▲' : ' ▼'
}

const getCenteredTableBody = (records) => {
    return records.map(record => ({
        ...record,
        _cellProps: {
            employee_name: { class: 'text-start' },
            project_name: { class: 'text-start' },
            request_date: { class: 'text-center' },
            time_start: { class: 'text-center' },
            time_end: { class: 'text-center' },
            total_hours: { class: 'text-center' }
        }
    }))
}
</script>

<style scoped>
.text-start {
    text-align: left;
}
.text-center {
    text-align: center;
}
</style>