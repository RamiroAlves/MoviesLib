import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";

const movieURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export interface IMovie {
    adult: boolean;
    title: string;
    id: number;
    poster_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    tagline?: string;
    budget?: number;
    revenue?: number;
    runtime?: number;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:4171324798.
    genres?: { id: number; name: string }[];
    homepage?: string;
    imdb_id?: string;
    status?: string;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:2703736769.
    original_title?: string;
    original_language?: string;
    popularity?: number;
    video?: boolean;
    credits?: Credits;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:100678847.
    production_companies?: IProductionCompany[];
}

export interface Credits {
    cast: ICast[]
    crew: ICrew[];
}

export interface ICast {
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path: string;
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3706849678.
}

export interface ICrew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path: string;
}

export interface IProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface IVideo {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
}

const Home = () => {
    const [topMovies, setTopMovies] = useState<IMovie[]>([])

    useEffect(() => {
        const topRateUrl = `${movieURL}top_rated?&language=pt-BR&${apiKey}`
        getTopRatedMovies(topRateUrl);
    }, [])

    const getTopRatedMovies = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setTopMovies(data.results);
    }

    return (
        <div className="container">
            <h2 className="title">Melhores filmes:</h2>
            <div className="movies-container">
                {topMovies && topMovies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
        </div>
    )
}
export default Home;