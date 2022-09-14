import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Messages from "../Messages";
import MsgPosting from "../MsgPosting";
import Profile from "../Profile";
import Login from "../Login";
import SignUp from "../SignUp";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="messages" element={<Messages />} />
                <Route path="post" element={<MsgPosting />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;