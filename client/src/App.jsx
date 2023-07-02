import ContentNavbar from "./interfaces/Navbar";
import { StoreProvider } from "./store/ContextExample";
//import { AppRouter } from "./router/AppRouter";
function App() {
  return (
    <StoreProvider>
       <ContentNavbar/>
      {/* <ReadCSV/> */}
    </StoreProvider>
  );
}

export default App;
