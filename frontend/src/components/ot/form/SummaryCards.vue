<template>
    <div class="row mb-4">
        <div class="col-md-4 mb-2 mb-md-0" v-for="(card, index) in summaryCards" :key="index">
            <CCard>
                <CCardBody>
                    <h6>{{ card.title }}</h6>
                    <div class="text-muted small">{{ card.subtitle }}</div>
                    <div class="h4 mb-0" :class="card.colorClass" v-if="!card.weeklyClass">{{ card.value }}</div>
                    <div class="h4 mb-0 d-flex" v-else>
                        <span :class="card.weeklyClass">{{ formatHours(Math.max(0, WEEKLY_LIMIT -
                            parseFloat(weeklyHours))) }}</span>
                        <span class="mx-2" :class="card.monthlyClass">/</span>
                        <span :class="card.monthlyClass">{{ formatHours(Math.max(0, MONTHLY_LIMIT -
                            parseFloat(monthlyHours))) }}</span>
                        <span :class="card.monthlyClass">&nbsp;Hours</span>
                    </div>
                    <div v-if="card.warning" class="small text-danger mt-1">
                        {{ card.warning }}
                    </div>
                </CCardBody>
            </CCard>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    weeklyHours: {
        type: [Number, String],
        default: '0.00'
    },
    monthlyHours: {
        type: [Number, String],
        default: '0.00'
    },
    employeeName: {
        type: String,
        default: '--SELECT EMPLOYEE--'
    }
})

const WEEKLY_LIMIT = 18;
const MONTHLY_LIMIT = 72;

const formatHours = (hours) => {
    const numericHours = typeof hours === 'string' ? parseFloat(hours) : hours
    return numericHours.toFixed(2)
}

const summaryCards = computed(() => {
    const weekly = !props.employeeName || props.employeeName === '---SELECT EMPLOYEE---'
        ? 0
        : parseFloat(props.weeklyHours) || 0;

    const monthly = !props.employeeName || props.employeeName === '---SELECT EMPLOYEE---'
        ? 0
        : parseFloat(props.monthlyHours) || 0;

    // Calculate remaining hours
    const weeklyRemaining = Math.max(0, WEEKLY_LIMIT - weekly);
    const monthlyRemaining = Math.max(0, MONTHLY_LIMIT - monthly);

    let remainingWarning = null;
    let remainingColorClass = 'text-primary';

    if (weekly > WEEKLY_LIMIT && monthly > MONTHLY_LIMIT) {
        remainingWarning = 'No remaining hours available!';
        remainingColorClass = 'text-danger';
    } else if (weekly > WEEKLY_LIMIT) {
        remainingWarning = 'Remaining weekly overtime hours are not available!';
        remainingColorClass = 'd-flex';
    } else if (monthly > MONTHLY_LIMIT) {
        remainingWarning = 'Remaining monthly overtime hours are not available!';
        remainingColorClass = 'd-flex';
    }

    const employeeSubtitle = !props.employeeName || props.employeeName === '---SELECT EMPLOYEE---'
        ? 'Applied / Limit'
        : `Applied / Limit for ${props.employeeName}`;

    return [
        {
            title: 'Weekly Overtime',
            subtitle: employeeSubtitle,
            value: `${formatHours(weekly)} / ${WEEKLY_LIMIT}.00 Hours`,
            colorClass: weekly > WEEKLY_LIMIT ? 'text-danger' : 'text-success',
            warning: weekly > WEEKLY_LIMIT ? `Exceeds weekly limit by ${formatHours(weekly - WEEKLY_LIMIT)} hours!` : null
        },
        {
            title: 'Monthly Overtime',
            subtitle: employeeSubtitle,
            value: `${formatHours(monthly)} / ${MONTHLY_LIMIT}.00 Hours`,
            colorClass: monthly > MONTHLY_LIMIT ? 'text-danger' : 'text-success',
            warning: monthly > MONTHLY_LIMIT ? `Exceeds monthly limit by ${formatHours(monthly - MONTHLY_LIMIT)} hours!` : null
        },
        {
            title: 'Remaining Applicable Overtime',
            subtitle: 'Weekly / Monthly',
            value: `${formatHours(weeklyRemaining)} / ${formatHours(monthlyRemaining)} Hours`,
            colorClass: remainingColorClass,
            warning: remainingWarning,
            weeklyClass: weekly > WEEKLY_LIMIT ? 'text-danger' : 'text-primary',
            monthlyClass: monthly > MONTHLY_LIMIT ? 'text-danger' : 'text-primary'
        }
    ];
});
</script>

<style scoped>
.text-danger {
    color: #dc3545;
}

.text-success {
    color: #198754;
}

.text-primary {
    color: #0d6efd;
}

.card-body {
    min-height: 110px;
}
</style>