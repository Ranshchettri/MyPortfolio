
// Hamburger Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
}

// Chatbot Functionality
const chatbot = document.getElementById("chatbot");
const chatbox = document.getElementById("chatbox");
const chatboxClose = document.getElementById("chatbox-close");
const chatQuestionsDiv = document.getElementById("chat-questions");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
const portfolioLoader = document.querySelector(".portfolio-loader");

if (portfolioLoader) {
  document.body.classList.add("portfolio-loading");

  const startedAt = performance.now();
  const minimumLoaderTime = 3500;

  window.addEventListener(
    "load",
    function () {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, minimumLoaderTime - elapsed);

      window.setTimeout(() => {
        portfolioLoader.classList.add("is-hidden");
        document.body.classList.remove("portfolio-loading");
      }, remaining);
    },
    { once: true }
  );
}

if (chatbot && chatbox) {
  chatbot.addEventListener("click", function () {
    chatbox.style.display = "block";
  });
}
if (chatboxClose && chatbox) {
  chatboxClose.addEventListener("click", function () {
    chatbox.style.display = "none";
  });
}

const portfolioOwnerEmail = "ranshchettri788@gmail.com";

// Frontend-only portfolio assistant. Do not place real AI API keys here;
// add a small backend endpoint and expose it as window.PORTFOLIO_AI_ENDPOINT.
const chatbotResponses = {
  "who are you":
    "Ransh Chettri is a Nepal-based BCA student, software and web developer, and AI/ML-focused builder. He works on practical web apps, UI/UX, backend logic, and real-world projects.",
  "what are your skills":
    "Core skills include C, Java, Python, JavaScript, MERN stack, Django, MySQL, MongoDB, Figma, Canva, Git, GitHub, WordPress, Android Studio, Vercel, Docker, AI/ML, and system design basics.",
  "what is your educational background":
    "Ransh is pursuing Bachelor of Computer Applications (BCA), affiliated with Tribhuvan University in Nepal.",
  "what projects have you worked on":
    "Recent projects include Online Voting System, Mobile Shop Website, Employee Management System, and this Portfolio Website.",
  "what are your goals for the future":
    "Ransh's goal is to become a strong software developer and AI/ML specialist who can build practical, scalable products.",
  "how can i contact you":
    "You can contact Ransh from the Contact page, by email at ranshchettri788@gmail.com, or by phone at +977 9706574669.",
  "what are your hobbies":
    "Ransh spends free time building coding projects, learning new technologies, solving programming problems, playing games, and watching tech content.",
  "do you have any certifications":
    "Yes. Ransh has Oracle Architect, Oracle GenAI, Java, React Development, and UI/UX certifications/courses listed in the resume section.",
  "how can i collaborate with you on a project":
    "Send your project idea through the Contact page or ask for a meeting here. Share project type, timeline, budget range, and preferred contact email.",
  "where do you study":
    "Ransh studies BCA under Tribhuvan University in Nepal.",
  "schedule a meeting":
    "For a meeting, send your name, company, project topic, preferred date/time, and email. I can prepare a direct email draft to Ransh.",
};

const portfolioTopics = [
  "ransh",
  "portfolio",
  "project",
  "skill",
  "education",
  "study",
  "bca",
  "contact",
  "email",
  "phone",
  "hire",
  "collaborate",
  "meeting",
  "schedule",
  "certification",
  "resume",
  "ai",
  "ml",
  "mern",
  "django",
  "java",
  "python",
  "figma",
  "github",
  "voting",
  "mobile",
  "employee",
  "website",
  "budget",
  "proposal",
  "deal",
  "client",
  "company",
];

