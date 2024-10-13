import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { client } from "../utils/axios";
import { MoviesData } from "../types/common";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryBuilder } from "../utils/common";

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

  const onSubmit = async (data: SearchFormData) => {
    navigate({
      search: () => ({ title: data.query }),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="Search for movies..."
          {...register("query")}
        />
        {errors.query && <p style={{ color: "red" }}>{errors.query.message}</p>}
      </div>
      <button type="submit">Search</button>
      {error && (
        <p style={{ color: "red" }}>An error occurred: {error.message}</p>
      )}
      {isLoading && <p>Loading...</p>}
      {data?.movies.map((movie) => <p key={movie.id}>{movie.title}</p>)}
    </form>
  );
}
