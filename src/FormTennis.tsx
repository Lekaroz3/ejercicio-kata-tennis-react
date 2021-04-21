import { useState } from "react";
import { TennisGame } from "./Clases/TennisGame";
let tennisGame: TennisGame;

function FormTennis() {
  const [player1, setPlayer1] = useState("Player1");
  const [player2, setPlayer2] = useState("Player2");
  const [score, setScore] = useState("0-0");
  const [error, setError] = useState("");
  const [estaJugando, setEstaJugando] = useState(false);
  const [haGanado, setHaGanado] = useState(false);

  const [listaPuntuacion, setListaPuntuacion] = useState([""]);

  function onStartClick() {
    if (player1 === "Player1" || player2 === "Player2") {
      setError("Tienes que introducir nombres de los jugadores!");
      return;
    }
    setEstaJugando(true);

    tennisGame = new TennisGame(
      { name: player1, puntuacion: "0" },
      { name: player2, puntuacion: "0" }
    );
    document.getElementById("player1")!.style.visibility = "hidden";
    document.getElementById("player2")!.style.visibility = "hidden";
    document.getElementById("btnPlayer1")!.style.visibility = "visible";
    document.getElementById("btnPlayer2")!.style.visibility = "visible";
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <h3>{player1}</h3>
          <input
            type="text"
            name="player1"
            id="player1"
            className="row form-control mt-3 mr-auto ml-auto"
            onChange={(event) => {
              setPlayer1(event.target.value);
              setError("");
            }}
          />
          <button
            disabled={haGanado}
            style={{ visibility: "hidden" }}
            id="btnPlayer1"
            className="btn btn-light row align-self-center"
            onClick={() => {
              setScore(tennisGame.wonPoint(player1));
              let texto: string = tennisGame.getScore();
              setListaPuntuacion([...listaPuntuacion, texto]);
              setHaGanado(texto.includes("Win"));
            }}
          >
            Won point
          </button>
        </div>
        <div className="col-sm mt-3">
          <h5>{score}</h5>
          <ul
            id="ulHistorialPartida"
            className="list-inline justify-content-center"
          >
            <li className="list-group-item text-dark fw-light">Love All</li>
            {listaPuntuacion.map((puntuacion) => {
              if (!puntuacion) return;
              return (
                <li className="list-group-item text-dark fw-light">
                  {puntuacion}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-sm">
          <h3>{player2}</h3>
          <input
            type="text"
            name="player2"
            id="player2"
            className="row form-control mt-3 mr-auto ml-auto"
            onChange={(event) => {
              setPlayer2(event.target.value);
              setError("");
            }}
          />
          <button
            disabled={haGanado}
            style={{ visibility: "hidden" }}
            id="btnPlayer2"
            className="btn btn-light row align-self-center"
            onClick={() => {
              setScore(tennisGame.wonPoint(player2));
              let texto: string = tennisGame.getScore();
              setListaPuntuacion([...listaPuntuacion, texto]);
              setHaGanado(texto.includes("Win"));
            }}
          >
            Won point
          </button>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col">
          <h5>{error}</h5>
          <button
            style={
              estaJugando ? { display: "none" } : { display: "inline-block" }
            }
            className="btn btn-primary"
            onClick={onStartClick}
          >
            Start
          </button>
          <button
            style={
              estaJugando ? { display: "inline-block" } : { display: "none" }
            }
            className="btn btn-primary"
            onClick={() => {
              window.location.reload(true);
            }}
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormTennis;
