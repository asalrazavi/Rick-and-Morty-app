import axios from "axios";
import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import CharacterList from "./components/CharacterList";
import Navbar, { Search } from "./components/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${query}`
        );

        setCharacters(res.data.results);
        setIsLoading(false);
      } catch (error) {
        setCharacters([]);
        setIsLoading(false);
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      }
    }
    // if (query.length < 3) {
    //   setCharacters([]);
    //   return;
    // }
    fetchData();
  }, [query]);

  return (
    <div className="app">
      <Toaster />
      <Navbar characters={characters}>
        <Search query={query} setQuery={setQuery} />
      </Navbar>
      <div className="main">
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </div>
    </div>
  );
}

export default App;
