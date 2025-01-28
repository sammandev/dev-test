import { computed } from 'vue'
import { useThemeStore } from '@/themes/theme'

export function useDatepickerTheme() {
  const themeStore = useThemeStore()
  const isDark = computed(() => themeStore.theme === 'dark')
  
  return {
    isDark,
  }
}
