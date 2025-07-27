import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./app/store";

const queryClient = new QueryClient();

interface contextInterface {
  adminemails?: string[];
  executives?: string[];
}

// Create the context
export const MyContext = createContext<contextInterface | undefined>(undefined);

// Dummy data for context
const executives: string[] = [
  "hossainfarshid@gmail.com",
  "supratim.mukherjee123@gmail.com",
  "subha072001@gmail.com",
"arijit.01paul@gmail.com"
];
const adminemails: string[] = [
  "hossainfarshid@gmail.com",
  "supratim.mukherjee123@gmail.com",
  "arijit.01paul@gmail.com",
  "ssagnik56@gmail.com",
  "subha072001@gmail.com",
];

// Lazy load the App component
const App = React.lazy(() => import("./App.jsx"));

const rootElement = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <MyContext.Provider value={{ adminemails, executives }}>
    <Provider store={store}>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Suspense>
    </Provider>
  </MyContext.Provider>
);
