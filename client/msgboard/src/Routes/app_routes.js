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
import ProtectedRoute from "../Components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<SignUp />} />
                <Route exact path="/login" element={<Login />} />
                <ProtectedRoute exact path="messages" element={<Messages />} />
                <ProtectedRoute exact path="post" element={<MsgPosting />} />
                <ProtectedRoute exact path="profile" element={<Profile />} />
                <ProtectedRoute exact path="/comments" element={<CommentSection />} />
                <Route exact path="/weather" element={<Weather />} />
                <ProtectedRoute exact path="/update" element={<UpdateMessage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;