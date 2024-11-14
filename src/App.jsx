import React, { useState, useEffect, useRef } from "react";

function App() {
  // Variables de los cálculos
  const [n, setN] = useState(0);
  const [nm, setNM] = useState(1);
  const [im, setIM] = useState(1);
  const [ff, setFF] = useState();
  const [ingresos, setIngresos] = useState([]);
  const [egresos, setEgresos] = useState([]);
  const [ingresosSeries, setIngresosSeries] = useState([]);
  const [egresosSeries, setEgresosSeries] = useState([]);
  const [totalIngreso, setTotalIngreso] = useState(0);
  const [totalEgreso, setTotalEgreso] = useState(0);
  const [totalIngresoSerie, setTotalIngresoSerie] = useState(0);
  const [totalEgresoSerie, setTotalEgresoSerie] = useState(0);
  const [totalFlujo, setTotalFlujo] = useState(0);

  // Funciones para mostrar alertas
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const establecerParametros = () => {
    const temp_n = parseInt(document.getElementById("input_n").value);
    const temp_nm = parseInt(document.getElementById("input_nm").value);
    const temp_im = parseFloat(document.getElementById("input_im").value);
    const temp_ff = parseInt(document.getElementById("input_ff").value);

    if (temp_n <= 0) {
      setAlertMessage("El número de periodos no puede ser 0 o negativo.");
      setAlertVisible(true);
      return;
    }
    if (temp_nm <= 0) {
      setAlertMessage(
        "La cantidad de meses en 1 periodo no puede ser 0 o negativa."
      );
      setAlertVisible(true);
      return;
    }
    if (temp_im <= 0) {
      setAlertMessage("El interés mensual no puede ser 0 o negativo.");
      setAlertVisible(true);
      return;
    }
    if (temp_ff < 0) {
      setAlertMessage("La fecha focal no puede ser negativa.");
      setAlertVisible(true);
      return;
    }
    if (temp_ff > temp_n) {
      setAlertMessage(
        "La fecha focal no puede ser mayor que el número de periodos."
      );
      setAlertVisible(true);
      return;
    }

    setN(temp_n);
    setNM(temp_nm);
    setIM(temp_im);
    setFF(temp_ff);
  };

  const añadirIngreso = () => {
    const periodo = parseInt(document.getElementById("periodo_ing").value);
    const valor = parseFloat(document.getElementById("valor_ing").value);

    if (periodo < 0) {
      setAlertMessage("El periodo del ingreso no puede ser negativo.");
      setAlertVisible(true);
      return;
    }
    if (valor <= 0) {
      setAlertMessage("El valor del ingreso no puede ser 0 o negativo.");
      setAlertVisible(true);
      return;
    }
    if (ingresos.some(([p, _]) => p === periodo)) {
      setAlertMessage("Ya existe un ingreso en ese periodo.");
      setAlertVisible(true);
      return;
    }
    if (periodo > n) {
      setAlertMessage(
        "El periodo del ingreso no puede ser mayor que el número de periodos."
      );
      setAlertVisible(true);
      return;
    }

    // Limpiar inputs
    document.getElementById("periodo_ing").value = "";
    document.getElementById("valor_ing").value = "";

    setIngresos([...ingresos, [periodo, valor]]);
  };

  const añadirEgreso = () => {
    const periodo = parseInt(document.getElementById("periodo_egr").value);
    const valor = parseFloat(document.getElementById("valor_egr").value);

    if (periodo < 0) {
      setAlertMessage("El periodo del egreso no puede ser negativo.");
      setAlertVisible(true);
      return;
    }
    if (valor <= 0) {
      setAlertMessage("El valor del egreso no puede ser 0 o negativo.");
      setAlertVisible(true);
      return;
    }
    if (egresos.some(([p, _]) => p === periodo)) {
      setAlertMessage("Ya existe un egreso en ese periodo.");
      setAlertVisible(true);
      return;
    }
    if (periodo > n) {
      setAlertMessage(
        "El periodo del egreso no puede ser mayor que el número de periodos."
      );
      setAlertVisible(true);
      return;
    }

    // Limpiar inputs
    document.getElementById("periodo_egr").value = "";
    document.getElementById("valor_egr").value = "";

    setEgresos([...egresos, [periodo, valor]]);
  };

  const añadirIngresoSerie = () => {
    const periodo1 = parseInt(
      document.getElementById("periodo_1_serie_ing").value
    );
    const periodo2 = parseInt(
      document.getElementById("periodo_2_serie_ing").value
    );
    const valor = parseFloat(document.getElementById("valor_serie_ing").value);

    if (periodo1 < 0) {
      setAlertMessage("El periodo inicial de la serie no puede ser negativo.");
      setAlertVisible(true);
      return;
    }
    if (periodo2 < 0) {
      setAlertMessage("El periodo final de la serie no puede ser negativo.");
      setAlertVisible(true);
      return;
    }
    if (valor <= 0) {
      setAlertMessage("El valor de la serie no puede ser 0 o negativo.");
      setAlertVisible(true);
      return;
    }
    if (periodo1 > periodo2) {
      setAlertMessage(
        "El periodo inicial no puede ser mayor que el periodo final."
      );
      setAlertVisible(true);
      return;
    }
    if (
      ingresosSeries.some(([p1, p2, _]) => p1 === periodo1 && p2 === periodo2)
    ) {
      setAlertMessage("Ya existe una serie en ese periodo.");
      setAlertVisible(true);
      return;
    }
    if (periodo1 > n || periodo2 > n) {
      setAlertMessage(
        "El periodo de la serie no puede ser mayor que el número de periodos."
      );
      setAlertVisible(true);
      return;
    }
    if (periodo1 === periodo2) {
      setAlertMessage(
        "El periodo inicial no puede ser igual al periodo final."
      );
      setAlertVisible(true);
      return;
    }

    // Limpiar inputs
    document.getElementById("periodo_1_serie_ing").value = "";
    document.getElementById("periodo_2_serie_ing").value = "";
    document.getElementById("valor_serie_ing").value = "";

    setIngresosSeries([...ingresosSeries, [periodo1, periodo2, valor]]);
  };

  const añadirEgresoSerie = () => {
    const periodo1 = parseInt(
      document.getElementById("periodo_1_serie_egr").value
    );
    const periodo2 = parseInt(
      document.getElementById("periodo_2_serie_egr").value
    );
    const valor = parseFloat(document.getElementById("valor_serie_egr").value);

    if (periodo1 < 0) {
      setAlertMessage("El periodo inicial de la serie no puede ser negativo.");
      setAlertVisible(true);
      return;
    }
    if (periodo2 < 0) {
      setAlertMessage("El periodo final de la serie no puede ser negativo.");
      setAlertVisible(true);
      return;
    }
    if (valor <= 0) {
      setAlertMessage("El valor de la serie no puede ser 0 o negativo.");
      setAlertVisible(true);
      return;
    }
    if (periodo1 > periodo2) {
      setAlertMessage(
        "El periodo inicial no puede ser mayor que el periodo final."
      );
      setAlertVisible(true);
      return;
    }
    if (
      egresosSeries.some(([p1, p2, _]) => p1 === periodo1 && p2 === periodo2)
    ) {
      setAlertMessage("Ya existe una serie en ese periodo.");
      setAlertVisible(true);
      return;
    }
    if (periodo1 > n || periodo2 > n) {
      setAlertMessage(
        "El periodo de la serie no puede ser mayor que el número de periodos."
      );
      setAlertVisible(true);
      return;
    }
    if (periodo1 === periodo2) {
      setAlertMessage(
        "El periodo inicial no puede ser igual al periodo final."
      );
      setAlertVisible(true);
      return;
    }

    // Limpiar inputs
    document.getElementById("periodo_1_serie_egr").value = "";
    document.getElementById("periodo_2_serie_egr").value = "";
    document.getElementById("valor_serie_egr").value = "";

    setEgresosSeries([...egresosSeries, [periodo1, periodo2, valor]]);
  };

  const eliminarIngreso = () => {
    if (ingresos.length === 0) {
      setAlertMessage("No hay ingresos para eliminar.");
      setAlertVisible(true);
      return;
    }
    setIngresos(ingresos.slice(0, ingresos.length - 1));
  };

  const eliminarEgreso = () => {
    if (egresos.length === 0) {
      setAlertMessage("No hay egresos para eliminar.");
      setAlertVisible(true);
      return;
    }
    setEgresos(egresos.slice(0, egresos.length - 1));
  };

  const eliminarIngresoSerie = () => {
    if (ingresosSeries.length === 0) {
      setAlertMessage("No hay series de ingresos para eliminar.");
      setAlertVisible(true);
      return;
    }
    setIngresosSeries(ingresosSeries.slice(0, ingresosSeries.length - 1));
  };

  const eliminarEgresoSerie = () => {
    setEgresosSeries(egresosSeries.slice(0, egresosSeries.length - 1));
    if (egresosSeries.length === 0) {
      setAlertMessage("No hay series de egresos para eliminar.");
      setAlertVisible(true);
    }
  };

  const canvasRef = useRef(null);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Definir dimensiones del canvas
    canvas.width = (n + 2) * 100;
    canvas.height = 280;

    function drawLine(x1, y1, x2, y2, color, text, position) {
      // Dibuja la línea
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Calcula el punto medio de la línea
      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      // Establece el contexto de texto
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.font = "12px Arial";

      // Ajusta la posición vertical del texto
      const textY = position === "arriba" ? midY - 10 : midY + 20;

      // Dibuja el texto en el canvas
      ctx.fillText(text, midX, textY);
    }

    function drawPoint(x, y, color, label) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      if (label) {
        ctx.fillStyle = "black"; // Color del texto
        ctx.font = "12px Arial"; // Estilo del texto
        const textWidth = ctx.measureText(label).width;
        // Posición del texto con respecto al punto
        ctx.fillText(label, x - 10 - textWidth / 2, y - 10);
      }
    }

    function drawArrow(x1, y1, x2, y2, color, label) {
      const headLength = 10; // Longitud de la cabeza de la flecha
      const dx = x2 - x1;
      const dy = y2 - y1;
      const angle = Math.atan2(dy, dx);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(
        x2 - headLength * Math.cos(angle - Math.PI / 6),
        y2 - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        x2 - headLength * Math.cos(angle + Math.PI / 6),
        y2 - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.lineTo(x2, y2);
      ctx.fillStyle = color;
      ctx.fill();

      // Dibujar el texto centrado en la punta de la flecha
      ctx.fillStyle = "black"; // Color del texto
      ctx.font = "12px Arial"; // Estilo del texto
      const textWidth = ctx.measureText(label).width;

      // Ajustar la posición del texto dependiendo del color
      if (color === "red") {
        // Si el color es rojo, dibuja el texto 20px más abajo
        ctx.fillText(label, x2 - textWidth / 2, y2 - headLength + 30);
      } else if (color === "green") {
        // Si el color es verde, dibuja el texto en la punta
        ctx.fillText(label, x2 - textWidth / 2, y2 - headLength);
      }
    }

    // Ejemplo de uso

    /*

    // Línea (x1, y1, x2, y2, color)
    drawLine(100, 140, 3000, 140, "black");
    // X1: Punto de comienzo de la linea base, siempre sera 100
    // X2: Punto final de la linea base termina en (n+1)*100
    // Y1-2: Siempre sera 140 (Coordenada de altura de la linea)

    // Punto (x, y, color, label)
    drawPoint(100, 140, "black", "0");
    drawPoint(200, 140, "black");
    drawPoint(300, 140, "black");
    // Cantidad de puntos: n+1
    // X: Siempre sera (i*100)
    // Y: Siempre sera 140 (Coordenada de altura de la linea)
    // Label: Numero del periodo del punto (i-1)

    // Ingreso/Egreso (x1, y1, x2, y2, color, label)
    // X1-X2: Serán el mismo valor, periodo del egreso o ingreso (Pei) (Pei+1)*100
    // Label: Valor del ingreso o egreso
    // Egreso
    drawArrow(100, 140, 100, 190, "red", "x100");
    // Y1: 140 (Coordenada de altura de la linea)
    // Y2: Y1+50

    // Ingreso
    drawArrow(200, 140, 200, 90, "green", "+100");
    // Y1: 140 (Coordenada de altura de la linea)
    // Y2: Y1-50

    */

    // Cuadricula
    // Lineas verticales
    for (let i = 0; i < n * 4; i++) {
      drawLine(i * 50, 0, i * 50, 280, "lightgray", "", "");
    }
    // Lineas horizontales
    for (let i = 0; i < 6; i++) {
      drawLine(0, i * 50 + 40, (n + 2) * 100, i * 50 + 40, "lightgray", "", "");
    }

    // Linea base
    drawLine(100, 140, (n + 1) * 100, 140, "black", "", "");

    // Creación de puntos sobre la linea
    for (let i = 0; i < n + 1; i++) {
      if (ff != i) {
        if (i == 0) {
          drawPoint(100, 140, "black", "0");
        } else {
          drawPoint((i + 1) * 100, 140, "black", i);
        }
      }
    }

    // Creación de punto fecha focal
    drawPoint((ff + 1) * 100, 140, "red", "ff: " + ff);

    // Creación de ingresos
    ingresos.forEach((ingreso) => {
      const [periodo, valor] = ingreso;
      drawArrow(
        (periodo + 1) * 100,
        140,
        (periodo + 1) * 100,
        90,
        "green",
        valor
      );
    });

    // Creación de egresos
    egresos.forEach((egreso) => {
      const [periodo, valor] = egreso;
      drawArrow(
        (periodo + 1) * 100,
        140,
        (periodo + 1) * 100,
        190,
        "red",
        valor
      );
    });

    // Creación de series de ingresos
    ingresosSeries.forEach((ingresosSerie) => {
      const [periodo1, periodo2, valor] = ingresosSerie;
      // Flecha de inicio
      drawArrow(
        (periodo1 + 1) * 100,
        140,
        (periodo1 + 1) * 100,
        90,
        "green",
        ""
      );
      // Flecha final
      drawArrow(
        (periodo2 + 1) * 100,
        140,
        (periodo2 + 1) * 100,
        90,
        "green",
        ""
      );

      // Linea de union
      drawLine(
        (periodo1 + 1) * 100,
        90,
        (periodo2 + 1) * 100,
        90,
        "green",
        valor,
        "arriba"
      );
    });

    // Creación de series de egresos
    egresosSeries.forEach((egresosSerie) => {
      const [periodo1, periodo2, valor] = egresosSerie;
      // Flecha de inicio
      drawArrow(
        (periodo1 + 1) * 100,
        140,
        (periodo1 + 1) * 100,
        190,
        "red",
        ""
      );
      // Flecha final
      drawArrow(
        (periodo2 + 1) * 100,
        140,
        (periodo2 + 1) * 100,
        190,
        "red",
        ""
      );

      // Linea de union
      drawLine(
        (periodo1 + 1) * 100,
        190,
        (periodo2 + 1) * 100,
        190,
        "red",
        valor,
        ""
      );
    });
  };

  const interesCompuestoDerecha = (capital, periodos) => {
    return capital * (1 + im) ** periodos * nm;
  };

  const interesCompuestoIzquierda = (capital, periodos) => {
    return (capital / (1 + im) ** periodos) * nm;
  };

  const anualidadEnPeriodo2 = (anualidad, periodo1, periodo2) => {
    return anualidad * (((1 + im) ** (periodo2 - periodo1 + 1) * nm - 1) / im);
  };

  const sumaIngresosEgresosSimple = (IngresoEgresoSimple) => {
    // Total de Ingreso/Egreso simple
    let totalIngresosEgresosSimple = 0;
    IngresoEgresoSimple.forEach(([periodo, valor]) => {
      // FF: 0 Ingresos/Egreso: 3
      if (periodo > ff) {
        totalIngresosEgresosSimple += interesCompuestoIzquierda(
          valor,

          periodo - ff
        );
      }
      // FF: 3 Ingresos/Egreso: 0
      if (periodo < ff) {
        totalIngresosEgresosSimple += interesCompuestoDerecha(
          valor,

          ff - periodo
        );
      }
      // FF: 3 Ingresos/Egreso: 3
      if (periodo === ff) {
        totalIngresosEgresosSimple += valor;
      }
    });

    return totalIngresosEgresosSimple;
  };

  const sumaIngresosEgresosSerie = (IngresoEgresoSerie) => {
    // Total de Ingreso/Egreso series
    let totalIngresosEgresosSeries = 0;
    IngresoEgresoSerie.forEach(([periodo1, periodo2, valor]) => {
      // FF: 0 Ingresos/Egreso 3
      if (periodo2 > ff) {
        totalIngresosEgresosSeries += interesCompuestoIzquierda(
          anualidadEnPeriodo2(valor, periodo1, periodo2),

          periodo2 - ff
        );
      }
      // FF: 3 Ingresos/Egreso: 0
      if (periodo2 < ff) {
        totalIngresosEgresosSeries += interesCompuestoDerecha(
          anualidadEnPeriodo2(valor, periodo1, periodo2),

          ff - periodo2
        );
      }
      // FF: 3 Ingresos/Egreso 3
      if (periodo2 === ff) {
        totalIngresosEgresosSeries += anualidadEnPeriodo2(
          valor,
          periodo1,
          periodo2
        );
      }
    });

    return totalIngresosEgresosSeries;
  };

  const formatearValores = (valores) => {
    return (
      " $" +
      valores
        .toFixed(6)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+\,)/g, "$1'")
    );
  };

  // Actualiza el canva al cambio de variables
  useEffect(() => {
    drawCanvas();
    setTotalIngreso(sumaIngresosEgresosSimple(ingresos));
    setTotalEgreso(sumaIngresosEgresosSimple(egresos));
    setTotalIngresoSerie(sumaIngresosEgresosSerie(ingresosSeries));
    setTotalEgresoSerie(sumaIngresosEgresosSerie(egresosSeries));
    setTotalFlujo(
      totalIngreso + totalIngresoSerie - (totalEgreso + totalEgresoSerie)
    );
  }, [
    n,
    nm,
    im,
    ff,
    ingresos,
    egresos,
    ingresosSeries,
    egresosSeries,
    totalIngreso,
    totalEgreso,
    totalIngresoSerie,
    totalEgresoSerie,
  ]);

  return (
    <>
      <section
        id
        class="bg-black font-bold text-white p-4 text-xl text-center rounded-b-2xl"
      >
        <h1>Calculadora - Graficadora de flujos económicos</h1>
      </section>

      {/* Sección de inputs */}
      <section className="flex flex-row justify-between p-4 w-full gap-4">
        <div className="p-4 border-gray-300 border rounded-lg w-full">
          <h2 className="text-lg font-semibold mb-2">
            Parámetros de Inversión
          </h2>
          <div className="flex items-center space-x-2 mb2"></div>
          <p>Número de periodos:</p>
          <input
            type="number"
            min="0"
            placeholder="(n)"
            id="input_n"
            className="border rounded-md px-4 py-2 w-full mb-2"
          />
          <p>Número de periodos:</p>
          <input
            type="number"
            min="0"
            placeholder="(nm)"
            id="input_nm"
            className="border rounded-md px-4 py-2 w-full mb-2"
          />
          <p>Interés mensual:</p>
          <input
            type="number"
            min="0"
            placeholder="(im)"
            id="input_im"
            className="border rounded-md px-4 py-2 w-full mb-2"
          />
          <p>Fecha focal:</p>
          <input
            type="number"
            min="0"
            placeholder="(ff)"
            id="input_ff"
            className="border rounded-md px-4 py-2 w-full mb-4"
          />
          <button
            className="bg-black text-white px-4 py-2 rounded-md w-full"
            onClick={establecerParametros}
          >
            Establecer parámetros
          </button>
        </div>
        <div className="p-4 border-gray-300 border rounded-lg w-full">
          <h2 className="text-lg font-semibold mb-2">
            Configuración de ingresos
          </h2>
          <div className="flex items-center space-x-2 mb2"></div>
          <input
            type="number"
            min="0"
            placeholder="Periodo:"
            id="periodo_ing"
            className="border rounded-md px-4 py-2 w-full mb-2"
          />
          <input
            type="number"
            min="0"
            placeholder="Valor:"
            id="valor_ing"
            className="border rounded-md px-4 py-2 w-full mb-2"
          />
          <div className="flex flex-row justify-between gap-4 w-full mb-2">
            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={añadirIngreso}
            >
              Agregar
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={eliminarIngreso}
            >
              Eliminar
            </button>
          </div>
          <input
            type="number"
            min="0"
            placeholder="Periodo inicial:"
            id="periodo_1_serie_ing"
            className="border rounded-md px-4 py-2 w-full mb-2"
          />
          <input
            type="number"
            min="0"
            placeholder="Periodo final:"
            id="periodo_2_serie_ing"
            className="border rounded-md px-4 py-2 w-full mb-4"
          />
          <input
            type="number"
            min="0"
            placeholder="Valor de la serie:"
            id="valor_serie_ing"
            className="border rounded-md px-4 py-2 w-full mb-4"
          />
          <div className="flex flex-row justify-between gap-4 w-full mb-2">
            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={añadirIngresoSerie}
            >
              Agregar
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={eliminarIngresoSerie}
            >
              Eliminar
            </button>
          </div>
        </div>
        <div className="p-4 border-gray-300 border rounded-lg w-full">
          <h2 className="text-lg font-semibold mb-2">
            Configuración de egresos
          </h2>
          <div className="flex items-center space-x-2 mb2"></div>
          <input
            type="number"
            min="0"
            placeholder="Periodo:"
            id="periodo_egr"
            className="border rounded-md px-4 py-2 w-full mb-2"
          />
          <input
            type="number"
            min="0"
            placeholder="Valor:"
            id="valor_egr"
            className="border rounded-md px-4 py-2 w-full mb-2"
          />
          <div className="flex flex-row justify-between gap-4 w-full mb-2">
            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={añadirEgreso}
            >
              Agregar
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={eliminarEgreso}
            >
              Eliminar
            </button>
          </div>
          <input
            type="number"
            min="0"
            placeholder="Periodo inicial:"
            id="periodo_1_serie_egr"
            className="border rounded-md px-4 py-2 w-full mb-2"
          />
          <input
            type="number"
            min="0"
            placeholder="Periodo final:"
            id="periodo_2_serie_egr"
            className="border rounded-md px-4 py-2 w-full mb-4"
          />
          <input
            type="number"
            min="0"
            placeholder="Valor de la serie:"
            id="valor_serie_egr"
            className="border rounded-md px-4 py-2 w-full mb-4"
          />
          <div className="flex flex-row justify-between gap-4 w-full mb-2">
            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={añadirEgresoSerie}
            >
              Agregar
            </button>
            <button
              className="bg-black text-white px-4 py-2 rounded-md w-full"
              onClick={eliminarEgresoSerie}
            >
              Eliminar
            </button>
          </div>
        </div>
      </section>
      {/* Sección de inputs */}

      {/* Resultados */}
      <section className="flex flex-row justify-between p-4 px-10 w-11/12 mx-auto gap-4 border-gray-300 border rounded-lg">
        <div>
          <p className="text-center">Ingresos simples en fecha focal</p>
          <p className="text-center text-green-600 italic">
            {formatearValores(totalIngreso)}
          </p>
        </div>
        <div>
          <p className="text-center">Ingresos series en fecha focal</p>
          <p className="text-center  text-green-600 italic">
            {formatearValores(totalIngresoSerie)}
          </p>
        </div>
        <div>
          <p className="text-center">Egresos simples en fecha focal</p>
          <p className="text-center  text-red-600 italic">
            {formatearValores(totalEgreso)}
          </p>
        </div>
        <div>
          <p className="text-center">Egresos series en fecha focal</p>
          <p className="text-center text-red-600 italic">
            {formatearValores(totalEgresoSerie)}
          </p>
        </div>
        <div>
          <p className="text-center">Saldo en fecha focal:</p>
          <p className="text-center font-bold italic">
            {formatearValores(totalFlujo)}
          </p>
        </div>
      </section>
      {/* Resultados */}

      {/* Modal de alerta */}
      {alertVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Fondo desenfocado */}
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>

          {/* Contenedor del modal */}
          <div className="relative bg-slate-700 font-bold text-white p-6 rounded-lg shadow-lg max-w-sm w-full z-10">
            <h3 className=" mb-4">{alertMessage}</h3>
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-600 transition duration-200"
              onClick={() => setAlertVisible(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div id="canva" className="h-[50vh] overflow-x-auto p-0 mt-8">
        <div
          style={{
            width: `${(n + 2) * 100}px`,
            height: "280px",
            position: "relative",
          }}
          className="mx-auto"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full border border-gray-500"
          ></canvas>
        </div>
      </div>
    </>
  );
}

export default App;
