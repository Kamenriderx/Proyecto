import { StudentProvider } from "../src/context/contextStudents/StudentProvider";
import ContentNavbar from "./interfaces/Navbar";
import { StoreProvider } from "./store/ContextExample";
import ViewChat from "./views/ViewChat/ViewChat";
import ViewStudent from "./views/ViewStudent/ViewStudent";
import StudentState from "./views/ViewStudent/context/StudentState";
import ViewTeacher from "./views/ViewTeacher/ViewTeacher";
import TeacherState from "./views/ViewTeacher/context/TeacherState";
//import { AppRouter } from "./router/AppRouter";

function App() {
  return (
    <StoreProvider>
      <StudentProvider>
        <StudentState>
          <TeacherState>
            <ContentNavbar />
            {/* <ReadCSV/> */}
            {/* <ViewStudent/> */}
            {/* <ViewTeacher/> */}
          </TeacherState>
        </StudentState>
      </StudentProvider>
    </StoreProvider>
  );
}

export default App;
