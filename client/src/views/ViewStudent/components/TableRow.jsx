const TableRow = (props) => {
    return (
      <ul className="flex justify-around  ">
        <li className="border border-blue-100 w-1/12 text-center">{props.code_course}</li>
        <li className="border border-blue-100 w-4/12 text-center">{props.name}</li>
        <li className="border border-blue-100 w-1/12 text-center">{props.uv}</li>
        <li className="border border-blue-100 w-1/12 text-center">{props.section_code}</li>
        <li className="border border-blue-100 w-1/12 text-center">{props.year}</li>
        <li className="border border-blue-100 w-1/12 text-center">{props.period_name.split(" ")[0]}</li>
        <li className="border border-blue-100 w-2/12 text-center">{props.calification}</li>
        <li className="border border-blue-100 w-1/12 text-center">{props.obs}</li>
      </ul>
    );
  };
  
  export default TableRow;