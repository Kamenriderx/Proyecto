import { StudentProvider } from "../src/context/contextStudents/StudentProvider";
import ContentNavbar from "./interfaces/Navbar";
import { StoreProvider } from "./store/ContextExample";
import Period from "./views/Period/Period";
import PeriodRow from "./views/Period/components/PeriodRow";
import ViewChat from "./views/ViewChat/ViewChat";
import ConversationState from "./views/ViewChat/context/Conversation/ConversationState";
import MessagesState from "./views/ViewChat/context/Messages/MessagesState";
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
            <ConversationState>
              <MessagesState>
                <ContentNavbar />
              </MessagesState>
            </ConversationState>
          </TeacherState>
        </StudentState>
      </StudentProvider>
    </StoreProvider>
  );
}

export default App;
