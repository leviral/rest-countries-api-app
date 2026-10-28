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
        <img
          class="content__card-flag"
          :src="country.flags.svg"
          :alt="`${country.name} flag`"
          loading="lazy"
        />
        <div class="content__card-text">
          <h1>{{ country.name }}</h1>
          <p><strong>Population: </strong>{{ country.population }}</p>
          <p><strong>Region: </strong>{{ country.region }}</p>
          <p><strong>Capital: </strong>{{ country.capital }}</p>
        </div>
      </div>
    </section>
  </main>

  <ul id="filter-popover" popover class="content__popover">
    <li v-for="(continent, index) in continents" :key="index">
      <button @click="currentContinentFilter = continent">
        <span>{{ continent }}</span>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import ArrowDownIcon from '@/assets/icons/arrow_down.svg?component';
import ArrowUpIcon from '@/assets/icons/arrow_up.svg?component';
import SearchIcon from '@/assets/icons/search.svg?component';
import type { Country, CountryRegion } from '@/types/country';

const props = defineProps<{
  data: Country[];
}>();

const search = ref('');
const popoverOpen = ref(false);
const currentContinentFilter = ref<CountryRegion | null>(null);

const continents: CountryRegion[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

const filteredCountries = computed(() => {
  const query = search.value.trim().toLocaleLowerCase();

  return props.data.filter((country) =>
    currentContinentFilter.value
      ? country.name.toLocaleLowerCase().includes(query) &&
        country.region === currentContinentFilter.value
      : country.name.toLocaleLowerCase().includes(query),
  );
});
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
  display: flex;
  gap: var(--space-24);
  align-items: center;
  max-inline-size: 450px;
  padding: var(--space-16) var(--space-32);
  color: var(--color-input);
  background-color: var(--color-elements);
  border-radius: var(--space-8);
  box-shadow: 0 0 5px rgb(from var(--color-text) r g b / 30%);

  :root[data-theme='dark'] & {
    box-shadow: 0 0 5px var(--color-background);
  }

  &:has(> input:focus-visible) {
    outline: 1px solid var(--color-text);
  }

  > input {
    flex-grow: 1;
    outline: none;
    background-color: transparent;
    border: none;
  }
}

.content__popover-btn {
  display: flex;
  gap: var(--space-64);
  align-items: center;
  justify-content: space-between;
  max-inline-size: 250px;
  padding: var(--space-16) var(--space-24) var(--space-16) var(--space-32);
  anchor-name: --popover-anchor;
  background-color: var(--color-elements);
  border-radius: var(--space-8);

  box-shadow: 0 0 5px rgb(from var(--color-text) r g b / 30%);

  &:focus-visible {
    outline: 1px solid var(--color-text);
  }

  :root[data-theme='dark'] & {
    box-shadow: 0 0 5px var(--color-background);
  }
}

.content__popover {
  inset-block-start: calc(anchor(bottom) + var(--space-8));
  inset-inline-start: anchor(left);
  inset-inline-end: anchor(right);
  flex-direction: column;
  gap: var(--space-4);
  inline-size: auto;
  padding: var(--space-16) var(--space-24);
  position-anchor: --popover-anchor;
  background-color: var(--color-elements);
  border: none;
  border-radius: var(--space-8);

  box-shadow: 0 0 5px rgb(from var(--color-text) r g b / 30%);
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
    display: flex;
    inline-size: 100%;
    padding-inline: var(--space-8);
    border-radius: var(--space-4);

    &:focus-visible {
      outline: 1px solid var(--color-text);
    }
  }
}

.content__main-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-32);

  align-content: center;
  justify-items: center;
  padding-inline: var(--space-24);
}

.content__card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
  inline-size: 100%;
  max-inline-size: 400px;
  overflow: hidden;
  background-color: var(--color-elements);
  border-radius: var(--space-8);
  box-shadow: 0 0 5px rgb(from var(--color-text) r g b / 30%);

  :root[data-theme='dark'] & {
    box-shadow: 0 0 5px var(--color-background);
  }
}

.content__card-flag {
  block-size: 100%;
  object-fit: cover;
}

.content__card-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  padding: var(--space-32);
  padding-block-start: 0;
  color: var(--color-text);

  > h1 {
    margin-block-end: var(--space-12);
    font-size: var(--space-20);
    font-weight: var(--font-extra-bold);
  }

  strong {
    font-weight: var(--font-semi-bold);
  }
}
</style>
