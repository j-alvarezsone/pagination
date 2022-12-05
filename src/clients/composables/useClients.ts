import { watch, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { useClientsStore } from '../../store/clients';

import clientsApi from '../../api/clients-api';
import type { Client } from '../interfaces/client';

const getClients = async (page: number): Promise<Client[]> => {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(true);
  //   }, 1500);
  // });

  const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`);

  return data;
};

const useClients = () => {
  const store = useClientsStore();
  const { currentPage, clients, totalPages } = storeToRefs(store);

  const { isLoading, data } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['clients?page=', currentPage],
    queryFn: () => getClients(currentPage.value),
  });

  watch(
    () => data.value,
    (clients) => {
      if (clients) {
        store.setClients(clients);
      }
    },
  );

  return {
    clients,
    currentPage,
    isLoading,
    totalPages,
    // Getters
    // Actions
    getPage(page: number) {
      store.setPage(page);
    },
  };
};

export default useClients;
