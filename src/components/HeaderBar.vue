<template>
  <header class="header">
    <h1>Where in the world?</h1>
    <button @click="toggleDark()">
      <DarkModeIcon />
      {{ isDark ? 'Light Mode' : 'Dark Mode' }}
    </button>
  </header>
</template>

<script setup lang="ts">
import DarkModeIcon from '@/assets/icons/dark_mode.svg?component';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({
  selector: ':root',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
});

const toggleDark = useToggle(isDark);
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-elements);
  padding: var(--space-48) var(--space-24);
  box-shadow: 0 1px 5px rgb(from var(--color-text) r g b / 30%);

  :root[data-theme='dark'] & {
    box-shadow: 0 1px 5px var(--color-background);
  }

  > h1 {
    font-size: var(--space-16);
    font-weight: var(--font-extra-bold);
  }

  > button {
    display: flex;
    gap: var(--space-14);
    align-items: center;
    font-weight: var(--font-semi-bold);

    &:focus:not(:focus-visible) {
      outline: none;
    }
  }
}
</style>
