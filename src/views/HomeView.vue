<template>
  <main class="content__wrapper">
    <section class="content__upper-wrapper">
      <label class="content__input-wrapper" for="search-input">
        <SearchIcon aria-hidden="true" />
        <span class="sr-only">Land suchen</span>
        <input
          v-model="search"
          type="search"
          id="search-input"
          placeholder="Search for a country..."
        />
      </label>
      <button
        class="content__popover-btn"
        popovertarget="filter-popover"
        @click="popoverOpen = !popoverOpen"
      >
        <span>Filter by Region</span>
        <component :is="popoverOpen ? ArrowUpIcon : ArrowDownIcon" />
      </button>
    </section>
    <section class="content__main-wrapper">
      <div v-for="country in filteredCountries" :key="country.name" class="content__card">
        <div
          class="content__card-flag"
          v-html="svgCache[country.flags.svg]"
          role="img"
          :aria-label="`${country.name} flag`"
        ></div>
        <div class="content__card-text">
          <h1>{{ country.name }}</h1>
          <div class="content__card-text-details">
            <p><strong>Population: </strong>{{ country.population }}</p>
            <p><strong>Region: </strong>{{ country.region }}</p>
            <p><strong>Capital: </strong>{{ country.capital }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <ul id="filter-popover" popover class="content__popover">
    <li v-for="(continent, index) in continents" :key="index">
      <button>
        <span>{{ continent }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import ArrowDownIcon from '@/assets/icons/arrow_down.svg?component';
import ArrowUpIcon from '@/assets/icons/arrow_up.svg?component';
import SearchIcon from '@/assets/icons/search.svg?component';
import { useAppStore } from '@/stores/store';
import type { Country } from '@/types/country';

const props = defineProps<{
  data: Country[];
}>();

const { getSVGFlag, svgCache } = useAppStore();
const search = ref('');
const popoverOpen = ref(false);

const continents = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

const filteredCountries = computed(() => {
  const query = search.value.trim().toLocaleLowerCase();

  return props.data.filter((country) => country.name.toLocaleLowerCase().includes(query));
});

watch(
  filteredCountries,
  (countries) => {
    for (const country of countries) {
      void getSVGFlag(country.flags.svg);
    }
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.content__wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-32);
}

.content__upper-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-48);

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
  max-inline-size: 450px;
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
  justify-content: space-between;
  max-inline-size: 250px;
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

.content__main-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-48);
}

.content__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  box-shadow: 0 0 5px rgb(from var(--color-text) r g b / 30%);
  background-color: var(--color-elements);

  :root[data-theme='dark'] & {
    box-shadow: 0 0 5px var(--color-background);
  }
}
</style>
