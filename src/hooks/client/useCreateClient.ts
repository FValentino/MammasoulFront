import { useMutation } from "@tanstack/react-query";
import type { Client } from "../../types";
import { createClient } from "../../services";

export function useCreateClient() {
  return useMutation<Client, Error, Client>({
    mutationFn: (data: Client) => createClient(data),
  })
}

