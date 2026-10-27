<template>
  <div class="content__wrapper">
    <div class="content__upper-wrapper">
      <div class="content__input-wrapper">
        <label for="search-input">
          <SearchIcon />
        </label>
        <input type="text" id="search-input" placeholder="Search for a country..." />
      </div>
      <div class="content__button-wrapper">
        <button popovertarget="filter-popover" @click="popoverOpen = !popoverOpen">
          Filter by Region
        </button>
        <component :is="popoverOpen ? ArrowUpIcon : ArrowDownIcon" />
      </div>
    </div>
  </div>

  <div id="filter-popover" popover></div>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/icons/search.svg?component';
import ArrowDownIcon from '@/assets/icons/arrow_down.svg?component';
import ArrowUpIcon from '@/assets/icons/arrow_up.svg?component';
import { ref } from 'vue';

const popoverOpen = ref(false);
</script>

<style lang="scss" scoped>
.content__wrapper {
  display: flex;
  flex-direction: column;
}

.content__upper-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-64);

  @media (min-width: $bp-tablet) {
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
  }
}

.content__input-wrapper {
  display: flex;
  background-color: var(--color-elements);
  border-radius: var(--space-8);
  color: var(--color-input);
  padding: var(--space-16) var(--space-32);
  gap: var(--space-24);
  max-inline-size: 350px;

  &:has(> input:focus-visible) {
    outline: 1px solid var(--color-text);
  }

  > input {
    border: none;
    outline: none;
    background-color: transparent;
  }
}

.content__button-wrapper {
  display: flex;
  gap: var(--space-64);
  background-color: var(--color-elements);
  padding: var(--space-16) var(--space-24) var(--space-16) var(--space-32);
  border-radius: var(--space-8);

  &:has(> button:focus-visible) {
    outline: 1px solid var(--color-text);
  }

  > button {
    outline: none;
  }
}
</style>
