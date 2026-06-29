/* ============================================================
   api/generate-test.js — Vercel Serverless Function
   Llama a Google Gemini para generar un test psicotécnico
   completo de 7 módulos con la dificultad y extensión elegidas.
   ============================================================ */

export default async function handler(req, res) {
  // ── CORS (para GitHub Pages o cualquier origen) ──────────
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // ── Validar API Key ──────────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "GEMINI_API_KEY no configurada en el servidor." });
  }

  // ── Parámetros del cliente ───────────────────────────────────
  const {
    difficulty = "media-alta",
    questionsPerModule = 5,
  } = req.body || {};

  const qpm = Math.min(5, Math.max(3, parseInt(questionsPerModule) || 5));
  const totalTime = Math.round((qpm * 7 * 55) / 105); // proporcional

  // ── Prompt de alta calidad ───────────────────────────────
  const prompt = buildPrompt(difficulty, qpm, totalTime);

  // ── Llamada a Gemini 2.5 Flash ───────────────────────────
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
    apiKey;

  let geminiResponse;
  try {
    geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          responseMimeType: "application/json",
        },
      }),
    });
  } catch (networkErr) {
    return res
      .status(502)
      .json({ error: "No se pudo conectar con la IA. Inténtalo de nuevo." });
  }

  if (!geminiResponse.ok) {
    const errText = await geminiResponse.text().catch(() => "");
    console.error("Gemini error:", geminiResponse.status, errText);
    return res.status(502).json({
      error: `Error de la IA (${geminiResponse.status}). Comprueba la API Key.`,
    });
  }

  let geminiData;
  try {
    geminiData = await geminiResponse.json();
  } catch {
    return res.status(502).json({ error: "Respuesta inválida de la IA." });
  }

  const rawText =
    geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    return res
      .status(502)
      .json({ error: "La IA no devolvió contenido. Inténtalo de nuevo." });
  }

  // ── Parsear y validar el JSON generado ───────────────────
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch {
    // Si falla el parse directo, intentar extraer JSON de bloques markdown
    const match = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) {
      try {
        parsed = JSON.parse(match[1].trim());
      } catch {
        return res
          .status(502)
          .json({ error: "El formato de respuesta de la IA no es válido." });
      }
    } else {
      return res
        .status(502)
        .json({ error: "No se pudo interpretar la respuesta de la IA." });
    }
  }

  // ── Validar estructura mínima ────────────────────────────
  if (!parsed.questions || !Array.isArray(parsed.questions)) {
    return res
      .status(502)
      .json({ error: "La IA no generó las preguntas correctamente." });
  }

  const modules = [
    "verbal",
    "espacial",
    "percepcion",
    "numerico",
    "mecanico",
    "memoria",
    "abstracto",
  ];

  // Asignar IDs y asegurar módulo válido
  parsed.questions = parsed.questions.map((q, i) => ({
    ...q,
    id: i + 1,
    module: modules.includes(q.module) ? q.module : modules[i % 7],
    correct:
      typeof q.correct === "number" ? Math.max(0, Math.min(3, q.correct)) : 0,
  }));

  // ── Construir objeto test completo ───────────────────────
  const difficultyLabel = {
    media: "Media",
    "media-alta": "Media-Alta",
    alta: "Alta",
  }[difficulty] || "Media-Alta";

  const timestamp = Date.now();
  const test = {
    id: `test-ai-${timestamp}`,
    name: `Test IA #${new Date().toLocaleDateString("es-ES")}`,
    subtitle: `Dificultad ${difficultyLabel} · ${qpm * 7} preguntas`,
    description: `Test generado por Inteligencia Artificial (Gemini 2.5 Flash). ${qpm} preguntas por módulo, dificultad ${difficultyLabel.toLowerCase()}.`,
    difficulty: difficultyLabel,
    difficultyLevel: difficulty === "alta" ? 3 : difficulty === "media-alta" ? 2 : 1,
    timeMinutes: totalTime,
    memoryContext: parsed.memoryContext || null,
    questions: parsed.questions,
    isAI: true,
  };

  return res.status(200).json(test);
}


