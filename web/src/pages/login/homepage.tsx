import { Header } from "./components/header";

export const Homepage = () => {
  return (
    <div className="home-container">
        <Header />
        <div className="content-container">
          <h1>Benvenuto nella tua area personale!</h1>
        </div>
    </div>
);
}