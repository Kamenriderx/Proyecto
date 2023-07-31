import {
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { BsFillPhoneFill } from "react-icons/bs";
const Principal = () => {
  const images = [
    "https://s3.amazonaws.com/prod-wp-tunota/wp-content/uploads/2023/01/inicio-clases-unah-2023-maxima-casa-estudios-enfoca-educacion-linea.jpg",
    "https://www.elheraldo.hn/binrepository/1200x874/0c0/0d0/none/45933/QEPA/dos.433_EH979501_MG118373181.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUwR3JuYUv_qUZ_mnKvgwRWDowMjG_AAE4yY6bGfaByhWFIEaF3Kb0WzmwfBSHDAGMsds&usqp=CAU",
    "https://blogs.unah.edu.hn/assets/dircom/blog/2574/isnsjdla-v2.jpg",
  ];
  return (
    <div className="container mx-auto">
      <div className="w-full h-full mt-5 relative">
        <div className="">
          <img
            src="https://siesca.uned.ac.cr/images/editada.jpg"
            alt="Fondo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40">
          <div className="text-center w-1/2 mx-auto">
            <p className="text-white text-4xl font-black">
              Bienvenido al Registro de la{" "}
              <span className="text-yellow-500 text-4xl font-black">
                Universidad Nacional Autónoma de Honduras.
              </span>
            </p>
            <div className="mt-10 grid grid-cols-3 text-center">
              <div className="">
                <p className="text-white font-semibold">Redes Sociales</p>
                <div className="flex mt-3 gap-3 justify-center">
                  <p className=" text-white">
                    <AiFillYoutube className="cursor-pointer" size={25} />
                  </p>
                  <p className=" text-white">
                    <AiOutlineTwitter className="cursor-pointer" size={25} />
                  </p>
                  <p className=" text-white">
                    <AiFillFacebook className="cursor-pointer" size={25} />
                  </p>
                  <p className=" text-white">
                    <AiFillInstagram className="cursor-pointer" size={25} />
                  </p>
                </div>
              </div>
              <div>
                <p className="text-white font-semibold">Contactos</p>
                <div className="mt-3 flex justify-center items-start">
                  <p className=" text-white">
                    <BsFillPhoneFill className="cursor-pointer" size={15} />
                  </p>
                  <p className="text-white font-semibold">
                    Telefonos : 2216-3043, 2216-3044, 2216-3045, 2216-3046
                  </p>
                </div>
              </div>
              <div className="text-white w-24 h-24 justify-start items-start mx-10 flex">
                <img
                  src="https://dircom.unah.edu.hn/dmsdocument/7508-unah-escudo"
                  alt="LogoUnah"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="grid columns-4 mt-5 gap-3">
          <div className="col-span-4 text-center mb-3">
            <p className="text-red-800 text-2xl font-black">
              Disfruta de la UNAH
            </p>
          </div>
          <img
            src="https://s3.amazonaws.com/prod-wp-tunota/wp-content/uploads/2023/01/inicio-clases-unah-2023-maxima-casa-estudios-enfoca-educacion-linea.jpg"
            alt="img1"
          />
          <img
            src="https://www.elheraldo.hn/binrepository/1200x874/0c0/0d0/none/45933/QEPA/dos.433_EH979501_MG118373181.jpg"
            alt="img2"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUwR3JuYUv_qUZ_mnKvgwRWDowMjG_AAE4yY6bGfaByhWFIEaF3Kb0WzmwfBSHDAGMsds&usqp=CAU"
            alt="img3"
          />
          <img
            src="https://blogs.unah.edu.hn/assets/dircom/blog/2574/isnsjdla-v2.jpg"
            alt="img4"
          />
          <img
            src="https://blogs.unah.edu.hn/assets/dircom/blog/7538/estudiantes.jpg"
            alt="img5"
          />
          <img
            src="https://s3.amazonaws.com/prod-wp-hrn/wp-content/uploads/2022/07/principal_unah_medidas_seguridad.jpg"
            alt="img6"
          />
          <img
            src="https://tiempo.hn/wp-content/uploads/2023/03/Diseno-sin-titulo-2023-03-21T164621.381.jpg"
            alt="img7"
          />
          <img
            src="https://tiempo.hn/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-18-at-4.10.06-PM-1.jpeg"
            alt="img8"
          />
        </div>
      </div>
    </div>
  );
};

export default Principal;
