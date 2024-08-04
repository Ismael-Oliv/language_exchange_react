import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/Auth";
import { Routes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
