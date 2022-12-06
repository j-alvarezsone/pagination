<script setup lang="ts">
  import { useMutation } from '@tanstack/vue-query';
  import { useRoute } from 'vue-router';
  import LoadingModal from '../../shared/components/LoadingModal.vue';
  import useClient from '../composables/useClient';
  import type { Client } from '../interfaces/client';
  import clientsApi from '../../api/clients-api';
  import { watch } from 'vue';

  const route = useRoute();
  const { client, isLoading } = useClient(+route.params.id);

  const updateClient = async (client: Client): Promise<Client> => {
    const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client);

    return data;
  };

  const clientMutation = useMutation(updateClient);

  watch(
    () => clientMutation.isSuccess.value,
    (isSuccess) => {
      if (isSuccess) {
        setTimeout(() => {
          clientMutation.reset();
        }, 2000);
      }
    },
  );
</script>

<template>
  <div>
    <h3 v-if="clientMutation.isLoading.value">Saving....</h3>
    <h3 v-if="clientMutation.isSuccess.value">Saved</h3>
    <LoadingModal v-if="isLoading" />

    <div v-if="client">
      <h1>{{ client.name }}</h1>

      <form @submit.prevent="clientMutation.mutate(client!)">
        <input type="text" placeholder="Name" v-model="client.name" />
        <input type="text" placeholder="Address" v-model="client.address" />
        <br />

        <button type="submit" :disabled="clientMutation.isLoading.value">Save</button>
      </form>
    </div>

    <code> {{ client }}</code>
  </div>
</template>

<style scoped>
  input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
  }

  button {
    margin-bottom: 10px;
  }
</style>
