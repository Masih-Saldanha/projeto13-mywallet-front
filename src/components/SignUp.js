import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function SignUp() {
    const navigate = useNavigate();
    const [newAccountData, setNewAccountData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

    function createAccount(e) {
        e.preventDefault()
        const promise = axios.post("https://masih-my-wallet.herokuapp.com/signup", newAccountData);
        promise.then(response => {
            navigate("/");
        });
        promise.catch(err => {
            const { response } = err;
            const { data } = response
            alert(data);
            setNewAccountData({ name: "", email: "", password: "", confirmPassword: "" });
        });
    }

    return (
        <SignupScreen>
            <h1>MyWallet</h1>
            <form onSubmit={createAccount}>
                <input
                    type="text"
                    value={newAccountData.name}
                    onChange={(e) => setNewAccountData({ ...newAccountData, name: e.target.value })}
                    nome="nome"
                    id="nome"
                    placeholder="Nome"
                    required
                />
                <input
                    type="email"
                    value={newAccountData.email}
                    onChange={(e) => setNewAccountData({ ...newAccountData, email: e.target.value })}
                    nome="email"
                    id="email"
                    placeholder="E-mail"
                    required
                />
                <input
                    type="password"
                    value={newAccountData.password}
                    onChange={(e) => setNewAccountData({ ...newAccountData, password: e.target.value })}
                    nome="senha"
                    id="senha"
                    placeholder="Senha"
                    required
                />
                <input
                    type="password"
                    value={newAccountData.confirmPassword}
                    onChange={(e) => setNewAccountData({ ...newAccountData, confirmPassword: e.target.value })}
                    nome="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirme a senha"
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/">
                <h2>J?? tem uma conta? Entre agora!</h2>
            </Link>
        </SignupScreen>
    )
}

const SignupScreen = styled.section`
display: flex;
flex-direction: column;
align-items: center;
margin-top: calc(50vh - (437px / 2));
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