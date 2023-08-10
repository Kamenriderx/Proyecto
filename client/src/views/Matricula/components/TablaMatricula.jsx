const TablaMatricula = () => {
  const data = [
    {
      COD: "1",
      ASIGNATURA: "202020",
      SECCIÓN: "agua",
      HI: "ahaajj",
      HF: "cu",
      DIAS: "202020",
      UV: "agua",
      OBS: "ahaajj",
      PERIODO: "2",
    },
    {
      COD: "2",
      ASIGNATURA: "202020",
      SECCIÓN: "agua",
      HI: "ahaajj",
      HF: "cu",
      DIAS: "202020",
      UV: "agua",
      OBS: "ahaajj",
      PERIODO: "2",
    }
  ];

  return (
    <div className="relative overflow-x-auto rounded-xl">
      <table className="w-full text-lg text-left text-gray-700">
        <thead className="text-xl text-black uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              CÓDIGO
            </th>
            <th scope="col" className="px-6 py-3">
              ASIGNATURA
            </th>
            <th scope="col" className="px-6 py-3">
              SECCIÓN
            </th>
            <th scope="col" className="px-6 py-3">
              HI
            </th>
            <th scope="col" className="px-6 py-3">
              HF
            </th>
            <th scope="col" className="px-6 py-3">
              DIAS
            </th>
            <th scope="col" className="px-6 py-3">
              UV
            </th>
            <th scope="col" className="px-6 py-3">
              OBS
            </th>
            <th scope="col" className="px-6 py-3">
              PERIODO
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((arr) => (
            <tr key={arr.COD} className="bg-white hover:bg-gray-100 cursor-pointer">
              <td className="px-6 py-4">{arr.COD}</td>
              <td className="px-6 py-4">{arr.ASIGNATURA}</td>
              <td className="px-6 py-4">{arr.SECCIÓN}</td>
              <td className="px-6 py-4">{arr.HI}</td>
              <td className="px-6 py-4">{arr.HF}</td>
              <td className="px-6 py-4">{arr.DIAS}</td>
              <td className="px-6 py-4">{arr.UV}</td>
              <td className="px-6 py-4">{arr.OBS}</td>
              <td className="px-6 py-4">{arr.PERIODO}</td>
        
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMatricula;
