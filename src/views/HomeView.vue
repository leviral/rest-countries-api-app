<template>
  <div class="content__wrapper">
    <div class="content__upper-wrapper">
      <label class="content__input-wrapper" for="search-input">
        <SearchIcon aria-hidden="true" />
        <span class="sr-only">Land suchen</span>
        <input type="search" id="search-input" placeholder="Search for a country..." />
      </label>
      <button
        class="content__popover-btn"
        popovertarget="filter-popover"
        @click="popoverOpen = !popoverOpen"
      >
        <span>Filter by Region</span>
        <component :is="popoverOpen ? ArrowUpIcon : ArrowDownIcon" />
      </button>
    </div>
  </div>

  <ul id="filter-popover" popover class="content__popover">
    <li v-for="(continent, index) in continents" :key="index">
      <button>
        <span>{{ continent }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import ArrowDownIcon from '@/assets/icons/arrow_down.svg?component';
import ArrowUpIcon from '@/assets/icons/arrow_up.svg?component';
import SearchIcon from '@/assets/icons/search.svg?component';

const popoverOpen = ref(false);

const continents = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
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
  align-items: center;
  background-color: var(--color-elements);
  border-radius: var(--space-8);
  box-shadow: 0 0 5px rgb(from var(--color-text) r g b / 30%);
  color: var(--color-input);
  display: flex;
  gap: var(--space-24);
  max-inline-size: 350px;
  padding: var(--space-16) var(--space-32);

  :root[data-theme='dark'] & {
    box-shadow: 0 0 5px var(--color-background);
  }

  &:has(> input:focus-visible) {
    outline: 1px solid var(--color-text);
  }

  > input {

    background-color: transparent;
    border: none;
    flex-grow: 1;
    outline: none;
  }
}

.content__popover-btn {
  align-items: center;
  anchor-name: --popover-anchor;
  background-color: var(--color-elements);
  border-radius: var(--space-8);

  box-shadow: 0 0 5px rgb(from var(--color-text) r g b / 30%);
  display: flex;
  gap: var(--space-64);
  padding: var(--space-16) var(--space-24) var(--space-16) var(--space-32);

  &:focus-visible {
    outline: 1px solid var(--color-text);
  }

  :root[data-theme='dark'] & {
    box-shadow: 0 0 5px var(--color-background);
  }
}

.content__popover {
  background-color: var(--color-elements);
  border: none;
  border-radius: var(--space-8);

  box-shadow: 0 0 5px rgb(from var(--color-text) r g b / 30%);
  flex-direction: column;
  gap: var(--space-4);
  inline-size: auto;
  inset-block-start: calc(anchor(bottom) + var(--space-8));
  inset-inline-end: anchor(right);
  inset-inline-start: anchor(left);
  padding: var(--space-16) var(--space-24);
  position-anchor: --popover-anchor;
  scale: 0;

  transition:
    scale 0.3s ease-in-out,
    display 0.3s allow-discrete;

  :root[data-theme='dark'] & {
    box-shadow: 0 0 5px var(--color-background);
  }

  &:popover-open {
    display: flex;
    scale: 1;

    @starting-style {
      scale: 0;
    }
  }

  button {
    border-radius: var(--space-4);
    display: flex;
    inline-size: 100%;
    padding-inline: var(--space-8);

    &:focus-visible {
      outline: 1px solid var(--color-text);
    }
  }
}
</style>
