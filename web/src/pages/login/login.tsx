
import style from "./login.module.css"
import { formSubmit } from "../../helpers/formHelpers"
import { container } from "tsyringe"
import { LoginEndpoint } from "../../endpoint/loginEndpoint"
import type { Credenziali } from "../../../../common/viewmodels/Credenziali"
import { ResultMapper } from "../../../../common/ResultMapper"
import { useState } from "react"
import { useNavigate } from "react-router"

export const Login = () => {
    const loginEndpoint = container.resolve(LoginEndpoint)

    const navigate = useNavigate()
    const [errore, setErrore] = useState("")

    const eseguiLogin = async (arg: Credenziali) =>
        ResultMapper
            .from(await loginEndpoint.login(arg))
            .match((_)=>navigate("/"), (e)=>setErrore(e[0].message))

    return (
        <div className={style["login-container"]}>
            <form onSubmit={formSubmit(eseguiLogin)}>
                <h1>Autenticazione</h1>
                <p>{errore}</p>
                <div className={style["input-container"]}>
                    <label htmlFor="username">Inserisci lo username: </label>
                    <input type="text" name="username" id="username" placeholder="Username" required/>
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="password">Inserisci la password: </label>
                    <input type="password" name="password" id="password" placeholder="Password" required/>
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}