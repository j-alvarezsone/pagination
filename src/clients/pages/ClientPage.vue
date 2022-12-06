<script setup lang="ts">
  import { watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import LoadingModal from '../../shared/components/LoadingModal.vue';
  import useClient from '../composables/useClient';

  const route = useRoute();
  const router = useRouter();

  const { client, isLoading, isError, clientMutation, updateClient, isUpdating, isErrorUpdating, isUpdateSuccess } =
    useClient(+route.params.id);

  watch(
    () => isErrorUpdating.value,
    () => {
      if (isError.value) {
        router.replace('/clients');
      }
    },
  );

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
    <h3 v-if="isUpdating">Saving....</h3>
    <h3 v-if="isUpdateSuccess">Saved</h3>
    <LoadingModal v-if="isLoading" />

    <div v-if="client">
      <h1>{{ client.name }}</h1>

      <form @submit.prevent="updateClient(client!)">
        <input type="text" placeholder="Name" v-model="client.name" />
        <input type="text" placeholder="Address" v-model="client.address" />
        <br />

        <button type="submit" :disabled="isUpdating">Save</button>
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
