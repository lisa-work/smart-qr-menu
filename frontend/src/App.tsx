import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from './pages';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
