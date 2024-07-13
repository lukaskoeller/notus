import styles from './App.module.css';
import { EditorProvider } from './contexts/editor';
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { indexRoute, newNoteRoute, noteRoute, rootRoute } from './router';
import { OpenAPI } from './api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SideNavProvider } from './contexts/sidenav';

const apiUrl = import.meta.env.VITE_APP_API_URL;

// Setting the correct environment based base url for the api.
OpenAPI.BASE = apiUrl;

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    }
  }
});

const routeTree = rootRoute.addChildren([indexRoute, newNoteRoute, noteRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  if (!apiUrl) {
    throw new Error('`VITE_APP_API_URL` is not set. Add it to your `.env` file.');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SideNavProvider>
        <div className={styles.grid}>
          <EditorProvider>
            <RouterProvider router={router} />
          </EditorProvider>
        </div>
      </SideNavProvider>
    </QueryClientProvider>
  )
}

export default App
