import {
  BrowserRouter,
  Route,
  Routes,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AIAssistantWidget from "./components/AIAssistantWidget";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Book from "./pages/Book";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

const AI_ENABLED_ROUTES = ["/book"];

function AppContent() {
  const { pathname } = useLocation();

  const shouldShowAIWidget =
    AI_ENABLED_ROUTES.includes(pathname);

  return (
    <>
      <Navbar />

      {shouldShowAIWidget && (
        <AIAssistantWidget
          autoOpen={window.innerWidth > 768}
        />
      )}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/book"
          element={
            <ProtectedRoute>
              <Book />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

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