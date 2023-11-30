import { useState } from "react";

export default function Formulario() {
  let [error, setError] = useState(false);

  let [textoInput, setTextoInput] = useState("");
  return (
    <form
      onSubmit={(evento) => {
        evento.preventDefault();
        setError(false);
        let valido = /^(\d{1,3},){2}\d{1,3}$/.test(textoInput);

        if (valido) {
          textoInput.split(",").forEach((n) => (valido = valido && +n >= 0 && +n <= 255));

          if (valido) {
            return console.log("ok");
          }
          setError(true);
        }
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
