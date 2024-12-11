import { createBrowserRouter } from "react-router-dom";
import Main from "../layOuts/Main";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/Register",
                element: <Register/>
            },
            {
                path: "/Login",
                element: <Login/>
            },
        ]
    },
    
]);


export default router