import PeriodRow from "./PeriodRow";

const PeriodTable = () => {
  return (
    <ul>
      <li className="border border-gray-200 cursor-default rounded-xl p-2 mb-3 bg-gray-400 text-white">
        <ul className="list-none flex flex-row min-w-full">
          <li className="flex justify-center items-center w-1/3 ">Periodo</li>
          <li className="flex justify-center items-center w-1/3 ">Estado</li>
          <li className="flex justify-center items-center w-1/3 ">Acciones</li>
        </ul>
      </li>
      <div className="border border-gray-200 rounded-lg p-0">
        <PeriodRow state={"Finalizado"} periodName={"I Periodo 2023"} />
        <PeriodRow state={"En curso"} periodName={"II Periodo 2023"} />
        <PeriodRow state={"-"} periodName={"III Periodo 2023"} />
      </div>
    </ul>
  );
};

export default PeriodTable;
