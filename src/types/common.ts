export type MoviesData = {
  metadata: Metadata;
  movies: Movie[];
};

export type Metadata = {
  current_page: number;
  page_size: number;
  first_page: number;
  last_page: number;
  total_records: number;
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  language: string;
  release_date: string;
  rating: number;
  poster_url: string;
  backdrop_url: string;
  genres: string[];
  version: number;
};
