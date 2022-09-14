import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Messages from "../Messages";
import MsgPosting from "../MsgPosting";
import Profile from "../Profile";
import Login from "../Login";
import App from "../App";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="messages" element={<Messages />} />
                <Route path="post" element={<MsgPosting />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;