import {
  BrowserRouter,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AIAssistantWidget from "./components/AIAssistantWidget";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Book from "./pages/Book";
import Dashboard from "./pages/Dashboard";

const AI_ENABLED_ROUTES = ["/services", "/book"];

function AppContent() {
  const { pathname } = useLocation();

  const shouldShowAIWidget = AI_ENABLED_ROUTES.includes(pathname);

  return (
    <>
      <Navbar />

      {shouldShowAIWidget && <AIAssistantWidget />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/book" element={<Book />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;




