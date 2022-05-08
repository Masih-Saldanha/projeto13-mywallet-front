import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import TokenContext from "../contexts/TokenContext";

export default function NewOutcome() {
    const [outcome, setOutcome] = useState({ date: 0, value: "", description: "" });
    const { token, getHistoric } = useContext(TokenContext);

    const navigate = useNavigate();

    function sendOutcome(e) {
        e.preventDefault();
        const url = "http://localhost:5000/transaction";
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const promise = axios.post(url, outcome, config);
        promise.then(response => {
            getHistoric();
            navigate("/userhome/");
        });
        promise.catch(err => {
            const { response } = err;
            const { data } = response
            const { message } = data;
            alert("Não foi possível enviar os dados.");
            setOutcome({...outcome, value: "", description: "" });
        });
    }
    return (
        <NewOutcomeFront>
            <header>
                <h1>Nova Saída</h1>
            </header>
            <form onSubmit={sendOutcome}>
                <input
                    type="number"
                    value={outcome.value}
                    onChange={(e) => setOutcome({ ...outcome, value: e.target.value })}
                    nome="value"
                    id="value"
                    placeholder="Valor"
                    required
                />
                <input
                    type="text"
                    value={outcome.description}
                    onChange={(e) => setOutcome({ ...outcome, description: e.target.value })}
                    nome="description"
                    id="description"
                    placeholder="Descrição"
                    required
                />
                <button type="submit" onClick={() => setOutcome({ ...outcome, value: (outcome.value * -1), date: Date.now() })}>Salvar saída</button>
            </form>
        </NewOutcomeFront>
    )
}

const NewOutcomeFront = styled.section`
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