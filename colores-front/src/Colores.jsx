import Item from "./Item.jsx";
import Formulario from "./Formulario.jsx";
import { useEffect, useState } from "react";
function Colores() {
  let [colores, setColores] = useState([]);

  useEffect(() => {
    fetch("https://colores-front.onrender.com")
      .then((respuesta) => respuesta.json())
      .then((coloresApi) => {
        console.log(coloresApi);
        setColores(coloresApi.reverse());
      });
  }, []);

  function agregarColor(objetoColor) {
    setColores([objetoColor, ...colores]);
  }

  function borrarColor(id) {
    fetch(`https://colores-front.onrender.com/borrar/${id}`, { method: "DELETE" })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        let { resultado } = respuesta;
        if (resultado && resultado == "ok") {
          return setColores([colores.filter((color) => color._id != id)]);
        }
        console.log("error al usuario ...");
      });
  }
  return (
    <>
      <Formulario agregarColor={agregarColor} />
      <ul>
        {colores.map((color) => (
          <Item key={color._id} id={color._id} r={color.r} g={color.b} b={color.b} borrarColor={borrarColor} />
        ))}
      </ul>
    </>
  );
}

export default Colores;
