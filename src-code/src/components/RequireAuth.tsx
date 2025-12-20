import {Navigate,useLocation} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type {ReactNode} from "react";

export function RequireAuth({children} : {children: ReactNode}) {
    const { isAuthenticated} = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // 重定向到登录页面，并保存当前路径以便登录后跳转回来
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;

}    