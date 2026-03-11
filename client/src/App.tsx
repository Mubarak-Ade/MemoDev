import { Route, Routes } from 'react-router'
import './App.css'
import { DashboardLayout } from './components/layout/DashboardLayout'
import MainLayout from './components/layout/MainLayout'
import { Login } from './pages/Auth/Login'
import { Register } from './pages/Auth/Register'
import { Overview } from './pages/Dashboard/Overview'
import HomePage from './pages/Home'

function App() {
    return (
        <Routes>
            <Route Component={MainLayout}>
                <Route index path="/" Component={HomePage} />
                <Route index path="/register" Component={Register} />
                <Route index path="/login" Component={Login} />
            </Route>
            <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index path="" Component={Overview} />
            </Route>
        </Routes>
    )
}

export default App
