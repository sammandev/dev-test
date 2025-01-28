<template>
  <CPagination v-if="pageCount > 1" class="mt-4" align="center">
    <CPaginationItem
      :disabled="currentPage === 1"
      @click="currentPage > 1 && updatePage(currentPage - 1)"
    >
      Previous
    </CPaginationItem>

    <template v-if="pageCount <= 7">
      <CPaginationItem
        v-for="page in pageCount"
        :key="page"
        :active="page === currentPage"
        @click="updatePage(page)"
      >
        {{ page }}
      </CPaginationItem>
    </template>

    <template v-else>
      <!-- First page -->
      <CPaginationItem :active="currentPage === 1" @click="updatePage(1)"> 1 </CPaginationItem>

      <!-- Left ellipsis -->
      <CPaginationItem v-if="showLeftEllipsis" disabled>...</CPaginationItem>

      <!-- Middle pages -->
      <CPaginationItem
        v-for="page in visiblePages"
        :key="page"
        :active="page === currentPage"
        @click="updatePage(page)"
      >
        {{ page }}
      </CPaginationItem>

      <!-- Right ellipsis -->
      <CPaginationItem v-if="showRightEllipsis" disabled>...</CPaginationItem>

      <!-- Last page -->
      <CPaginationItem
        v-if="pageCount > 1"
        :active="currentPage === pageCount"
        @click="updatePage(pageCount)"
      >
        {{ pageCount }}
      </CPaginationItem>
    </template>

    <CPaginationItem
      :disabled="currentPage === pageCount"
      @click="currentPage < pageCount && updatePage(currentPage + 1)"
    >
      Next
    </CPaginationItem>
  </CPagination>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:currentPage'])

const updatePage = (page) => {
  if (page >= 1 && page <= props.pageCount) {
    emit('update:currentPage', page)
  }
}

// Show at most 5 pages including first and last
const visiblePages = computed(() => {
  if (props.pageCount <= 7) return []

  let start = Math.max(2, props.currentPage - 1)
  let end = Math.min(props.pageCount - 1, start + 2)

  if (props.currentPage > props.pageCount - 4) {
    start = props.pageCount - 4
    end = props.pageCount - 1
  }

  if (props.currentPage < 5) {
    start = 2
    end = 5
  }

  const pages = []
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const showLeftEllipsis = computed(() => {
  return props.currentPage > 4
})

const showRightEllipsis = computed(() => {
  return props.currentPage < props.pageCount - 3
})
</script>
