import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBarAdmi from "../components/SideBarAdmi";

const RutaProtegidaAdmin = () => {
  /*     const {authAdmin,cargando} = useAuthAdmin() 
    if(cargando) return <Spinner/> */
  return (
    <>
      {/*  {authAdmin.id ? ( */}
      <div className="bg-gray-100">
        <Header />
        <div className="md:flex md:min-h-screen">
          <SideBarAdmi />

          <main className="flex-1 p-10">
            {/* flex-1 hace que tome el resto del contenido de la pantalla */}
            <Outlet />
          </main>
        </div>
      </div>
      {/*  ):
        <Navigate to="/" />
        } */}
    </>
  );
};

export default RutaProtegidaAdmin;
