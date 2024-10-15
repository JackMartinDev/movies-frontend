import { Link } from "@tanstack/react-router";
import { Movie } from "../types/common";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div>
      <div className="group relative w-fit cursor-pointer">
        <img src={movie.poster_url} width="200px" />
        <button className="absolute bottom-0 opacity-0 group-hover:opacity-100">
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
