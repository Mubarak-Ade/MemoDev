import { Route, Routes } from 'react-router'
import './App.css'
import { DashboardLayout } from './components/layout/DashboardLayout'
import MainLayout from './components/layout/MainLayout'
import { Modal } from './components/layout/ModalProvider'
import { PublicOnly } from './components/layout/PublicOnly'
import { Toaster } from './components/ui/sonner'
import { CheckEmail } from './pages/Auth/CheckEmail'
import { ForgotPassword } from './pages/Auth/ForgotPassword'
import { Login } from './pages/Auth/Login'
import { Register } from './pages/Auth/Register'
import { ResetPassword } from './pages/Auth/ResetPassword'
import { VerifyEmail } from './pages/Auth/VerifyEmail'
import { SnippetPage } from './pages/Dashboard/Snippet/SnippetPage'
import { DraftPage } from './pages/Dashboard/Snippet/DraftPage'
import { ProjectManagement } from './pages/Dashboard/Project/ProjectManagement'
import { SnippetList } from './pages/Dashboard/Project/SnippetList'
import { SnippetEditor } from './pages/Dashboard/Snippet/CreateSnippet'
import { SnippetPreview } from './pages/Dashboard/Snippet/SnippetPreview'
import HomePage from './pages/Home'
import { Overview } from './pages/Dashboard/Overview'

function App() {
    return (
        <div className="relative">
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route Component={MainLayout}>
                    <Route Component={PublicOnly}>
                        <Route path="/register" Component={Register} />
                        <Route path="/login" Component={Login} />
                    </Route>
                    <Route path="/verify-email" Component={VerifyEmail} />
                    <Route path="/check-email" Component={CheckEmail} />
                    <Route path="/forgot-password" Component={ForgotPassword} />
                    <Route path="/reset-password" Component={ResetPassword} />
                </Route>
                <Route element={<DashboardLayout />}>
                    <Route index path="/overview" Component={Overview} />
                    <Route path="/snippets" Component={SnippetPage} />
                    <Route path="/drafts" Component={DraftPage} />
                    <Route path="/projects/" Component={ProjectManagement} />
                    <Route path="/projects/:slug" Component={SnippetList} />
                </Route>
                <Route path="/snippets/create" Component={SnippetEditor} />
                <Route path="/snippets/:slug" Component={SnippetPreview} />
            </Routes>
            <Modal />
            <Toaster />
        </div>
    )
}

export default App
