<script setup lang="ts">
  import ClientList from '../components/ClientList.vue';
  import PaginationNumbers from '../components/PaginationNumbers.vue';
  import useClients from '../composables/useClients';
  import LoadingModal from '../../shared/components/LoadingModal.vue';

  const { isLoading } = useClients();
</script>

<template>
  <div>
    <h1>List of clients</h1>

    <!-- Clients list -->
    <ClientList />
    <!-- Pagination numbers -->
    <PaginationNumbers />
    <!-- Loading modal -->
    <LoadingModal v-if="isLoading" />
  </div>
</template>

<style scoped></style>
