<script lang="ts" setup>
  import { storeToRefs } from 'pinia';
  import { useCounterSetupStore } from '../../store/counter-setup';
  import CounterSetupValue from '../components/CounterSetupValue.vue';

  const counterStore = useCounterSetupStore();
  const { count, squaredCount } = storeToRefs(counterStore);
  const { increment, incrementBy, reset } = counterStore;
</script>

<template>
  <h1>Pinia Setup</h1>
  <h4>Counter: {{ count }}</h4>
  <h4>Square: {{ squaredCount }}</h4>

  <br />
  <button @click="increment()">+1</button>
  <button @click="incrementBy(2)">+2</button>
  <button @click="incrementBy(5)">+5</button>
  <button @click="reset">Reset</button>

  <br />

  <CounterSetupValue />
</template>

<style scoped>
  .button {
    margin-right: 5px;
  }
</style>
By
