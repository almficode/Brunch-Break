/**
 * THE BRUNCH BREAK — asistente de IA (backend).
 * Función serverless de Vercel (Node.js, sin dependencias npm: usa fetch,
 * disponible de forma nativa en el runtime de Node 18+ de Vercel). Recibe
 * la pregunta del visitante desde js/chat-widget.js, llama a la API de
 * OpenAI usando la clave guardada en la variable de entorno
 * OPENAI_API_KEY (nunca expuesta al navegador) y devuelve la respuesta.
 *
 * Setup: en el panel de Vercel del proyecto, Settings → Environment
 * Variables → añadir OPENAI_API_KEY con tu clave de platform.openai.com,
 * y volver a desplegar. No hace falta tocar nada más de este archivo.
 */

const MODEL = "gpt-4o-mini";
const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_MESSAGES = 12;
const MAX_TOKENS = 400;

// Hechos reales del negocio, extraídos del propio contenido de la web.
// Esto es lo que hace que el asistente "conozca la web": en vez de
// intentar leerla en vivo en cada petición (lento y frágil), se le pasa
// como contexto ya redactado, así las respuestas son fiables y rápidas.
// Si cambian datos del negocio (horario, dirección, carta...), hay que
// actualizarlos aquí también.
const BUSINESS_CONTEXT = `
Nombre: The Brunch Break
Ubicación: Arrecife, Lanzarote, Islas Canarias, España
Eslogan: "Tu brunch, tu momento."
Horario: lunes a domingo, 7:30 a 17:00
Fit & Go (bowls y almuerzos ligeros para llevar): listos entre las 8:30 y las 15:00
Carta completa (con precios y alérgenos), siempre actualizada: https://smartmenu.agorapos.com/?id=502djxab%23%2F
Instagram: @the_brunch_break (https://www.instagram.com/the_brunch_break/)
TripAdvisor: buscar "The Brunch Break Arrecife"
Fundadora y CEO: Miss Loan Ho — creadora de conceptos, marcas y experiencias

Qué ofrecen (categorías de la carta):
- Brunch de autor: huevos, tostas de pan de masa madre propio y platos que reinventan el brunch clásico con acento canario
- Fit & Go: bowls y almuerzos ligeros para llevar, con proteína, vegetales de temporada y salsa propia
- Bakery & Coffee: café de especialidad (granos seleccionados, leches vegetales disponibles) y repostería horneada cada día en casa
- Para llevar: conservas de la casa (crema de pistacho, pesto, mermelada de frambuesa) elaboradas y envasadas en su propia cocina
- Catering & Eventos: llevan el brunch a celebraciones y eventos privados, a medida

Sobre el negocio: The Brunch Break nació en Arrecife con la idea de convertir el brunch en un ritual, no en una prisa. Todo se piensa y se hornea con el mismo cuidado: ingredientes reales, recetas propias y un espacio cálido.

Reservas / pedidos: no hay reserva online en la web; se gestiona por Instagram (@the_brunch_break) o llamando al local.
Nota: la dirección exacta (calle y número) todavía no está publicada en la web — si te preguntan por ella, indica que está pendiente de confirmar y que lo mejor es consultarlo por Instagram.
`.trim();

function buildSystemPrompt(lang) {
  const languageLine =
    lang === "en"
      ? "Always answer in English, regardless of the language of the question, unless the visitor writes in Spanish, in which case you may answer in Spanish."
      : "Responde siempre en español, salvo que la persona escriba en otro idioma, en cuyo caso responde en ese idioma.";

  return `Eres el asistente virtual de The Brunch Break, una cafetería de brunch en Arrecife, Lanzarote. Hablas en nombre del negocio, con un tono cálido, cercano y breve — como alguien del equipo respondiendo un mensaje directo, no un chatbot corporativo.

Usa ÚNICAMENTE la siguiente información real del negocio para responder. Si te preguntan algo que no está aquí (por ejemplo, un plato exacto de la carta con precio, o disponibilidad de una fecha concreta), dilo con honestidad y redirige a la carta online o a Instagram — no inventes datos.

${BUSINESS_CONTEXT}

Reglas:
- Respuestas cortas: 1 a 4 frases salvo que te pidan más detalle explícitamente.
- Si preguntan algo que no tiene nada que ver con The Brunch Break (temas ajenos al negocio), responde amablemente que solo puedes ayudar con preguntas sobre la cafetería.
- No inventes precios, platos exactos, alérgenos ni disponibilidad — remite a la carta online (smartmenu) para esos detalles.
- ${languageLine}`;
}

function jsonResponse(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    jsonResponse(res, 405, { error: "Method not allowed" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      jsonResponse(res, 400, { error: "JSON inválido en la petición." });
      return;
    }
  }
  body = body || {};

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) {
    jsonResponse(res, 400, { error: "Falta el mensaje." });
    return;
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    jsonResponse(res, 400, { error: "El mensaje es demasiado largo." });
    return;
  }

  const lang = body.lang === "en" ? "en" : "es";

  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const history = rawHistory
    .filter(function (m) {
      return (
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
      );
    })
    .slice(-MAX_HISTORY_MESSAGES)
    .map(function (m) {
      return { role: m.role, content: m.content.trim().slice(0, MAX_MESSAGE_LENGTH) };
    });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    jsonResponse(res, 500, {
      error:
        lang === "en"
          ? "The assistant isn't configured yet: the OPENAI_API_KEY environment variable is missing in Vercel."
          : "El asistente todavía no está configurado: falta la variable de entorno OPENAI_API_KEY en Vercel.",
    });
    return;
  }

  const messages = [
    { role: "system", content: buildSystemPrompt(lang) },
    ...history,
    { role: "user", content: message },
  ];

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        max_tokens: MAX_TOKENS,
        temperature: 0.6,
      }),
    });

    if (!openaiRes.ok) {
      var errText = await openaiRes.text();
      console.error("OpenAI API error:", openaiRes.status, errText);
      jsonResponse(res, 502, {
        error:
          lang === "en"
            ? "The assistant couldn't reach OpenAI right now. Please try again in a moment."
            : "El asistente no ha podido conectar con OpenAI ahora mismo. Inténtalo de nuevo en un momento.",
      });
      return;
    }

    var data = await openaiRes.json();
    var reply =
      data &&
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
        ? data.choices[0].message.content.trim()
        : "";

    if (!reply) {
      jsonResponse(res, 502, {
        error:
          lang === "en"
            ? "The assistant didn't return a response. Please try again."
            : "El asistente no ha devuelto ninguna respuesta. Inténtalo de nuevo.",
      });
      return;
    }

    jsonResponse(res, 200, { reply: reply });
  } catch (err) {
    console.error("Chat handler error:", err);
    jsonResponse(res, 500, {
      error:
        lang === "en"
          ? "Something went wrong answering your question. Please try again."
          : "Algo ha fallado al responder tu pregunta. Inténtalo de nuevo.",
    });
  }
};
