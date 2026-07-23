import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage, RestaurantSettingsPage, 
  CustomerMenuPage, DashboardPage, FoodPage, CategoryPage } from './pages';
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
        <Route path="/menu/:slug" element={<CustomerMenuPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/settings" element={<RestaurantSettingsPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/foods" element={<FoodPage />} />
          <Route path="/dashboard" element={<DashboardPage/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
