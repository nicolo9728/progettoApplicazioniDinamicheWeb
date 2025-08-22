import style from './header.module.css';

export const Header = () => {
  const username = "Nicolò Rossi"; //!!!!!!!! DA CAMBIARE

  return (
    <div className={style["header-container"]}>
        <div className={style["left-section"]}>
            <img src='src/assets/tape.png' className={style["logo"]} alt='Logo'/>
            <h1 className={style["nomeNegozio"]}>DVD Rental</h1>
        </div>
        <div className={style["right-section"]}>
            <button className={style["btn-storico"]}><img src='src/assets/history.png' alt='Storico'/></button>
            <div className={style["profile-container"]}>
                <h2 className={style["nomeUtente"]}>{username}</h2>
                <div className={style["btn-logout"]} onClick={() => console.log('LOGOUT CLICCATO')}><p>LOGOUT</p><img src='src/assets/login.png' alt='Logout'/></div>
            </div>
        </div>
    </div>
  );
}