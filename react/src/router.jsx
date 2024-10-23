import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from './views/Dashboard'
import Questions from "./views/Questions";
import Login from "./views/login";
import GuestLayout from "./components/GuestLayout";
import SignUp from "./views/SignUp";
import AdminLayout from "./components/AdminLayout";
import Qiuz from "./views/Qiuz";
import QuestionPage from "./views/QuestionPage";

const router = createBrowserRouter([
    {
        path: 'question/public/:user_id',
        element: <Qiuz />
    },
    {
        path : '/',
        element : <AdminLayout />,
        children :[
            {
                    path: '/dashboard',
                    element: <Dashboard />
            },
            {
                path: '/questions',
                element: <Questions />
            },
            {
                path: '/questions/create',
                element: <QuestionPage />
            },
            
            
             ]
    },
    {
        path : '/',
        element : <GuestLayout />,
        children :[
            {
                path: '/quiz',
                element: <Navigate to= "/" />
            },
            {
                    path: '/login',
                    element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
           
    ]
    },
    

])

export default router 