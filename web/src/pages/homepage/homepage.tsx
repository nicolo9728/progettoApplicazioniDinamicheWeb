import { Header } from "../components/header";
import { Table } from "../components/table";
import style from "./homepage.module.css";

export const Homepage = () => {
  
  const categorie = ["Azione", "Avventura", "Horror", "Animazione", "Thriller", "Commedia"]; //!!!!!!!! DA CAMBIARE

  return (
    <div className={style["home-container"]}>
        <Header />
        <div className={style["content-container"]}>
          <div className={style["filters-container"]}>
            <div className={style["search-container"]}>
              <label htmlFor="cerca">Cerca:</label>
              <img src="src/assets/search.png" alt="Immagine del cerca" onClick={()=>console.log("Cerca Cliccato")}/>
              <input placeholder="Cerca" id="cerca" type="text"></input>
            </div>
            <label htmlFor="select">Filtra:</label>
            <select id="select">
              <option value="" disabled selected>Categoria</option>
              {
                categorie.map((val, index)=>(
                  <option key={index} value={val}>{val}</option>
                ))
              }
            </select>
            <h2 onClick={()=>console.log("Elimina filtri Cliccato")}>Elimina filtri</h2>
          </div>
          <Table />
        </div>
    </div>
  );
}