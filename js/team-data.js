// ==== TEAM DATA (Real photos) ==== 
const faculty = [
  { name: 'Lt. Gautam Kumar', role: 'Faculty Coordinator', color: 'cyan', img: 'assets/team/gautam-sir.webp' },
  { name: 'Ms. Kanchan Choudhary', role: 'Faculty Coordinator', color: 'pink', img: 'assets/team/kanchan-mam.webp' }
];
const core = [
  { name: 'Vansh Kakkar', role: 'President', color: 'pink', img: 'assets/team/vansh.webp' },
  { name: 'Stuti Sharma', role: 'Vice President', color: 'cyan', img: 'assets/team/stuti.webp' },
  { name: 'Shreshth Aggarwal', role: 'General Secretary', color: 'yellow', img: 'assets/team/shreshth.webp' }
];
const heads = [
  { name: 'Tejveer Singh', role: 'Web Development Head', color: 'cyan', img: 'assets/team/tejveer.webp' },
  { name: 'Taranjot Kaur', role: 'Graphic Design Head', color: 'pink', img: 'assets/team/taranjot.webp' },
  { name: 'Lovish Singh', role: 'Social Media Head', color: 'yellow', img: 'assets/team/lovish.webp' },
  { name: 'Juhi', role: 'PR & Sponsorship Head', color: 'green', img: 'assets/team/juhi.webp' },
  { name: 'Tanishka Khurana', role: 'Event Management Head', color: 'pink', img: 'assets/team/tanishka.webp' }
];
const coHeads = [
  { name: 'Amanjot Singh', role: 'Web Development Co-Head', color: 'cyan', img: 'assets/team/aman-jot.webp' },
  { name: 'Saumya Negi', role: 'Graphic Design Co-Head', color: 'pink', img: 'assets/team/saumya.webp' },
  { name: 'Vedic Rohilla', role: 'Social Media Co-Head', color: 'yellow', img: 'assets/team/vedic.webp' },
  { name: 'Vridhi', role: 'PR & Sponsorship Co-Head', color: 'green', img: 'assets/team/vridhi.webp' },
  { name: 'Prakrati Aggarwal', role: 'Event Management Co-Head', color: 'cyan', img: 'assets/team/prakrati.webp' }
];

function memberCard(m) {
  return `
    <div class="member-card border-${m.color}">
      <div class="member-photo-wrap ${m.color}-photo">
        <img src="${m.img}" alt="${m.name}" loading="lazy" />
        <div class="member-scanline"></div>
      </div>
      <div class="member-info">
        <div class="member-tag">▶ ${m.role.toUpperCase()}</div>
        <h3 class="member-name">${m.name}</h3>
        <button class="btn btn-mini">CONNECT</button>
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
  if ('IntersectionObserver' in window) {
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
