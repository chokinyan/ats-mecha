import { Link } from "react-router-dom";
import "./App.css";

function App() {

  return (
    <>
      <header>
        <h1>Bienvenue sur un site pour réviser un peu de mécha</h1>
      </header>
      <main>
        <section>
          <h2>Schémas cinématiques</h2>
          <Link to="/schema-cinematique">Schematisation 2D</Link>
          <a href="#">Schematisation 3D</a>
          <a href="#">Schematisation 2D et 3D</a>
        </section>
        <section>
          <h2>Torseurs</h2>
          <a href="#">Torseur Cinematique</a>
        </section>
        <section>
          <h2>Tableaux</h2>
          <p>À venir...</p>
        </section>
        <section>
          <h2>Questions de khole</h2>
          <p>À venir...</p>
        </section>
      </main>
    </>
  );
}

export default App;
