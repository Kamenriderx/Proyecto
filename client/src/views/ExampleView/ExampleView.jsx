import { ProductContext } from "../../store/ContextExample";
import { useContext } from "react";

const ExampleView=()=> {

    const { searchQuery } = useContext(ProductContext);
    return ( 
        <div>
            {searchQuery}
        </div>
     );
}

export default ExampleView;