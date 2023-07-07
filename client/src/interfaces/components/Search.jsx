import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/Bi";
/* import axios from "axios";
import Modal from '../../components/Modal' */

const Search = () => {
  const [valueSearch, setValueSearch] = useState("");

  /*  useEffect(() => {
    // Lógica para obtener las solicitudes pendientes desde el servidor
    // y actualizar el estado de solicitudesPendientes
    const obtenerSolicitudesPendientes = async () => {
      try {
        const response = await axios('/api/solicitudes');
        console.log(response.data);
        setSolicitudesPendientes(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes pendientes:', error);
      }
    };

    obtenerSolicitudesPendientes();
  }, []); */

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
    <form onSubmit={onSearchSubmit}>
      <div className="flex border rounded-full overflow-hidden">
        <input
          type="text"
          name="valueSearch"
          id=""
          value={valueSearch}
          onChange={(e) => setValueSearch(e.target.value)}
          placeholder="Buscar estudiantes..."
          className="px-4 py-2 rounded-l-full focus:outline-none"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white flex items-center rounded-r-full"
          type="submit"
        >
          <BiSearch className="mr-2" />
        </button>
      </div>
    </form>
  );
};

export default Search;
