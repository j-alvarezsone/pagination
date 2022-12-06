import { ref, watch, computed } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import type { Client } from '../interfaces/client';
import clientsApi from '../../api/clients-api';
import useClients from './useClients';

const getClient = async (id: number): Promise<Client> => {
  const { data } = await clientsApi.get<Client>(`/clients/${id}`);

  return data;
};

const updateClient = async (client: Client): Promise<Client> => {
  const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client);
  // const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false });

  // queries.forEach((query) => query.reset()); it will reset all queries caches
  // queries.forEach((query) => query.fetch()); it will fetch all queries

  return data;
};

const useClient = (id: number) => {
  const client = ref<Client>();
  const queryClient = useQueryClient();
  const { currentPage } = useClients();

  const { isLoading, data, isError } = useQuery({
    queryKey: ['client', id],
    queryFn: () => getClient(id),
    staleTime: 0,
  });

  const clientMutation = useMutation(updateClient, {
    onSuccess() {
      queryClient.invalidateQueries(['clients?page=', currentPage.value]);
    },
  });

  watch(
    () => data.value,
    () => {
      if (data.value) {
        client.value = { ...data.value };
      }
    },
    { immediate: true },
  );

  return {
    client,
    isError,
    isLoading,
    clientMutation,
    // Getters
    isUpdating: computed(() => clientMutation.isLoading.value),
    isUpdateSuccess: computed(() => clientMutation.isSuccess.value),
    isErrorUpdating: computed(() => clientMutation.isError.value),
    // Method
    updateClient: clientMutation.mutate,
  };
};
export default useClient;
