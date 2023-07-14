import img from "../../../assets/fondoPerfil.jpg"

const ManagementContact = () => {



    return(

        <div className="p-5 w-96 h-48  bg-white rounded-sm  flex items-center max-w-sm shadow-lg cursor-pointer border border-s-gray-100 my-1 mx-0">
            <div>
                <img src={img} alt="" className=" w-32 h-32" />
            </div>
            <div>
                <div>
                    <h2>Aníbal Alajandro Reyes</h2>
                </div>
                <div>
                    <button className="w-32 h-8 text-white bg-cyan-400 hover:bg-cyan-600 cursor-pointer  flex justify-center items-center ">Eliminar</button>
                </div>
            </div>
        </div>
        
    );
}

export default ManagementContact;