<template>
  <div class="min-vh-100 d-flex align-items-center">
    <CContainer>
      <CRow class="justify-content-center text-center">
        <CCol :md="6">
          <div class="error-content">
            <h1 class="display-3 mb-3">404</h1>
            <h4 class="mb-3">Oops! You're lost.</h4>
            <p class="text-body-secondary mb-4">
              The page you are looking for was not found.
            </p>
            <CButton color="primary" href="/" class="px-4">
              Go to Home
            </CButton>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script setup>
import { CButton } from '@coreui/vue'
</script>

<style scoped>
.error-content {
  padding: 2rem;
}
</style>

<style lang="scss">
@import '@/assets/styles/style.scss';
</style>