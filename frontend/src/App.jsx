import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Services from "./pages/Services";
import Book from "./pages/Book";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AiAssistant";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<Book />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


