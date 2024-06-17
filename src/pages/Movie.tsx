import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill
} from "react-icons/bs";
import MovieCard from "../components/MovieCard";

import "./Movie.css"
import { ICast, IMovie, IVideo } from "./Home";

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<IMovie | null>(null);
    const [findMovie, setFindMovie] = useState<ICast[]>([]);
    const [videoMovie, setVideoMovie] = useState<IVideo[]>([]);

    useEffect(() => {
        const movieUrl = `${movieURL}${id}?&language=pt-BR&&include_video=true&${apiKey}`;
        const detailMovieUrl = `${movieURL}${id}/credits?external_source=tvdb_id&${apiKey}`;
        const videoMovieUrl = `${movieURL}${id}/videos?external_source=tvdb_id&${apiKey}`;
        getMovie(movieUrl);
        getFindDetails(detailMovieUrl);
        getVideoMovie(videoMovieUrl);
    }, [id])

    const getMovie = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        setMovie(data)
    }

    const getFindDetails = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        setFindMovie(data.cast)
    }

    const getVideoMovie = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        setVideoMovie(data.results)
    }

    const formatCurrency = (number: number) => {
        return number.toLocaleString("pt-BR", {
            style: "currency",
            currency: "USD"
        })
    }
    console.log(findMovie);
    return (
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline}</p>
                    <div className="info">
                        <h3>
                            <BsWallet2 /> Orçamento:
                        </h3>
                        <p>{movie.budget && formatCurrency(movie.budget)}</p>
                        <h3>
                            <BsGraphUp /> Receita:
                        </h3>
                        <p>{movie.revenue && formatCurrency(movie.revenue)}</p>
                        <h3>
                            <BsHourglassSplit /> Duração:
                        </h3>
                        <p>{movie.runtime} minutos</p>
                        <h3>
                            <BsFillFileEarmarkTextFill /> Generos:
                        </h3>
                        <p>{movie.genres?.length ? movie.genres.map((genre) => genre.name).join(", ") : null}</p>
                        <h3>
                            <BsFillFileEarmarkTextFill /> Descrição:
                        </h3>
                        <p>{movie.overview}</p>
                        <div className="cast">
                            <h3>Elenco</h3>
                            <div className="cast-list">
                                {findMovie.length && findMovie.map((cast) => (
                                    <MovieCard cast={cast} key={cast.id} />
                                ))}
                            </div>
                            <h3>Produção</h3>
                            <div className="production-list">
                                {movie.production_companies?.length ? movie?.production_companies.map((company) => (
                                    <div className="production-company">
                                        <img src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`} alt={company.name} />
                                        <p>{company.name}</p>
                                    </div>
                                )) : null}
                            </div>
                            <h3>Videos</h3>
                            <div className="video-list">
                                {videoMovie.map((video) => (
                                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.key}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default Movie;