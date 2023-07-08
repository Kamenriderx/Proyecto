import ContentNavbar from "./interfaces/Navbar";
import { StoreProvider } from "./store/ContextExample";
import ViewChat from "./views/ViewChat/ViewChat";
import ViewStudent from "./views/ViewStudent/ViewStudent";
import ViewTeacher from "./views/ViewTeacher/ViewTeacher";
//import { AppRouter } from "./router/AppRouter";
function App() {
  return (
    <StoreProvider>
       <ContentNavbar/>
      {/* <ReadCSV/> */}
      {/* <ViewStudent/> */}
      {/* <ViewTeacher/> */}
      <ViewChat/>
    </StoreProvider>
  );
}

export default App;
