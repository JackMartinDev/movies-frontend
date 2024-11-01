import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/search" className="[&.active]:font-bold">
          Search
        </Link>
      </div>
      <hr />
      <main className="container mx-auto">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
