import { ProductContextProvider } from "./store/ContextExample";
import {ExampleView} from "./views/ExampleView/ExampleView"
function App() {
 
  return(
    <ProductContextProvider>
      <ExampleView/>
    </ProductContextProvider>

  );
}

export default App
