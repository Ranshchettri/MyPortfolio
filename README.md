# Ransh Portfolio......

This repository contains the current version of my personal portfolio website.  
The site is built with plain HTML, CSS, and JavaScript, and it is now organized around four connected pages:

- `Home`
- `Resume`
- `Skills`
- `Contact`

## Current Website Style

The portfolio currently follows a bold dark/light split style:

- `Home` and `Skills` use a dark visual theme with large typography, floating navigation, and highlighted feature cards.
- `Resume` and `Contact` use a light theme with cleaner document-style layouts.
- The navigation stays centered across pages.
- Top-right social icons remain visible across the site.
- The chatbot stays available on every major page.
- Page-to-page scrolling now feels connected, so moving between pages behaves more like one continuous experience.

## Current Page Structure

### Home Page

The home page is now the main landing experience and includes:

- A sticky profile card on the left
- Hero heading and intro content on the right
- Stats section
- Two feature cards for key focus areas
- `Recent Projects` section
- `About Me` section

The profile card currently includes:

- Photo
- Typing description
- `Hire Me` button
- Small bottom social/community icons

### Resume Page

The resume page currently contains:

- Career Objective
- About Me
- Education
- Technical Skills
- Certifications
- Languages Known
- Detailed project entries

The project list now includes:

- Online Voting System (OVS)
- Mobile Shop Management System
- Employee Management System
- Portfolio Website

### Skills Page

The skills page currently uses a bold editorial layout with:

- Large stacked words on the left
- Centered `Skills` heading on the right
- Three skill columns

Current categories:

- Languages & Tools
- Frameworks & Libraries
- Core Workflow

### Contact Page

The contact page currently includes:

- Intro heading
- Contact information block
- Contact form
- Status message feedback for sending

## Current Functional Behavior

### Contact Form

The contact form is currently connected to:

- `FormSubmit` for direct sending when served over HTTP/HTTPS
- `mailto` fallback for local preview or fallback behavior

Messages are sent to:

- `ranshchettri788@gmail.com`

### Chatbot

The chatbot currently supports:

- Predefined quick questions
- Manual text input
- Auto reply responses based on portfolio-related prompts
- Hidden scrollbar styling
- Send button with arrow icon

### Page Transition Flow

The website now includes connected page transitions:

- Scrolling down at the end of a page moves to the next page
- Scrolling up at the top of a page moves to the previous page
- Forward and reverse transitions both use motion-based page changes

Current page order:

1. `index.html`
2. `resume.html`
3. `skills.html`
4. `contact.html`

## Certifications Status

Certificate files are stored inside the project, but inline certificate preview is currently turned off.

Available certificate assets:

- `image/certificates/java-certificate.pdf`
- `image/certificates/oci-architect-certificate.pdf`
- `image/certificates/oci-gen-ai-certificate.pdf`
- `image/certificates/ui-ux-certificate.pdf`

Currently listed in the Resume page:

- OCI-Gen_AI-Certificate - Online Course
- OCI-Architect - Online Course
- JAVA - Online Course
- React Development - Physical Course
- UI/UX - Physical Course

## Updated / Merged / Removed

The current website structure is different from the older version.

### Merged into Home

These sections are no longer standalone pages because their content now lives inside the Home page:

- Projects
- About Me

### Removed Files

The following old standalone files are no longer part of the current live structure:

- `about.html`
- `projects.html`
- `css/about.css`
- `css/projects.css`
- `js/about-ball.js`

### Updated Behavior

Compared to the older structure, the current site now includes:

- Connected multi-page scroll transitions
- Updated home hero and card layout
- Recent Projects shown directly on Home
- About content shown directly on Home
- OVS project added to Resume and Home
- Centered navbar behavior across screen sizes
- Larger top-right social media icons
- Contact form direct-send flow
- Resume certificate list in static mode

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome
- FormSubmit

## Current Project Structure

```text
index.html
resume.html
skills.html
contact.html
README.md

css/
  global.css
  home.css
  resume.css
  skills.css
  contact.css

js/
  script.js

image/
  image.png
  certificates/
    java-certificate.pdf
    oci-architect-certificate.pdf
    oci-gen-ai-certificate.pdf
    ui-ux-certificate.pdf
```

## Notes

- The documentation in this README reflects the current website structure, not the older multi-page About/Projects version.
- If more sections are merged or redesigned later, this file should be updated alongside the code.

## Contact

Portfolio owner:

- Ransh Chettri

Links:

- GitHub: https://github.com/Ranshchettri
- LinkedIn: https://www.linkedin.com/in/ransh-chettri-852386315
- Instagram: https://www.instagram.com/ransh_xettri777/

---

######     Old Portfolio Documentation  #########################################

The section below preserves the older project documentation style for reference.

### Old Overview

Welcome to my personal portfolio website. This project showcases my skills,
projects, and experience as a passionate software developer and aspiring
AI/ML specialist.

This portfolio was designed as a modern, responsive, and interactive website
to highlight my journey, technical expertise, and completed projects. It
focuses on clean UI, smooth animations, and a user-friendly experience across
devices.

### Old Features

- Home Page
  Eye-catching hero section with animated typing effect, profile card, quick
  stats, and highlighted skill cards.
- About Page
  Personal introduction with a separate About section/page design.
- Resume Page
  Timeline-style layout for education, skills, certifications, and project
  highlights.
- Skills Page
  Categorized skill groups with a modern responsive layout.
- Projects Page
  Dedicated project card layout with links and descriptions.
- Contact Page
  Direct contact form, social links, and personal contact details.
- Chatbot
  Floating chatbot with predefined questions and portfolio-related responses.
- Consistent UI/UX
  Fixed navigation, social icons, responsive layout, transitions, gradients,
  and interactive elements.

### Old Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome
- EmailJS / direct email integration readiness
- Responsive Design with media queries

### Old UI Highlights

- Glassmorphism-inspired effects on cards and panels
- Animated backgrounds and interactive elements
- Floating brand and social icons for quick access
- Clean readable typography with strong contrast
- Hover effects and subtle transitions

### Old Project Structure

```text
index.html
about.html
resume.html
skills.html
projects.html
contact.html

css/
  global.css
  home.css
  about.css
  resume.css
  skills.css
  projects.css
  contact.css

js/
  script.js
  about-ball.js

image/
  image.png
  image2.png
```

### Old Contact Note

Feel free to reach out via the contact form or connect through GitHub,
LinkedIn, or Instagram.
