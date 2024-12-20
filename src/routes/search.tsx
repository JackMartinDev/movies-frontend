import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { client } from "../utils/axios";
import { MoviesData } from "../types/common";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryBuilder } from "../utils/common";
import Pagination from "../components/pagination";
import MovieCard from "../components/movie-card";
import LoadingSpinner from "../components/loading-spinner";

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

  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => modalRef.current?.showModal();
  const closeModal = () => modalRef.current?.close();

  const searchMovies = async (query: string) => {
    const response = await client.get<MoviesData>("/v1/movies" + query);
    return response.data;
  };

  const { data, isError, error, isLoading } = useQuery<MoviesData>({
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
    <>
      <dialog
        ref={modalRef}
        className="rounded-lg p-6 bg-white shadow-lg max-w-xl w-full"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        role="dialog"
      >
        <h2 id="dialog-title" className="text-lg font-semibold">
          Add to list
        </h2>
        <p id="dialog-description" className="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          sapiente repellendus aliquid? Placeat accusamus molestias ducimus,
          corrupti at aliquam nemo velit? Sint, quibusdam vitae dignissimos non
          beatae veniam expedita omnis!
        </p>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </dialog>

      <div className="flex flex-col items-center gap-8 mt-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center border border-black rounded-3xl py-2 px-4 w-1/2"
          role="search"
        >
          <input
            type="text"
            placeholder="Search for movies..."
            className="flex-grow outline-none focus:ring-0 focus:bg-transparent"
            {...register("query")}
            aria-label="Search movies"
          />
          {errors.query && (
            <p style={{ color: "red" }}>{errors.query.message}</p>
          )}
          <button type="submit" className="px-1.5" aria-label="Search">
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

        {isLoading && <LoadingSpinner />}
        {isError && (
          <p style={{ color: "red" }}>An error occurred: {error.message}</p>
        )}

        {data &&
          (data.movies.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 sm:grid-cols-3">
                {data.movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    openModal={openModal}
                  />
                ))}
              </div>
              <Pagination
                metadata={data.metadata}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div>No search results found</div>
          ))}
      </div>
    </>
  );
}
