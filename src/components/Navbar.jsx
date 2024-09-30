import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO 💜</div>
      {children}
    </nav>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="search"
      className="text-field"
      placeholder="search..."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function Favorites({ favorites, onDeleteFavorites }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal title="modal test" open={isOpen} onOpen={setIsOpen}>
        {favorites.map((fav) => (
          <Character
            key={fav.id}
            item={fav}
            selectedId="1"
            onSelectCharacter={() => {}}
          >
            <button
              className="icon red"
              onClick={() => onDeleteFavorites(fav.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart">
        <HeartIcon className="icon" onClick={() => setIsOpen((is) => !is)} />
        <span className="badge">{favorites.length}</span>
      </button>
    </>
  );
}

export default Navbar;
