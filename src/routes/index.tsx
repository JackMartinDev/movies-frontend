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
  const { metadata, movies } = moviesQuery.data;
  return (
    <div>
      <p>current_page: {metadata.current_page}</p>
      <p>page_size: {metadata.page_size}</p>
      <p>first_page_page: {metadata.first_page}</p>
      <p>last_page: {metadata.last_page}</p>
      <p>total_records: {metadata.total_records}</p>
      {movies.map((movie) => (
        <p key={movie.id}>{movie.id}</p>
      ))}
    </div>
  );
}
