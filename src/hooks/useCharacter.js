import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
export default function useCharacter(query) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return { isLoading, characters };
}
