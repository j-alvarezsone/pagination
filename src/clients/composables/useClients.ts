import { useQuery } from '@tanstack/vue-query';
import type { Client } from '../interfaces/client';
import clientsApi from '../../api/clients-api';
import { useClientsStore } from '../../store/clients';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const getClients = async (): Promise<Client[]> => {
  const { data } = await clientsApi.get<Client[]>('/clients?_page=1');

  return data;
};

const useClients = () => {
  const store = useClientsStore();
  const { currentPage, clients, totalPages } = storeToRefs(store);

  const { isLoading, data } = useQuery({
    queryKey: ['clients?page=', 1],
    queryFn: getClients,
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
    isLoading,
    clients,
  };
};

export default useClients;
