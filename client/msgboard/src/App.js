import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios"
import Navigation from "./Components/navigation";
import Messages from "./Messages";
import AppRoutes from "./Routes/app_routes";

function App() {
  return (
    <div className = "App">
      <Navigation/>
      <Messages/>
      <AppRoutes/>
    </div>
  )
}

export default App;