const leadCaptureFields = [
  {
    key: "name",
    label: "Your name",
    prompt: "Sure. First, please send your full name.",
  },
  {
    key: "company",
    label: "Company / role",
    prompt: "Company name or your role?",
  },
  {
    key: "email",
    label: "Company email",
    prompt: "Send your company/work email so Ransh can reply.",
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    error: "That email does not look valid. Please send a proper company/work email.",
  },
  {
    key: "topic",
    label: "Project / meeting topic",
    prompt: "What do you want to discuss: website, AI/ML, MERN, Django, portfolio, or another project?",
  },
  {
    key: "time",
    label: "Preferred time",
    prompt: "Preferred meeting date and time? Example: 2026-05-13 10:30 AM.",
  },
  {
    key: "budget",
    label: "Budget / urgency",
    prompt: "Optional but useful: budget range or urgency. If not fixed, type 'not fixed'.",
  },
];

let leadCaptureState = {
  active: false,
  step: 0,
  data: {},
};

// Populate chat questions
function populateChatQuestions() {
  if (!chatQuestionsDiv) return;
  Object.keys(chatbotResponses).forEach((question) => {
    const button = document.createElement("button");
    button.classList.add("chat-question-btn");
    if (question.length > 25) {
      button.classList.add("span-full");
    }
    button.textContent = question.charAt(0).toUpperCase() + question.slice(1);
    button.onclick = () => {
      if (chatInput) {
        chatInput.value = question;
        sendChatMessage();
      }
    };
    chatQuestionsDiv.appendChild(button);
  });
}

function appendChatMessage(type, text, action) {
  if (!chatMessages) return null;

  const message = document.createElement("div");
  message.classList.add("chat-message", type);
  message.textContent = text;

  if (action) {
    const actions = Array.isArray(action) ? action : [action];
    message.appendChild(document.createElement("br"));
    actions.forEach((item) => {
      const actionLink = document.createElement("a");
      actionLink.className = "chat-action-link";
      actionLink.href = item.href;
      actionLink.textContent = item.label;
      if (item.download) {
        actionLink.setAttribute("download", item.download);
      }
      message.appendChild(actionLink);
    });
  }

  chatMessages.appendChild(message);
  chatbox.scrollTop = chatbox.scrollHeight;
  return message;
}

function normalizeMessage(message) {
  return message.toLowerCase().replace(/[^\w\s@.+-]/g, " ").replace(/\s+/g, " ").trim();
}

function isPortfolioRelated(message) {
  return portfolioTopics.some((topic) => message.includes(topic));
}

