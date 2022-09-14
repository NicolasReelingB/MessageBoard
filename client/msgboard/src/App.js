import React from "react";
import './App.css';
import Navigation from "./Components/navigation";
import AppRoutes from "./Routes/app_routes";
import { Container } from "react-bootstrap";


const App = () => {
  return (
    <Container>
      <Navigation/>
      <AppRoutes/>
    </Container>
  );
}

export default App;