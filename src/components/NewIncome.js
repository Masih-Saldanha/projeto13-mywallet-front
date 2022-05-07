import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
// import TokenContext from "../contexts/TokenContext";

export default function NewIncome() {
    // const { token, setToken } = useContext(TokenContext);

    const navigate = useNavigate();
    const [income, setIncome] = useState({ value: "", description: "" });

    function sendIncome(e) {
        e.preventDefault()
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", income);
        promise.then(response => {
            // const { data } = response;
            // const { token, name } = data; // NO BACK-END MANDAR NANE TBM
            navigate("/userhome/");
        });
        promise.catch(err => {
            const { response } = err;
            const { data } = response
            const { message } = data;
            alert(message);
            setIncome({ value: "", description: "" });
        });
    }
    return (
        <NewIncomeFront>
            <header>
                <h1>Nova Entrada</h1>
            </header>
            <form onSubmit={sendIncome}>
                <input
                    type="number"
                    value={income.value}
                    onChange={(e) => setIncome({ ...income, value: e.target.value })}
                    nome="value"
                    id="value"
                    placeholder="Valor"
                    required
                />
                <input
                    type="text"
                    value={income.description}
                    onChange={(e) => setIncome({ ...income, description: e.target.value })}
                    nome="description"
                    id="description"
                    placeholder="Descrição"
                    required
                />
                <button type="submit">Salvar entrada</button>
            </form>
        </NewIncomeFront>
    )
}

const NewIncomeFront = styled.section`
display: flex;
flex-direction: column;
align-items: center;
margin-top: calc(25px);
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 25px);
    margin-bottom: 40px;
    h1 {
        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
    }
}
form {
    width: calc(100% - 25px);
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