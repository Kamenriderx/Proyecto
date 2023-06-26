import { StoreProvider } from "./store/ContextExample";
import ReadCSV from "./utils/helpers/ReadCSV";

//import { AppRouter } from "./router/AppRouter";
function App() {
  return (
    <StoreProvider>
      <ReadCSV/>
    </StoreProvider>
  );
}

export default App;
