/* ============================================================
   data.js — Base de datos de preguntas y tests
   Simulador Psicotécnico · Tropa y Marinería
   ============================================================ */

const APP_DATA = {

  /* ── Definición de módulos ────────────────────────────── */
  modules: {
    verbal:     { name: "Verbal",     icon: "edit_document", color: "#0a84ff", description: "Sinónimos, antónimos, analogías y comprensión" },
    espacial:   { name: "Espacial",   icon: "view_in_ar", color: "#bf5af2", description: "Visualización espacial, rotación y plegado" },
    percepcion: { name: "Percepción", icon: "visibility", color: "#ff375f", description: "Velocidad perceptiva y atención al detalle" },
    numerico:   { name: "Numérico",   icon: "calculate", color: "#ff9f0a", description: "Series, cálculo y razonamiento numérico" },
    mecanico:   { name: "Mecánico",   icon: "settings", color: "#5e5ce6", description: "Principios físicos y mecánicos básicos" },
    memoria:    { name: "Memoria",    icon: "psychology", color: "#30d158", description: "Retención y recuperación de información" },
    abstracto:  { name: "Abstracto",  icon: "category", color: "#ff453a", description: "Lógica, patrones y razonamiento abstracto" }
  },

  /* ── Orden de módulos para mostrar en UI ──────────────── */
  moduleOrder: ["verbal", "espacial", "percepcion", "numerico", "mecanico", "memoria", "abstracto"],

  /* ── Sistema de puntuación ────────────────────────────── */
  scoring: {
    correct: 1,
    incorrect: -0.33,
    blank: 0
  },

  /* ════════════════════════════════════════════════════════
     TEST 1 — EQUILIBRADO
     Dificultad media · 35 preguntas · 30 minutos
     ════════════════════════════════════════════════════════ */
  tests: [
    {
      id: "test-1",
      name: "Simulacro 1",
      subtitle: "Equilibrado",
      description: "Test completo de dificultad media con los 7 módulos. Ideal para una primera toma de contacto con el formato del examen.",
      difficulty: "Medio",
      difficultyLevel: 2,
      timeMinutes: 30,
      memoryContext: {
        title: "Datos para memorizar — Informe de incidente",
        duration: 60,
        text: "Lee atentamente y memoriza los siguientes datos. Tendrás 60 segundos.\n\n" +
              "• El agente Martínez tiene el número de placa 4527 y está destinado en la comisaría de Vallecas.\n" +
              "• El vehículo patrulla tiene matrícula 3892-BKT y es un Citroën de color blanco.\n" +
              "• El incidente se produjo el martes 14 de marzo a las 17:35 en la calle Alcalá nº 238.\n" +
              "• Había 3 testigos: una mujer de 45 años con abrigo rojo, un joven de 22 años con gafas y un anciano de 78 años con bastón.\n" +
              "• El sospechoso medía aproximadamente 1,75 m, tenía pelo castaño y llevaba zapatillas deportivas azules."
      },
      questions: [
        /* ── VERBAL ─────────────────────────────────────── */
        {
          id: 1, module: "verbal",
          text: "¿Cuál de las siguientes palabras es sinónima de «perspicaz»?",
          options: ["Obstinado", "Sagaz", "Negligente", "Voluble"],
          correct: 1,
          explanation: "«Perspicaz» significa que tiene agudeza para comprender o percibir, igual que «sagaz»."
        },
        {
          id: 2, module: "verbal",
          text: "Selecciona el antónimo de «prolijo»:",
          options: ["Extenso", "Detallado", "Conciso", "Minucioso"],
          correct: 2,
          explanation: "«Prolijo» significa extenso o largo en exceso. Su antónimo es «conciso» (breve y directo)."
        },
        {
          id: 3, module: "verbal",
          text: "LIBRO es a BIBLIOTECA como CUADRO es a:",
          options: ["Museo", "Pintor", "Lienzo", "Marco"],
          correct: 0,
          explanation: "Un libro se guarda en una biblioteca; un cuadro se guarda/exhibe en un museo."
        },
        {
          id: 4, module: "verbal",
          text: "Completa la oración: «El testigo declaró que, ______ las adversidades, logró llegar a tiempo al juzgado.»",
          options: ["gracias a", "pese a", "debido a", "conforme a"],
          correct: 1,
          explanation: "«Pese a» indica oposición: a pesar de las adversidades. Las demás opciones no transmiten esa idea concesiva."
        },
        {
          id: 5, module: "verbal",
          text: "¿Cuál de estas palabras NO pertenece al mismo campo semántico que las demás?",
          options: ["Bisturí", "Escalpelo", "Torniquete", "Cincel"],
          correct: 3,
          explanation: "Bisturí, escalpelo y torniquete son instrumentos médicos/quirúrgicos. Cincel es una herramienta de escultura o cantería."
        },

        /* ── ESPACIAL ───────────────────────────────────── */
        {
          id: 6, module: "espacial",
          text: "Un cubo tiene sus caras numeradas del 1 al 6. La cara 1 es opuesta a la 6, la 2 es opuesta a la 5, y la 3 es opuesta a la 4. Si el cubo descansa sobre la cara 3 y miras de frente la cara 1, ¿qué cara está arriba?",
          options: ["Cara 2", "Cara 4", "Cara 5", "Cara 6"],
          correct: 1,
          explanation: "Si la cara 3 está abajo, su opuesta (cara 4) está arriba. La posición de la cara 1 (de frente) no altera este hecho."
        },
        {
          id: 7, module: "espacial",
          text: "Una hoja de papel cuadrada se dobla exactamente por la mitad. En el centro del borde plegado se recorta un semicírculo. Al desdoblar la hoja, ¿qué forma tiene el agujero?",
          options: ["Un semicírculo", "Un círculo completo", "Dos semicírculos separados", "Un óvalo"],
          correct: 1,
          explanation: "Al recortar un semicírculo en el pliegue, al desdoblar ambas mitades se unen formando un círculo completo."
        },
        {
          id: 8, module: "espacial",
          text: "¿Cuántos cubos pequeños faltan para completar un cubo grande de 3 × 3 × 3 si ya se han colocado 20 cubos?",
          options: ["5", "7", "8", "9"],
          correct: 1,
          explanation: "Un cubo de 3 × 3 × 3 tiene 27 cubos pequeños. 27 − 20 = 7 cubos faltan."
        },
        {
          id: 9, module: "espacial",
          text: "Observas un reloj analógico reflejado en un espejo y ves que marca las 3:15. ¿Qué hora es realmente?",
          options: ["8:45", "9:45", "8:15", "9:15"],
          correct: 0,
          explanation: "En un espejo, la imagen se invierte horizontalmente. La hora reflejada de 3:15 corresponde a las 8:45 reales."
        },
        {
          id: 10, module: "espacial",
          text: "Si giras la letra «L» mayúscula 90° en sentido horario, ¿qué forma obtienes?",
          options: [
            "Un ángulo recto abierto hacia arriba",
            "Un ángulo recto abierto hacia la izquierda",
            "Un ángulo recto abierto hacia abajo y a la derecha",
            "Un trazo horizontal con otro vertical hacia arriba a la derecha"
          ],
          correct: 3,
          explanation: "La L (trazo vertical hacia abajo + horizontal a la derecha) girada 90° horario da un trazo horizontal a la derecha con uno vertical hacia arriba en su extremo derecho."
        },

        /* ── PERCEPCIÓN ─────────────────────────────────── */
        {
          id: 11, module: "percepcion",
          text: "En la secuencia «A B C D B A C D A B C D A B C D», ¿cuántas veces aparece la combinación «A B C» de forma consecutiva?",
          options: ["1", "2", "3", "4"],
          correct: 2,
          explanation: "Las combinaciones «A B C» consecutivas están en las posiciones 1-3, 9-11 y 13-15. Total: 3 veces."
        },
        {
          id: 12, module: "percepcion",
          text: "Observa la serie: 8 3 6 1 9 4 7 2 5 8 3 6 1 9 4 7 2 5. ¿Cuántos números pares hay en total?",
          options: ["6", "7", "8", "10"],
          correct: 2,
          explanation: "Los números pares son: 8, 6, 4, 2, 8, 6, 4, 2 = 8 números pares en total."
        },
        {
          id: 13, module: "percepcion",
          text: "Identifica qué posición rompe el patrón alterno: ▲ ▼ ▲ ▼ ▲ ▲ ▼ ▲ ▼",
          options: ["La 4ª posición", "La 5ª posición", "La 6ª posición", "La 7ª posición"],
          correct: 2,
          explanation: "El patrón alterno ▲▼ se rompe en la 6ª posición, donde debería haber ▼ pero hay ▲."
        },
        {
          id: 14, module: "percepcion",
          text: "En el texto «DDEEFFGG DDEEEFGG DDEEFFGG», ¿cuál de los tres grupos contiene un error de repetición?",
          options: ["El primer grupo", "El segundo grupo", "El tercer grupo", "Ninguno tiene errores"],
          correct: 1,
          explanation: "El segundo grupo tiene «EEE» (tres E) en lugar de «EE» (dos E) como en los otros grupos."
        },
        {
          id: 15, module: "percepcion",
          text: "Si se trazan las dos diagonales dentro de un cuadrado, ¿cuántos triángulos se forman en total?",
          options: ["2", "4", "6", "8"],
          correct: 1,
          explanation: "Las dos diagonales dividen el cuadrado en exactamente 4 triángulos iguales."
        },

        /* ── NUMÉRICO ───────────────────────────────────── */
        {
          id: 16, module: "numerico",
          text: "¿Cuál es el siguiente número en la serie: 2, 6, 18, 54, …?",
          options: ["108", "162", "148", "216"],
          correct: 1,
          explanation: "Cada término se multiplica por 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162."
        },
        {
          id: 17, module: "numerico",
          text: "Si 3 máquinas producen 90 piezas en 2 horas, ¿cuántas piezas producirán 5 máquinas en 3 horas?",
          options: ["200", "225", "250", "275"],
          correct: 1,
          explanation: "1 máquina produce 15 piezas/hora (90÷3÷2). 5 máquinas × 15 piezas/h × 3h = 225."
        },
        {
          id: 18, module: "numerico",
          text: "¿Qué porcentaje de 250 representa la cantidad de 45?",
          options: ["16%", "18%", "20%", "22%"],
          correct: 1,
          explanation: "45 ÷ 250 × 100 = 18%."
        },
        {
          id: 19, module: "numerico",
          text: "Un artículo cuesta 80 €. Se le aplica un descuento del 15 % y después un 10 % adicional sobre el precio ya rebajado. ¿Cuál es el precio final?",
          options: ["60,20 €", "61,20 €", "62,40 €", "64,00 €"],
          correct: 1,
          explanation: "80 × 0,85 = 68 €. Luego 68 × 0,90 = 61,20 €."
        },
        {
          id: 20, module: "numerico",
          text: "Completa la serie de Fibonacci: 1, 1, 2, 3, 5, 8, 13, …",
          options: ["18", "20", "21", "26"],
          correct: 2,
          explanation: "Cada número es la suma de los dos anteriores: 8 + 13 = 21."
        },

        /* ── MECÁNICO ───────────────────────────────────── */
        {
          id: 21, module: "mecanico",
          text: "Un engranaje A con 20 dientes gira en sentido horario y engrana con un engranaje B de 40 dientes. ¿En qué sentido gira B y a qué velocidad relativa respecto a A?",
          options: [
            "Antihorario, a la mitad de velocidad",
            "Horario, a la mitad de velocidad",
            "Antihorario, al doble de velocidad",
            "Horario, al doble de velocidad"
          ],
          correct: 0,
          explanation: "Engranajes que engranan giran en sentidos opuestos. B tiene el doble de dientes, así que gira a la mitad de velocidad."
        },
        {
          id: 22, module: "mecanico",
          text: "Una palanca tiene el fulcro en el centro. Se aplica una fuerza de 10 kg en un extremo a 2 metros del fulcro. ¿Qué peso máximo se puede levantar en el otro extremo situado a 1 metro del fulcro?",
          options: ["5 kg", "10 kg", "15 kg", "20 kg"],
          correct: 3,
          explanation: "Por la ley de la palanca: F₁ × d₁ = F₂ × d₂ → 10 × 2 = F₂ × 1 → F₂ = 20 kg."
        },
        {
          id: 23, module: "mecanico",
          text: "Varios recipientes de formas distintas están conectados por su base mediante un tubo. Si se vierte agua en uno de ellos, ¿qué ocurre?",
          options: [
            "El agua solo sube en los de igual diámetro",
            "El agua alcanza mayor nivel en el más estrecho",
            "El agua alcanza el mismo nivel en todos",
            "El agua se queda en el recipiente donde se vertió"
          ],
          correct: 2,
          explanation: "Principio de los vasos comunicantes: el agua alcanza el mismo nivel en todos los recipientes conectados, independientemente de su forma."
        },
        {
          id: 24, module: "mecanico",
          text: "Una polea fija se usa para levantar un objeto de 50 kg. ¿Cuánta fuerza mínima hay que aplicar?",
          options: ["25 kg", "50 kg", "75 kg", "100 kg"],
          correct: 1,
          explanation: "Una polea fija solo cambia la dirección de la fuerza, no la reduce. Se necesitan 50 kg de fuerza."
        },
        {
          id: 25, module: "mecanico",
          text: "Un objeto flota en el agua cuando:",
          options: [
            "Su peso es mayor que el empuje del agua",
            "Su densidad es mayor que la del agua",
            "Su densidad es menor que la del agua",
            "Su volumen es menor que el del agua desplazada"
          ],
          correct: 2,
          explanation: "Un objeto flota cuando su densidad media es menor que la del fluido (principio de Arquímedes)."
        },

        /* ── MEMORIA ────────────────────────────────────── */
        {
          id: 26, module: "memoria",
          text: "Según los datos memorizados, ¿cuál era el número de placa del agente?",
          options: ["4572", "4527", "4725", "4257"],
          correct: 1,
          explanation: "El agente Martínez tenía el número de placa 4527."
        },
        {
          id: 27, module: "memoria",
          text: "¿En qué calle se produjo el incidente?",
          options: ["Calle Mayor", "Calle Alcalá", "Calle Serrano", "Calle Goya"],
          correct: 1,
          explanation: "El incidente se produjo en la calle Alcalá nº 238."
        },
        {
          id: 28, module: "memoria",
          text: "¿De qué color era el abrigo de la mujer testigo?",
          options: ["Azul", "Negro", "Rojo", "Verde"],
          correct: 2,
          explanation: "La mujer de 45 años llevaba un abrigo rojo."
        },
        {
          id: 29, module: "memoria",
          text: "¿Qué marca era el vehículo patrulla?",
          options: ["Renault", "Seat", "Peugeot", "Citroën"],
          correct: 3,
          explanation: "El vehículo patrulla era un Citroën de color blanco."
        },
        {
          id: 30, module: "memoria",
          text: "¿A qué hora se produjo el incidente?",
          options: ["16:35", "17:35", "18:35", "17:25"],
          correct: 1,
          explanation: "El incidente se produjo a las 17:35."
        },

        /* ── ABSTRACTO ──────────────────────────────────── */
        {
          id: 31, module: "abstracto",
          text: "¿Cuál es el siguiente elemento en la secuencia: ○ □ △ ○ □ △ ○ …?",
          options: ["○", "□", "△", "◇"],
          correct: 1,
          explanation: "La secuencia repite el patrón ○ □ △. Tras ○, sigue □."
        },
        {
          id: 32, module: "abstracto",
          text: "Si la relación «→» significa «es mayor que», y se cumple: W → X, X → Y, Y → Z. ¿Cuál es el mayor de todos?",
          options: ["Z", "W", "Y", "X"],
          correct: 1,
          explanation: "W > X > Y > Z, por lo tanto W es el mayor."
        },
        {
          id: 33, module: "abstracto",
          text: "En un código, cada letra se sustituye por la siguiente del alfabeto (A→B, B→C, etc.). Si MESA se codifica como NFTB, ¿cómo se codifica SILLA?",
          options: ["TJMMB", "TJMKB", "UJMMB", "TKMMC"],
          correct: 0,
          explanation: "S→T, I→J, L→M, L→M, A→B = TJMMB."
        },
        {
          id: 34, module: "abstracto",
          text: "Si todos los GLIPS son DRATOS, y algunos DRATOS son FENOS, ¿cuál de las siguientes afirmaciones es necesariamente verdadera?",
          options: [
            "Todos los GLIPS son FENOS",
            "Algunos GLIPS podrían ser FENOS",
            "Ningún GLIP es FENO",
            "Todos los FENOS son GLIPS"
          ],
          correct: 1,
          explanation: "Como todos los GLIPS son DRATOS y algunos DRATOS son FENOS, es posible (pero no seguro) que algunos GLIPS sean FENOS."
        },
        {
          id: 35, module: "abstracto",
          text: "Completa la serie alfanumérica: 1A, 2C, 3E, 4G, …",
          options: ["5H", "5I", "5J", "6I"],
          correct: 1,
          explanation: "Los números avanzan de 1 en 1 (1,2,3,4,5). Las letras avanzan de 2 en 2 (A,C,E,G,I)."
        }
      ]
    },

    /* ════════════════════════════════════════════════════════
       TEST 2 — EXIGENTE
       Dificultad medio-alta · 35 preguntas · 30 minutos
       ════════════════════════════════════════════════════════ */
    {
      id: "test-2",
      name: "Simulacro 2",
      subtitle: "Exigente",
      description: "Test de dificultad superior. Preguntas más complejas y razonamiento más exigente. Recomendado tras dominar el Simulacro 1.",
      difficulty: "Medio-Alto",
      difficultyLevel: 3,
      timeMinutes: 30,
      memoryContext: {
        title: "Datos para memorizar — Horario de transporte",
        duration: 60,
        text: "Lee atentamente y memoriza los siguientes datos. Tendrás 60 segundos.\n\n" +
              "• La línea de autobús 47 sale de la estación Norte a las 08:15 y llega a Plaza Central a las 08:52.\n" +
              "• El conductor se llama Fernando Ruiz y el autobús tiene 42 plazas, matrícula 6173-GHM.\n" +
              "• La ruta pasa por 6 paradas: Norte, Hospital, Mercado, Universidad, Parque y Plaza Central.\n" +
              "• El billete sencillo cuesta 1,50 € y el abono mensual 38,70 €.\n" +
              "• El jueves 23 de noviembre hubo una avería en la parada del Mercado a las 09:10. Se acumularon 14 pasajeros."
      },
      questions: [
        /* ── VERBAL ─────────────────────────────────────── */
        {
          id: 1, module: "verbal",
          text: "Selecciona la palabra cuyo significado se acerque más a «recóndito»:",
          options: ["Evidente", "Oculto", "Espacioso", "Superficial"],
          correct: 1,
          explanation: "«Recóndito» significa muy escondido, oculto o profundo."
        },
        {
          id: 2, module: "verbal",
          text: "CIRUJANO es a BISTURÍ como ESCULTOR es a:",
          options: ["Cincel", "Mármol", "Museo", "Pincel"],
          correct: 0,
          explanation: "El bisturí es la herramienta principal del cirujano; el cincel es la herramienta principal del escultor."
        },
        {
          id: 3, module: "verbal",
          text: "¿Cuál de las siguientes oraciones contiene un uso INCORRECTO del verbo?",
          options: [
            "Si hubiese sabido la verdad, habría actuado de otro modo.",
            "El jurado previó una sentencia favorable.",
            "El presidente satisfació las demandas del comité.",
            "El abogado adujo pruebas contundentes."
          ],
          correct: 2,
          explanation: "La forma correcta es «satisfizo» (pretérito perfecto simple de «satisfacer»), no «satisfació»."
        },
        {
          id: 4, module: "verbal",
          text: "Elige el par de palabras que complete correctamente la oración: «Su actitud no era tanto ______ como ______; parecía no importarle nada.»",
          options: [
            "hostil — amable",
            "displicente — indiferente",
            "agresiva — cordial",
            "entusiasta — apática"
          ],
          correct: 1,
          explanation: "«Displicente» (desdeñosa) e «indiferente» son matices que encajan con «no importarle nada». La oración distingue entre un desaire activo y una pasividad."
        },
        {
          id: 5, module: "verbal",
          text: "¿Qué palabra es un parónimo de «aptitud» (y no un sinónimo)?",
          options: ["Capacidad", "Actitud", "Habilidad", "Competencia"],
          correct: 1,
          explanation: "«Actitud» y «aptitud» son parónimos (se escriben y suenan parecido pero significan cosas distintas). Las demás son sinónimos o cuasi-sinónimos de aptitud."
        },

        /* ── ESPACIAL ───────────────────────────────────── */
        {
          id: 6, module: "espacial",
          text: "En un dado estándar (caras opuestas suman 7), si el 1 está arriba y el 2 de frente, ¿qué número está en la cara derecha?",
          options: ["3", "4", "5", "6"],
          correct: 0,
          explanation: "Con el 1 arriba (6 abajo) y 2 de frente (5 detrás), siguiendo la regla estándar del dado, el 3 queda a la derecha."
        },
        {
          id: 7, module: "espacial",
          text: "Una escalera se forma apilando cubos: el primer peldaño tiene 1 cubo de alto, el segundo 2, el tercero 3 y el cuarto 4. Cada peldaño tiene 1 cubo de ancho y 1 de profundidad. ¿Cuántos cubos tiene en total la escalera?",
          options: ["8", "10", "12", "14"],
          correct: 1,
          explanation: "1 + 2 + 3 + 4 = 10 cubos en total."
        },
        {
          id: 8, module: "espacial",
          text: "¿Cuál de las siguientes letras mayúsculas tiene un eje de simetría vertical?",
          options: ["F", "J", "A", "R"],
          correct: 2,
          explanation: "La letra A tiene un eje de simetría vertical (su mitad izquierda es reflejo de la derecha). F, J y R no la tienen."
        },
        {
          id: 9, module: "espacial",
          text: "Si se corta un cilindro con un plano inclinado (no paralelo ni perpendicular a la base), ¿qué forma tiene la sección resultante?",
          options: ["Un círculo", "Una elipse", "Un rectángulo", "Un triángulo"],
          correct: 1,
          explanation: "Un corte oblicuo de un cilindro produce una sección elíptica."
        },
        {
          id: 10, module: "espacial",
          text: "Una hoja cuadrada se dobla por la mitad horizontalmente y luego por la mitad verticalmente. Se corta la esquina donde se unen todos los pliegues. Al desdoblar completamente, ¿cuántos agujeros hay?",
          options: ["1 agujero en el centro", "2 agujeros", "4 agujeros en las esquinas", "1 agujero en una esquina"],
          correct: 0,
          explanation: "La esquina donde confluyen todos los pliegues corresponde al centro de la hoja original. Al desdoblar, aparece un solo agujero en el centro."
        },

        /* ── PERCEPCIÓN ─────────────────────────────────── */
        {
          id: 11, module: "percepcion",
          text: "En la secuencia de dígitos «3 7 1 3 7 2 3 7 1 3 7 1 3 7 2 3 7 1», ¿cuántas veces aparece exactamente la combinación «3 7 1»?",
          options: ["3", "4", "5", "6"],
          correct: 1,
          explanation: "La combinación «3 7 1» aparece en las posiciones 1-3, 7-9, 10-12 y 16-18. Total: 4 veces."
        },
        {
          id: 12, module: "percepcion",
          text: "¿Cuál de las siguientes secuencias es DIFERENTE a las demás?\n\nA) M N Ñ O P\nB) M N Ñ O P\nC) M N N O P\nD) M N Ñ O P",
          options: ["Secuencia A", "Secuencia B", "Secuencia C", "Secuencia D"],
          correct: 2,
          explanation: "La secuencia C tiene «N N» en lugar de «N Ñ». Las demás son idénticas."
        },
        {
          id: 13, module: "percepcion",
          text: "Cuenta los símbolos «#» en la siguiente cadena: @#$%#&*#@$#%&*@#$%&#*#@",
          options: ["5", "6", "7", "8"],
          correct: 2,
          explanation: "Los símbolos # están en las posiciones 2, 5, 8, 11, 15, 19, 21. Total: 7."
        },
        {
          id: 14, module: "percepcion",
          text: "El patrón «ABCABC» se repite. ¿Cuántos errores hay en la siguiente cadena? «ABCABCABCABDABCABC»",
          options: ["0", "1", "2", "3"],
          correct: 1,
          explanation: "Solo hay un error: en la posición 12 aparece «D» en lugar de «C» (ABCABC ABC ABD ABC ABC)."
        },
        {
          id: 15, module: "percepcion",
          text: "¿Qué número aparece más veces en la serie? 4 7 2 9 4 5 7 2 4 9 7 4 2 5 4",
          options: ["2", "4", "7", "9"],
          correct: 1,
          explanation: "El 4 aparece 5 veces; el 7 aparece 3; el 2 aparece 3; el 9 aparece 2."
        },

        /* ── NUMÉRICO ───────────────────────────────────── */
        {
          id: 16, module: "numerico",
          text: "¿Cuál es el siguiente número en la serie: 3, 5, 9, 17, 33, …?",
          options: ["49", "57", "65", "66"],
          correct: 2,
          explanation: "Cada término se obtiene multiplicando por 2 y restando 1: 3×2−1=5, 5×2−1=9, 9×2−1=17, 17×2−1=33, 33×2−1=65."
        },
        {
          id: 17, module: "numerico",
          text: "La edad de un padre es el triple que la de su hijo. Dentro de 12 años, será solo el doble. ¿Cuántos años tiene ahora el hijo?",
          options: ["8", "10", "12", "14"],
          correct: 2,
          explanation: "Sea H la edad del hijo. Padre = 3H. Dentro de 12: 3H+12 = 2(H+12) → 3H+12 = 2H+24 → H = 12."
        },
        {
          id: 18, module: "numerico",
          text: "Un coche recorre 180 km en 2 horas y 15 minutos. ¿Cuál es su velocidad media en km/h?",
          options: ["75 km/h", "80 km/h", "85 km/h", "90 km/h"],
          correct: 1,
          explanation: "2 horas y 15 minutos = 2,25 horas. 180 ÷ 2,25 = 80 km/h."
        },
        {
          id: 19, module: "numerico",
          text: "Si 8 obreros construyen un muro en 6 días trabajando 5 horas diarias, ¿cuántos días tardarán 10 obreros trabajando 4 horas al día?",
          options: ["4 días", "5 días", "6 días", "8 días"],
          correct: 2,
          explanation: "Total de horas-obrero: 8×6×5 = 240. Con 10 obreros × 4h: 240 ÷ 40 = 6 días."
        },
        {
          id: 20, module: "numerico",
          text: "¿Cuál es el siguiente número en la serie: 1, 4, 9, 16, 25, …?",
          options: ["30", "34", "36", "49"],
          correct: 2,
          explanation: "Son cuadrados perfectos: 1², 2², 3², 4², 5², 6² = 36."
        },

        /* ── MECÁNICO ───────────────────────────────────── */
        {
          id: 21, module: "mecanico",
          text: "Tres engranajes están en línea: A engrana con B, y B engrana con C. Si A gira en sentido horario, ¿en qué sentido gira C?",
          options: [
            "Horario",
            "Antihorario",
            "No gira",
            "Depende del tamaño de B"
          ],
          correct: 0,
          explanation: "A (horario) → B (antihorario) → C (horario). Los engranajes alternan el sentido de giro."
        },
        {
          id: 22, module: "mecanico",
          text: "Para subir una carga pesada a un camión, ¿qué requiere menos fuerza?",
          options: [
            "Una rampa corta y empinada",
            "Una rampa larga y poco inclinada",
            "Ambas requieren la misma fuerza",
            "Depende del peso de la carga"
          ],
          correct: 1,
          explanation: "Una rampa más larga y menos inclinada (plano inclinado) reduce la fuerza necesaria a cambio de mayor distancia de desplazamiento."
        },
        {
          id: 23, module: "mecanico",
          text: "Un buceador desciende en el mar. ¿Qué ocurre con la presión que soporta?",
          options: [
            "Disminuye proporcionalmente a la profundidad",
            "Se mantiene constante",
            "Aumenta proporcionalmente a la profundidad",
            "Solo aumenta los primeros 10 metros"
          ],
          correct: 2,
          explanation: "La presión hidrostática aumenta proporcionalmente con la profundidad (aprox. 1 atm cada 10 metros)."
        },
        {
          id: 24, module: "mecanico",
          text: "Una caja de 20 kg se desliza sobre una superficie sin fricción a velocidad constante. ¿Qué fuerza neta actúa sobre ella horizontalmente?",
          options: ["20 N", "10 N", "0 N", "196 N"],
          correct: 2,
          explanation: "Si la velocidad es constante (no hay aceleración), por la primera ley de Newton la fuerza neta es cero."
        },
        {
          id: 25, module: "mecanico",
          text: "En un circuito eléctrico sencillo con una bombilla, si se corta el cable en cualquier punto, ¿qué sucede?",
          options: [
            "La bombilla sigue encendida un tiempo",
            "La bombilla se apaga inmediatamente",
            "La bombilla brilla más",
            "Depende de dónde se corte"
          ],
          correct: 1,
          explanation: "En un circuito en serie, si se interrumpe el circuito en cualquier punto, deja de circular corriente y la bombilla se apaga inmediatamente."
        },

        /* ── MEMORIA ────────────────────────────────────── */
        {
          id: 26, module: "memoria",
          text: "Según los datos memorizados, ¿a qué hora salía el autobús de la estación Norte?",
          options: ["07:45", "08:15", "08:30", "08:52"],
          correct: 1,
          explanation: "La línea 47 sale de la estación Norte a las 08:15."
        },
        {
          id: 27, module: "memoria",
          text: "¿Cuántas paradas tiene la ruta del autobús?",
          options: ["4", "5", "6", "7"],
          correct: 2,
          explanation: "La ruta tiene 6 paradas: Norte, Hospital, Mercado, Universidad, Parque y Plaza Central."
        },
        {
          id: 28, module: "memoria",
          text: "¿Cuál es el precio del abono mensual?",
          options: ["35,50 €", "37,20 €", "38,70 €", "40,00 €"],
          correct: 2,
          explanation: "El abono mensual cuesta 38,70 €."
        },
        {
          id: 29, module: "memoria",
          text: "¿En qué parada se produjo la avería?",
          options: ["Hospital", "Mercado", "Universidad", "Parque"],
          correct: 1,
          explanation: "La avería se produjo en la parada del Mercado."
        },
        {
          id: 30, module: "memoria",
          text: "¿Cuántos pasajeros se acumularon durante la avería?",
          options: ["8", "12", "14", "16"],
          correct: 2,
          explanation: "Se acumularon 14 pasajeros durante la avería."
        },

        /* ── ABSTRACTO ──────────────────────────────────── */
        {
          id: 31, module: "abstracto",
          text: "Encuentra el número que falta: 2, 5, 11, 23, 47, ?",
          options: ["71", "83", "95", "94"],
          correct: 2,
          explanation: "Cada número se multiplica por 2 y se suma 1: 2×2+1=5, 5×2+1=11, 11×2+1=23, 23×2+1=47, 47×2+1=95."
        },
        {
          id: 32, module: "abstracto",
          text: "En una cuadrícula 2×2:\n  [A] [B]\n  [C] [?]\n\nSi A=1, B=3, C=5, ¿qué valor lógico corresponde al «?» si la regla es sumar 2 por columna y sumar 4 por fila?",
          options: ["7", "8", "9", "6"],
          correct: 0,
          explanation: "Por fila: A(1)+4=C(5) ✓, B(3)+4=?(7). O por columna: A(1)+2=B(3) ✓, C(5)+2=?(7). Ambas reglas dan 7."
        },
        {
          id: 33, module: "abstracto",
          text: "Usa un doble código: las vocales se sustituyen por números (A=1, E=2, I=3, O=4, U=5) y las consonantes no cambian. ¿Cómo se codifica «TIPO»?",
          options: ["T3P4", "T3P0", "T1P4", "T2P4"],
          correct: 0,
          explanation: "T permanece, I=3, P permanece, O=4 → T3P4."
        },
        {
          id: 34, module: "abstracto",
          text: "Ana es más alta que Bea. Carlos es más bajo que Bea. Diana es más alta que Ana. ¿Quién es la persona más baja?",
          options: ["Ana", "Bea", "Carlos", "Diana"],
          correct: 2,
          explanation: "Orden de mayor a menor: Diana > Ana > Bea > Carlos. Carlos es el más bajo."
        },
        {
          id: 35, module: "abstracto",
          text: "Si los triángulos pertenecen al grupo A, los cuadrados al grupo B, y los círculos al grupo C, ¿a qué grupo pertenece un rombo?",
          options: [
            "Grupo A, porque tiene vértices",
            "Grupo B, porque tiene 4 lados",
            "Grupo C, porque no tiene ángulos rectos",
            "A ninguno de los tres grupos"
          ],
          correct: 1,
          explanation: "La clasificación se basa en el número de lados: A=3 lados, B=4 lados, C=0 lados (curvo). Un rombo tiene 4 lados → grupo B."
        }
      ]
    },

    /* ════════════════════════════════════════════════════════
       TEST 3 — VELOCIDAD Y ATENCIÓN
       Dificultad media · 35 preguntas · 20 minutos
       Enfocado en rapidez de procesamiento
       ════════════════════════════════════════════════════════ */
    {
      id: "test-3",
      name: "Simulacro 3",
      subtitle: "Velocidad",
      description: "Test contra reloj con tiempo reducido (20 min). Preguntas más directas que exigen agilidad mental y capacidad de respuesta rápida.",
      difficulty: "Medio (Tiempo reducido)",
      difficultyLevel: 2,
      timeMinutes: 20,
      memoryContext: {
        title: "Datos para memorizar — Lista de suministros",
        duration: 45,
        text: "Lee atentamente y memoriza los siguientes datos. Tendrás 45 segundos.\n\n" +
              "• Almacén Central, código A-204, responsable: Sargento López.\n" +
              "• Inventario del 5 de junio:\n" +
              "  – 120 raciones de combate (caducidad: septiembre)\n" +
              "  – 45 cantimploras verdes y 30 cantimploras negras\n" +
              "  – 18 linternas con pilas nuevas\n" +
              "  – 60 mantas térmicas de emergencia\n" +
              "• La próxima revisión está programada para el día 19 de junio a las 10:00.\n" +
              "• Se necesitan reponer: pilas (mínimo 50) y raciones (mínimo 200)."
      },
      questions: [
        /* ── VERBAL ─────────────────────────────────────── */
        {
          id: 1, module: "verbal",
          text: "¿Cuál es el sinónimo de «efímero»?",
          options: ["Eterno", "Pasajero", "Sólido", "Estable"],
          correct: 1,
          explanation: "«Efímero» significa de corta duración, pasajero."
        },
        {
          id: 2, module: "verbal",
          text: "¿Cuál es el antónimo de «diligente»?",
          options: ["Rápido", "Negligente", "Eficaz", "Activo"],
          correct: 1,
          explanation: "«Diligente» significa cuidadoso y rápido. Su antónimo es «negligente» (descuidado)."
        },
        {
          id: 3, module: "verbal",
          text: "PILOTO es a AVIÓN como CAPITÁN es a:",
          options: ["Mar", "Barco", "Puerto", "Ancla"],
          correct: 1,
          explanation: "El piloto dirige un avión; el capitán dirige un barco."
        },
        {
          id: 4, module: "verbal",
          text: "¿Qué palabra está MAL escrita?",
          options: ["Absorber", "Acervo", "Desición", "Exhausto"],
          correct: 2,
          explanation: "La forma correcta es «decisión», no «desición»."
        },
        {
          id: 5, module: "verbal",
          text: "¿Qué palabra NO es un adjetivo?",
          options: ["Hábil", "Rapidez", "Cauteloso", "Firme"],
          correct: 1,
          explanation: "«Rapidez» es un sustantivo. Los demás son adjetivos."
        },

        /* ── ESPACIAL ───────────────────────────────────── */
        {
          id: 6, module: "espacial",
          text: "¿Cuántas caras tiene un prisma triangular?",
          options: ["3", "4", "5", "6"],
          correct: 2,
          explanation: "Un prisma triangular tiene 5 caras: 2 bases triangulares + 3 caras laterales rectangulares."
        },
        {
          id: 7, module: "espacial",
          text: "Si miras la letra «b» en un espejo colocado a su derecha, ¿qué ves?",
          options: ["b", "d", "p", "q"],
          correct: 1,
          explanation: "Un espejo a la derecha invierte horizontalmente: «b» se ve como «d»."
        },
        {
          id: 8, module: "espacial",
          text: "¿Cuántas aristas tiene un cubo?",
          options: ["6", "8", "10", "12"],
          correct: 3,
          explanation: "Un cubo tiene 12 aristas: 4 superiores + 4 inferiores + 4 verticales."
        },
        {
          id: 9, module: "espacial",
          text: "Si giras un cuadrado 45°, ¿a qué figura se asemeja visualmente?",
          options: ["Un triángulo", "Un rombo", "Un rectángulo", "Un trapecio"],
          correct: 1,
          explanation: "Un cuadrado girado 45° se ve como un rombo (apoyado sobre un vértice)."
        },
        {
          id: 10, module: "espacial",
          text: "¿Cuántos vértices tiene una pirámide de base cuadrada?",
          options: ["4", "5", "6", "8"],
          correct: 1,
          explanation: "Tiene 4 vértices de la base + 1 ápice = 5 vértices."
        },

        /* ── PERCEPCIÓN ─────────────────────────────────── */
        {
          id: 11, module: "percepcion",
          text: "¿Cuántas veces aparece la letra «s» en la frase «Los soldados salieron silenciosos sin ser vistos»?",
          options: ["6", "7", "8", "9"],
          correct: 2,
          explanation: "Las letras «s»: Los(1), soldados(2), salieron(1), silenciosos(2), sin(1), ser(0), vistos(1) = 8 veces."
        },
        {
          id: 12, module: "percepcion",
          text: "¿Qué número NO pertenece a la serie par? 12, 34, 56, 77, 90",
          options: ["12", "34", "77", "90"],
          correct: 2,
          explanation: "77 es impar; los demás son pares."
        },
        {
          id: 13, module: "percepcion",
          text: "En «1234 1234 1243 1234», ¿qué grupo tiene los dígitos en orden diferente?",
          options: ["El primero", "El segundo", "El tercero", "El cuarto"],
          correct: 2,
          explanation: "El tercer grupo es «1243» en lugar de «1234» (los dos últimos dígitos están intercambiados)."
        },
        {
          id: 14, module: "percepcion",
          text: "¿Cuál de estas matrículas es diferente a las demás?\n\nA) 4832-KLM\nB) 4832-KLM\nC) 4832-KLM\nD) 4832-KML",
          options: ["Matrícula A", "Matrícula B", "Matrícula C", "Matrícula D"],
          correct: 3,
          explanation: "La matrícula D tiene las letras en otro orden: KML en lugar de KLM."
        },
        {
          id: 15, module: "percepcion",
          text: "¿Qué ficha completa el dominó si el patrón es: [1|2] [2|3] [3|4] [4|?]?",
          options: ["4", "5", "6", "1"],
          correct: 1,
          explanation: "La segunda cifra de cada ficha es la primera de la siguiente, incrementándose en 1. Tras [4|_], sigue 5."
        },

        /* ── NUMÉRICO ───────────────────────────────────── */
        {
          id: 16, module: "numerico",
          text: "¿Cuál es el siguiente número en la serie: 5, 10, 20, 40, …?",
          options: ["60", "70", "80", "100"],
          correct: 2,
          explanation: "Cada número se multiplica por 2: 5, 10, 20, 40, 80."
        },
        {
          id: 17, module: "numerico",
          text: "¿Cuánto es el 25 % de 360?",
          options: ["72", "80", "90", "100"],
          correct: 2,
          explanation: "360 × 0,25 = 90."
        },
        {
          id: 18, module: "numerico",
          text: "Si un tren recorre 450 km en 3 horas, ¿cuántos km recorre en 20 minutos?",
          options: ["30 km", "50 km", "75 km", "100 km"],
          correct: 1,
          explanation: "Velocidad: 450 ÷ 3 = 150 km/h. En 20 min (1/3 hora): 150 ÷ 3 = 50 km."
        },
        {
          id: 19, module: "numerico",
          text: "Completa la serie: 100, 95, 85, 70, 50, …",
          options: ["20", "25", "30", "35"],
          correct: 1,
          explanation: "Las diferencias son: −5, −10, −15, −20, −25. Siguiente: 50 − 25 = 25."
        },
        {
          id: 20, module: "numerico",
          text: "Un producto cuesta 120 € con IVA (21 %) incluido. ¿Cuál es el precio sin IVA (redondeado)?",
          options: ["94,80 €", "96,00 €", "99,17 €", "100,80 €"],
          correct: 2,
          explanation: "Precio sin IVA = 120 ÷ 1,21 ≈ 99,17 €."
        },

        /* ── MECÁNICO ───────────────────────────────────── */
        {
          id: 21, module: "mecanico",
          text: "¿Qué herramienta simple multiplica la fuerza aplicada a cambio de aumentar la distancia?",
          options: ["Martillo", "Palanca", "Destornillador", "Llave inglesa"],
          correct: 1,
          explanation: "La palanca es la máquina simple que multiplica la fuerza a cambio de recorrer más distancia."
        },
        {
          id: 22, module: "mecanico",
          text: "El aire caliente tiende a:",
          options: [
            "Bajar, porque pesa más",
            "Subir, porque es menos denso",
            "Quedarse quieto",
            "Moverse horizontalmente"
          ],
          correct: 1,
          explanation: "El aire caliente es menos denso que el aire frío y por ello asciende (convección)."
        },
        {
          id: 23, module: "mecanico",
          text: "¿Qué ocurre si se aumenta la sección (grosor) de un cable eléctrico?",
          options: [
            "Aumenta la resistencia",
            "Disminuye la resistencia",
            "No cambia la resistencia",
            "Se corta la corriente"
          ],
          correct: 1,
          explanation: "La resistencia eléctrica es inversamente proporcional a la sección del conductor: más grosor = menos resistencia."
        },
        {
          id: 24, module: "mecanico",
          text: "Una bola de acero y una pluma se sueltan a la vez en el vacío. ¿Cuál llega antes al suelo?",
          options: [
            "La bola de acero",
            "La pluma",
            "Llegan a la vez",
            "Depende de la altura"
          ],
          correct: 2,
          explanation: "En el vacío no hay resistencia del aire. Todos los objetos caen con la misma aceleración gravitatoria, independientemente de su masa."
        },
        {
          id: 25, module: "mecanico",
          text: "Para que un tornillo penetre en la madera con menos esfuerzo, su rosca debe ser:",
          options: [
            "Más gruesa y separada",
            "Más fina y junta",
            "No importa la rosca",
            "Sin rosca, solo con punta"
          ],
          correct: 1,
          explanation: "Una rosca más fina y con pasos más juntos actúa como un plano inclinado más largo, requiriendo menos fuerza por vuelta."
        },

        /* ── MEMORIA ────────────────────────────────────── */
        {
          id: 26, module: "memoria",
          text: "Según los datos memorizados, ¿cuál es el código del almacén?",
          options: ["A-024", "A-204", "B-204", "A-240"],
          correct: 1,
          explanation: "El código del almacén es A-204."
        },
        {
          id: 27, module: "memoria",
          text: "¿Cuántas cantimploras verdes había en el inventario?",
          options: ["30", "35", "45", "50"],
          correct: 2,
          explanation: "Había 45 cantimploras verdes."
        },
        {
          id: 28, module: "memoria",
          text: "¿Quién es el responsable del almacén?",
          options: [
            "Cabo Fernández",
            "Sargento López",
            "Teniente Ruiz",
            "Sargento García"
          ],
          correct: 1,
          explanation: "El responsable es el Sargento López."
        },
        {
          id: 29, module: "memoria",
          text: "¿Cuántas linternas había en el inventario?",
          options: ["12", "15", "18", "24"],
          correct: 2,
          explanation: "Había 18 linternas con pilas nuevas."
        },
        {
          id: 30, module: "memoria",
          text: "¿Para qué día está programada la próxima revisión?",
          options: [
            "12 de junio",
            "15 de junio",
            "19 de junio",
            "22 de junio"
          ],
          correct: 2,
          explanation: "La próxima revisión está programada para el 19 de junio a las 10:00."
        },

        /* ── ABSTRACTO ──────────────────────────────────── */
        {
          id: 31, module: "abstracto",
          text: "¿Cuál es el número que falta? 3, 6, 12, 24, ?, 96",
          options: ["36", "42", "48", "54"],
          correct: 2,
          explanation: "Serie ×2: 3, 6, 12, 24, 48, 96."
        },
        {
          id: 32, module: "abstracto",
          text: "Si AZUL = 4, ROJO = 4, VERDE = 5, entonces BLANCO = ?",
          options: ["5", "6", "7", "4"],
          correct: 1,
          explanation: "El número corresponde a la cantidad de letras de la palabra: AZUL(4), ROJO(4), VERDE(5), BLANCO(6)."
        },
        {
          id: 33, module: "abstracto",
          text: "Completa: Lunes → L, Martes → M, Miércoles → X, Jueves → J, Viernes → ?",
          options: ["V", "F", "S", "D"],
          correct: 0,
          explanation: "La inicial convencional de viernes es V (se usa X para miércoles para evitar confusión con martes)."
        },
        {
          id: 34, module: "abstracto",
          text: "¿Qué letra sigue? A, C, F, J, …",
          options: ["M", "N", "O", "P"],
          correct: 2,
          explanation: "Saltos crecientes: A(+2)C(+3)F(+4)J(+5)O."
        },
        {
          id: 35, module: "abstracto",
          text: "Si ★ + ★ = 8 y ★ × ● = 12, ¿cuánto vale ●?",
          options: ["2", "3", "4", "6"],
          correct: 1,
          explanation: "★ + ★ = 8 → ★ = 4. Luego 4 × ● = 12 → ● = 3."
        }
      ]
    }
  ],

  /* ════════════════════════════════════════════════════════
     BANCO DE PREGUNTAS EXTRA — Para el Test Aleatorio
     35 preguntas adicionales (5 por módulo)
     ════════════════════════════════════════════════════════ */
  questionPool: [
    /* ── VERBAL (pool) ──────────────────────────────────── */
    {
      id: "p1", module: "verbal",
      text: "¿Cuál de las siguientes palabras es sinónima de «benévolo»?",
      options: ["Malicioso", "Bondadoso", "Indiferente", "Riguroso"],
      correct: 1,
      explanation: "«Benévolo» significa que tiene buena voluntad o bondad."
    },
    {
      id: "p2", module: "verbal",
      text: "Selecciona el antónimo de «frugal»:",
      options: ["Moderado", "Excesivo", "Austero", "Sobrio"],
      correct: 1,
      explanation: "«Frugal» significa que gasta poco o es moderado. Su opuesto es «excesivo»."
    },
    {
      id: "p3", module: "verbal",
      text: "MÉDICO es a HOSPITAL como PROFESOR es a:",
      options: ["Libro", "Escuela", "Alumno", "Pizarra"],
      correct: 1,
      explanation: "El médico trabaja en un hospital; el profesor trabaja en una escuela."
    },
    {
      id: "p4", module: "verbal",
      text: "¿Cuál de estas palabras contiene un prefijo que significa «contra»?",
      options: ["Antebrazo", "Contraorden", "Precaución", "Subterráneo"],
      correct: 1,
      explanation: "El prefijo «contra-» significa oposición. «Antebrazo» usa «ante-» (delante)."
    },
    {
      id: "p5", module: "verbal",
      text: "Completa: «Los datos ______ que la tendencia se mantendrá durante los próximos meses.»",
      options: ["insinúan", "sugieren", "insisten", "persisten"],
      correct: 1,
      explanation: "«Sugieren» es el verbo adecuado: los datos sugieren (indican) algo. «Insinúan» tiene connotación personal."
    },

    /* ── ESPACIAL (pool) ────────────────────────────────── */
    {
      id: "p6", module: "espacial",
      text: "¿Cuántos ejes de simetría tiene un triángulo equilátero?",
      options: ["1", "2", "3", "6"],
      correct: 2,
      explanation: "Un triángulo equilátero tiene 3 ejes de simetría (uno por cada vértice al punto medio del lado opuesto)."
    },
    {
      id: "p7", module: "espacial",
      text: "Un tetraedro regular tiene:",
      options: [
        "4 caras, 4 aristas, 4 vértices",
        "4 caras, 6 aristas, 4 vértices",
        "3 caras, 6 aristas, 4 vértices",
        "4 caras, 6 aristas, 6 vértices"
      ],
      correct: 1,
      explanation: "Un tetraedro regular tiene 4 caras triangulares, 6 aristas y 4 vértices."
    },
    {
      id: "p8", module: "espacial",
      text: "Si miras un cuadrado desde una esquina (en perspectiva), ¿a qué forma se parece?",
      options: ["Un trapecio", "Un rombo", "Un triángulo", "Un rectángulo"],
      correct: 1,
      explanation: "En perspectiva oblicua, un cuadrado parece un rombo (los lados iguales se ven inclinados)."
    },
    {
      id: "p9", module: "espacial",
      text: "¿Cuántas caras visibles tiene un cubo apoyado en el suelo y contra una pared (sin poder ver la parte posterior ni la inferior)?",
      options: ["2", "3", "4", "5"],
      correct: 1,
      explanation: "Se ven 3 caras: la superior, la frontal y una lateral."
    },
    {
      id: "p10", module: "espacial",
      text: "Si superpones un cuadrado y un triángulo equilátero de la misma base, ¿cuántos lados tiene la silueta resultante?",
      options: ["5", "6", "7", "4"],
      correct: 0,
      explanation: "Si el triángulo se coloca sobre el cuadrado compartiendo la base superior: 3 lados del cuadrado (sin la base superior) + 2 lados del triángulo (sin la base) = 5 lados."
    },

    /* ── PERCEPCIÓN (pool) ──────────────────────────────── */
    {
      id: "p11", module: "percepcion",
      text: "En la cadena «ABCABCABCABCABC», ¿cuántos grupos «ABC» hay?",
      options: ["3", "4", "5", "6"],
      correct: 2,
      explanation: "La cadena tiene 15 caracteres. 15 ÷ 3 = 5 grupos «ABC»."
    },
    {
      id: "p12", module: "percepcion",
      text: "¿Cuántos números entre 1 y 50 contienen el dígito 3?",
      options: ["10", "12", "14", "15"],
      correct: 2,
      explanation: "3,13,23,30,31,32,33,34,35,36,37,38,39,43 = 14 números."
    },
    {
      id: "p13", module: "percepcion",
      text: "¿Cuál de estas palabras está escrita de forma diferente a las demás?\n\nA) Paralelepípedo\nB) Paralelepípedo\nC) Paralelipípedo\nD) Paralelepípedo",
      options: ["A", "B", "C", "D"],
      correct: 2,
      explanation: "La opción C dice «Paralelipípedo» (falta la «e» entre la «l» y la «i»). Las demás son iguales."
    },
    {
      id: "p14", module: "percepcion",
      text: "Observa: ■□■□■□□■□■□■. ¿En qué posición se rompe el patrón alterno?",
      options: ["5ª", "6ª", "7ª", "8ª"],
      correct: 2,
      explanation: "El patrón ■□ se repite, pero en las posiciones 6-7 hay «□□», rompiendo el ritmo en la 7ª posición."
    },
    {
      id: "p15", module: "percepcion",
      text: "Cuenta los puntos: ● ○ ● ● ○ ● ○ ○ ● ● ○ ●. ¿Cuántos puntos llenos (●) hay?",
      options: ["5", "6", "7", "8"],
      correct: 2,
      explanation: "Los puntos llenos (●) están en posiciones 1, 3, 4, 6, 9, 10, 12 = 7."
    },

    /* ── NUMÉRICO (pool) ────────────────────────────────── */
    {
      id: "p16", module: "numerico",
      text: "¿Cuál es el siguiente número: 1, 3, 7, 15, 31, …?",
      options: ["47", "55", "63", "60"],
      correct: 2,
      explanation: "Cada término = anterior × 2 + 1: 1×2+1=3, 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63."
    },
    {
      id: "p17", module: "numerico",
      text: "Un grifo llena una piscina en 6 horas. Otro grifo la llena en 3 horas. Si se abren los dos a la vez, ¿en cuántas horas se llena?",
      options: ["1,5 horas", "2 horas", "3 horas", "4,5 horas"],
      correct: 1,
      explanation: "Grifo 1: 1/6 por hora. Grifo 2: 1/3 por hora. Juntos: 1/6 + 1/3 = 1/2 por hora → 2 horas."
    },
    {
      id: "p18", module: "numerico",
      text: "¿Cuánto es 3/4 + 2/3?",
      options: ["5/7", "5/12", "17/12", "1"],
      correct: 2,
      explanation: "3/4 + 2/3 = 9/12 + 8/12 = 17/12."
    },
    {
      id: "p19", module: "numerico",
      text: "Si compras 3 camisetas a 15 € cada una y tienes un cupón del 20 % sobre el total, ¿cuánto pagas?",
      options: ["36 €", "38 €", "40 €", "42 €"],
      correct: 0,
      explanation: "Total: 3 × 15 = 45 €. Descuento: 45 × 0,20 = 9 €. Pago: 45 − 9 = 36 €."
    },
    {
      id: "p20", module: "numerico",
      text: "¿Cuál es la media aritmética de 12, 18, 24 y 30?",
      options: ["20", "21", "22", "23"],
      correct: 1,
      explanation: "(12 + 18 + 24 + 30) ÷ 4 = 84 ÷ 4 = 21."
    },

    /* ── MECÁNICO (pool) ────────────────────────────────── */
    {
      id: "p21", module: "mecanico",
      text: "¿Qué tipo de palanca es unas tijeras?",
      options: [
        "Primer género (fulcro entre fuerza y resistencia)",
        "Segundo género (resistencia entre fulcro y fuerza)",
        "Tercer género (fuerza entre fulcro y resistencia)",
        "No es una palanca"
      ],
      correct: 0,
      explanation: "En las tijeras, el punto de giro (fulcro) está entre la fuerza (mano) y la resistencia (lo que se corta). Es de primer género."
    },
    {
      id: "p22", module: "mecanico",
      text: "¿Por qué los neumáticos tienen dibujo (surcos)?",
      options: [
        "Para ser más bonitos",
        "Para pesar menos",
        "Para evacuar agua y mejorar el agarre",
        "Para reducir la velocidad"
      ],
      correct: 2,
      explanation: "Los surcos canalizan el agua para evitar aquaplaning y mejoran la tracción en superficies mojadas."
    },
    {
      id: "p23", module: "mecanico",
      text: "Si empujas una pared con las manos y no se mueve, ¿realizas trabajo mecánico?",
      options: [
            "Sí, porque aplicas fuerza",
            "No, porque no hay desplazamiento",
            "Sí, porque gastas energía",
            "Depende de la fuerza aplicada"
      ],
      correct: 1,
      explanation: "Trabajo = Fuerza × Desplazamiento. Sin desplazamiento, el trabajo mecánico es cero."
    },
    {
      id: "p24", module: "mecanico",
      text: "¿Qué efecto tiene lubricar un mecanismo con aceite?",
      options: [
        "Aumenta la fricción",
        "Reduce la fricción",
        "Aumenta la velocidad de giro",
        "No tiene ningún efecto mecánico"
      ],
      correct: 1,
      explanation: "El aceite lubricante crea una película entre superficies que reduce la fricción y el desgaste."
    },
    {
      id: "p25", module: "mecanico",
      text: "¿Por qué un barco de acero flota pese a que el acero es más denso que el agua?",
      options: [
        "Porque el motor lo mantiene a flote",
        "Porque está pintado con material flotante",
        "Porque su forma hueca le da un volumen grande y una densidad media menor que el agua",
        "Porque la sal del mar lo sostiene"
      ],
      correct: 2,
      explanation: "La forma del casco crea un gran volumen con aire interior, haciendo que la densidad media del barco sea menor que la del agua."
    },

    /* ── MEMORIA (pool) ─────────────────────────────────── */
    {
      id: "p26", module: "memoria",
      text: "¿Cuál de los siguientes teléfonos debes recordar si te dicen: «Memoriza el 654-321-098»?",
      options: ["654-312-098", "654-321-098", "645-321-098", "654-321-089"],
      correct: 1,
      explanation: "El teléfono correcto es 654-321-098."
    },
    {
      id: "p27", module: "memoria",
      text: "Si memorizas la secuencia ROJO-AZUL-VERDE-AMARILLO y la repites en orden inverso, ¿cuál es el segundo elemento?",
      options: ["ROJO", "AZUL", "VERDE", "AMARILLO"],
      correct: 2,
      explanation: "Inverso: AMARILLO, VERDE, AZUL, ROJO. El segundo es VERDE."
    },
    {
      id: "p28", module: "memoria",
      text: "Memoriza: la capital de Australia es Canberra, no Sídney. ¿Cuál es la capital de Australia?",
      options: ["Sídney", "Melbourne", "Canberra", "Brisbane"],
      correct: 2,
      explanation: "La capital de Australia es Canberra."
    },
    {
      id: "p29", module: "memoria",
      text: "Si memorizas la lista «manzana, pera, uva, plátano, naranja», ¿cuál es la cuarta fruta?",
      options: ["Uva", "Pera", "Plátano", "Naranja"],
      correct: 2,
      explanation: "La cuarta fruta es plátano: manzana(1), pera(2), uva(3), plátano(4), naranja(5)."
    },
    {
      id: "p30", module: "memoria",
      text: "Si un número de serie es TK-7429-ML, ¿cuál de estas opciones es correcta?",
      options: ["TK-7492-ML", "TK-7429-ML", "TK-7249-ML", "TK-7429-LM"],
      correct: 1,
      explanation: "El número de serie correcto es TK-7429-ML."
    },

    /* ── ABSTRACTO (pool) ───────────────────────────────── */
    {
      id: "p31", module: "abstracto",
      text: "Si en un código A=1, B=2, C=3… ¿cuál es el valor de la palabra «CAB»?",
      options: ["5", "6", "7", "8"],
      correct: 1,
      explanation: "C=3, A=1, B=2. Total: 3+1+2 = 6."
    },
    {
      id: "p32", module: "abstracto",
      text: "¿Qué número falta? 2, 4, 8, ?, 32, 64",
      options: ["12", "14", "16", "18"],
      correct: 2,
      explanation: "Serie ×2: 2, 4, 8, 16, 32, 64."
    },
    {
      id: "p33", module: "abstracto",
      text: "Si ◆ = 5 y ◆ + ▲ = 12, entonces ▲ × ◆ = ?",
      options: ["25", "30", "35", "60"],
      correct: 2,
      explanation: "▲ = 12 − 5 = 7. ▲ × ◆ = 7 × 5 = 35."
    },
    {
      id: "p34", module: "abstracto",
      text: "Si P implica Q, y Q implica R, y se sabe que P es verdadero, ¿cuál es necesariamente verdadero?",
      options: ["Solo P", "P y Q", "P, Q y R", "Solo R"],
      correct: 2,
      explanation: "Si P → Q → R, y P es verdadero, entonces Q es verdadero y R es verdadero."
    },
    {
      id: "p35", module: "abstracto",
      text: "¿Cuál es el número que no encaja en el grupo: 2, 3, 5, 7, 9, 11?",
      options: ["2", "5", "9", "11"],
      correct: 2,
      explanation: "Todos son primos excepto 9 (9 = 3 × 3)."
    }
  ],

  /* ── Configuración del test aleatorio ─────────────────── */
  randomTestConfig: {
    name: "Simulacro Aleatorio",
    subtitle: "Mixto",
    description: "Test generado aleatoriamente mezclando preguntas de todos los simulacros y del banco extra. Cada intento es diferente.",
    difficulty: "Variable",
    difficultyLevel: 2,
    timeMinutes: 30,
    questionsPerModule: 5
  },

  /* ════════════════════════════════════════════════════════
     TEST 4 — COMPLETO (105 preguntas · 7 módulos × 15)
     Dificultad Medio-Alto · 45 minutos
     Formato oficial de oposición
     ════════════════════════════════════════════════════════ */
  fullExam: {
    id: "test-4",
    name: "Examen Completo",
    subtitle: "Oficial 105 Preguntas",
    description: "Examen tipo oficial con 15 preguntas por cada uno de los 7 módulos. Formato fiel al proceso de selección de Tropa y Marinería. Dificultad medio-alta.",
    difficulty: "Medio-Alto",
    difficultyLevel: 3,
    timeMinutes: 45,
    memoryContext: {
      title: "OPERACIÓN TRAMONTANA — Datos para memorizar",
      duration: 90,
      text: "Lee con atención y memoriza la siguiente información. Dispondrás de 90 segundos.\n\n" +
            "• Fecha: Martes, 11 de octubre. Hora de inicio: 06:45.\n" +
            "• Unidad: 2ª Compañía, Regimiento de Infantería «Garellano» nº 45.\n" +
            "• Comandante: Teniente Coronel Fernando Vidal Ramos.\n" +
            "• Efectivos: 48 soldados + 3 oficiales.\n" +
            "• Vehículos: 4 BMR con matrículas ET-0047, ET-0048, ET-0049 y ET-0050.\n" +
            "• Armamento: fusil HK G36, pistola P8 y lanzagranadas RPG.\n" +
            "• Objetivo: asegurar el perímetro en coordenadas 38°N 2°W, sector «Punto Delta».\n" +
            "• Incidencia a las 09:23: el BMR matrícula ET-0049 sufrió pinchazo en neumático trasero izquierdo.\n" +
            "• Retraso por incidencia: 17 minutos.\n" +
            "• Resultado: Éxito. Perímetro asegurado a las 14:10."
    },
    questions: [

      /* ══════════════════════════════════════════════
         MÓDULO 1 — VERBAL (Preguntas 1-15)
         ══════════════════════════════════════════════ */
      {
        id: 1, module: "verbal",
        text: "¿Cuál es el sinónimo de «tenaz»?",
        options: ["Voluble", "Perseverante", "Negligente", "Frívolo"],
        correct: 1,
        explanation: "«Tenaz» significa que persiste firmemente en algo; su sinónimo más cercano es «perseverante»."
      },
      {
        id: 2, module: "verbal",
        text: "Selecciona el antónimo de «diáfano»:",
        options: ["Claro", "Transparente", "Turbio", "Luminoso"],
        correct: 2,
        explanation: "«Diáfano» significa claro, transparente. Su antónimo es «turbio» (opaco, oscuro)."
      },
      {
        id: 3, module: "verbal",
        text: "MÉDICO es a HOSPITAL como SOLDADO es a:",
        options: ["Ejército", "Cuartel", "Fusil", "Uniforme"],
        correct: 1,
        explanation: "El médico trabaja en el hospital; el soldado trabaja y reside en el cuartel."
      },
      {
        id: 4, module: "verbal",
        text: "¿Cuál de estas palabras NO pertenece al mismo campo semántico?",
        options: ["Sable", "Bayoneta", "Lanza", "Barricada"],
        correct: 3,
        explanation: "Sable, bayoneta y lanza son armas. Barricada es una barrera defensiva, no un arma."
      },
      {
        id: 5, module: "verbal",
        text: "Completa la oración: «La misión requería actuar con ______, ya que cada segundo contaba.»",
        options: ["Parsimonia", "Celeridad", "Complacencia", "Desidia"],
        correct: 1,
        explanation: "«Celeridad» significa rapidez y prontitud, la única opción coherente con la urgencia descrita."
      },
      {
        id: 6, module: "verbal",
        text: "¿Cuál es el significado de «ubicuo»?",
        options: ["Único e irrepetible", "Que está o puede estar en varios lugares a la vez", "Oculto y difícil de encontrar", "Extremadamente raro"],
        correct: 1,
        explanation: "«Ubicuo» (del lat. ubique, 'en todas partes') significa que se hace presente en todas partes al mismo tiempo."
      },
      {
        id: 7, module: "verbal",
        text: "Selecciona el antónimo de «férreo»:",
        options: ["Rígido", "Severo", "Flexible", "Obstinado"],
        correct: 2,
        explanation: "«Férreo» significa duro, rígido, inflexible. Su antónimo es «flexible»."
      },
      {
        id: 8, module: "verbal",
        text: "CUCHILLO es a AFILAR como ZAPATO es a:",
        options: ["Calzar", "Lustrar", "Coser", "Vender"],
        correct: 1,
        explanation: "Se afila un cuchillo para mejorar su estado; se lustra un zapato para mejorar su apariencia."
      },
      {
        id: 9, module: "verbal",
        text: "¿Qué forma verbal es INCORRECTA?",
        options: [
          "El comandante previno al regimiento.",
          "Los soldados detuvieron al sospechoso.",
          "El cabo influyó en la decisión.",
          "La sargento satisfació las exigencias."
        ],
        correct: 3,
        explanation: "La forma correcta es «satisfizo» (pretérito perfecto de «satisfacer»), no «satisfació»."
      },
      {
        id: 10, module: "verbal",
        text: "¿Cuál es el sinónimo de «escueto»?",
        options: ["Detallado", "Conciso", "Prolijo", "Extenso"],
        correct: 1,
        explanation: "«Escueto» significa lacónico, sin adornos. Su sinónimo es «conciso»."
      },
      {
        id: 11, module: "verbal",
        text: "Completa: «El teniente actuó con ______ ante la situación de crisis.»",
        options: ["Parsimonia", "Premura", "Desidia", "Complacencia"],
        correct: 1,
        explanation: "«Premura» significa urgencia y rapidez, apropiada para una situación de crisis."
      },
      {
        id: 12, module: "verbal",
        text: "¿Cuál es el antónimo de «prolífico»?",
        options: ["Abundante", "Fértil", "Estéril", "Productivo"],
        correct: 2,
        explanation: "«Prolífico» significa muy productivo o fecundo. Su antónimo es «estéril»."
      },
      {
        id: 13, module: "verbal",
        text: "¿Cuál de estas palabras es un PARÓNIMO de «aptitud»?",
        options: ["Capacidad", "Destreza", "Actitud", "Habilidad"],
        correct: 2,
        explanation: "«Actitud» y «aptitud» son parónimos: suenan y escriben parecido pero significan cosas distintas."
      },
      {
        id: 14, module: "verbal",
        text: "Selecciona la oración con uso CORRECTO del subjuntivo:",
        options: [
          "Espero que el sargento llega pronto.",
          "Aunque llueva, saldremos de marcha.",
          "Quiero que tú vas al campamento.",
          "Si habría sabido, no habría venido."
        ],
        correct: 1,
        explanation: "«Aunque llueva» usa correctamente el subjuntivo para expresar una concesión hipotética."
      },
      {
        id: 15, module: "verbal",
        text: "¿Cuál es el significado de «acérrimo»?",
        options: [
          "Moderado en sus opiniones",
          "Indiferente ante las causas",
          "Extremadamente firme e intransigente",
          "Pacífico y tolerante"
        ],
        correct: 2,
        explanation: "«Acérrimo» significa muy apasionado, firme e intransigente en sus posiciones o aficiones."
      },

      /* ══════════════════════════════════════════════
         MÓDULO 2 — ESPACIAL (Preguntas 16-30)
         ══════════════════════════════════════════════ */
      {
        id: 16, module: "espacial",
        text: "En un cubo de 3×3×3 pintado por el exterior, ¿cuántos cubos pequeños tienen exactamente 3 caras pintadas?",
        options: ["4", "6", "8", "12"],
        correct: 2,
        explanation: "Los cubos con 3 caras pintadas están en las esquinas del cubo grande. Un cubo tiene 8 esquinas."
      },
      {
        id: 17, module: "espacial",
        text: "Una hoja cuadrada se dobla dos veces por la mitad (quedando en cuartos). Se recorta un triángulo en una esquina. Al desdoblar completamente, ¿cuántos triángulos aparecen?",
        options: ["1", "2", "4", "8"],
        correct: 2,
        explanation: "Al doblar dos veces se superponen 4 capas. Un corte en una esquina genera 4 triángulos al desdoblar."
      },
      {
        id: 18, module: "espacial",
        text: "¿Cuántas aristas tiene una pirámide de base pentagonal?",
        options: ["5", "8", "10", "12"],
        correct: 2,
        explanation: "Base pentagonal: 5 aristas de la base + 5 aristas laterales = 10 aristas en total."
      },
      {
        id: 19, module: "espacial",
        text: "Si giras la letra «S» exactamente 180°, ¿qué obtienes?",
        options: [
          "La misma letra «S»",
          "Una «Z»",
          "Una «S» espejada horizontalmente",
          "Un símbolo irreconocible"
        ],
        correct: 0,
        explanation: "La «S» tiene simetría rotacional de 180°: al girarla, se obtiene la misma «S»."
      },
      {
        id: 20, module: "espacial",
        text: "Visto desde arriba ofrece un círculo; visto desde el frente ofrece un rectángulo. ¿Qué objeto es?",
        options: ["Una esfera", "Un cubo", "Un cono", "Un cilindro"],
        correct: 3,
        explanation: "Un cilindro visto desde arriba es un círculo y visto desde el frente es un rectángulo."
      },
      {
        id: 21, module: "espacial",
        text: "¿Qué letra mayúscula tiene TANTO eje de simetría vertical COMO horizontal?",
        options: ["E", "H", "D", "B"],
        correct: 1,
        explanation: "La «H» tiene simetría vertical (mitades izquierda/derecha iguales) y horizontal (mitades superior/inferior iguales)."
      },
      {
        id: 22, module: "espacial",
        text: "¿Cuántas caras tiene un octaedro regular?",
        options: ["6", "8", "10", "12"],
        correct: 1,
        explanation: "Un octaedro regular tiene 8 caras triangulares equiláteras."
      },
      {
        id: 23, module: "espacial",
        text: "Un cohete apunta hacia ARRIBA. Si se rota 90° en sentido antihorario, ¿hacia dónde apunta la punta?",
        options: ["Abajo", "A la izquierda", "A la derecha", "Sigue apuntando arriba"],
        correct: 2,
        explanation: "Al rotar 90° en sentido antihorario, lo que apuntaba hacia arriba pasa a apuntar hacia la derecha."
      },
      {
        id: 24, module: "espacial",
        text: "¿Cuántos vértices tiene un prisma hexagonal?",
        options: ["6", "8", "10", "12"],
        correct: 3,
        explanation: "Un prisma hexagonal tiene 6 vértices en la base superior + 6 en la base inferior = 12 vértices."
      },
      {
        id: 25, module: "espacial",
        text: "Si la letra «N» se refleja en un espejo vertical, ¿qué se obtiene?",
        options: ["La misma N", "Una N invertida horizontalmente (И)", "Una Z", "Una M"],
        correct: 1,
        explanation: "Un espejo vertical invierte izquierda/derecha: la «N» se convierte en su imagen especular (И)."
      },
      {
        id: 26, module: "espacial",
        text: "¿Cuántas diagonales tiene un hexágono regular?",
        options: ["6", "8", "9", "12"],
        correct: 2,
        explanation: "Fórmula: n(n−3)/2 = 6×3/2 = 9 diagonales."
      },
      {
        id: 27, module: "espacial",
        text: "Una figura plana en forma de cruz (1 cuadrado central y 4 en los bordes) se pliega. ¿Qué figura 3D se forma?",
        options: ["Un cubo completo", "Una pirámide", "Una caja abierta sin tapa", "Un prisma triangular"],
        correct: 2,
        explanation: "5 cuadrados en cruz: el central es la base y los 4 laterales forman las paredes → caja abierta sin tapa."
      },
      {
        id: 28, module: "espacial",
        text: "¿Cuántos ejes de simetría tiene un triángulo equilátero?",
        options: ["1", "2", "3", "6"],
        correct: 2,
        explanation: "Un triángulo equilátero tiene 3 ejes de simetría, uno por cada vértice hacia el lado opuesto."
      },
      {
        id: 29, module: "espacial",
        text: "Un cubo de 3×3×3 pintado por fuera: ¿cuántos cubos pequeños tienen exactamente 2 caras pintadas?",
        options: ["8", "12", "16", "24"],
        correct: 1,
        explanation: "Los cubos con 2 caras pintadas están en las aristas (sin esquinas). Un cubo tiene 12 aristas, cada una con 1 cubo pequeño interior = 12."
      },
      {
        id: 30, module: "espacial",
        text: "Si una figura de flecha apunta a la DERECHA y se gira 180°, ¿hacia dónde apunta?",
        options: ["Derecha", "Izquierda", "Arriba", "Abajo"],
        correct: 1,
        explanation: "Una rotación de 180° invierte completamente la dirección: la derecha pasa a ser izquierda."
      },

      /* ══════════════════════════════════════════════
         MÓDULO 3 — PERCEPCIÓN (Preguntas 31-45)
         ══════════════════════════════════════════════ */
      {
        id: 31, module: "percepcion",
        text: "Cuenta las letras «A» en la siguiente cadena:\nPALANCA MARCAR CABANA SALAN CARACAL",
        options: ["10", "11", "12", "13"],
        correct: 3,
        explanation: "PALANCA(3A) + MARCAR(2A) + CABANA(3A) + SALAN(2A) + CARACAL(3A) = 13 letras A."
      },
      {
        id: 32, module: "percepcion",
        text: "En la secuencia «5 3 8 · 5 3 8 · 5 3 9 · 5 3 8 · 5 3 8», ¿cuántas veces aparece la combinación «5 3 8» de forma consecutiva?",
        options: ["3", "4", "5", "6"],
        correct: 1,
        explanation: "La combinación «5 3 8» aparece en los grupos 1º, 2º, 4º y 5º. El 3º grupo tiene «5 3 9». Total: 4 veces."
      },
      {
        id: 33, module: "percepcion",
        text: "¿Cuál de las siguientes secuencias es DIFERENTE a las demás?\nA) KMPRT\nB) KMPRT\nC) KMPRT\nD) KMPPT",
        options: ["Secuencia A", "Secuencia B", "Secuencia C", "Secuencia D"],
        correct: 3,
        explanation: "La secuencia D tiene «PP» en lugar de «PR»."
      },
      {
        id: 34, module: "percepcion",
        text: "En el texto «2024 ALFA-7 · 2024 ALFA-7 · 2024 ALFA-7 · 2025 ALFA-7», ¿en qué grupo hay un error?",
        options: ["El primero", "El segundo", "El tercero", "El cuarto"],
        correct: 3,
        explanation: "El cuarto grupo tiene «2025» en lugar de «2024»."
      },
      {
        id: 35, module: "percepcion",
        text: "¿Cuántos números IMPARES hay en la siguiente serie?\n3 7 12 5 18 9 14 11 6 7 3 8 5 2 9",
        options: ["7", "8", "9", "10"],
        correct: 2,
        explanation: "Impares: 3, 7, 5, 9, 11, 7, 3, 5, 9 = 9 números impares."
      },
      {
        id: 36, module: "percepcion",
        text: "Observa la secuencia: ★☆★☆★★☆★☆★\n¿En qué posición se rompe el patrón «★☆»?",
        options: ["5ª posición", "6ª posición", "7ª posición", "8ª posición"],
        correct: 1,
        explanation: "El patrón es ★☆ alternando. En la posición 6ª debería haber ☆ pero hay ★."
      },
      {
        id: 37, module: "percepcion",
        text: "¿Cuántas veces aparece el dígito «7» en la siguiente serie?\n17 · 27 · 71 · 7 · 37 · 73 · 77 · 7 · 17 · 7",
        options: ["9", "10", "11", "12"],
        correct: 2,
        explanation: "17(1), 27(1), 71(1), 7(1), 37(1), 73(1), 77(2), 7(1), 17(1), 7(1) = 11 dígitos 7."
      },
      {
        id: 38, module: "percepcion",
        text: "¿Cuál de estas matrículas es DISTINTA a las demás?\nA) 7428-GHK\nB) 7428-GHK\nC) 7428-GKH\nD) 7428-GHK",
        options: ["Matrícula A", "Matrícula B", "Matrícula C", "Matrícula D"],
        correct: 2,
        explanation: "La matrícula C tiene las letras en diferente orden: GKH en lugar de GHK."
      },
      {
        id: 39, module: "percepcion",
        text: "¿Qué número aparece MÁS VECES en la serie?\n8 3 5 8 2 9 3 8 5 1 3 8 9 2 8",
        options: ["3", "5", "8", "9"],
        correct: 2,
        explanation: "El 8 aparece 5 veces: posiciones 1, 4, 8, 12 y 15."
      },
      {
        id: 40, module: "percepcion",
        text: "El patrón es «P Q R S». En la secuencia «P Q R S · P Q R S · P Q R T · P Q R S», ¿en qué grupo hay un error?",
        options: ["El primero", "El segundo", "El tercero", "El cuarto"],
        correct: 2,
        explanation: "El tercer grupo tiene «T» en lugar de «S» al final."
      },
      {
        id: 41, module: "percepcion",
        text: "Cuenta los símbolos ◆ (rellenos) en la cadena:\n◆◇◆◇◇◆◇◆◇◆◆◇",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation: "Los ◆ están en las posiciones 1, 3, 6, 8, 10, 11 = 6 total.\nEspera: ◆(1)◇◆(2)◇◇◆(3)◇◆(4)◇◆(5)◆(6)◇ = 6."
      },
      {
        id: 42, module: "percepcion",
        text: "En «ALFA BRAVO · ALFA BRAVO · ALFA BRAVO · ALFA CHARLIE · ALFA BRAVO · ALFA BRAVO», ¿cuántas veces aparece el par «ALFA BRAVO» consecutivo?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation: "Pares ALFA BRAVO: grupos 1-2, 2-3, 5-6 y... contando pares: 1º✓, 2º✓, 3º✓, 4º✗(Charlie), 5º✓, 6º✓ = 5 veces."
      },
      {
        id: 43, module: "percepcion",
        text: "¿Cuántas veces aparece el símbolo «@» en la cadena?\n@$#@*@$@#*$@&@$#*@",
        options: ["5", "6", "7", "8"],
        correct: 2,
        explanation: "@(1)$#@(2)*@(3)$@(4)#*$@(5)&@(6)$#*@(7) = 7 veces."
      },
      {
        id: 44, module: "percepcion",
        text: "En la serie numérica «1 3 2 4 3 5 4 6 5 7», ¿cuántos números aparecen MÁS de una vez?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "Aparecen más de una vez: 3 (posiciones 2 y 5), 4 (posiciones 4 y 7) y 5 (posiciones 6 y 9) = 3 números."
      },
      {
        id: 45, module: "percepcion",
        text: "¿En cuál de estas filas NO hay ningún número par?\nA) 3 7 9 11 15\nB) 3 7 9 12 15\nC) 3 7 10 11 15\nD) 2 7 9 11 15",
        options: ["Fila A", "Fila B", "Fila C", "Fila D"],
        correct: 0,
        explanation: "La Fila A (3 7 9 11 15) contiene únicamente números impares."
      },

      /* ══════════════════════════════════════════════
         MÓDULO 4 — NUMÉRICO (Preguntas 46-60)
         ══════════════════════════════════════════════ */
      {
        id: 46, module: "numerico",
        text: "¿Cuál es el siguiente número en la serie: 3, 7, 15, 31, 63, …?",
        options: ["124", "125", "126", "127"],
        correct: 3,
        explanation: "Cada término = anterior × 2 + 1. 63 × 2 + 1 = 127."
      },
      {
        id: 47, module: "numerico",
        text: "Un vehículo consume 12 litros cada 100 km. Si el depósito tiene 60 litros, ¿qué distancia máxima puede recorrer?",
        options: ["400 km", "450 km", "500 km", "600 km"],
        correct: 2,
        explanation: "60 ÷ 12 × 100 = 500 km."
      },
      {
        id: 48, module: "numerico",
        text: "El 30% de un batallón de 400 soldados ha completado el curso de paracaidismo. ¿Cuántos soldados más se necesitan para llegar al 50%?",
        options: ["60", "70", "80", "90"],
        correct: 2,
        explanation: "30% × 400 = 120. 50% × 400 = 200. Faltan: 200 − 120 = 80."
      },
      {
        id: 49, module: "numerico",
        text: "¿Cuál es el siguiente número en la serie: 1, 4, 10, 20, 35, …?",
        options: ["52", "54", "56", "60"],
        correct: 2,
        explanation: "Diferencias: +3, +6, +10, +15, +21. 35 + 21 = 56."
      },
      {
        id: 50, module: "numerico",
        text: "Si 6 soldados montan guardia en 4 horas, ¿cuántos soldados se necesitan para hacerlo en 3 horas?",
        options: ["7", "8", "9", "10"],
        correct: 1,
        explanation: "Proporcionalidad inversa: 6 × 4 = x × 3 → x = 8 soldados."
      },
      {
        id: 51, module: "numerico",
        text: "Calcula la media aritmética de: 45, 67, 32, 89, 52, 75",
        options: ["58", "60", "62", "65"],
        correct: 1,
        explanation: "(45+67+32+89+52+75) ÷ 6 = 360 ÷ 6 = 60."
      },
      {
        id: 52, module: "numerico",
        text: "Un soldado corre 1200 m en 4 min 48 s. ¿Cuál es su velocidad media en km/h?",
        options: ["12 km/h", "14 km/h", "15 km/h", "18 km/h"],
        correct: 2,
        explanation: "4 min 48 s = 4,8 min = 0,08 h. 1,2 km ÷ 0,08 h = 15 km/h."
      },
      {
        id: 53, module: "numerico",
        text: "¿Cuál es el siguiente número en la serie: 100, 91, 83, 76, 70, 65, …?",
        options: ["59", "60", "61", "62"],
        correct: 2,
        explanation: "Diferencias decrecientes: −9, −8, −7, −6, −5, −4. 65 − 4 = 61."
      },
      {
        id: 54, module: "numerico",
        text: "Un equipo de 4 operarios tarda 9 días en completar una obra. ¿Cuánto tardarán 6 operarios?",
        options: ["5 días", "6 días", "7 días", "8 días"],
        correct: 1,
        explanation: "Proporcionalidad inversa: 4 × 9 = 6 × x → x = 6 días."
      },
      {
        id: 55, module: "numerico",
        text: "¿Cuánto es el 15% de 340?",
        options: ["48", "51", "54", "57"],
        correct: 1,
        explanation: "340 × 0,15 = 51."
      },
      {
        id: 56, module: "numerico",
        text: "Un artículo cuesta 120 € antes de aplicar un IVA del 21%. ¿Cuál es el precio final?",
        options: ["141,60 €", "143,20 €", "145,20 €", "147,60 €"],
        correct: 2,
        explanation: "120 × 1,21 = 145,20 €."
      },
      {
        id: 57, module: "numerico",
        text: "¿Cuál es el siguiente número en la serie de números primos: 2, 3, 5, 7, 11, 13, …?",
        options: ["14", "15", "16", "17"],
        correct: 3,
        explanation: "Los números primos son: 2, 3, 5, 7, 11, 13, 17 (17 solo es divisible entre 1 y 17)."
      },
      {
        id: 58, module: "numerico",
        text: "En un depósito con 480 litros se filtran 12 litros por hora. ¿En cuántas horas quedará vacío?",
        options: ["35", "38", "40", "42"],
        correct: 2,
        explanation: "480 ÷ 12 = 40 horas."
      },
      {
        id: 59, module: "numerico",
        text: "Calcula: 3/4 + 1/6",
        options: ["4/5", "11/12", "10/12", "5/6"],
        correct: 1,
        explanation: "MCM(4,6)=12. 3/4 = 9/12; 1/6 = 2/12. Suma: 11/12."
      },
      {
        id: 60, module: "numerico",
        text: "La suma de dos números consecutivos es 95. ¿Cuál es el menor?",
        options: ["45", "46", "47", "48"],
        correct: 2,
        explanation: "n + (n+1) = 95 → 2n = 94 → n = 47."
      },

      /* ══════════════════════════════════════════════
         MÓDULO 5 — MECÁNICO (Preguntas 61-75)
         ══════════════════════════════════════════════ */
      {
        id: 61, module: "mecanico",
        text: "El engranaje A tiene 15 dientes y el B tiene 45. Si A da 3 vueltas, ¿cuántas da B?",
        options: ["1 vuelta", "3 vueltas", "6 vueltas", "9 vueltas"],
        correct: 0,
        explanation: "A avanza 15 × 3 = 45 dientes. B tiene 45 dientes, así que da exactamente 1 vuelta."
      },
      {
        id: 62, module: "mecanico",
        text: "Una palanca de 3 m tiene el fulcro a 1 m de un extremo. Se aplican 60 kg en el extremo corto (1 m). ¿Qué peso máximo puede levantarse en el extremo largo (2 m)?",
        options: ["30 kg", "60 kg", "90 kg", "120 kg"],
        correct: 0,
        explanation: "Ley de la palanca: F₁ × d₁ = F₂ × d₂ → 60 × 1 = F₂ × 2 → F₂ = 30 kg."
      },
      {
        id: 63, module: "mecanico",
        text: "Una polea móvil sostiene un peso de 100 kg. ¿Cuánta fuerza mínima se necesita para levantarlo?",
        options: ["25 kg", "50 kg", "75 kg", "100 kg"],
        correct: 1,
        explanation: "Una polea móvil divide la carga entre 2: se necesitan 50 kg de fuerza."
      },
      {
        id: 64, module: "mecanico",
        text: "Tres recipientes de formas distintas están conectados por la base. Se vierte agua en uno. ¿Qué ocurre?",
        options: [
          "El agua sube más en el recipiente más estrecho",
          "El agua queda solo donde se vertió",
          "El agua alcanza el mismo nivel en todos",
          "El agua sube en los dos recipientes vacíos por igual"
        ],
        correct: 2,
        explanation: "Principio de los vasos comunicantes: el líquido alcanza el mismo nivel en todos los recipientes conectados."
      },
      {
        id: 65, module: "mecanico",
        text: "A mayor profundidad bajo el agua, la presión hidrostática:",
        options: ["Disminuye", "Permanece igual", "Aumenta", "Depende de la temperatura"],
        correct: 2,
        explanation: "La presión hidrostática aumenta proporcionalmente con la profundidad (≈ 1 atm cada 10 m)."
      },
      {
        id: 66, module: "mecanico",
        text: "Un cable metálico se calienta. ¿Qué le ocurre?",
        options: ["Se contrae", "Se dilata", "Permanece igual", "Cambia de propiedades mecánicas solo"],
        correct: 1,
        explanation: "Los metales se dilatan al calentarse (dilatación térmica)."
      },
      {
        id: 67, module: "mecanico",
        text: "En un circuito eléctrico en PARALELO con tres bombillas, si una se funde:",
        options: [
          "Se apagan todas",
          "Las otras dos siguen encendidas",
          "Las otras dos brillan menos",
          "Las otras dos brillan más"
        ],
        correct: 1,
        explanation: "En un circuito en paralelo, cada rama es independiente. Si falla una, las demás siguen funcionando."
      },
      {
        id: 68, module: "mecanico",
        text: "Un objeto flota en el agua cuando:",
        options: [
          "Su peso supera al empuje",
          "Su densidad es mayor que la del agua",
          "Su densidad es menor que la del agua",
          "Tiene una forma plana"
        ],
        correct: 2,
        explanation: "Un objeto flota cuando su densidad media es menor que la del fluido (principio de Arquímedes)."
      },
      {
        id: 69, module: "mecanico",
        text: "Para subir una carga por una rampa con menos fuerza, se debe elegir:",
        options: [
          "Una rampa corta y muy inclinada",
          "Una rampa larga y poco inclinada",
          "Ambas requieren la misma fuerza",
          "El ángulo no tiene efecto en la fuerza"
        ],
        correct: 1,
        explanation: "Una rampa larga y suave (plano inclinado) reduce la fuerza a cambio de mayor distancia recorrida."
      },
      {
        id: 70, module: "mecanico",
        text: "Si se lanza un objeto horizontalmente desde lo alto de un edificio (sin resistencia del aire), ¿qué componente de velocidad aumenta durante la caída?",
        options: ["La horizontal", "La vertical", "Ambas", "Ninguna"],
        correct: 1,
        explanation: "La gravedad solo actúa sobre la componente vertical, acelerándola. La horizontal permanece constante."
      },
      {
        id: 71, module: "mecanico",
        text: "¿Por qué mecanismo se transmite el calor principalmente a través de un metal sólido?",
        options: ["Convección", "Radiación", "Conducción", "Evaporación"],
        correct: 2,
        explanation: "En los sólidos (especialmente metales), el calor se transmite por conducción a través de la red cristalina."
      },
      {
        id: 72, module: "mecanico",
        text: "Si la resistencia de un circuito es 10 Ω y la tensión es 220 V, ¿cuánta corriente circula?",
        options: ["18 A", "20 A", "22 A", "24 A"],
        correct: 2,
        explanation: "Ley de Ohm: I = V/R = 220/10 = 22 A."
      },
      {
        id: 73, module: "mecanico",
        text: "El centro de gravedad de un cuerpo homogéneo de forma regular está:",
        options: [
          "Siempre en el extremo superior",
          "En el centro geométrico del cuerpo",
          "Varía según el peso total",
          "En la base del objeto"
        ],
        correct: 1,
        explanation: "Para un cuerpo homogéneo de forma regular, el centro de gravedad coincide con el centro geométrico."
      },
      {
        id: 74, module: "mecanico",
        text: "En una colisión perfectamente elástica entre dos objetos, ¿qué se conserva?",
        options: [
          "Solo el momento lineal",
          "Solo la energía cinética",
          "Tanto el momento lineal como la energía cinética",
          "Ninguna de las anteriores"
        ],
        correct: 2,
        explanation: "En una colisión perfectamente elástica se conservan tanto el momento lineal como la energía cinética."
      },
      {
        id: 75, module: "mecanico",
        text: "La fuerza de fricción entre dos superficies en contacto depende principalmente de:",
        options: [
          "Solo del área de contacto",
          "Solo del peso del objeto",
          "El coeficiente de rozamiento y la fuerza normal",
          "La velocidad de desplazamiento"
        ],
        correct: 2,
        explanation: "Ff = μ × N. La fricción depende del coeficiente de rozamiento (μ) y la fuerza normal (N), no del área."
      },

      /* ══════════════════════════════════════════════
         MÓDULO 6 — MEMORIA (Preguntas 76-90)
         [Las preguntas se refieren al texto memorizado]
         ══════════════════════════════════════════════ */
      {
        id: 76, module: "memoria",
        text: "¿En qué día de la semana se realizó la Operación Tramontana?",
        options: ["Lunes", "Martes", "Miércoles", "Jueves"],
        correct: 1,
        explanation: "Según el informe, la operación se realizó el martes 11 de octubre."
      },
      {
        id: 77, module: "memoria",
        text: "¿A qué hora comenzó la Operación Tramontana?",
        options: ["06:15", "06:30", "06:45", "07:00"],
        correct: 2,
        explanation: "La hora de inicio fue las 06:45."
      },
      {
        id: 78, module: "memoria",
        text: "¿Cuál era el NOMBRE DE PILA del comandante de la operación?",
        options: ["Alejandro", "Fernando", "Manuel", "Carlos"],
        correct: 1,
        explanation: "El comandante era el Teniente Coronel Fernando Vidal Ramos."
      },
      {
        id: 79, module: "memoria",
        text: "¿A qué regimiento pertenecía la unidad?",
        options: [
          "Regimiento de Infantería «Covadonga» nº 40",
          "Regimiento de Infantería «Garellano» nº 45",
          "Regimiento de Infantería «Galicia» nº 64",
          "Regimiento de Infantería «Toledo» nº 35"
        ],
        correct: 1,
        explanation: "La unidad era la 2ª Compañía del Regimiento de Infantería «Garellano» nº 45."
      },
      {
        id: 80, module: "memoria",
        text: "¿Cuántos soldados (sin contar oficiales) participaron en la operación?",
        options: ["42", "45", "48", "51"],
        correct: 2,
        explanation: "Participaron 48 soldados más 3 oficiales."
      },
      {
        id: 81, module: "memoria",
        text: "¿Cuántos BMR fueron asignados a la operación?",
        options: ["2", "3", "4", "5"],
        correct: 2,
        explanation: "Se asignaron 4 BMR con matrículas ET-0047, ET-0048, ET-0049 y ET-0050."
      },
      {
        id: 82, module: "memoria",
        text: "¿Qué matrícula tenía el BMR que sufrió la incidencia?",
        options: ["ET-0047", "ET-0048", "ET-0049", "ET-0050"],
        correct: 2,
        explanation: "El BMR con matrícula ET-0049 sufrió el pinchazo."
      },
      {
        id: 83, module: "memoria",
        text: "¿A qué hora se registró la incidencia?",
        options: ["08:15", "09:23", "09:45", "10:17"],
        correct: 1,
        explanation: "La incidencia se registró a las 09:23."
      },
      {
        id: 84, module: "memoria",
        text: "¿Qué tipo de incidencia se produjo?",
        options: [
          "Avería mecánica del motor",
          "Pinchazo en un neumático",
          "Fallo eléctrico del sistema",
          "Colisión con otro vehículo"
        ],
        correct: 1,
        explanation: "El BMR sufrió un pinchazo en el neumático trasero izquierdo."
      },
      {
        id: 85, module: "memoria",
        text: "¿En qué neumático se produjo el pinchazo?",
        options: ["Delantero derecho", "Trasero derecho", "Delantero izquierdo", "Trasero izquierdo"],
        correct: 3,
        explanation: "El pinchazo fue en el neumático trasero izquierdo."
      },
      {
        id: 86, module: "memoria",
        text: "¿Cuánto tiempo duró el retraso causado por la incidencia?",
        options: ["12 minutos", "15 minutos", "17 minutos", "20 minutos"],
        correct: 2,
        explanation: "El retraso fue de 17 minutos."
      },
      {
        id: 87, module: "memoria",
        text: "¿En qué coordenadas se encontraba la zona de exclusión?",
        options: ["38°N 3°W", "38°N 2°W", "39°N 2°W", "37°N 2°W"],
        correct: 1,
        explanation: "Las coordenadas eran 38°N 2°W."
      },
      {
        id: 88, module: "memoria",
        text: "¿Cómo se denominaba el sector del objetivo?",
        options: ["Punto Alfa", "Punto Bravo", "Punto Charlie", "Punto Delta"],
        correct: 3,
        explanation: "El sector objetivo se denominaba «Punto Delta»."
      },
      {
        id: 89, module: "memoria",
        text: "¿A qué hora quedó asegurado el perímetro al final de la operación?",
        options: ["13:45", "14:00", "14:10", "14:30"],
        correct: 2,
        explanation: "El perímetro quedó asegurado a las 14:10."
      },
      {
        id: 90, module: "memoria",
        text: "¿Cuántos oficiales participaron en la Operación Tramontana?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "Participaron 3 oficiales además de los 48 soldados."
      },

      /* ══════════════════════════════════════════════
         MÓDULO 7 — ABSTRACTO (Preguntas 91-105)
         ══════════════════════════════════════════════ */
      {
        id: 91, module: "abstracto",
        text: "¿Cuál es el siguiente término en la serie: A1, C3, E5, G7, …?",
        options: ["H8", "H9", "I8", "I9"],
        correct: 3,
        explanation: "Las letras avanzan de 2 en 2 (A, C, E, G, I) y los números son impares consecutivos (1, 3, 5, 7, 9). Siguiente: I9."
      },
      {
        id: 92, module: "abstracto",
        text: "En un código: A=1, B=2, C=3, D=4, E=5. Si BECA = 2531, ¿cómo se codifica CEDA?",
        options: ["3514", "3541", "4531", "5341"],
        correct: 1,
        explanation: "C=3, E=5, D=4, A=1 → CEDA = 3541."
      },
      {
        id: 93, module: "abstracto",
        text: "Si todos los XENOS son RALOS y algunos RALOS son MITOS, ¿qué afirmación es NECESARIAMENTE verdadera?",
        options: [
          "Todos los XENOS son MITOS",
          "Ningún XENO es MITO",
          "Algunos XENOS podrían ser MITOS",
          "Todos los MITOS son XENOS"
        ],
        correct: 2,
        explanation: "Como todos los XENOS son RALOS y ALGUNOS ralos son mitos, es posible (no seguro) que algunos XENOS sean MITOS."
      },
      {
        id: 94, module: "abstracto",
        text: "¿Qué número falta en la serie: 4, 9, _, 25, 36?",
        options: ["14", "15", "16", "17"],
        correct: 2,
        explanation: "Son cuadrados perfectos: 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. Falta 16."
      },
      {
        id: 95, module: "abstracto",
        text: "Pedro es mayor que Luis. Marta es menor que Luis. Carlos es mayor que Pedro. ¿Quién es el MÁS JOVEN?",
        options: ["Pedro", "Luis", "Marta", "Carlos"],
        correct: 2,
        explanation: "Orden: Carlos > Pedro > Luis > Marta. La más joven es Marta."
      },
      {
        id: 96, module: "abstracto",
        text: "¿Cuál es el siguiente número en la serie: 2, 6, 12, 20, 30, …?",
        options: ["36", "38", "40", "42"],
        correct: 3,
        explanation: "Diferencias: +4, +6, +8, +10, +12. El siguiente es 30 + 12 = 42."
      },
      {
        id: 97, module: "abstracto",
        text: "Si LUNA = 3142, ¿cómo se codifica ANAL?",
        options: ["2342", "2423", "4232", "3242"],
        correct: 1,
        explanation: "L=3, U=1, N=4, A=2. ANAL: A(2)N(4)A(2)L(3) = 2423."
      },
      {
        id: 98, module: "abstracto",
        text: "¿Cuál es el número que falta? 81, 27, 9, _, 1",
        options: ["2", "3", "4", "6"],
        correct: 1,
        explanation: "La serie divide entre 3: 81÷3=27, 27÷3=9, 9÷3=3, 3÷3=1. Falta 3."
      },
      {
        id: 99, module: "abstracto",
        text: "Todos los A son B. Todos los B son C. Por lo tanto, necesariamente:",
        options: ["Todos los C son A", "Algunos A son C", "Todos los A son C", "Ningún A es C"],
        correct: 2,
        explanation: "Si A ⊆ B y B ⊆ C, entonces A ⊆ C: todos los A son C."
      },
      {
        id: 100, module: "abstracto",
        text: "¿Cuál es el término que NO corresponde al patrón?\nSerie: 2, 4, 8, 15, 32, 64",
        options: ["4", "8", "15", "32"],
        correct: 2,
        explanation: "La serie es ×2: 2, 4, 8, 16, 32, 64. El término 15 debería ser 16."
      },
      {
        id: 101, module: "abstracto",
        text: "En el código: +=A, −=B, ×=C, /=D. ¿Cómo se escribe BAC?",
        options: ["−+×", "+−×", "×−+", "+×−"],
        correct: 0,
        explanation: "B=−, A=+, C=× → BAC se codifica como −+×."
      },
      {
        id: 102, module: "abstracto",
        text: "El código consiste en escribir la palabra al revés. «GRANDE» → «EDNARG». ¿Cómo se codifica «FUERTE»?",
        options: ["ETRUF", "ETREUF", "FTREUE", "EUTREF"],
        correct: 1,
        explanation: "FUERTE al revés: F-U-E-R-T-E → E-T-R-E-U-F = ETREUF."
      },
      {
        id: 103, module: "abstracto",
        text: "¿Cuál es la figura que continúa la serie? ○ · ○○ · ○○○ · ○○○○ · ?",
        options: ["○○○", "○○○○", "○○○○○", "○○○○○○"],
        correct: 2,
        explanation: "Cada paso añade un círculo más. Tras 4 círculos, siguen 5 círculos."
      },
      {
        id: 104, module: "abstracto",
        text: "Si hay 4 cajas y en cada caja hay 3 bolsas y en cada bolsa hay 2 pelotas, ¿cuántas pelotas hay en total?",
        options: ["18", "20", "24", "28"],
        correct: 2,
        explanation: "4 cajas × 3 bolsas × 2 pelotas = 24 pelotas."
      },
      {
        id: 105, module: "abstracto",
        text: "En una secuencia: el PRIMERO va antes que el SEGUNDO; el TERCERO va después del SEGUNDO pero antes del CUARTO. ¿Cuál es el orden correcto?",
        options: ["1-2-3-4", "1-3-2-4", "2-1-3-4", "3-1-2-4"],
        correct: 0,
        explanation: "1 < 2 < 3 < 4. El orden correcto es 1-2-3-4."
      }

    ]
  }
};