function buildPortfolioMailto(topic) {
  const subject = "Portfolio inquiry / meeting request";
  const body = `Hello Ransh,\n\nI visited your portfolio and want to discuss:\n${topic}\n\nMy name:\nCompany/role:\nPreferred date and time:\nReply email:\n\nThanks.`;

  return `mailto:${portfolioOwnerEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

function shouldStartLeadCapture(message) {
  const leadKeywords = [
    "hire",
    "meeting",
    "schedule",
    "company",
    "client",
    "proposal",
    "budget",
    "work with",
    "collaborate",
    "contact me",
    "email me",
  ];

  return leadKeywords.some((keyword) => message.includes(keyword));
}

function startLeadCapture() {
  leadCaptureState = {
    active: true,
    step: 0,
    data: {},
  };
  appendChatMessage("bot", leadCaptureFields[0].prompt);
}

function getNextBusinessDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(10, 0, 0, 0);

  if (date.getDay() === 0) date.setDate(date.getDate() + 1);
  if (date.getDay() === 6) date.setDate(date.getDate() + 2);

  return date;
}

function parsePreferredDateTime(value) {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed;
  }

  return getNextBusinessDate();
}

function formatIcsDate(date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function buildLeadMailto(data) {
  const subject = `Portfolio lead from ${data.company || data.name}`;
  const body = [
    "Hello Ransh,",
    "",
    "A visitor submitted these details from your portfolio chat:",
    "",
    `Name: ${data.name}`,
    `Company / role: ${data.company}`,
    `Company email: ${data.email}`,
    `Topic: ${data.topic}`,
    `Preferred time: ${data.time}`,
    `Budget / urgency: ${data.budget}`,
    "",
    "Please reply to the visitor and confirm availability.",
  ].join("\n");

  return `mailto:${portfolioOwnerEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

function buildCalendarInvite(data) {
  const start = parsePreferredDateTime(data.time);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const title = `Portfolio discussion with ${data.company || data.name}`;
  const description = [
    `Visitor: ${data.name}`,
    `Company/role: ${data.company}`,
    `Email: ${data.email}`,
    `Topic: ${data.topic}`,
    `Budget/urgency: ${data.budget}`,
  ].join("\\n");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ransh Portfolio//Lead Scheduler//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@ransh-portfolio`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `ATTENDEE;CN=${data.name}:mailto:${data.email}`,
    `ORGANIZER;CN=Ransh Chettri:mailto:${portfolioOwnerEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function summarizeLead(data) {
  return [
    "Lead captured.",
    `Name: ${data.name}`,
    `Company/role: ${data.company}`,
    `Email: ${data.email}`,
    `Topic: ${data.topic}`,
    `Preferred time: ${data.time}`,
    `Budget/urgency: ${data.budget}`,
    "Use the buttons below to send the details to Ransh and save a calendar hold.",
  ].join("\n");
}

function handleLeadCaptureResponse(rawMessage) {
  const field = leadCaptureFields[leadCaptureState.step];
  const value = rawMessage.trim();

  if (!value) {
    appendChatMessage("bot", field.prompt);
    return;
  }

  if (field.validate && !field.validate(value)) {
    appendChatMessage("bot", field.error);
    return;
  }

  leadCaptureState.data[field.key] = value;
  leadCaptureState.step += 1;

  const nextField = leadCaptureFields[leadCaptureState.step];
  if (nextField) {
    appendChatMessage("bot", nextField.prompt);
    return;
  }

  const data = { ...leadCaptureState.data };
  leadCaptureState = {
    active: false,
    step: 0,
    data: {},
  };

  appendChatMessage("bot", summarizeLead(data), [
    {
      label: "Send email draft",
      href: buildLeadMailto(data),
    },
    {
      label: "Download calendar hold",
      href: buildCalendarInvite(data),
      download: "ransh-portfolio-meeting.ics",
    },
  ]);
}

async function askConfiguredAIEndpoint(message) {
  if (!window.PORTFOLIO_AI_ENDPOINT) return null;

  const response = await fetch(window.PORTFOLIO_AI_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      scope:
        "Only answer questions about Ransh Chettri's portfolio, skills, projects, education, contact, and collaboration.",
    }),
  });

  if (!response.ok) return null;
  const data = await response.json().catch(() => null);
  return data && typeof data.reply === "string" ? data.reply : null;
}

function getLocalPortfolioReply(message) {
  if (!isPortfolioRelated(message)) {
    return {
      text:
        "I can only answer about Ransh's portfolio, skills, projects, education, contact, and collaboration. Ask something related to his work or hiring.",
    };
  }

  const wantsEmail =
    message.includes("email") ||
    message.includes("hire") ||
    message.includes("meeting") ||
    message.includes("schedule") ||
    message.includes("collaborate") ||
    message.includes("company");

  for (let question in chatbotResponses) {
    if (message.includes(question)) {
      return {
        text: chatbotResponses[question],
        action: wantsEmail
          ? {
              label: "Prepare email to Ransh",
              href: buildPortfolioMailto(message),
            }
          : null,
      };
    }
  }

  if (wantsEmail) {
    return {
      text:
        "I can help you contact Ransh. Use this email draft and add your company, project details, timeline, and preferred meeting time.",
      action: {
        label: "Prepare email to Ransh",
        href: buildPortfolioMailto(message),
      },
    };
  }

  if (message.includes("online voting") || message.includes("voting")) {
    return {
      text:
        "Online Voting System is a MERN project with role-based access, JWT auth, OTP vote verification, one-vote-per-user logic, and real-time result calculation.",
    };
  }

  if (message.includes("mobile")) {
    return {
      text:
        "Mobile Shop Website uses React, Django, MySQL, Khalti payment, cart/order flow, product listing, city-wise COD/advance logic, and seller-buyer chat.",
    };
  }

  if (message.includes("employee")) {
    return {
      text:
        "Employee Management System handles employee records, roles, attendance, leave requests, notifications, search/filter, and CRUD workflows.",
    };
  }

  return {
    text:
      "Ransh is a BCA student and software/AI-ML-focused developer. Ask about his skills, projects, resume, certifications, or how to contact/hire him.",
  };
}

// Send message to chatbot
async function sendChatMessage(event) {
  if (event) event.preventDefault();
  if (!chatInput || !chatMessages) return;

  const rawMessage = chatInput.value.trim();
  const message = normalizeMessage(rawMessage);

  if (message) {
    appendChatMessage("user", rawMessage);
    chatInput.value = "";

    if (leadCaptureState.active) {
      handleLeadCaptureResponse(rawMessage);
      return;
    }

    if (isPortfolioRelated(message) && shouldStartLeadCapture(message)) {
      startLeadCapture();
      return;
    }

    try {
      const aiReply = isPortfolioRelated(message)
        ? await askConfiguredAIEndpoint(rawMessage)
        : null;
      if (aiReply) {
        appendChatMessage("bot", aiReply);
        return;
      }
    } catch (error) {
      console.warn("Portfolio AI endpoint unavailable:", error);
    }

    const localReply = getLocalPortfolioReply(message);
    appendChatMessage("bot", localReply.text, localReply.action);
  }
}

// Allow sending chat message with Enter key
if (chatInput) {
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendChatMessage(e);
    }
  });
}

// Fix chatbot position above footer
const footer = document.querySelector("footer");
if (footer && chatbox) {
  window.addEventListener("scroll", function () {
    var footerPosition = footer.getBoundingClientRect();
    var chatboxPosition = chatbox.getBoundingClientRect();

    if (
      chatboxPosition.bottom > footerPosition.top &&
      chatbox.style.display === "block"
    ) {
      chatbox.style.bottom =
        footerPosition.top - chatboxPosition.height - 10 + "px";
    } else {
      chatbox.style.bottom = "4.5rem";
    }
  });
}

// Populate questions when the page loads
populateChatQuestions();

// Typing effect for hero section
document.addEventListener("DOMContentLoaded", function () {
  const typingSpan = document.querySelector(".typing-text span");
  if (!typingSpan) return; // Prevent error if not found

  const texts = ["Hey,Myself Ransh ", "A S/w developer and AI/ML specialist"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeHero() {
    let currentText = texts[textIndex];
    let displayText = currentText.substring(0, charIndex);

    typingSpan.textContent = displayText;
    typingSpan.style.borderRight = "2px solid #fff";

    if (!isDeleting && charIndex < currentText.length) {
      charIndex++;
      setTimeout(typeHero, 70);
    } else if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => {
        isDeleting = true;
        typeHero();
      }, 900);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeHero, 50);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeHero, 400);
    }
  }
  typeHero();
});

document.addEventListener("DOMContentLoaded", function () {
  const scrollDrops = document.querySelectorAll(".scroll-drop");
  if (!scrollDrops.length) return;

  if (!("IntersectionObserver" in window)) {
    scrollDrops.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  scrollDrops.forEach((element) => revealObserver.observe(element));
});

// Interactive animations for skill cards
document.querySelectorAll(".skill-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-12px) scale(1.02)";
  });
  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add click animation to arrows
document.querySelectorAll(".skill-arrow").forEach((arrow) => {
  arrow.addEventListener("click", function (e) {
    e.stopPropagation();
    this.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });
});

function updateContactStatus(message, type = "info") {
  if (!contactStatus) return;

  contactStatus.textContent = message;
  contactStatus.className = `contact-status ${type}`;
}

function buildMailtoLink(name, email, message) {
  const subject = `Portfolio inquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

  return `mailto:ranshchettri788@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

async function sendContactMessage(event) {
  if (event) event.preventDefault();
  if (!contactForm) return;

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const name = contactForm.elements.name.value.trim();
  const email = contactForm.elements.email.value.trim();
  const message = contactForm.elements.message.value.trim();

  if (!name || !email || !message) {
    updateContactStatus("Please fill in your name, email, and message.", "error");
    return;
  }

  const originalLabel = submitButton ? submitButton.textContent : "";
  const mailtoLink = buildMailtoLink(name, email, message);

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }
  updateContactStatus("Sending your message...", "pending");

  // Static sites cannot send mail on their own, so we use FormSubmit when
  // the page is served over HTTP(S), then fall back to the visitor's mail app.
  const shouldUseMailtoFallback = window.location.protocol === "file:";

  if (shouldUseMailtoFallback) {
    updateContactStatus(
      "Local preview cannot send directly. Opening your email app as fallback.",
      "info"
    );
    window.location.href = mailtoLink;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
    return;
  }

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/ranshchettri788@gmail.com",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio inquiry from ${name}`,
          _replyto: email,
          _template: "table",
        }),
      }
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok || result.success === false || result.success === "false") {
      throw new Error(result.message || "Unable to send message right now.");
    }

    contactForm.reset();
    updateContactStatus(
      "Message sent successfully. I will get back to you soon.",
      "success"
    );
  } catch (error) {
    updateContactStatus(
      "Direct send was unavailable here. Opening your email app as backup.",
      "error"
    );
    window.location.href = mailtoLink;
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  }
}

