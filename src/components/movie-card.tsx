import { Link } from "@tanstack/react-router";
import { Movie } from "../types/common";

type Props = {
  movie: Movie;
  openModal: () => void;
};

const getYear = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  return date.getFullYear();
};

const MovieCard = ({ movie, openModal }: Props) => {
  return (
    <div className="group relative w-fit h-full cursor-pointer flex justify-center">
      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <img
          src={movie.poster_url}
          alt={movie.title}
          width="250px"
          height="375px"
          className="rounded-xl object-cover"
        />
      </Link>
      <button
        className="absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-100 bg-blue-500 text-white p-2 rounded w-[80%] hover:bg-green-500 z-20"
        onClick={openModal}
      >
        Add to list
      </button>
      <div className="absolute inset-x-0 bottom-0 h-2/5 overflow-hidden backdrop-filter rounded-b-xl">
        <div className="absolute inset-0 bg-gray-800/50 backdrop-blur-md"></div>
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <div className="relative text-white z-10 p-2">
            <p>{getYear(movie.release_date)}</p>
            <h3 className="font-bold text-lg line-clamp-2">{movie.title}</h3>
            <p className="text-sm">{movie.rating}</p>
            <p className="text-sm text-gray-300 line-clamp-2">
              {movie.genres.join(", ")}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
