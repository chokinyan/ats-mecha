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
          <Link to="/schema-cinematique?types=2D">Schematisation 2D</Link>
          <Link to="/schema-cinematique?types=3D">Schematisation 3D</Link>
          <Link to="/schema-cinematique?types=2D et 3D">Schematisation 2D et 3D</Link>
        </section>
        <section>
          <h2>Torseurs</h2>
          <Link to="/torseurs">Torseur Cinematique</Link>
        </section>
        <section>
          <h2>Tableaux des liaisons</h2>
          <p>À venir...</p>
        </section>
        <section>
          <h2>Questions de khole</h2>
          <p>À venir...</p>
        </section>
        <h1></h1>
      </main>
    </>
  );
}

export default App;
