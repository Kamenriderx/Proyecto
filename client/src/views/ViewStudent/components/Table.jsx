const Table = (props) => {
  return (
    <div className="p-8 mt-5 border border-gray-300 w-2/3 rounded-md">
      <ul className="flex flex-row w-full h-8 border border-gray-300 font-black" >
        <li className="w-1/3 flex justify-center align-middle">Nombre</li>
        <li className="w-1/3 flex justify-center align-middle">Numero de cuenta</li>
        <li className="w-1/3 flex justify-center align-middle">Periodo</li>
      </ul>
      <ul >
        {props.students.map((student) => (
          <ul className="flex flex-row justify-center align-middle  w-full h-8  border-b-2 mt-2">
            <li className="w-1/3 flex justify-center align-middle">{student.name}</li>
            <li className="w-1/3 flex justify-center align-middle">{student.account}</li>
            <li className="w-1/3 flex justify-center align-middle">{student.period}</li>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Table;
