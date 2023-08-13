import fondoPerfil from "../../../../client/src/assets/fondoPerfil.jpg";
import TablaMatricula from "./components/TablaMatricula";

const Forma03 = () => {
  return (
    <div className="mx-16 mt-32 ">
      <div className="flex justify-around  p-4 border border-black bg-gray-200 mb-10 rounded-xl">
        <div>
          <img className="w-40 h-40 rounded-xl border border-black object-cover" src={fondoPerfil} alt="" />
        </div>
        <div>
        <p className="font-bold text-xl">Nombre</p>
          <p className="text-gray-700 text-lg">Nelsn</p>
          <p className="font-bold text-xl">Número de Cuenta</p>
          <p className="text-gray-700 text-lg">20281031563</p>
          <p className="font-bold text-xl">Correo electrónico</p>
          <p className="text-gray-700 text-lg">nguevau@unah.hn</p>
        </div>
        <div>
          <p className="font-bold text-xl">Centro</p>
          <p className="text-gray-700 text-lg">Ciudad Universitaria</p>
          <p className="font-bold text-xl">Año</p>
          <p className="text-gray-700 text-lg">2023</p>
        </div>
      </div>
      <TablaMatricula cancelar={false} adicionar={true} form03={true}/>
    </div>
  );
};

export default Forma03;
