import axios from 'axios'
import {useState} from 'react'
import { AiOutlineFileImage } from 'react-icons/ai'
import {FaUserTie} from 'react-icons/fa'
import AlertTwo from '../../../components/AlertTwo'

const FormularioDocente = () => {
    const [NAME, setNAME] = useState('')
    const [ACCOUNT_NUMBER, setACCOUNT_NUMBER] = useState('')
    const [CENTER, setCENTER] = useState('')
    const [ROL, setROL] = useState('')
    const [CARRER, setCARRER] = useState('')
    const [EMAIL, setEMAIL] = useState('')
    const [IMAGE, setIMAGE] = useState(null)
    const [alerta, setAlerta] = useState({})

    const handleSubmit= async e => {
        e.preventDefault()
        const value = e.target.value
        let regexNombbre = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexNumero = /^[0-9]+$/;
        let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

        if([NAME,ACCOUNT_NUMBER,CENTER,ROL,CARRER,EMAIL].includes('')){
            setAlerta(
                {message:'Todos los Campos son Obligatoios',
                error:true    
            })
            setTimeout(() => {
                setAlerta({})
            }, 4000);
            return
        }

        if(!regexEmail.test(EMAIL.trim())){
            setAlerta({
                message:'El campo Email es invalido, Ejem:alguien@algunlugar.es',
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 4000);
            return
        }

        if(!regexNombbre.test(NAME.trim())){
            setAlerta({
                message:'El campo Nombre solo Acepta letras y espacios en Blanco',
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 4000);
            return
        }
        if(regexNumero.test(value)){
            setAlerta({
                message:'El campo Numero de Empleado solo acepta Numeros',
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 4000);
            return
        }

        try {

            const token = localStorage.getItem('token')
            if(!token) return
            
            const config ={
                headers:{
                    "Content-Type":"multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            }
            
            const formData = new FormData()
            formData.append('NAME',NAME)
            formData.append('ACCOUNT_NUMBER',ACCOUNT_NUMBER)
            formData.append('CENTER',CENTER)
            formData.append('CARRER',CARRER)
            formData.append('ROL',ROL)
            formData.append('EMAIL',EMAIL)
            formData.append('IMAGE',IMAGE)

            await axios.post('URL',formData,config)
            setAlerta({
                message:'Docente Creado Correctament',
                error:false
            })
            setNAME('')
            setACCOUNT_NUMBER('')
            setCENTER('')
            setCARRER('')
            setROL('')
            setEMAIL('')
            setIMAGE(null)
        } catch (error) {
            console.log(error);
        }

    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setIMAGE(file);
        console.log(file);
      };

    const {message} = alerta
  return (
    <>

<form onSubmit={handleSubmit} className=" bg-white p-5 shadow rounded-lg">
{message && <AlertTwo alerta={alerta}/>}
    <div className='my-3'>
        <FaUserTie className='mx-auto text-4xl'/>
    </div>
<div className="my-3">
        <label className="uppercase text-gray-800 block text-sm font-bold" htmlFor="nombre">Nombre Docente</label>
        <input onChange={e => setNAME(e.target.value)} value={NAME} type='text' placeholder='Escribe tu Nombre' className="w-full mt-2 p-2 border rounded-xl bg-gray-50" id="nombre"/>
    </div>
    <div className="my-3">
        <label className="uppercase text-gray-800 block text-sm font-bold" htmlFor="numero">Numero de Empleado</label>
        <input value={ACCOUNT_NUMBER} onChange={e => setACCOUNT_NUMBER(e.target.value)} type='number' placeholder='Escribe numero de Empleadao' className="w-full mt-2 p-2 border rounded-xl bg-gray-50 " id="numero"/>
    </div>
    <div className="my-3">
        <label className="uppercase text-gray-800 block text-sm font-bold" htmlFor="email">Correo Docente</label>
        <input value={EMAIL} onChange={e => setEMAIL(e.target.value)} type='text' placeholder='Escribe el Correo del Docente' className="w-full mt-2 p-2 border rounded-xl bg-gray-50 " id="email"/>
    </div>
    <div className="my-3">
        <label className="uppercase text-gray-800 block text-sm font-bold">Centro del Docente</label>
        <select value={CENTER} onChange={e => setCENTER(e.target.value)} className="w-full mt-2 p-2 border rounded-xl bg-gray-50 text-center">
            <option value="">-- Seleccione un Centro --</option>
            <option value="unah-cu">UNAH-CU</option>
            <option value="unah-vs">UNAH-VS</option>
            <option value="unah-curc">UNAH-CURC</option>
            <option value="unah-curla">UNAH-CURLA</option>
            <option value="unah-curlp">UNAH-CURLP</option>
            <option value="unah-curoc">UNAH-CUROC</option>
            <option value="unah-curno">UNAH-CURNO</option>
            <option value="unah-tec">UNAH-TEC Danli</option>
            <option value="unah-tec-danli">UNAH-TEC Aguan</option>
        </select>
    </div>
    <div className="my-3">
        <label className="uppercase text-gray-800 block text-sm font-bold">Rol del Docente</label>
        <select value={ROL} onChange={e => setROL(e.target.value)} className="w-full mt-2 p-2 border rounded-xl bg-gray-50 text-center">
            <option value="">-- Seleccione el Rol --</option>
            <option value="1">Docente</option>
            <option value="2">Coordinador de Carrera</option>
            <option value="3">Jefe de Carrera</option>
        </select>
    </div>
    <div className="my-3">
        <label className="uppercase text-gray-800 block text-sm font-bold">Rol del Docente</label>
        <select value={CARRER} onChange={e => setCARRER(e.target.value)} className="overflow-y-scroll w-full mt-2 p-2 border rounded-xl bg-gray-50 text-center">
            <option value="">-- Seleccione Carrera del Docente --</option>
            <option value="I_sistemas">Ingenieria en Sistemas</option>
            <option value="I_quimica">Ingenieria Quimica Industrial</option>
            <option value="I_electrica">Ingenieria Electrica Industrial</option>
            <option value="I_industrial">Ingenieria Industrial</option>
            <option value="I_civil">Ingeniería Civil</option>
            <option value="I_Mecanica">Ingenieria Mecanica Industrial</option>
            <option value="derecho">Licenciatura en Derecho</option>
            <option value="periodismo">Licenciatura en Periodismo</option>
            <option value="lenguas">Licenciatura en Lenguas Extranjeras con Orientación en Inglés y Francés</option>
            <option value="arquitectura">Arquitectura</option>
            <option value="L_matematicas">Licenciatura en Matemáticas</option>
            <option value="L_fisica">Licenciatura en Física</option>
            <option value="L_astronomia">Licenciatura en Astronomía y Astrofísica</option>
            <option value="medicina">Medicina</option>
        </select>
    </div>
    <div className="my-3">
    <label className="uppercase text-gray-800 block text-sm font-bold my-4" htmlFor="numero">Imagen Docente</label>
    <label htmlFor="file-upload" className="cursor-pointer mx-12">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleImageChange}
        />
        <span className="bg-green-500 text-white px-36 py-2 rounded hover:bg-green-600">
          <AiOutlineFileImage className="inline-block" />
          Subir imagen
        </span>
      </label>
    </div>

    <input type="submit" value="Registrar Docente" className="p-2 bg-sky-600 shadow w-full rounded-lg text-sm uppercase font-bold text-white hover:cursor-pointer hover:bg-sky-900 transition-colors"/>
</form>
    </>
  )
}

export default FormularioDocente