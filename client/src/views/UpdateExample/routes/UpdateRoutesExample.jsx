import {Route, Routes} from "react-router-dom";
import UpdateExample from "../UpdateExample";
const UpdateRoutesExample = () => { 

    return (
        <Routes>
            <Route path="update" element={<UpdateExample/>}>
            </Route>
        </Routes>
    );
 }

 export default UpdateRoutesExample;