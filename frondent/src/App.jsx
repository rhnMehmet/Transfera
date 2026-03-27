import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PlayerDetail from './pages/PlayerDetail';
import TeamDetail from './pages/TeamDetail';

export default function App() {
  return (
    
      <Routes>
        {/* Herkese Açık Sayfalar */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Detay Sayfaları */}
        <Route path="/player/:id" element={<PlayerDetail />} />
        <Route path="/team/:id" element={<TeamDetail />} />

        {/* Korumalı Sayfalar (Giriş Yapılması Şart) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    
  );
}