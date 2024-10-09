import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";
import { client } from "./utils/axios";

const queryClient = new QueryClient();

async function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <p className="text-red-500 text-lg">Hello</p>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
