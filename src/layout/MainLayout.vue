<template>
  <div class="page__wrapper">
    <HeaderBar />
    <div class="page__content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import { useAppStore } from '@/stores/store';
import { onMounted } from 'vue';

const { getData } = useAppStore();

onMounted(() => {
  getData;
});
</script>

<style lang="scss" scoped>
.page__wrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  min-block-size: inherit;
}

.page__content {
  padding: var(--space-24);
}
</style>
