import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

import "./Navbar.css";

const Navbar = () => {
    const [search, setSearch] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (search) {
            navigate(`/search?q=${search}`);
            setSearch("");
        }
    }
    return (
        <nav id="navbar">
            <h2>
                <Link to={"/"}>
                    <BiCameraMovie />
                    MoviesLib
                </Link>
            </h2>
            <form onSubmit={handleSubmit}>
                <input
                 type="text" 
                 name="search" 
                 placeholder="Busque um filme" 
                 id="search" 
                 value={search}
                 onChange={({ target }) => setSearch(target.value)}/>
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>
        </nav>
    )
}

export default Navbar;