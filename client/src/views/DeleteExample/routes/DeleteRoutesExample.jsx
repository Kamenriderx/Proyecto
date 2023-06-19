import {Route, Routes} from "react-router-dom";
import {DeleteExample} from "../DeleteExample";
const DeleteRoutesExample = () => { 

    return (
        <Routes>
            <Route path="delete" element={<DeleteExample/>}>
            </Route>
        </Routes>
    );
 }

 export default DeleteRoutesExample;