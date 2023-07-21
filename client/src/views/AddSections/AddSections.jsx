import { AiOutlineAppstoreAdd, AiFillDelete, AiFillEdit } from "react-icons/ai";
import Modal from "../../components/Modal";
import { useState } from "react";

const AddSections = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="container mx-auto">
      <Modal Visible={showModal} Close={() => setShowModal(false)}>
        <form className="bg-gray-50 py-3 px-2 shadow-sm rounded-lg">
          <div className="text-center mb-5 mt-5">
            <span className="text-sky-700 font-bold text-2xl">
              Agregar Nueva Seccion
            </span>
          </div>
          <div className="flex justify-around mt-3 w-full">
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                HI:
              </label>
              <input
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Hora Inicial"
              />
            </div>
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                HF:
              </label>
              <input
                type="text"
                placeholder="Hora Final"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-around mt-3 w-full">
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                Edificio:
              </label>
              <input
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                type="text"
                placeholder="Edificio"
              />
            </div>
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                Aula:
              </label>
              <input
                type="text"
                placeholder="Numero de Aula"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-around ml-6">
            <label className=" text-black font-bold text-md">Docente: </label>
            <input
              placeholder="Nombre del Docente"
              className="w-3/4 mx-5 text-center py-2 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-around mt-5 w-full">
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                Cupos:
              </label>
              <select className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                <option value="">-- Seleccion los Cupos --</option>
                <option value="">15</option>
                <option value="">16</option>
                <option value="">17</option>
                <option value="">18</option>
                <option value="">19</option>
                <option value="">20</option>
              </select>
            </div>
            <div className="">
              <label className="mx-2 text-black font-bold text-md block">
                Dias:
              </label>
              <select className="px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                <option>-- Selecciona los Dias --</option>
                <option value="">LuMaMiJuVi</option>
                <option value="">LuMaMiJu</option>
                <option value="">LuMaMi</option>
                <option value="">LuMa</option>
                <option value="">LuMi</option>
                <option value="">LuJu</option>
                <option value="">MiJu</option>
                <option value="">MaJu</option>
                <option value="">Sa</option>
              </select>
            </div>
          </div>
          <div className="flex justify-around mt-8 mb-5">
            <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg py-2 px-8 rounded-md shadow">
              Crear
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg py-2 px-8 rounded-md shadow"
            >
              Descartar
            </button>
          </div>
        </form>
      </Modal>
      <div className="bg-gray-100 p-3">
        <div className="w-full py-2 mt-5 mb-10 text-center">
          <span className="text-3xl font-bold text-sky-700">
            Planificacion Academica
          </span>
          <span className="text-3xl font-bold text-gray-700">
            {" "}
            "Carrera" - "Nombre del Periodo"
          </span>
        </div>
        <div className="flex justify-around mt-5 mb-5">
          <div className="flex items-center">
            <button
              onClick={() => setShowModal(true)}
              className="w-full flex items-center gap-1 bg-sky-600 hover:bg-sky-700 py-2 px-3 rounded shadow text-lg text-white font-bold"
            >
              Agregar Seccion{" "}
              <AiOutlineAppstoreAdd className="mr-2" size={30} />
            </button>
          </div>
          <div className="">
            <select className="bg-sky-600 hover:bg-sky-700 rounded shadow font-bold text-white text-center border-2 cursor-pointer">
              <option value="">--- Seleccione una Clase ---</option>
              <option value="">Ingenieria de Software</option>
              <option value="">Base de Datos II</option>
              <option value="">Base de Datos I</option>
            </select>
          </div>
        </div>

        <div className="mt-10">
          <table className="w-full bg-white shadow-md table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">HI</th>
                <th className="p-2">HF</th>
                <th className="p-2">Edif</th>
                <th className="p-2">Aula</th>
                <th className="p-2">Maestro</th>
                <th className="p-2">Cupos</th>
                <th className="p-2">Seccion</th>
                <th className="p-2">Dias</th>
                <th className="p-2">Accion</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b" /* key={estudiante.ID_USER} */>
                <td className="border px-4 py-2 text-lg font-bold r">
                  <p>1500</p>
                </td>
                <td className="border px-4 py-2 text-lg font-bold r">1600</td>
                <td className="border px-4 py-2 text-lg font-bold r">B2</td>
                <td className="border px-4 py-2 text-lg font-bold r">201</td>
                <td className="text-center border px-4 py-2 text-lg font-bold r">
                  Nestor Adrian Luque
                </td>
                <td className="text-center border px-4 py-2 text-lg font-bold r">
                  20
                </td>
                <td className="text-center border px-4 py-2 text-lg font-bold r">
                  15:00
                </td>
                <td className="text-center border px-4 py-2 text-lg font-bold r">
                  LuMaMiJu
                </td>
                <td className="border px-4 py-2 text-lg font-bold r">
                  <div className="flex items-center gap-5">
                    <div className="mx-auto">
                      <AiFillDelete
                        className="cursor-pointer"
                        /* onClick={() => handleDelete(estudiante.ID_USER)} */
                        size={25}
                      ></AiFillDelete>
                      <span className="-mx-3 text-sm">Eliminar</span>
                    </div>
                    <div className="mx-auto">
                      <AiFillEdit
                        className="cursor-pointer"
                        /* onClick={() => handleDelete(estudiante.ID_USER)} */
                        size={25}
                      ></AiFillEdit>
                      <span className="-mx-1 text-sm">Editar</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddSections;
