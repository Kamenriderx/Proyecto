//import { ProductContext } from "../../store/ContextExample";
//import { useContext } from "react";
import useAxios from "../../utils/hooks/useAxios";
import { NavLink, Outlet } from "react-router-dom";

const GetExample=()=> {
    const {data,isPending} =useAxios('http://localhost:3000/registro/personExample/getPersons','get');
    
    //const { searchQuery } = useContext(ProductContext);
    return ( 
        <div>
            <ul>
                {!isPending
                ?data.map(obj=>
                <li key={obj.ID_Person_}>
                    <NavLink className={({isActive})=>{
                        return isActive?'is-active':undefined
                    }} to={`${obj.P_NAME}`}>
                        {obj.P_NAME}
                    </NavLink>
                </li>)
                :'Cargando...'}
            </ul>
            <Outlet/>
        </div>
     );
}

export default GetExample;