import ContentNavbar from "./components/Navbar";
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
