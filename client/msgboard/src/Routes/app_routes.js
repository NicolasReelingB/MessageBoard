import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Messages from "../Messages";
import MsgPosting from "../MsgPosting";
import Profile from "../Profile";
import Login from "../Login";
import SignUp from "../SignUp";
import CommentSection from "../Components/CommentSection";
import Weather from "../Components/weatherApi";
import UpdateMessage from "../updateMsg";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="messages" element={<Messages />} />
                <Route path="post" element={<MsgPosting />} />
                <Route path="profile" element={<Profile />} />
                <Route path="/comments" element={<CommentSection />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/update" element={<UpdateMessage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;