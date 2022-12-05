<script setup lang="ts">
  import ClientList from '../components/ClientList.vue';
  import PaginationNumbers from '../components/PaginationNumbers.vue';
  import useClients from '../composables/useClients';
  import LoadingModal from '../../shared/components/LoadingModal.vue';

  const { isLoading, clients, currentPage, totalPages, getPage } = useClients();
</script>

<template>
  <div>
    <h1>List of clients</h1>

    <!-- Clients list -->
    <ClientList :clients="clients" />
    <!-- Pagination numbers -->
    <PaginationNumbers :current-page="currentPage" :total-pages="totalPages" @page-changed="getPage" />
    <!-- Loading modal -->
    <LoadingModal v-if="isLoading" />
  </div>
</template>

<style scoped></style>
