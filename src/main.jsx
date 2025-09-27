import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Chat, Home, Landing, Login, Signup } from './pages/index.js'
import { AuthProvider } from './services/AuthContext.jsx'
import ProtectedRoute from './services/ProtectedRoute.jsx'
import PublicRoute from './services/PublicRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index
              element=
              {
                <PublicRoute>
                  <Landing />
                </PublicRoute>
              } />
            <Route path='login'
              element=
              {
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
            <Route path='signup'
              element=
              {<PublicRoute>
                <Signup />
              </PublicRoute>
              } />

            <Route path='home'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } >
                <Route path='chat/:user_id'
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                } />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