if (contactForm) {
  contactForm.addEventListener("submit", sendContactMessage);
}

const autoPageSequence = [
  "index.html",
  "resume.html",
  "skills.html",
  "contact.html",
];
const PAGE_TRANSITION_STORAGE_KEY = "portfolio-page-transition";
let pageTransitionInProgress = false;
let touchStartY = null;
let edgeScrollAccumulator = 0;
let edgeScrollDirection = null;

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function getCurrentPageName() {
  const path = window.location.pathname.split("/").pop();
  return path || "index.html";
}

function getNextPageName() {
  const currentPage = getCurrentPageName();
  const currentIndex = autoPageSequence.indexOf(currentPage);

  if (currentIndex === -1 || currentIndex === autoPageSequence.length - 1) {
    return null;
  }

  return autoPageSequence[currentIndex + 1];
}

function getPreviousPageName() {
  const currentPage = getCurrentPageName();
  const currentIndex = autoPageSequence.indexOf(currentPage);

  if (currentIndex <= 0) {
    return null;
  }

  return autoPageSequence[currentIndex - 1];
}

function getPageTitle(pageName) {
  const pageTitles = {
    "index.html": "Home",
    "resume.html": "Resume",
    "skills.html": "Skills",
    "contact.html": "Contact",
  };

  return pageTitles[pageName] || pageName.replace(".html", "");
}

