import { useState } from "react";
import ListItem from "./ListItem.jsx";
import "./Home.css";

function Home() {
    const [movies, setMovies] = useState([
        { title: "Interstellar", rating: 5 },
        { title: "Howls Moving Castle", rating: 5 },
        { title: "Spirited Away", rating: 5 },
        { title: "The Big Lebowski", rating: 5 },
        { title: "Knives Out", rating: 4 },
    ]);

    const [inputValue, setInputValue] = useState("");
    const [inputRating, setInputRating] = useState(1);

    const [shows, setShows] = useState([
        { title: "Mushishi", rating: 5 },
        { title: "Fullmetal Alchemist: Brotherhood", rating: 5 },
        { title: "One Piece", rating: 5 },
        { title: "Pluto", rating: 5 },
        { title: "Gurren Lagann", rating: 5 },
        { title: "Mob Psycho 100", rating: 5 },
        { title: "Frieren: Beyond Journeys End", rating: 5 },
        { title: "DanDaDan", rating: 5 },
    ]);

    const [showInput, setShowInput] = useState("");
    const [showRating, setShowRating] = useState(1);

    function addShow() {
        if (showInput.trim() === "") return;
        setShows([...shows, { title: showInput, rating: showRating }]);
        setShowInput("");
        setShowRating(1);
    }

    function addMovie() {
        if (inputValue.trim() === "") return;
        setMovies([...movies, { title: inputValue, rating: inputRating }]);
        setInputValue("");
        setInputRating(1);
    }

    return (
        <div className="app">
            <h1>Movie/Show Ratings</h1>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Movie title..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <select
                    value={inputRating}
                    onChange={(e) => setInputRating(Number(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                            {n} ⭐
                        </option>
                    ))}
                </select>
                <button onClick={addMovie}>Add Movie</button>
            </div>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Show title..."
                    value={showInput}
                    onChange={(e) => setShowInput(e.target.value)}
                />
                <select
                    value={showRating}
                    onChange={(e) => setShowRating(Number(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} ⭐</option>
                    ))}
                </select>
                <button onClick={addShow}>Add Show</button>
            </div>


            <div className="lists-container">
                <div className="list-section">
                    <h2>Movies</h2>
                    <ul className="movie-list">
                        {movies.map((movie, index) => (
                            <ListItem
                                key={index}
                                title={movie.title}
                                rating={movie.rating}
                            />
                        ))}
                    </ul>
                </div>
                <div className="list-section">
                    <h2>Shows</h2>
                    <ul className="show-list">
                        {shows.map((show, index) => (
                            <ListItem
                                key={index}
                                title={show.title}
                                rating={show.rating}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Home