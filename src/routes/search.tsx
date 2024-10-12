import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { client } from "../utils/axios";

type MoviesData = {
  metadata: Metadata;
  movies: Movie[];
};

type Metadata = {
  current_page: string;
  page_size: string;
  first_page: string;
  last_page: string;
  total_records: string;
};

type Movie = {
  id: number;
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  version: number;
};

const fetchMovies = async () => {
  const response = await client.get<MoviesData>("/v1/movies");
  return response.data;
};

const moviesQueryOptions = queryOptions({
  queryKey: ["movies"],
  queryFn: fetchMovies,
});

export const Route = createFileRoute("/search")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(moviesQueryOptions),
  component: Search,
});

function Search() {
  const moviesQuery = useSuspenseQuery(moviesQueryOptions);
  const data = moviesQuery.data;
  return (
    <div>
      {data.movies.map((movie) => (
        <p>{movie.id}</p>
      ))}
    </div>
  );
}
