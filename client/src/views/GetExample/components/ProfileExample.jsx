import { Outlet, useParams } from "react-router";

const ProfileExample = () => { 
    const {name} = useParams();

    return(
        <div>
            {name}
            <Outlet></Outlet>
        </div>
    );
}

export default ProfileExample;