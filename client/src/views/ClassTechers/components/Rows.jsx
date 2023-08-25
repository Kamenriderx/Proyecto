import axios from "axios";
import { useEffect, useState} from "react";

const Rows = ({mat, calificaciones,save, recibir}) => {
  const[notas, setNotas] = useState({
    ID_ENROLLMENT: mat.ID_ENROLLMENT,
    OBS: "",
    CALIFICATION:0
  });
  const[changed,setChanged] = useState(false);
  
 

  useEffect(() => {
    if(changed){
      console.log('notas:', notas)
      axios.put(
        `http://localhost:3000/registro/gradeUpload/${mat.ID_SECTION}`,[notas]
      ).then(res=>{
        console.log(res)
      }).catch(error=> {
        console.log(error.response.data.error)
        alert(error.response.data.error)
      });
      setChanged(false);
    }
    
  }, [save]);
  
  const onChange = (e) =>{
    const {value,name} = e.target;
    setNotas({
      ...notas,
      [name]:value
    });
    setChanged(true);
    recibir(true)
    }


  
  return (
    <tr className="border-b" key={mat.ID_STUDENT}>
      <td className="border px-4 py-2 text-sm font-medium r">
        {mat.STUDENT_NAME}
      </td>
      <td className="text-center border px-4 py-2 text-sm font-medium r">
        {mat.ACCOUNT_NUMBER}
      </td>
      {calificaciones && (
        <>
          <td className="text-center border px-4 py-2 text-sm font-medium r">
            <input
            onChange={(e)=>onChange(e)}
              type="number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Nota"
              min="0"
              max="100"
              required
              name="CALIFICATION"
              value ={notas.CALIFICATION}
            />
          </td>
          <td className="text-center border px-4 py-2 text-sm font-medium r">
            <select
            onChange={(e) => onChange(e)}
              id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="OBS"
              value={notas.OBS}
            >
              <option selected>SELECCIONAR</option>
              <option value="APR">APR</option>
              <option value="RPB">RPB</option>
              <option value="ABD">ABD</option>
              <option value="NCP">NSP</option>
            </select>
          </td>
        </>
      )}
    </tr>
  );
};

export default Rows;
