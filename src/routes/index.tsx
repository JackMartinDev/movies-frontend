import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { client } from "../utils/axios";
import { MoviesData } from "../types/common";

const fetchMovies = async () => {
  const response = await client.get<MoviesData>("/v1/movies");
  return response.data;
};

const moviesQueryOptions = queryOptions({
  queryKey: ["moviesAll"],
  queryFn: fetchMovies,
});

export const Route = createFileRoute("/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(moviesQueryOptions),
  component: Index,
});

function Index() {
  const moviesQuery = useSuspenseQuery(moviesQueryOptions);
  const { movies } = moviesQuery.data;
  return (
    <div>
      {movies.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
}
