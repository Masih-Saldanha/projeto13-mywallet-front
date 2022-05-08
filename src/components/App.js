import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import TokenContext from "../contexts/TokenContext";
import Login from "./Login";
import SignUp from "./SignUp";
import UserHome from "./UserHome";
import NewIncome from "./NewIncome";
import NewOutcome from "./NewOutcome";

export default function App() {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [historic, setHistoric] = useState([]);

    function getHistoric() {
        const url = "http://localhost:5000/historic";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.get(url, config);
        promise.then((response) => {
            const { data } = response;
            setHistoric(data);
        })
        promise.catch((err) => {
            const { response } = err;
            const { data } = response;
            alert(data);
        })
    }

    return (
        <TokenContext.Provider
            value={{
                token,
                setToken,
                name,
                setName,
                historic,
                setHistoric,
                getHistoric
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup/" element={<SignUp />} />
                    <Route path="/userhome/" element={<UserHome />} />
                    <Route path="/newincome/" element={<NewIncome />} />
                    <Route path="/newoutcome/" element={<NewOutcome />} />
                </Routes>
            </BrowserRouter>
        </TokenContext.Provider>
    )
}