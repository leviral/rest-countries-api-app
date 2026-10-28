<template>
  <p v-if="country">{{ country.name }}</p>
  <p v-else-if="data.length">Country not found.</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import type { Country } from '@/types/country';

const props = defineProps<{
  data: Country[];
}>();

const route = useRoute();
const country = computed(() => {
  const countryName = route.params.id;
  return props.data.find(
    (item) => item.name === (Array.isArray(countryName) ? countryName[0] : countryName),
  );
});
</script>
