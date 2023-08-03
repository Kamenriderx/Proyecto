import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/Bi";

const Search = () => {
  const [valueSearch, setValueSearch] = useState("");

  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (valueSearch.trim() === "") {
      navigate("/perfil");
    } else {
      navigate("/search", {
        state: valueSearch,
      });
      setValueSearch("");
    }
  };

  return (
    <form onSubmit={onSearchSubmit} className="flex items-center">
      <div className="flex w-72 border rounded-full overflow-hidden">
        <input
          type="text"
          name="valueSearch"
          id=""
          value={valueSearch}
          onChange={(e) => setValueSearch(e.target.value)}
          placeholder="Buscar estudiantes..."
          className="w-full px-4 py-2 rounded-l-full focus:outline-none"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white flex items-center rounded-r-full"
          type="submit"
        >
          <BiSearch className="mr-2 text-xl" />
        </button>
      </div>
    </form>
  );
};

export default Search;
