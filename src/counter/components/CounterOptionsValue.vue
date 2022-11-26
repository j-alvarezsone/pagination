<script setup lang="ts">
  import { useCounterOptionsStore } from '../../store/counter-options';
  import { storeToRefs } from 'pinia';

  const { count, lastChanged } = storeToRefs(useCounterOptionsStore());
</script>

<template>
  <h1>The value is: {{ count }}</h1>
  <h4>Last changed: {{ lastChanged }}</h4>
</template>

<style scoped></style>
