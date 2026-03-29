
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

// Pre-defined chatbot questions and answers
const chatbotResponses = {
  "who are you":
    "Hey,Myself Ransh sunuwar, a future software and web developer with AI/ML specialist. I am passionate about learning new technologies and building functional websites.",

  "what are your skills":
    "I have skills in C, C++, C#, HTML, CSS, JavaScript, PHP, React, Python, and various web development tools. I am also gaining knowledge in AI, machine learning, and data structures.",
  "what is your educational background":
    "I am currently pursuing a BCA (Bachelor of Computer Applications). I am learning programming languages, web development, and AI.",
  "what projects have you worked on":
    "I have worked on several projects, including an E-commerce website, a mobile shop website, and an employee management system. You can find more details on my portfolio page.",
  "what are your goals for the future":
    "My future goal is to become a software engineer, specializing in Artificial Intelligence and Machine Learning. I also plan to pursue a Master's in IT after completing my BCA.",
  "how can i contact you":
    "You can contact me through the contact form on my website, or you can send me a message directly. I will respond to your inquiry as soon as possible.",
  "what are your hobbies":
    "In my free time, I love working on coding projects, learning new technologies, and solving programming challenges. I also enjoy playing games and watching tech-related content.",
  "do you have any certifications":
    "Yes, I have completed online courses and certifications in web development, programming languages, and machine learning. I am always looking for opportunities to improve my skills.",
  "how can i collaborate with you on a project":
    "You can reach out to me via the contact form on my website, or you can message me directly through this chat. I'd love to discuss any project collaboration opportunities.",
  "where do you study":
    "I study at Itahari Namuna collage , pursuing a Bachelor of Computer Applications (BCA) in TU.",
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

// Send message to chatbot
function sendChatMessage(event) {
  if (event) event.preventDefault();
  if (!chatInput || !chatMessages) return;

  const message = chatInput.value.trim().toLowerCase();

  if (message) {
    const userMessage = document.createElement("div");
    userMessage.classList.add("chat-message", "user");
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);

    const botMessage = document.createElement("div");
    botMessage.classList.add("chat-message", "bot");
    let response =
      "I'm here to help! Try asking about my skills, projects, education, or how to collaborate.";
    for (let question in chatbotResponses) {
      if (message.includes(question)) {
        response = chatbotResponses[question];
        break;
      }
    }
    botMessage.textContent = response;
    chatMessages.appendChild(botMessage);

    chatInput.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
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
  { passive: true }
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
