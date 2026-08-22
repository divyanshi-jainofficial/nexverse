// ==== TEAM DATA (Real photos) ====
// `link` = real profile/social URL for the CONNECT button. No link => disabled "CONNECT N/A"
// (demo links point at the society's own pages — swap in real member profiles later)
const IG = 'https://www.instagram.com/nexverse_iitm/';
const IN = 'https://www.linkedin.com/in/geek-room-iitm/';
const faculty = [
  { name: 'Lt. Gautam Kumar', role: 'Faculty Coordinator', color: 'cyan', img: 'assets/team/gautam-sir.webp', link: '' },
  { name: 'Ms. Kanchan Choudhary', role: 'Faculty Coordinator', color: 'pink', img: 'assets/team/kanchan-mam.webp', link: '' }
];
const core = [
  { name: 'Vansh Kakkar', role: 'President', color: 'pink', img: 'assets/team/vansh.webp', link: IN },
  { name: 'Stuti Sharma', role: 'Vice President', color: 'cyan', img: 'assets/team/stuti.webp', link: IG },
  { name: 'Shreshth Aggarwal', role: 'General Secretary', color: 'yellow', img: 'assets/team/shreshth.webp', link: IG }
];
const heads = [
  { name: 'Tejveer Singh', role: 'Web Development Head', color: 'cyan', img: 'assets/team/tejveer.webp', link: IG },
  { name: 'Taranjot Kaur', role: 'Graphic Design Head', color: 'pink', img: 'assets/team/taranjot.webp', link: IG },
  { name: 'Lovish Singh', role: 'Social Media Head', color: 'yellow', img: 'assets/team/lovish.webp', link: IG },
  { name: 'Juhi', role: 'PR & Sponsorship Head', color: 'green', img: 'assets/team/juhi.webp', link: IG },
  { name: 'Tanishka Khurana', role: 'Event Management Head', color: 'pink', img: 'assets/team/tanishka.webp', link: IG }
];
const coHeads = [
  { name: 'Amanjot Singh', role: 'Web Development Co-Head', color: 'cyan', img: 'assets/team/aman-jot.webp', link: IG },
  { name: 'Saumya Negi', role: 'Graphic Design Co-Head', color: 'pink', img: 'assets/team/saumya.webp', link: IG },
  { name: 'Vedic Rohilla', role: 'Social Media Co-Head', color: 'yellow', img: 'assets/team/vedic.webp', link: IG },
  { name: 'Vridhi', role: 'PR & Sponsorship Co-Head', color: 'green', img: 'assets/team/vridhi.webp', link: IG },
  { name: 'Prakrati Aggarwal', role: 'Event Management Co-Head', color: 'cyan', img: 'assets/team/prakrati.webp', link: IG }
];

function memberCard(m) {
  // Real link if we have one — otherwise a disabled state (mirrors official site's "CONNECT N/A")
  const connectBtn = m.link
    ? `<a class="btn btn-mini" href="${m.link}" target="_blank" rel="noopener" aria-label="Connect with ${m.name}">CONNECT</a>`
    : `<span class="btn btn-mini btn-disabled" aria-disabled="true">CONNECT N/A</span>`;
  return `
    <div class="member-card border-${m.color}">
      <div class="member-photo-wrap ${m.color}-photo">
        <img src="${m.img}" alt="${m.name}" loading="lazy" />
        <div class="member-scanline"></div>
      </div>
      <div class="member-info">
        <div class="member-tag">▶ ${m.role.toUpperCase()}</div>
        <h3 class="member-name">${m.name}</h3>
        ${connectBtn}
      </div>
    </div>`;
}

function renderTeam() {
  const map = { facultyGrid: faculty, coreGrid: core, headsGrid: heads, coHeadsGrid: coHeads };
  Object.entries(map).forEach(([id, list]) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = list.map(memberCard).join('');
  });
  const cards = document.querySelectorAll('.member-card');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    cards.forEach((c, i) => { c.style.transitionDelay = (i % 6) * 60 + 'ms'; io.observe(c); });
  } else {
    cards.forEach(c => c.classList.add('in-view'));
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderTeam);
} else {
  renderTeam();
}
