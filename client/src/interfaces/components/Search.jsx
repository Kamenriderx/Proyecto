import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

const Search = () => {


  const [valueSearch, setValueSearch] = useState('')

  const navigate = useNavigate()

  const onSearchSubmit=(e)=>{
	e.preventDefault()
  if (valueSearch.trim() === '') {
    navigate('/perfil'); 
  }else{
    navigate('/resultados',{
      state:valueSearch
    })
    setValueSearch('')
  }
  }

  return (
    <div >
     <form className='' onSubmit={onSearchSubmit}>
    <div >
        <input
            type='text'
            name='valueSearch'
            id=''
            value={valueSearch}
            onChange={(e)=>setValueSearch(e.target.value)}
            placeholder='Buscar estudiantes...'
            className='border-none py-3 px-10 rounded-full bg-gray-100'
        />
        <button className='bg-sky-600 hover:bg-sky-700 rounded-lg shadow px-3 py-2 text-white font-bold text-md mx-2' type="submit">Buscar </button>
    </div>
</form>
    </div>

  )
}

export default Search