import { HeartIcon } from "@heroicons/react/24/outline";

function Navbar({ characters, children }) {
  return (
    <nav className="navbar">
      <div className="navbar__logo">LOGO 💜</div>
      {children}
      <div className="navbar__result">Found {characters.length} characters</div>
      <button className="heart">
        <HeartIcon className="icon" />
        <span className="badge">4</span>
      </button>
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

export default Navbar;
