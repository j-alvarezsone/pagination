<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useCounterSetupStore } from '../../store/counter-setup';

  const { count, lastChanged } = storeToRefs(useCounterSetupStore());
</script>

<template>
  <h1>The value is: {{ count }}</h1>
  <h4>Last changed: {{ lastChanged }}</h4>
</template>

<style scoped></style>
