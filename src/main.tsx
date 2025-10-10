import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CartProvider } from './context'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './client'
import AppRouter from './routes/appRouter.tsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from "react-helmet-async";  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <CartProvider>
          <QueryClientProvider client={queryClient}>
            <App>
              <AppRouter/>
            </App>
          </QueryClientProvider>
        </CartProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
