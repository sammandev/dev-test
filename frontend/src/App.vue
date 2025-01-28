<script setup>
import { onBeforeMount, watch } from 'vue'
import { useColorModes } from '@coreui/vue'
import { useThemeStore } from '@/themes/theme.js'

const { isColorModeSet, setColorMode, colorMode } = useColorModes('light-dark-mode')
const themeStore = useThemeStore()

onBeforeMount(() => {
  const currentTheme = colorMode.value || 'light'
  setColorMode(currentTheme)
  themeStore.toggleTheme(currentTheme)
})

watch(colorMode, (newTheme) => {
  themeStore.toggleTheme(newTheme)
}, { immediate: true })
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@import 'assets/styles/style';
</style>
