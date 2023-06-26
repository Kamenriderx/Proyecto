import {Route, Routes} from "react-router-dom";
import GetExample from "../GetExample";
import ProfileExample from "../components/ProfileExample";
const GetRoutesExample = () => { 

    return (
        <Routes>
            <Route path="users" element={<GetExample/>}>
                <Route path=":name" element={<ProfileExample/>}>
                </Route>
            </Route>
        </Routes>
    );
 }

export default GetRoutesExample;