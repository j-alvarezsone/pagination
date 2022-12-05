<script setup lang="ts">
  import { ref, watch, toRefs } from 'vue';

  interface Props {
    currentPage: number;
    totalPages: number;
  }

  interface Emits {
    (event: 'pageChanged', page: number): void;
  }

  const props = defineProps<Props>();
  const { currentPage, totalPages } = toRefs(props);

  const emit = defineEmits<Emits>();

  const totalPageNumbers = ref<number[]>([]);

  watch(
    () => totalPages,

    () => {
      totalPageNumbers.value = [...new Array(totalPages.value)].map((v, i) => i + 1);
    },
    { immediate: true },
  );
</script>

<template>
  <div>
    <button :disabled="currentPage === 1" @click="emit('pageChanged', currentPage - 1)">Previews</button>
    <button
      v-for="number of totalPageNumbers"
      :key="number"
      :class="{ active: currentPage === number }"
      @click="emit('pageChanged', number)"
    >
      {{ number }}
    </button>
    <button :disabled="currentPage === totalPages" @click="emit('pageChanged', currentPage + 1)">Next</button>
  </div>
</template>

<style scoped>
  div {
    margin-top: 10px;
  }

  button {
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    cursor: pointer;
    margin-right: 5px;
    padding: 10px;
    transition: all 0.5s;
  }

  button:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
    transition: all 0.5s;
  }

  button:disabled {
    cursor: not-allowed;
  }

  .active {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
</style>
