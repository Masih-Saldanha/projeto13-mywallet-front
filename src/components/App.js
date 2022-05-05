import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";
import Login from "./Login";
import SignUp from "./SignUp";
import UserHome from "./UserHome";
import NewTrade from "./NewTrade";

export default function App() {
    const [token, setToken] = useState("");
    return (
        <TokenContext.Provider
            value={{
                token,
                setToken
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup/" element={<SignUp />} />
                    <Route path="/userhome/" element={<UserHome />} />
                    <Route path="/newtrade/" element={<NewTrade />} />
                </Routes>
            </BrowserRouter>
            </TokenContext.Provider>
            )
}