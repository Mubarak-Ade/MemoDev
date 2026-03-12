import { Route, Routes } from 'react-router'
import './App.css'
import { DashboardLayout } from './components/layout/DashboardLayout'
import MainLayout from './components/layout/MainLayout'
import { Login } from './pages/Auth/Login'
import { Register } from './pages/Auth/Register'
import { Overview } from './pages/Dashboard/Overview'
import HomePage from './pages/Home'
import { VerifyEmail } from './pages/Auth/VerifyEmail';
import { CheckEmail } from './pages/Auth/CheckEmail';
import { Toaster } from './components/ui/sonner';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { PublicOnly } from './components/layout/PublicOnly';
import { ResetPassword } from './pages/Auth/ResetPassword';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route Component={MainLayout}>
                <Route Component={PublicOnly}>
                    <Route path="/register" Component={Register} />
                    <Route path="/login" Component={Login} />
                </Route>
                <Route  path="/verify-email" Component={VerifyEmail} />
                <Route  path="/check-email" Component={CheckEmail} />   
                <Route  path="/forgot-password" Component={ForgotPassword} />   
                <Route  path="/reset-password" Component={ResetPassword} />   
                </Route>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index path="" Component={Overview} />
                </Route>
            </Routes>
            <Toaster />
        </>
    )
}

export default App
