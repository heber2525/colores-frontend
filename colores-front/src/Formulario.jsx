import { useState } from "react";

export default function Formulario({ agregarColor }) {
  let [error, setError] = useState(false);

  let [textoInput, setTextoInput] = useState("");
  return (
    <form
      onSubmit={(evento) => {
        evento.preventDefault();
        setError(false);
        let valido = /^(\d{1,3},){2}\d{1,3}$/.test(textoInput);

        if (valido) {
          let [r, g, b] = textoInput.split(",").map((n) => +n);
          [r, g, b].forEach((n) => (valido = valido && +n >= 0 && +n <= 255));

          if (valido) {
            return fetch("http://localhost:3000/nuevo", {
              method: "POST",
              body: JSON.stringify({ r, g, b }),
              headers: {
                "Content-type": "application/json",
              },
            })
              .then((respuesta) => respuesta.json())
              .then((respuesta) => {
                let { resultado, _id } = respuesta;

                if (_id) {
                  setTextoInput("");
                  return agregarColor({ _id, r, g, b });
                }
                console.log("mostrar error a usuario");
              });
          }
        }
        setError(true);
      }}
    >
      <input
        type="text"
        placeholder="rrr,ggg,bbb"
        value={textoInput}
        onChange={(evento) => {
          setTextoInput(evento.target.value);
        }}
      />
      <p className={`error ${error ? "visible" : ""}`}>Debe escribir tres valores entre 0 y 255 separados con comas</p>
      <input type="submit" value="crear color" />
    </form>
  );
}
