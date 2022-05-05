import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import TokenContext from "../contexts/TokenContext";

export default function Login() {
    const { token, setToken } = useContext(TokenContext);

    const navigate = useNavigate();
    const [dadosLogin, setDadosLogin] = useState({ email: "", password: "" });

    function fazerLogin(e) {
        e.preventDefault()
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", dadosLogin);
        promise.then(response => {
            const { data } = response;
            const { token, name } = data; // NO BACK-END MANDAR NANE TBM
            localStorage.setItem("email", dadosLogin.email);
            localStorage.setItem("password", dadosLogin.password);
            navigate("/userhome/");
            setToken(token);
        });
        promise.catch(err => {
            const { response } = err;
            const { data } = response
            const { message } = data;
            alert(message);
            setDadosLogin({ email: "", password: "" });
        });
    }

    if (token !== "") {
        return (
            <FrenteLogado>Você está logado! :)</FrenteLogado>
        )
    } else if (localStorage.email !== undefined && localStorage.password !== undefined && token === "") {
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", { email: localStorage.getItem("email"), password: localStorage.getItem("password") });
        promise.then(response => {
            const { data } = response;
            const { token, image } = data;
            navigate("/hoje/");
            setToken(token);
            setImagemPerfil(image);
        });
        promise.catch(err => {
            const { response } = err;
            const { data } = response
            const { message } = data;
            alert(message);
            setDadosLogin({ email: "", password: "" });
            setCarregandoLogin(false);
        });
        return (
            <LoginAutomatico>
                <h1>Logando automaticamente!</h1>
            </LoginAutomatico>
        )
    } else {
        return (
            <FrenteLogin>
                <h1>MyWallet</h1>
                <form onSubmit={fazerLogin}>
                    <input
                        type="email"
                        value={dadosLogin.email}
                        onChange={(e) => setDadosLogin({ ...dadosLogin, email: e.target.value })}
                        nome="email"
                        id="email"
                        placeholder="E-mail"
                        required
                    />
                    <input
                        type="password"
                        value={dadosLogin.password}
                        onChange={(e) => setDadosLogin({ ...dadosLogin, password: e.target.value })}
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
            </FrenteLogin>
        )
    }
}

const FrenteLogado = styled.figure`
position: fixed;
top: calc(50vh - 20px);
left: calc(50vw - 105.25px);
padding: 10px;
border-radius: 5px;
background-color: #52B6FF;

font-size: 20px;
color: #FFFFFF;
`

const LoginAutomatico = styled.main`
position: fixed;
top: calc(50vh - 60px);
left: calc(50vw - 145.10px);
padding: 10px;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

font-size: 20px;
color: #52B6FF;
`

const FrenteLogin = styled.section`
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