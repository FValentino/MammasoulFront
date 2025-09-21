import { useMutation } from "@tanstack/react-query";
import type { Visitor } from "../../types";
import { updateVisitor } from "../../services";

export function useUpdateToClient() {
  return useMutation<Visitor, Error, Visitor>({
    mutationFn: (data: Visitor) => updateVisitor(data),
  })
}

