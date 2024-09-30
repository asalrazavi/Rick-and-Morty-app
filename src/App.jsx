import axios from "axios";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [count, setCount] = useState(0);
  let selectedFav = false;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`,
          { signal }
        );

        setCharacters(res.data.results);
      } catch (error) {
        if (!axios.isCancel()) {
          setCharacters([]);
          // console.log(error.response.data.error);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    const interval = setInterval(() => setCount((c) => c + 1), 1000);
    // clean function
    return function () {
      clearInterval(interval);
    };
  }, [count]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavorite = (char) => {
    setFavorites((preFav) => [...preFav, char]);
  };

  const isAddToFavorite = favorites.map((fav) => fav.id).includes(selectedId);

  // console.log(selectedId);

  return (
    <div className="app">
      <div style={{ color: "#fff" }}>{count}</div>
      <Toaster />
      <Navbar characters={characters}>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorites numOfFavorites={favorites.length} />
      </Navbar>
      <div className="main">
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorites={handleAddFavorite}
          isAddToFavorite={isAddToFavorite}
        />
      </div>
    </div>
  );
}

export default App;
