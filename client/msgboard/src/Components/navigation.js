import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Messages from "../Messages";
import MsgPosting from "../MsgPosting";
import Profile from "../Profile";
import Login from "../Login";
import SignUp from "../SignUp";
import CommentSection from "../Components/CommentSection";
import Weather from "../Components/weatherApi";
import UpdateMessage from "../updateMsg";

function Navigation() {
  //const navigate = useNavigate();
  const logOutUser = () => {
    localStorage.removeItem("token");
    //navigate("/login");
  }

    return (
      <div>
        <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/post">Post a Message!</Nav.Link>
                <Nav.Link href="/messages">Your Feed</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => logOutUser()}>
                  Sign Out
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
      </div>
      );
}


export default Navigation;