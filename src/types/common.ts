export type MoviesData = {
  metadata: Metadata;
  movies: Movie[];
};

export type Metadata = {
  current_page: string;
  page_size: string;
  first_page: string;
  last_page: string;
  total_records: string;
};

export type Movie = {
  id: number;
  title: string;
  year: number;
  runtime: number;
  genres: string[];
  version: number;
};
