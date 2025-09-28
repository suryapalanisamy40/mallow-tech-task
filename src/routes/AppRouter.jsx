import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/loginPg";
import UsersPage from "../pages/userPg";

const PrivateRoute = ({ children }) => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    return loginInfo ? children : <Navigate to="/login" />;
};
const PublicRoute = ({ children }) => {
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    return loginInfo ? <Navigate to="/users" /> : children;
};

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
            <Route path="/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
