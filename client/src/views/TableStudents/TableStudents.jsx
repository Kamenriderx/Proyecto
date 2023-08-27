import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/Md";
import { BiEdit, BiSolidErrorCircle } from "react-icons/Bi";
import "animate.css";
import AlertThree from "../../components/AlertThree.jsx";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { httpRequests } from "../../utils/helpers/httpRequests";
import AlertTwo from "../../components/AlertTwo";

const TableStudents = ({ body }) => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(false);
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setData(body);
  }, [body]);

  // console.log("data: ", data);
  // console.log("props: ", body);

  function eliminarElemento(indice) {
    // setMessage(false)
    // setbuttonDisabled(false)
    const nuevosObjetos = [...data];
    nuevosObjetos.splice(indice, 1);
    setData(nuevosObjetos);
  }

  //EDITAR
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [dataError, setDataError] = useState(null);

  const openModal = (index) => {
    setSelectedItem({ ...data[index], index });
    setModalOpen(true);
  };

  const closeModal = () => {
    // setMessage(false)
    // setbuttonDisabled(false)
    setModalOpen(false);
  };

  function updateItem(updatedItem) {
    const newArray = [...data];
    newArray[selectedItem.index] = updatedItem;
    setData(newArray);
    closeModal();
  }

  //Configuraciones de la tabla columnas
  const columns = [
    {
      accessorKey: "NAME",
      header: () => <span>NOMBRE</span>,
    },
    {
      accessorKey: "DNI",
      header: () => <span>DNI</span>,
    },
    {
      accessorKey: "CARRER",
      header: () => <span>CARRERA</span>,
    },
    {
      accessorKey: "EMAIL",
      header: () => <span>CORREO</span>,
    },
    {
      accessorKey: "CENTER",
      header: () => <span>CENTRO</span>,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(true);
    setbuttonDisabled(true);
    let datav = [];

    try {
      const res = await httpRequests()["post"](
        "http://localhost:3000/registro/admin/registerStudents",
        { body: data }
      );
      // console.log('respuesta correcta')
      console.log("correcta: ", res?.response?.data?.data);
      setDataError(res?.response?.data?.data);
      datav = res;

      // res.response.data.data.map((row, index) => (
      //   if(row.error){

      //   }
      //   console.log('row: ', index, row.NAME)
      // ))

      if (res?.status === 200) {
        setAlerta({
          text: res.messagge,
          icon: "success",
          title: "Éxito",
        });

        setData([]);
        return;
      }
      if (res?.response.status !== 200) {
        throw new Error(res.response.data.messagge);
      }
    } catch (error) {
      // console.log('respuesta incorrecta')
      console.log("error: ", error);
      // console.log(error.message)
      setAlerta({
        text: error.message,
        icon: "warning",
        title: "Advertencia",
      });

      setData(datav.response.data.data);
    }

    //res.data.messagge y res.status == 200
    //res.respnse.data.messagge y res.respnse.status == 406
  };

  let objError = {
    CARRER: "",
    CENTER: "",
    DNI: "",
    EMAIL: "",
    NAME: "",
  };

  const showError = (index) => {
    setMessage(false);
    if (dataError) {
      if (dataError[index].error.CARRER !== "") {
        objError.CARRER = dataError[index].error.CARRER;
        // alert("Error en el CARRER"+"\n"+dataError[index].NAME+"\n"+dataError[index].error.CARRER);
      }
      if (dataError[index].error.CENTER !== "") {
        objError.CENTER = dataError[index].error.CENTER;
        // alert("Error en el CENTER"+"\n"+dataError[index].NAME+"\n"+dataError[index].error.CENTER);
      }
      if (dataError[index].error.DNI !== "") {
        objError.DNI = dataError[index].error.DNI;
        // alert("Error en el DNI"+"\n"+dataError[index].NAME+"\n"+dataError[index].error.DNI);
      }
      if (dataError[index].error.EMAIL !== "") {
        objError.EMAIL = dataError[index].error.EMAIL;
        // alert("Error en el EMAIL"+"\n"+dataError[index].NAME+"\n"+dataError[index].error.EMAIL);
      }
      if (dataError[index].error.NAME !== "") {
        objError.NAME = dataError[index].error.NAME;
        // alert("Error en el NAME"+"\n"+dataError[index].NAME+"\n"+dataError[index].error.NAME);
      }
      // for (let clave in objError){
      //   console.log(objError[clave]);
      // }
      alert(
        dataError[index].NAME +
          "\n" +
          "Tiene el/los siguientes errores:" +
          "\n" + 
          objError.CARRER+" "+ objError.CENTER+" "+objError.DNI+" "+objError.EMAIL+" "+objError.NAME
      );
    }
  };

  return (
    <>
      {
        <div className="prelative overflow-x-auto shadow-md sm:rounded-lg mx-20">
          <table className="w-full text-sm text-left text-blue-100">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="boreder-b border-gray-300 text-white bg-blue-700"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-3 text-left uppercase text-xl"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                  <th className="p-3 text-left uppercase text-xl">ACCIONES</th>
                  <th className="p-3 text-left uppercase text-xl">OBS</th>
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className="bg-blue-500 border border-blue-400 text-xl hover:bg-blue-300 hover:text-black"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td>
                    <button
                      onClick={() => {
                        setMessage(false);
                        setbuttonDisabled(false);
                        eliminarElemento(row.id);
                      }}
                    >
                      <MdDeleteForever className="text-4xl text-red-700 hover:text-red-800 " />
                    </button>
                    &nbsp; &nbsp;&nbsp;
                    <button
                      onClick={() => {
                        setMessage(false);
                        setbuttonDisabled(false);
                        openModal(row.id);
                      }}
                    >
                      <BiEdit className="text-4xl text-green-700 hover:text-green-800 " />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => showError(index)}>
                      <BiSolidErrorCircle className={`${(dataError ? 'text-4xl text-orange-400 hover:text-orange-500 animate-blink' : 'text-4xl text-orange-400 hover:text-orange-500')}`}
/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* footer */}
          <div className="my-4 mx-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                className="text-gray-600 bg-gray-200 p-1 rounded border border-gray-300
    disabled:hover:bg-white disabled:hover:text-gray-300"
                onClick={() => {
                  setMessage(false);
                  table.setPageIndex(0);
                }}
                disabled={!table.getCanPreviousPage()}
              >
                {"<<"}
              </button>

              <button
                className="text-gray-600 bg-gray-200 p-1 rounded border border-gray-300
    disabled:hover:bg-white disabled:hover:text-gray-300"
                onClick={() => {
                  setMessage(false);
                  table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
              >
                {"<"}
              </button>

              {table.getPageOptions().map((value, key) => (
                <button
                  key={key}
                  className={classNames({
                    "text-gray-600 bg-gray-200 p-1 font-bold rounded border border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-300": true,
                    "bg-indigo-300 text-indigo-700":
                      value === table.getState().pagination.pageIndex,
                  })}
                  onClick={() => {
                    setMessage(false);
                    table.setPageIndex(value);
                  }}
                >
                  {value + 1}
                </button>
              ))}

              <button
                className="text-gray-600 bg-gray-200 p-1 rounded border border-gray-300
                    disabled:hover:bg-white disabled:hover:text-gray-300"
                onClick={() => {
                  setMessage(false);
                  table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
              >
                {">"}
              </button>

              <button
                className="text-gray-600 bg-gray-200 p-1 rounded border border-gray-300
                    disabled:hover:bg-white disabled:hover:text-gray-300"
                onClick={() => {
                  setMessage(false);
                  table.setPageIndex(table.getPageCount() - 1);
                }}
                disabled={!table.getCanNextPage()}
              >
                {">>"}
              </button>
            </div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-400 to-blue-700 hover:outline outline-offset-1 outline-blue-800 font-bold rounded-full text-xl px-8 py-2 text-center"
              disabled={buttonDisabled}
              onClick={handleSubmit}
            >
              Enviar
            </button>
          </div>
        </div>
      }

      {message && (
        <>
          <AlertThree alerta={alerta} />
        </>
      )}

      {modalOpen && (
        <div className="animate__animated animate__fadeIn fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white rounded-lg p-8 z-10 w-2/6">
            <h2 className="text-xl font-bold mb-4">ACTUALIZAR REGISTRO</h2>

            <div className="relative my-4">
              <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={selectedItem.NAME}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, NAME: e.target.value })
                }
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                NOMBRE
              </label>
            </div>

            <div className="relative my-4">
              <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={selectedItem.CENTER}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    CENTER: e.target.value,
                  })
                }
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                CENTRO
              </label>
            </div>

            <div className="relative my-4">
              <input
                type="email"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                required
                placeholder=" "
                value={selectedItem.EMAIL}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    EMAIL: e.target.value,
                  })
                }
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                CORREO
              </label>
            </div>

            <div className="relative my-4">
              <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={selectedItem.DNI}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, DNI: e.target.value })
                }
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                DNI
              </label>
            </div>

            <div className="relative my-4">
              <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2.5 pt-4 w-full text-xl text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={selectedItem.CARRER}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    CARRER: e.target.value,
                  })
                }
              />
              <label
                htmlFor="floating_outlined"
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                CARRERA
              </label>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  updateItem(selectedItem);
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mr-2 shadow-2xl"
              >
                Actualizar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full shadow-2xl"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TableStudents;
