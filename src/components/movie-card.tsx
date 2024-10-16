import { Link } from "@tanstack/react-router";
import { Movie } from "../types/common";

type Props = {
  movie: Movie;
  openModal: () => void;
};

const MovieCard = ({ movie, openModal }: Props) => {
  return (
    <div>
      <div className="group relative w-fit cursor-pointer flex justify-center">
        <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
          <img src={movie.poster_url} alt={movie.title} width="200px" />
        </Link>
        <button
          className="absolute bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-100 bg-blue-500 text-white p-2 rounded w-[80%] hover:bg-green-500"
          onClick={openModal}
        >
          Add to list
        </button>
      </div>
      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        <p>{movie.title}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