function isNearTop() {
  return window.scrollY <= 4;
}

function isNearBottom() {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 4
  );
}

function shouldIgnoreAutoPageTarget(target) {
  if (!(target instanceof Element)) return false;

  return Boolean(
    target.closest(
      "nav, #chatbox, #chatbot, input, textarea, button, a, iframe, .chat-input-area"
    )
  );
}

function getTransitionScrollTop(direction) {
  if (direction === "backward") {
    return Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0
    );
  }

  return 0;
}

function jumpToTransitionEdge(direction) {
  window.scrollTo(0, getTransitionScrollTop(direction));
}

function applyStoredPageEntryTransition() {
  const storedDirection = sessionStorage.getItem(PAGE_TRANSITION_STORAGE_KEY);
  if (!storedDirection) return;

  jumpToTransitionEdge(storedDirection);

  const isForward = storedDirection === "forward";
  document.body.classList.add(
    "page-pre-enter",
    isForward ? "page-pre-enter-next" : "page-pre-enter-prev"
  );

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add("page-enter-active");
    });
  });

  window.addEventListener(
    "load",
    function () {
      jumpToTransitionEdge(storedDirection);
    },
    { once: true }
  );

  window.setTimeout(() => {
    document.body.classList.remove(
      "page-pre-enter",
      "page-pre-enter-next",
      "page-pre-enter-prev",
      "page-enter-active"
    );
    sessionStorage.removeItem(PAGE_TRANSITION_STORAGE_KEY);
  }, 620);
}

