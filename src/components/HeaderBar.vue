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
import { useDark, useToggle } from '@vueuse/core';

import DarkModeIcon from '@/assets/icons/dark_mode.svg?component';

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
  align-items: center;
  justify-content: space-between;
  padding: var(--space-48) var(--space-24);
  background-color: var(--color-elements);
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
    padding-inline-end: 2px;
    font-weight: var(--font-semi-bold);
    border-radius: var(--space-4);

    &:focus-visible {
      outline: 1px solid var(--color-text);
      outline-offset: 2px;
    }
  }
}
</style>