/* ── Prompt experto ──────────────────────────────────────── */
function buildPrompt(difficulty, qpm, totalTime) {
  const diffMap = {
    media: "nivel medio, accesible pero no trivial. Las preguntas deben requerir razonamiento pero no conocimientos muy especializados.",
    "media-alta":
      "nivel medio-alto, similar a los exámenes reales de oposición. Deben requerir concentración, razonamiento lógico y cálculo mental.",
    alta: "nivel alto, propio de candidatos bien preparados. Las preguntas deben ser exigentes, con opciones de respuesta que se parezcan entre sí y que requieran precisión.",
  };

  const diffInstructions = diffMap[difficulty] || diffMap["media-alta"];

  return `Eres un preparador experto en oposiciones militares españolas, especializado en pruebas psicotécnicas para el acceso a Tropa y Marinería del Ejército de España.

Tu tarea es generar un EXAMEN PSICOTÉCNICO COMPLETO de ${diffInstructions}

## ESTRUCTURA REQUERIDA
- 7 módulos exactos: verbal, espacial, percepcion, numerico, mecanico, memoria, abstracto
- EXACTAMENTE ${qpm} preguntas por módulo = ${qpm * 7} preguntas en total
- Las preguntas de MEMORIA deben ser AUTOCONTENIDAS (que incluyan en el enunciado toda la información necesaria para responder)
- Cada pregunta: 4 opciones (A, B, C, D) con EXACTAMENTE 1 correcta
- La clave "correct" es el ÍNDICE (0=A, 1=B, 2=C, 3=D)

## ESPECIFICACIONES POR MÓDULO

### VERBAL (${qpm} preguntas)
Mezcla variada de:
- Analogías verbales (ej: "Médico es a Hospital como Maestro es a ___")
- Antónimos y sinónimos con palabras de nivel B2-C1
- Comprensión de proverbios o frases
- Detección del término que no pertenece a una categoría
- Ordenación lógica de palabras para formar frases
- Completar frases con la palabra correcta

### ESPACIAL (${qpm} preguntas)
Preguntas TEXTUALES sobre:
- Rotaciones de figuras geométricas (descritas verbalmente)
- Cubos y sus caras (cuántas caras son visibles, qué cara queda enfrente)
- Figuras dobladas (si se dobla un papel con esta forma, ¿qué figura resulta?)
- Desarrollo plano de sólidos geométricos
- Simetría y reflexión de formas
Describe CLARAMENTE las figuras con texto, ya que no puedes usar imágenes.

### PERCEPCION (${qpm} preguntas)
- Series alfanuméricas con errores (ej: "a1b2c3d5 — ¿qué número está mal?")
- Comparar dos listas de datos (nombres, números, fechas) e identificar diferencias
- Encontrar el elemento diferente en una serie
- Conteo de elementos en listas desordenadas
- Identificar patrones en secuencias de símbolos (descritos con texto)
- Velocidad perceptiva: ¿cuántas veces aparece la letra X en esta secuencia?

### NUMERICO (${qpm} preguntas)
- Operaciones encadenadas de cálculo mental
- Series numéricas (encontrar el siguiente número)
- Problemas de porcentajes, proporciones y regla de tres
- Problemas de velocidad, distancia y tiempo
- Ecuaciones simples y sistemas de 2 ecuaciones
- Combinatoria básica y probabilidad simple
- Potencias y raíces cuadradas
Todos los cálculos deben ser realizables mentalmente o con operaciones cortas.

### MECANICO (${qpm} preguntas)
- Palancas: si una fuerza en un punto, ¿qué ocurre en otro?
- Poleas y sistemas de poleas simples
- Engranajes: velocidad y dirección de rotación
- Vasos comunicantes y principio de Arquímedes (flotabilidad)
- Circuitos eléctricos simples (serie/paralelo, voltaje, intensidad)
- Principios de física básica: rozamiento, inercia, presión
- Hidráulica simple: si aumenta la presión en un punto...

### MEMORIA (${qpm} preguntas)
IMPORTANTE: Cada pregunta de memoria debe ser AUTOCONTENIDA.
Formato: el enunciado presenta una pequeña historia o lista de datos (3-5 datos clave) y luego hace una pregunta sobre esos datos.
Ejemplo de estructura: "María tiene 32 años, trabaja de lunes a viernes, vive en el 3º B y tiene un perro llamado Toby. ¿En qué planta vive María?"
Varía los contextos: personajes militares ficticios, misiones, equipos, horarios, coordenadas, matrículas, etc.

### ABSTRACTO (${qpm} preguntas)
Preguntas TEXTUALES sobre:
- Series de figuras/patrones (descritos textualmente: círculo, triángulo, cuadrado, ...)
- Si la figura A tiene relación X con la figura B, ¿qué relación tiene la figura C con ___?
- Matrices de figuras (describe las reglas del patrón y pide el elemento faltante)
- Razonamiento inductivo (¿qué regla siguen estos elementos?)
- Clasificación por propiedades abstractas

## REGLAS DE CALIDAD
1. VARIEDAD: No repitas el mismo subtipo de pregunta más de 3 veces seguidas en un módulo
2. OPCIONES CREÍBLES: Los distractores (respuestas incorrectas) deben ser plausibles, no absurdos
3. DIFICULTAD GRADUAL: Empieza con preguntas ligeramente más fáciles y aumenta la dificultad
4. EXPLICACIÓN CLARA: Cada pregunta tiene una explicación breve (1-2 frases) que justifica la respuesta correcta
5. ESPAÑOL CORRECTO: Gramática y ortografía perfectas, vocabulario propio de exámenes oficiales
6. SIN AMBIGÜEDAD: La respuesta correcta debe ser indiscutiblemente la única correcta

## CONTEXTO DE MEMORIA (para el módulo memoria)
Genera también un objeto "memoryContext" con un texto de 100-150 palabras que describa datos de una situación militar ficticia (personajes, números de unidad, misión, fechas, coordenadas ficticias). Las últimas ${Math.ceil(qpm / 3)} preguntas del módulo memoria deben ser sobre ESTE contexto (el resto son autocontenidas).

Genera el resultado en formato JSON puro.
ESTRUCTURA DEL JSON (imprescindible que sea idéntica a esta):
{
  "memoryContext": {
    "title": "Título del contexto",
    "text": "Texto del contexto...",
    "duration": 5
  },
  "questions": [
    {
      "module": "verbal",
      "text": "Pregunta...",
      "options": ["Opcion A", "Opcion B", "Opcion C", "Opcion D"],
      "correct": 0,
      "explanation": "Explicación breve"
    }
  ]
}

No incluyas markdown, genera solo el JSON válido.`;
}
