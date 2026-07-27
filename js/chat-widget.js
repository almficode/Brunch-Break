/**
 * THE BRUNCH BREAK — widget del asistente de IA.
 * Construye su propio DOM en tiempo de ejecución (no hace falta tocar el
 * HTML de cada idioma) y habla con la función serverless en api/chat.js.
 * Lee el idioma de <html lang="es|en">, así que sirve igual en index.html
 * y en en/index.html.
 */
(function () {
  "use strict";

  var lang = document.documentElement.lang === "en" ? "en" : "es";

  var STRINGS = {
    es: {
      openLabel: "Pregúntanos",
      toggleLabel: "Pregúntame",
      title: "Asistente The Brunch Break",
      onlineLabel: "En línea",
      avatarInitials: "TB",
      greeting:
        "¡Hola! Soy el asistente de The Brunch Break. Pregúntame lo que quieras sobre la carta, el horario, cómo llegar o cualquier otra cosa del negocio.",
      placeholder: "Escribe tu pregunta…",
      send: "Enviar",
      close: "Cerrar",
      genericError: "Algo ha fallado. Inténtalo de nuevo en un momento.",
    },
    en: {
      openLabel: "Ask us",
      toggleLabel: "Ask me",
      title: "The Brunch Break assistant",
      onlineLabel: "Online",
      avatarInitials: "TB",
      greeting:
        "Hi! I'm The Brunch Break's assistant. Ask me anything about the menu, opening hours, how to find us, or anything else about the place.",
      placeholder: "Type your question…",
      send: "Send",
      close: "Close",
      genericError: "Something went wrong. Please try again in a moment.",
    },
  };
  var t = STRINGS[lang];

  var history = [];
  var isSending = false;

  function el(tag, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    return node;
  }

  function buildWidget() {
    var root = el("div", "ai-chat");

    var tab = el("button", "ai-chat-tab");
    tab.type = "button";
    tab.setAttribute("aria-label", t.openLabel);
    tab.innerHTML =
      '<span class="ai-chat-tab-icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2l1.8 5.6L19.4 9l-5.6 1.8L12 16l-1.8-5.2L4.6 9l5.6-1.4L12 2z"/><path d="M19 14l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" opacity="0.75"/></svg></span>' +
      "<span>" + t.toggleLabel + "</span>";

    var backdrop = el("div", "ai-chat-backdrop");
    backdrop.setAttribute("aria-hidden", "true");

    var panel = el("div", "ai-chat-panel");
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", t.title);

    var header = el("div", "ai-chat-header");
    var avatar = el("div", "ai-chat-avatar");
    avatar.textContent = t.avatarInitials;
    avatar.setAttribute("aria-hidden", "true");
    var headerText = el("div", "ai-chat-header-text");
    var titleEl = el("p", "ai-chat-title");
    titleEl.textContent = t.title;
    var statusEl = el("p", "ai-chat-status");
    statusEl.innerHTML = '<span class="ai-chat-status-dot" aria-hidden="true"></span>';
    statusEl.appendChild(document.createTextNode(t.onlineLabel));
    headerText.appendChild(titleEl);
    headerText.appendChild(statusEl);
    var closeBtn = el("button", "ai-chat-close");
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", t.close);
    closeBtn.innerHTML =
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>';
    header.appendChild(avatar);
    header.appendChild(headerText);
    header.appendChild(closeBtn);

    var messages = el("div", "ai-chat-messages");

    var form = el("form", "ai-chat-form");
    var input = el("input", "ai-chat-input");
    input.type = "text";
    input.placeholder = t.placeholder;
    input.maxLength = 800;
    input.setAttribute("aria-label", t.placeholder);
    var sendBtn = el("button", "ai-chat-send");
    sendBtn.type = "submit";
    sendBtn.setAttribute("aria-label", t.send);
    sendBtn.innerHTML =
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><line x1="4" y1="12" x2="20" y2="12"/><polyline points="13 5 20 12 13 19"/></svg>';
    form.appendChild(input);
    form.appendChild(sendBtn);

    panel.appendChild(header);
    panel.appendChild(messages);
    panel.appendChild(form);

    root.appendChild(tab);
    root.appendChild(backdrop);
    root.appendChild(panel);
    document.body.appendChild(root);

    function addMessage(role, text) {
      var bubble = el("div", "ai-chat-msg ai-chat-msg-" + role);
      bubble.textContent = text;
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
      return bubble;
    }

    function addTypingIndicator() {
      var bubble = el("div", "ai-chat-typing");
      bubble.innerHTML = "<span></span><span></span><span></span>";
      messages.appendChild(bubble);
      messages.scrollTop = messages.scrollHeight;
      return bubble;
    }

    function openPanel() {
      root.classList.add("is-open");
      tab.setAttribute("aria-expanded", "true");
      if (!messages.childNodes.length) {
        addMessage("assistant", t.greeting);
      }
      input.focus();
    }
    function closePanel() {
      root.classList.remove("is-open");
      tab.setAttribute("aria-expanded", "false");
      tab.focus();
    }

    tab.setAttribute("aria-expanded", "false");
    tab.addEventListener("click", openPanel);
    closeBtn.addEventListener("click", closePanel);
    backdrop.addEventListener("click", closePanel);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("is-open")) {
        closePanel();
      }
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = input.value.trim();
      if (!value || isSending) return;

      addMessage("user", value);
      history.push({ role: "user", content: value });
      input.value = "";
      isSending = true;
      sendBtn.disabled = true;
      var typingBubble = addTypingIndicator();

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: value, history: history, lang: lang }),
      })
        .then(function (res) {
          return res.json().then(function (data) {
            return { ok: res.ok, data: data };
          });
        })
        .then(function (result) {
          typingBubble.remove();
          if (result.ok && result.data && result.data.reply) {
            addMessage("assistant", result.data.reply);
            history.push({ role: "assistant", content: result.data.reply });
          } else {
            addMessage("assistant", (result.data && result.data.error) || t.genericError);
          }
        })
        .catch(function () {
          typingBubble.remove();
          addMessage("assistant", t.genericError);
        })
        .then(function () {
          isSending = false;
          sendBtn.disabled = false;
        });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildWidget);
  } else {
    buildWidget();
  }
})();
