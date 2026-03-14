"use client"

import { ReactNode } from 'react'
import { CartProvider } from '@/context'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/client'

interface Props{
    children: ReactNode;
}

export default function Providers({children}: Props){
  return(
    <>
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            {children}
          </CartProvider>
        </QueryClientProvider>
    </>
  );
}
