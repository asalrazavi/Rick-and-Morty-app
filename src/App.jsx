import axios from "axios";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Favorites, Search, SearchResult } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacter(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("FAVORITES", []);

  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => setCount((c) => c + 1), 1000);
  //   // clean function
  //   return function () {
  //     clearInterval(interval);
  //   };
  // }, [count]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavorite = (char) => {
    setFavorites((preFav) => [...preFav, char]);
  };

  const handleDeleteFavorites = (id) => {
    setFavorites((preFav) => preFav.filter((fav) => fav.id !== id));
  };

  const isAddToFavorite = favorites.map((fav) => fav.id).includes(selectedId);

  // console.log(selectedId);

  return (
    <div className="app">
      {/* <div style={{ color: "#fff" }}>{count}</div> */}
      <Toaster />
      <Navbar characters={characters}>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorites
          favorites={favorites}
          onDeleteFavorites={handleDeleteFavorites}
        />
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
