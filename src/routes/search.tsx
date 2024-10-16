import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { client } from "../utils/axios";
import { MoviesData } from "../types/common";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryBuilder } from "../utils/common";
import Pagination from "../components/pagination";
import MovieCard from "../components/movie-card";

type MovieSearch = {
  title?: string;
  page?: number;
};

const searchBarSchema = z.object({
  query: z
    .string()
    .min(1, "Search query must not be empty")
    .max(100, "Search query must be less than 100 characters"),
});

type SearchFormData = z.infer<typeof searchBarSchema>;

export const Route = createFileRoute("/search")({
  component: Search,
  validateSearch: (search: Record<string, unknown>): MovieSearch => {
    return {
      title: (search.title as string) || undefined,
      page: search?.page ? Number(search.page) : undefined,
    };
  },
});

function Search() {
  const { title, page } = Route.useSearch();
  const [query, setQuery] = useState("");
  const navigate = useNavigate({ from: Route.fullPath });

  const searchMovies = async (query: string) => {
    const response = await client.get<MoviesData>("/v1/movies" + query);
    return response.data;
  };

  const { data, error, isLoading } = useQuery<MoviesData>({
    queryKey: ["movies", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });

  useEffect(() => {
    setQuery(queryBuilder({ title, page }));
  }, [title, page]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchBarSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    navigate({
      search: () => ({ title: data.query }),
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row">
        <div>
          <input
            type="text"
            placeholder="Search for movies..."
            className="border-y border-black p-1.5"
            {...register("query")}
          />
          {errors.query && (
            <p style={{ color: "red" }}>{errors.query.message}</p>
          )}
        </div>
        <button type="submit" className="border border-red-400 px-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
            />
          </svg>
        </button>
      </form>

      {error && (
        <p style={{ color: "red" }}>An error occurred: {error.message}</p>
      )}
      {isLoading && <p>Loading...</p>}
      <div className="grid grid-cols-4 gap-4">
        {data?.movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {data && data.movies.length > 0 && (
        <Pagination metadata={data?.metadata} onPageChange={handlePageChange} />
      )}
    </div>
  );
}
