
const CalificacionesIngresadas = () => {

  return (
    <div className="mx-16 mt-32 ">

        <p className="text-2xl font-bold text-center mb-4 uppercase">Calificaciones ingresadas</p>
        <div className="relative overflow-x-auto rounded-xl shadow-xl shadow-blue-200">
          <table className="w-full text-lg text-left text-gray-700 ">
            <thead className="text-xl text-black uppercase bg-gray-200 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  CÓDIGO
                </th>
                <th scope="col" className="px-6 py-3">
                  ASIGNATURA
                </th>
                <th scope="col" className="px-6 py-3">
                  DOCENTE
                </th>
                <th scope="col" className="px-6 py-3">
                  CALIFICACIÓN
                </th>   
                <th scope="col" className="px-6 py-3">
                  OBSERVACIÓN
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4">arr.seccion.course.CODE_COURSE</td>
                <td className="px-6 py-4">arr.seccion.course.NAME</td>
                <td className="px-6 py-4">arr.seccion.course.CODE_COURSE</td>
                <td className="px-6 py-4">arr.seccion.course.NAME</td>
                <td className="px-6 py-4">arr.seccion.course.CODE_COURSE</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
};
export default CalificacionesIngresadas;
