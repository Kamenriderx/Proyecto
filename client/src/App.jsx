import CsvReader from "./components/CSVReader/CSVReader";
import { StoreProvider } from "./store/ContextExample";
//import { AppRouter } from "./router/AppRouter";
function App() {
 
  return(
    <StoreProvider>
      <CsvReader></CsvReader>
    </StoreProvider>

  );
}

export default App
