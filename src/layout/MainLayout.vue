<template>
  <div class="page__wrapper">
    <HeaderBar />
    <div class="page__content">
      <router-view v-slot="{ Component }">
        <component :is="Component" :data="data" />
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

import HeaderBar from '@/components/HeaderBar.vue';
import { useAppStore } from '@/stores/store';

const appStore = useAppStore();
const { data } = storeToRefs(appStore);

onMounted(() => {
  appStore.getData();
});
</script>

<style lang="scss" scoped>
.page__wrapper {
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  min-block-size: inherit;
}

.page__content {
  padding: var(--space-24);
}
</style>
