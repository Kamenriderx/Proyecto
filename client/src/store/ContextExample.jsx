import { createContext,useState } from "react";
const ProductContext = createContext();

function ProductContextProvider(props) {

    const [products, setProducts] = useState([]);
    const [searchQuery,setSearchQuery] = useState({});


    return(
        <ProductContext.Provider value={{products, searchQuery, setSearchQuery,setProducts}}>
            {props.children}
        </ProductContext.Provider>
    );

}

export {ProductContextProvider,ProductContext} ;