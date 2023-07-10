import { useState } from "react";
import { GoDotFill } from "react-icons/go";
import img from "../assets/fondoPerfil.jpg";

const Contact = ({state,userName,photo,userId}) =>{
    const [style, setStyle] = useState(
        {
            container:"shadow-lg z-10",
            hover:false
        }
    );

    const handleClick = (e) => {
        console.log(userId);

    }


    return (
        <div onClick={handleClick} className={`p-5 w-96   bg-white rounded-sm  flex items-center max-w-sm hover:bg-gray-200 cursor-pointer border border-s-gray-100 my-1 mx-0 ${style.hover?style.container:""}`} onMouseEnter={()=>setStyle({...style,hover:true})} onMouseLeave={()=>setStyle({...style,hover:false})}>

            <div className={`rounded-full  bg-gray-200 w-14 h-14 overflow-hidden`}>
                <img src={photo===""?img:photo} alt="" />
            </div>
            <div className="flex flex-row w-3/4">
                <div className="w-3/4 font-sans pl-3">
                    {userName}
                </div>
                <div className="w-1/4 flex justify-center items-center">
                    <GoDotFill style={{color:state , width:"20px",height:"20px"}}/>
                </div> 
            </div>        

        </div>

    );
}

export default Contact;