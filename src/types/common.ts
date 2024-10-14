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
  year: number;
  runtime: number;
  genres: string[];
  version: number;
};
