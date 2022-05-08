import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import TokenContext from "./../contexts/TokenContext";

export default function Login() {
    const { setToken, setName } = useContext(TokenContext);

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    function loginAccount(e) {
        e.preventDefault()
        const promise = axios.post("http://localhost:5000/signin", loginData);
        promise.then(response => {
            const { data } = response;
            const { name, token } = data;
            localStorage.setItem("email", loginData.email);
            localStorage.setItem("password", loginData.password);
            navigate("/userhome/");
            setToken(token);
            setName(name);
        });
        promise.catch(err => {
            const { response } = err;
            const { data } = response
            alert(data);
            setLoginData({ email: "", password: "" });
        });
    }

    return (
        <LoginScreen>
            <h1>MyWallet</h1>
            <form onSubmit={loginAccount}>
                <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    nome="email"
                    id="email"
                    placeholder="E-mail"
                    required
                />
                <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    nome="senha"
                    id="senha"
                    placeholder="Senha"
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            <Link to="/signup">
                <h2>Primeira vez? Cadastre-se!</h2>
            </Link>
        </LoginScreen>
    )
}

const LoginScreen = styled.section`
display: flex;
flex-direction: column;
align-items: center;
margin-top: calc(50vh - (295px / 2));
h1 {
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    color: #FFFFFF;
    margin-bottom: 24px;
}
form {
    width: 326px;
    display: flex;
    flex-direction: column;
    align-items: center;
    * {
        width: 100%;
    }
    input {
        height: 58px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 13px;
        padding-left: 15px;
    }
    input::placeholder {
        color: black;
    }
    button {
        height: 46px;
        background: #A328D6;
        border-radius: 5px;
        border: none;
        margin-bottom: 36px;
        font-weight: 700;
        color: #FFFFFF;
    }
}
h2 {
    font-size: 15px;
    font-weight: 700;
    color: #FFFFFF;
}
`