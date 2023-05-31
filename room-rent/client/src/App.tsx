import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/Signin";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<SignIn />} />
          <Route path="/dashBoard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
