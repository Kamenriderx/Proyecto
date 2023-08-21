import a from "../../assets/a.jpg";

import fondoPerfil from "../../assets/fondoPerfil.jpg";

const PerfilDocentes = () => {
  return (
    <>
      <div className="mx-16 mt-28">
        <p className="font-bold text-center mb-4 text-xl">PERFILES DE DOCENTES</p>
        <div className="flex flex-wrap h-20 gap-10">
          <div>
            <img
              src={a}
              alt="jhajha"
              className="rounded-full w-48 h-48 object-cover cursor-pointer"
            />
            <p className="font-bold">Nelson javier Guevara Ulloa</p>
            <p>Clase: Programacion II</p>
          </div>
          <div>
            {" "}
            <img
              src={a}
              alt="jhajha"
              className="rounded-full w-48 h-48  object-cover cursor-pointer"
            />
            <p className="font-bold">Nelson javier Guevara Ulloa</p>
            <p>Clase: Programacion II</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PerfilDocentes;
