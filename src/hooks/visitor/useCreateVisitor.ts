import { useMutation } from "@tanstack/react-query";
import type { Visitor } from "../../types";
import { createVisitor } from "../../services";

export function useCreateVisitor() {
  return useMutation<Visitor, Error, Visitor>({
    mutationFn: (data: Visitor) => createVisitor(data),
  })
}

