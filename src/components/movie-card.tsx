import { Link } from "@tanstack/react-router";
import { Movie } from "../types/common";

type Props = {
  movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <div>
      <img src={movie.poster_url} width="200px" />
      <Link to="/movies/$movieId" params={{ movieId: String(movie.id) }}>
        {movie.title}
      </Link>
    </div>
  );
};

export default MovieCard;
