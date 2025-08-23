import { Table } from "../components/table";
import style from "./storico.module.css";

export const storico = () => {
    return (
        <div className={style["storico-container"]}>
            <h1>Storico</h1>
            <Table/>
        </div>
    );
}