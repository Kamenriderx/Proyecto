import { StoreProvider } from "./store/ContextExample";
import ReadCSV from "./components/ReadCSV";

//import { AppRouter } from "./router/AppRouter";
function App() {
  return (
    <StoreProvider>
      <ReadCSV/>
    </StoreProvider>
  );
}

export default App;
