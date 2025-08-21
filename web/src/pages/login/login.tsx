import style from "./login.module.css"

export const Login = () => {

    return (
        <div className={style["login-container"]}>
            <form>
                <h1>Autenticazione</h1>
                <div className={style["input-container"]}>
                    <label htmlFor="username">Inserisci lo username: </label>
                    <input type="text" name="username" id="username" placeholder="Username" />
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="password">Inserisci la password: </label>
                    <input type="password" name="password" id="password" placeholder="Password" />
                </div>
                <button>Login</button>
            </form>
        </div>
    )
}