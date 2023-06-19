import {Route, Routes} from "react-router-dom";
import {PostExample} from "../PostExample";
const PostRoutesExample = () => { 

    return (
        <Routes>
            <Route path="post" element={<PostExample/>}>
            </Route>
        </Routes>
    );
 }

 export default PostRoutesExample;