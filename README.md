# 💼 Ransh Portfolio — Personal Portfolio Website  
                   
<p>
  <img src="https://img.shields.io/badge/📄%20FRONTEND-HTML5-555555?style=for-the-badge" alt="Frontend HTML5" />
  <img src="https://img.shields.io/badge/CSS3-STYLING-2f80ed?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Styling" />
  <img src="https://img.shields.io/badge/JS-VANILLA%20JAVASCRIPT-f7df1e?style=for-the-badge&logo=javascript&logoColor=111111" alt="Vanilla JavaScript" />
  <img src="https://img.shields.io/badge/ICONS-FONT%20AWESOME-538dd7?style=for-the-badge&logo=fontawesome&logoColor=white" alt="Font Awesome" />
  <img src="https://img.shields.io/badge/CONTACT-FORMSUBMIT-00a86b?style=for-the-badge" alt="FormSubmit" />
  <img src="https://img.shields.io/badge/DEPLOY-STATIC%20SITE-9cf000?style=for-the-badge" alt="Static Site" />
</p>

A modern, responsive **Personal Portfolio Website** built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. It presents Ransh Chettri as a software, SaaS, and AI-focused product developer through a polished landing page, resume, skills showcase, project highlights, contact workflow, generated project banners, and a portfolio-scoped chat assistant.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Pages](#-pages)
- [Chat Assistant](#-chat-assistant)
- [Unique Highlights](#-unique-highlights)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 📖 About the Project

Ransh Portfolio is a personal brand website designed to show technical identity, project work, skills, resume details, and contact access in one clean static website.

The website is organized around four connected pages:

- **Home** — profile card, hero text, stats, feature cards, recent projects, and about content
- **Resume** — career objective, education, skills, certifications, languages, and detailed projects
- **Skills** — technical categories in a bold dark editorial layout
- **Contact** — contact details, message form, and direct inquiry flow

The current build focuses on:

- strong first impression
- lightweight frontend performance
- responsive layout
- clear project presentation
- recruiter/client-friendly navigation
- safe static hosting compatibility

---

## ✨ Features

### 👤 Visitor Experience

- Clean landing page with sticky profile card
- Floating icon navigation across pages
- Top-right social links
- Smooth page-to-page scroll transition
- Generated project banners for a professional project showcase
- Responsive layout for desktop, tablet, and mobile

### 🏠 Home Page

- Profile image and typing intro
- `Hire Me` call-to-action
- SaaS and AI product developer positioning
- Experience, project, and client stats
- Feature cards for animation, AI/ML, MERN, Figma, system design, Java, Python, and WordPress
- Recent project list
- About Me section
- Cinematic **3D Flip Card** intro loader (features a WebGL Ken-Burns canvas background, showing a white "Make it real" title that dissolves into grainy sand/dust, and then performing an ups-and-down 3D flip to show a white box progress loader)

### 📄 Resume Page

- Career objective
- About Me summary
- Education details
- Technical skills
- Certification names
- Languages known
- Project entries with tech stack and implementation details

### 🧠 Skills Page

- Large editorial typography
- Skill groups for languages, frameworks, tools, and workflow
- Dark visual theme matching the home page

### 📞 Contact Page

- Address, phone, and email display
- Contact form
- FormSubmit integration for direct message sending
- `mailto` fallback for local preview or failed direct sending
- Status feedback for success, pending, and fallback states

### 🤖 Chat Assistant

- Portfolio-focused answers only
- Quick question buttons
- Manual user questions
- Project, skills, education, resume, collaboration, and contact responses
- Company/client lead capture flow
- Email draft generation
- Calendar hold download for meeting requests

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5 |
| Styling | CSS3 |
| Interactions | Vanilla JavaScript |
| Icons | Font Awesome |
| Fonts | Google Fonts, Montserrat, Kalam |
| Contact | FormSubmit, mailto fallback |
| Chat | Frontend portfolio assistant |
| Assets | Local images, generated PNG banners |
| Deployment | Static hosting |

---

## 📁 Project Structure

```text
portfolio/
│
├── index.html
├── resume.html
├── skills.html
├── contact.html
├── README.md
│
├── css/
│   ├── global.css
│   ├── home.css
│   ├── resume.css
│   ├── skills.css
│   └── contact.css
│
├── js/
│   └── script.js
│
├── image/
│   ├── image.png
│   └── project-banners/
│       ├── generated-ovs-banner.png
│       ├── generated-mobileverse-banner.png
│       ├── generated-portfolio-banner.png
│       └── generated-employee-banner.png
│
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- Git
- A modern browser
- Optional: VS Code
- Optional: Python for local server preview

### Clone the Repository

```bash
git clone https://github.com/Ranshchettri/MyPortfolio.git
cd MyPortfolio
```

### Run Directly

Open:

```text
index.html
```

### Run With Local Server

```bash
python -m http.server 4173
```

Then visit:

```text
http://localhost:4173/index.html
```

---

## 🧭 Pages

| Page | File | Description |
|---|---|---|
| Home | `index.html` | Main landing page, profile, recent projects, about section |
| Resume | `resume.html` | Career, education, technical skills, certifications, project details |
| Skills | `skills.html` | Skill categories and technical focus areas |
| Contact | `contact.html` | Message form and contact information |

---

## 🤖 Chat Assistant

The chatbot is designed as a portfolio assistant, not a general-purpose public AI.

It can answer questions about:

- Ransh Chettri
- skills
- education
- projects
- certifications
- contact details
- hiring
- collaboration
- meeting scheduling

For company or client inquiries, it collects:

- name
- company or role
- company email
- project or meeting topic
- preferred meeting time
- budget or urgency

After collecting details, it can create:

- an email draft for Ransh
- a downloadable calendar hold (`.ics`)

---

## 🌟 Unique Highlights

### 🎬 Make It Real Intro

The home page starts with a cinematic **3D Flip Card** loader. It features a slow Ken-Burns background panning canvas. The loader begins by displaying the white **Make it real** title, which smoothly dissolves/erases into fine grainy sand/dust using a high-frequency fractal noise displacement filter. Once dissolved, the card performs an ups-and-downs 3D flip to reveal the white progress indicator boxes (shifted slightly downwards) that count from 0% to 100% before entering the website. Furthermore, a smart session check ensures that the loader runs only on the first visit or reload, bypassing it on standard page-to-page navigation.

### 🧩 Connected Page Flow

The website supports edge-scroll page movement:

1. `index.html`
2. `resume.html`
3. `skills.html`
4. `contact.html`

### 🖼 Clean Projects Layout

The recent projects showcase features a transparent and clean visual style. The borders and backgrounds have been streamlined with subtle dividers to emphasize the project banners and titles.

### 📬 Smart Inquiry Flow

The chat assistant captures project inquiry details and prepares an email draft plus meeting calendar hold.

### ⚡ Lightweight Static Build

The project uses no React, Tailwind, Bootstrap, database, or backend server. It stays simple, fast, and easy to host.

---

## 🤝 Contributing

Contributions are welcome.

```bash
git checkout -b feature/your-feature-name
git commit -m "Add your feature"
git push origin feature/your-feature-name
```

Then open a Pull Request with a clear summary.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ransh Chettri**

- GitHub: [Ranshchettri](https://github.com/Ranshchettri)
- LinkedIn: [ransh-chettri-852386315](https://www.linkedin.com/in/ransh-chettri-852386315)
- Instagram: [ransh_xettri777](https://www.instagram.com/ransh_xettri777/)
- Reddit: [Intelligent-Layer667](https://www.reddit.com/user/Intelligent-Layer667/)
- daily.dev: [ranshchettri](https://app.daily.dev/ranshchettri)

⭐ If this portfolio helps or inspires you, consider starring the repository.
