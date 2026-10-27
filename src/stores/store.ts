import type { Country } from '@/types/country';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app-store', () => {
  const data = ref<Array<Country>>();

  const getData = async () => {
    try {
      const response = await fetch('/api/data.json');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      data.value = await response.json();
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error('Error occured while fetching data');
    }
  };

  return {
    data,
    getData,
  };
});
