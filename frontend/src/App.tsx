import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, RestaurantSettingsPage } from './pages';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from './pages/auth/ProtectedRoute';

function App() {

  return (
    <>
    <Toaster/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/settings" element={<RestaurantSettingsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
