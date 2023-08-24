import image from "../../../assets/fondoPerfil.jpg"
const StudentCard = () =>{

    return(
        <div className="h-full w-2/3 flex justify-center items-center border">
            <div className=" w-28 h-28 mr-3">
                <img src={image} alt="" />
            </div>
            <div className="">
                <ul className="">
                    <li>Name</li>
                    <li>Account Number</li>

                </ul>
            </div>
        </div>
    );
}

export default StudentCard;