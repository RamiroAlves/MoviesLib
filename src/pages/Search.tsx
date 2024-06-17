import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";
import { IMovie } from "./Home";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState<IMovie[]>([])
    const query = searchParams.get("q");

    useEffect(() => {
        const searchWithQueryUrl = `${searchURL}?${apiKey}&language=pt-BR&query=${query}`
        getSearchMovies(searchWithQueryUrl);
    }, [query])

    const getSearchMovies = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setMovies(data.results);
    }
    return (
        <div className="container">
            <h2 className="title">Resultados para: <span className="query-text">{query}</span></h2>
            <div className="movies-container">
                {movies && movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        </div>
    )
}
export default Search;