function resetEdgeScrollState() {
  edgeScrollAccumulator = 0;
  edgeScrollDirection = null;
}

function triggerPageTransition(direction) {
  const targetPage =
    direction === "forward" ? getNextPageName() : getPreviousPageName();

  if (!targetPage || pageTransitionInProgress) return;
  if (chatbox && chatbox.style.display === "block") return;

  pageTransitionInProgress = true;
  sessionStorage.setItem(PAGE_TRANSITION_STORAGE_KEY, direction);
  document.body.classList.add(
    "page-transitioning",
    direction === "forward"
      ? "page-transition-forward"
      : "page-transition-backward"
  );

  window.setTimeout(() => {
    window.location.href = targetPage;
  }, 520);
}

function handleEdgeScroll(deltaY, target) {
  if (pageTransitionInProgress || shouldIgnoreAutoPageTarget(target)) return;
  if (chatbox && chatbox.style.display === "block") return;

  const attemptingForward = deltaY > 20 && isNearBottom();
  const attemptingBackward = deltaY < -20 && isNearTop();

  if (!attemptingForward && !attemptingBackward) {
    resetEdgeScrollState();
    return;
  }

  const direction = attemptingForward ? "forward" : "backward";
  const strength = Math.abs(deltaY);

  if (edgeScrollDirection !== direction) {
    edgeScrollDirection = direction;
    edgeScrollAccumulator = 0;
  }

  edgeScrollAccumulator += strength;

  if (edgeScrollAccumulator >= 130) {
    resetEdgeScrollState();
    triggerPageTransition(direction);
  }
}

window.addEventListener(
  "wheel",
  function (event) {
    handleEdgeScroll(event.deltaY, event.target);
  },
  { passive: true }
);

window.addEventListener(
  "touchstart",
  function (event) {
    if (!event.touches.length) return;
    touchStartY = event.touches[0].clientY;
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  function (event) {
    if (touchStartY === null || !event.touches.length) return;
    if (shouldIgnoreAutoPageTarget(event.target)) return;

    const swipeDistance = touchStartY - event.touches[0].clientY;

    if (swipeDistance > 54 && isNearBottom()) {
      resetEdgeScrollState();
      triggerPageTransition("forward");
      touchStartY = null;
      return;
    }

    if (swipeDistance < -54 && isNearTop()) {
      resetEdgeScrollState();
      triggerPageTransition("backward");
      touchStartY = null;
    }
  },
  { passive: false }
);

window.addEventListener(
  "touchend",
  function () {
    touchStartY = null;
    resetEdgeScrollState();
  },
  { passive: true }
);

document.addEventListener("DOMContentLoaded", applyStoredPageEntryTransition);

// Stats counter animation on page load
window.addEventListener("load", function () {
  const numbers = document.querySelectorAll(".stat-number");
  numbers.forEach((number) => {
    const finalNumber = parseInt(number.textContent.replace("+", ""));
    let currentNumber = 0;
    const increment = finalNumber / 30;
    const timer = setInterval(() => {
      currentNumber += increment;
      if (currentNumber >= finalNumber) {
        number.textContent = `+${finalNumber}`;
        clearInterval(timer);
      } else {
        number.textContent = `+${Math.floor(currentNumber)}`;
      }
    }, 50);
  });
});
