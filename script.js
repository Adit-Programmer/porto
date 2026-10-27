
const profile = {
  github: "https://github.com/USERNAME-KAMU",
  email: "emailkamu@example.com",
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
    title: "Task Manager",
    category: "JavaScript",
    icon: "JS",
    description:
      "Aplikasi pengelolaan tugas untuk mencatat pekerjaan dan memantau progres harian.",
    tech: ["JavaScript", "DOM", "CSS3"],
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80",
    status: "Contoh proyek",
    demo: "#",
    github: "#",
    details:
      "Proyek latihan untuk manipulasi DOM, event listener, dan penyimpanan data menggunakan localStorage.",
  },
  {
    id: "03",
    title: "Student Management",
    category: "HTML & CSS",
    icon: "</>",
    description:
      "Konsep dashboard pengelolaan data siswa dengan tabel dan antarmuka administrasi.",
    tech: ["HTML5", "CSS3", "UI Design"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    status: "Konsep UI",
    demo: "#",
    github: "#",
    details:
      "Konsep tampilan sistem informasi siswa. Fitur backend dan database belum diimplementasikan.",
  },
  {
    id: "04",
    title: "Portfolio Website",
    category: "UI/UX",
    icon: "UI",
    description:
      "Website portofolio pribadi dengan desain minimalis, responsif, dan komponen proyek dinamis.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    status: "Sedang dibangun",
    demo: "#",
    github: "#",
    details:
      "Website ini dibuat untuk mendokumentasikan proyek, kemampuan, dan perkembangan belajar pemrograman.",
  },
];

const projectGrid = document.querySelector("#project-grid");
const filters = document.querySelector("#filters");
const dialog = document.querySelector("#project-dialog");
const dialogContent = document.querySelector("#dialog-content");

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#github-link").href = profile.github;
document.querySelector("#email-link").href = `mailto:${profile.email}`;

function renderProjects(category = "all") {
  const visibleProjects = projects.filter(
    (project) => category === "all" || project.category === category,
  );

  projectGrid.innerHTML = visibleProjects
    .map(
      (project) => `
    <article class="project-card">
      <div class="project-image">
        <img src="${project.image}"
             alt="Preview ${project.title}"
             loading="lazy"
             onerror="this.style.display='none'">
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
  `,
    )
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
