import { StudentProvider } from "../context/contextStudents/StudentProvider";
import ContentNavbar from "./interfaces/Navbar";
import { StoreProvider } from "./store/ContextExample";
//import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <StoreProvider>
      <StudentProvider>
      <ContentNavbar/>
      {/* <ReadCSV/> */}
      </StudentProvider>
    </StoreProvider>
  );
}

export default App;
