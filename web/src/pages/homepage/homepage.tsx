import { Header } from "../components/header";
import { Table } from "../components/table";
import style from "./homepage.module.css";

export const Homepage = () => {
  return (
    <div className={style["home-container"]}>
        <Header />
        <div className={style["content-container"]}>
          <div className={style["filters-container"]}>
            <div className={style["search-container"]}>
              <img src="src/assets/search.png" alt="Cerca" onClick={()=>console.log("Cerca Cliccato")}/>
              <input placeholder="Cerca" type="text"></input>
            </div>
            <select>
              <option value="" disabled selected>Categoria</option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <p onClick={()=>console.log("Elimina filtri Cliccato")}>Elimina filtri</p>
          </div>
          <Table />
        </div>
    </div>
  );
}