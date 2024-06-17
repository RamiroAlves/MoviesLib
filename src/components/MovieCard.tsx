import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import { ICast, IMovie } from "../pages/Home";

interface IProps {
    movie?: IMovie;
    cast?: ICast;
    showLink?: boolean;
}

const imageURL = import.meta.env.VITE_IMG;

const MovieCard: React.FC<IProps> = ({ movie, cast, showLink = true }) => {
    return (
        <div className="movie-card">
            {movie ? (
                <>
                    <img src={`${imageURL}${movie?.poster_path}`} alt={movie?.title} />
                    <h2>{movie?.title}</h2>
                    <p>
                        <FaStar /> {movie?.vote_average}
                    </p>
                    {showLink && <Link to={"/movies/" + movie?.id}>Detalhes</Link>}
                </>
            ) : (
                <div className="card-list">
                    <div className="cast-list-item">
                        <img className="cast-img" src={`${imageURL}${cast?.profile_path}`} alt={cast?.name} />
                        <h2 className="cast-name">{cast?.name}</h2>
                        <p className="cast-character">
                            {cast?.character}
                        </p>
                        {/* {showLink && <Link to={"/movies/" + cast?.id}>Detalhes</Link>} */}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieCard;