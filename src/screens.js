// Turns portfolio data into { title, text, links, downloads } for each screen.
export const SCREENS = ["intro", "about", "education", "projects", "certs", "skills", "contact", "resume"];

const link = (label, href) => ({ label, href });

export function buildScreen(id, d, projIdx = 0) {
  const none = { links: [], downloads: [] };
  switch (id) {
    case "intro":
      return { ...none, title: "SYSTEM ONLINE // INTRODUCTION",
        text: `Hello, world. I am ${d.intro.name}.\n\nROLE: ${d.intro.title}\n\n${d.intro.text}` };
    case "about":
      return { ...none, title: "ABOUT ME",
        text: `${d.about.description}\n\nEXPERIENCE: ${d.about.experience}\n\nHOBBIES: ${d.about.hobbies}\n\nFUN FACTS: ${d.about.funFacts}` };
    case "education":
      return { ...none, title: "EDUCATION",
        text: d.education.map((e, i) => `[${String(i + 1).padStart(2, "0")}] ${e.degree}\n${e.institution}\n${e.dates}\n${e.qualifications}`).join("\n\n") };
case "projects": {
      const p = d.projects[projIdx];
      return {
        ...none,
        title: `PROJECT ${projIdx + 1}/${d.projects.length}`,
        text: `${p.name}\n\n${p.description}`,
        techText: p.technologies,
        links: [
          ...(p.github ? [link("SOURCE CODE ↗", p.github)] : []),
          ...(p.demo ? [link("VIEW PROJECT ↗", p.demo)] : []),
        ],
      };
    }
    case "certs":
      return { ...none, title: "CERTIFICATIONS",
        text: d.certifications.map((c, i) => `[${String(i + 1).padStart(2, "0")}] ${c.name}\n${c.issuer} // ${c.date}`).join("\n\n"),
        links: d.certifications.map((c, i) => link(c.linkLabel || `VIEW CERTIFICATE ${String(i + 1).padStart(2, "0")}`, c.url)) };
    case "skills":
  return {
    ...none,
    title: "MY / TECH STACK",
    text: "Technologies I work with and explore.",
    skills: d.skills["Tech Stack"],
  };
    case "contact": {
      const c = d.contact;
      return { ...none, title: "CONTACT // OPEN CHANNEL", text: "Channels ready. Select a link below to connect.",
        links: [
          ...(c.email ? [link("EMAIL", `mailto:${c.email}`)] : []),
          ...(c.github ? [link("GITHUB", c.github)] : []),
          ...(c.linkedin ? [link("LINKEDIN", c.linkedin)] : []),
          ...(c.other ?? []).filter((o) => o.url).map((o) => link(o.label, o.url)),
        ] };
    }
    case "resume":
      return { ...none, title: "DOCUMENTS", text: "Transfer ready. Download my documents below, or restart the experience.",
        downloads: [link("DOWNLOAD RESUME", d.files.resume), link("DOWNLOAD CV", d.files.cv)].filter((item) => item.href) };
    default:
      return { ...none, title: "", text: "" };
  }
}
