import { StoreProvider } from "./store/ContextExample";
import ReadCSV from "./components/ReadCSV";
import ContentNavbar from "./components/Navbar";

//import { AppRouter } from "./router/AppRouter";
function App() {
  return (
    <>
   
    <StoreProvider>
       <ContentNavbar/>
      {/* <ReadCSV/> */}
    </StoreProvider>
    </>
    
  );
}

export default App;
