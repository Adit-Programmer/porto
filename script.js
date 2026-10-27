const profile = {
  github: "https://github.com/Adit-Programmer",
  email: "",
};

const projects = [
  {
    id: "01",
    title: "JavaScript Calculator",
    category: "JavaScript",
    icon: "JS",
    description:
      "Kalkulator web untuk operasi matematika dasar dengan antarmuka yang sederhana dan responsif.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
    status: "Demo tersedia",
    demo: "calculator.html",
    github: "#",
    details:
      "Proyek latihan untuk memahami variabel, fungsi, event, validasi input, dan pengolahan ekspresi matematika.",
  },
  {
    id: "02",
    title: "Eksperimen Berikutnya",
    category: "Coming Soon",
    icon: "?",
    description:
      "Proyek baru sedang disiapkan dan akan segera dipublikasikan di halaman ini.",
    tech: ["Segera Hadir"],
    image: "",
    status: "Coming Soon",
    demo: "#",
    github: "#",
    details:
      "Slot untuk proyek berikutnya. Pantau terus halaman ini untuk melihat progresnya.",
  },
  {
    id: "03",
    title: "Eksplorasi Cybersecurity",
    category: "Coming Soon",
    icon: "?",
    description:
      "Rencana eksperimen seputar keamanan siber dan kecerdasan artifisial sedang disusun.",
    tech: ["Segera Hadir"],
    image: "",
    status: "Coming Soon",
    demo: "#",
    github: "#",
    details:
      "Rencana eksplorasi di bidang cybersecurity dan AI akan ditampilkan setelah siap.",
  },
];

const projectGrid = document.querySelector("#project-grid");
const filters = document.querySelector("#filters");
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");

document.querySelector("#year").textContent = new Date().getFullYear();

const githubLink = document.querySelector("#github-link");
if (githubLink) githubLink.href = profile.github;

const emailLink = document.querySelector("#email-link");
if (emailLink && profile.email) {
  emailLink.href = `mailto:${profile.email}`;
}

function renderProjects(category = "all") {
  const visibleProjects = projects.filter(
    (project) => category === "all" || project.category === category,
  );

  projectGrid.innerHTML = visibleProjects
    .map((project) => {
      const imageContent = project.image
        ? `<img src="${project.image}" alt="Preview ${project.title}" loading="lazy">`
        : `<span class="project-image-placeholder">${project.icon}</span>`;

      return `
    <article class="project-card">
      <div class="project-image">
        ${imageContent}
        <span class="project-number mono">PROJECT / ${project.id}</span>
      </div>
      <div class="project-body">
        <div class="project-top">
          <h3>${project.title}</h3>
          <span class="project-icon">${project.icon}</span>
        </div>
        <p>${project.description}</p>
        <div class="tags">
          ${project.tech.map((tech) => `<span class="tag">${tech}</span>`).join("")}
        </div>
        <div class="project-bottom">
          <button type="button" data-detail="${project.id}">Lihat detail ↗</button>
          <span class="project-category">${project.category}</span>
        </div>
      </div>
    </article>
  `;
    })
    .join("");
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;

  filters.querySelectorAll(".filter").forEach((item) => {
    item.classList.toggle("active", item === button);
  });

  renderProjects(button.dataset.filter);
});

projectGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-detail]");
  if (!button) return;

  const project = projects.find((item) => item.id === button.dataset.detail);
  if (!project) return;

  const demoLink =
    project.demo !== "#"
      ? `<a class="button button-primary" href="${project.demo}">Buka demo ↗</a>`
      : "";

  const githubLink =
    project.github !== "#"
      ? `<a class="button button-ghost" href="${project.github}" target="_blank" rel="noopener noreferrer">Source code ↗</a>`
      : "";

  dialogContent.innerHTML = `
    <p class="eyebrow">${project.category} / ${project.status}</p>
    <h2>${project.title}</h2>
    <p>${project.details}</p>
    <div class="tags">
      ${project.tech.map((tech) => `<span class="tag">${tech}</span>`).join("")}
    </div>
    <div class="dialog-links">${demoLink}${githubLink}</div>
  `;

  dialog.showModal();
});

document.querySelector(".close-dialog").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

renderProjects();
