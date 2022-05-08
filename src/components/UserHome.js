import { Link } from "react-router-dom";
import { useContext } from "react";
import dayjs from "dayjs";
import TokenContext from "../contexts/TokenContext";
import styled from "styled-components";
import backButton from "../assets/backButton.svg";
import addButton from "../assets/addButton.svg";
import removeButton from "../assets/removeButton.svg";

export default function UserHome() {
    const { name, historic, getHistoric } = useContext(TokenContext);

    const sumall = historic.map(transaction => parseFloat(transaction.value)).reduce((prev, curr) => prev + curr, 0);
    console.log(sumall);

    return (
        <Screen onLoad={getHistoric} >
            <header>
                <h1>Olá, {name}</h1>
                <Link to="/" >
                    <img
                        src={backButton}
                        alt="backButton"
                    // onClick={() => navigate("/")}  //FIX ME = IMPLEMENTAR LOGOUT
                    />
                </Link>
            </header>
            {historic.length > 0 ?
                <article>
                    {historic.map((transaction, index) => {
                        if (transaction.value < 0) {
                            const { date, description, value } = transaction;
                            return (
                                <menu key={index} >
                                    <section>
                                        <h1>{dayjs(date).format("DD/MM")}</h1>
                                        <h2>{description}</h2>
                                    </section>
                                    <p>{parseFloat(value * -1).toFixed(2).replace(".", ",")}</p>
                                </menu>
                            )
                        } else {
                            const { date, description, value } = transaction;
                            return (
                                <menu key={index} >
                                    <section>
                                        <h1>{dayjs(date).format("DD/MM")}</h1>
                                        <h2>{description}</h2>
                                    </section>
                                    <h3>{parseFloat(value).toFixed(2).replace(".", ",")}</h3>
                                </menu>
                            )
                        }
                    })}
                    <div>
                        <h5>SALDO</h5>
                        {sumall < 0 ?
                            <p>{parseFloat(sumall * -1).toFixed(2).replace(".", ",")}</p>
                            :
                            <h3>{parseFloat(sumall).toFixed(2).replace(".", ",")}</h3>
                        }
                    </div>
                </article>
                :
                <article>
                    <h4>
                        Não há registros de
                        entrada ou saída
                    </h4>
                </article>
            }
            <div>
                <Link to="/newincome">
                    <button>
                        <img src={addButton} alt="addButton" />
                        <h2>Nova</h2>
                        <h3>entrada</h3>
                    </button>
                </Link>
                <Link to="/newoutcome">
                    <button>
                        <img src={removeButton} alt="removeButton" />
                        <h2>Nova</h2>
                        <h3>saída</h3>
                    </button>
                </Link>
            </div>
        </Screen>
    )
}

const Screen = styled.section`
margin: 25px;
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
        font-weight: 700;
        font-size: 26px;
        color: #FFFFFF;
    }
}
article {
    margin-top: 25px;
    margin-bottom: 13px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    height: 446px;
    border-radius: 5px;
    overflow-y: scroll;
    position: relative;
    padding: 10px;
    menu {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        section {
            display: flex;
            h1 {
                margin-right: 10px;
                font-size: 16px;
                color: #C6C6C6;
            }
            h2 {
                font-size: 16px;
            }
        }
        h3 {
            font-size: 16px;
            color: #03AC00;
        }
        p {
            font-size: 16px;
            color: #C70000;
        }
    }
    div {
        /* width: calc(100% - 20px); */
        /* position: absolute; */
        top: calc(100% - 17px);
        bottom: 0px;
        position: sticky;
        /* background: blue; */
        h5 {
            font-weight: 700;
            font-size: 17px;
        }
        h3 {
            font-weight: 700;
            font-size: 17px;
            color: #03AC00;
        }
        p {
            font-weight: 700;
            font-size: 17px;
            color: #C70000;
        }
    }
    h4 {
        position: absolute;
        display: inline-flex;
        align-items: center;
        text-align: center;
        width: 180px;
        left: calc(50% - 90px);
        top: 0;
        bottom: 0;
        color: #868686;
    }
}
div {
    display: flex;
    justify-content: space-between;
    button {
        width: 155px;
        height: 114px;
        background: #A328D6;
        border-radius: 5px;
        border: none;
        position: relative;
        img {
            top: 10px;
            left: 10px;
            position: absolute;
        }
        h2 {
            bottom: 30px;
            left: 10px;
            position: absolute;
            font-weight: 700;
            font-size: 17px;
            color: #FFFFFF;
        }
        h3 {
            bottom: 10px;
            left: 10px;
            position: absolute;
            font-weight: 700;
            font-size: 17px;
            color: #FFFFFF;
        }
    }
}
`