import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import Protectedroute from "./protectedroute";
import LoginProtectedroute from "./loginprotection";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Protectedroute>
              <HomeScreen />
            </Protectedroute>
          }
        />
        <Route
          path="/login"
          element={
            <LoginProtectedroute>
              <LoginScreen />
            </LoginProtectedroute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
