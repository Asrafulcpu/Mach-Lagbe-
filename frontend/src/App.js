import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FishMarket from './pages/FishMarket';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart'; // ← Make sure this line exists
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import AdminRoute from './components/auth/AdminRoute';
import './App.css';
import './styles/components.css';
import './styles/pages.css';

function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'market', element: <FishMarket /> },
          { path: 'dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
          { path: 'cart', element: <Cart /> },
          { path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
          { path: 'admin', element: <AdminRoute><Admin /></AdminRoute> },
        ],
      },
    ],
    { future: { v7_startTransition: true, v7_relativeSplatPath: true } }
  );

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

function RootLayout() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;