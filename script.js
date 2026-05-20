// ===================== CUSTOM CURSOR =====================
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(0.8)');
document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');

// Cursor hover state on clickable elements
document.querySelectorAll('a, button, .pin-card, .file-card, .case-row, .story-back, .nav-logo, [onclick]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.borderColor = '#e74c3c';
    cursor.style.transform = 'translate(-50%,-50%) scale(1.4)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.borderColor = 'var(--crimson-bright)';
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ===================== PAGE ROUTING =====================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ===================== MOBILE MENU =====================
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// ===================== CASE FILE FILTER =====================
function filterCases(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.case-row').forEach(row => {
    if (tag === 'all') {
      row.classList.remove('hidden');
    } else {
      const tags = row.getAttribute('data-tags') || '';
      if (tags.includes(tag)) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
      }
    }
  });
}

// ===================== TYPEWRITER EFFECT ON HERO TITLE =====================
document.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('.board-title');
  if (!title) return;

  const originalHTML = title.innerHTML;
  const lines = ['YOU WEREN\'T', 'SUPPOSED TO', 'FIND THIS.'];

  title.innerHTML = '';
  title.style.visibility = 'visible';

  let lineIndex = 0;
  let charIndex = 0;

  function typeNext() {
    if (lineIndex >= lines.length) {
      // Done
      return;
    }

    const line = lines[lineIndex];

    if (charIndex < line.length) {
      title.innerHTML += line[charIndex];
      charIndex++;
      setTimeout(typeNext, 55 + Math.random() * 40);
    } else {
      if (lineIndex < lines.length - 1) {
        title.innerHTML += '<br/>';
      }
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, 200);
    }
  }

  setTimeout(typeNext, 400);

  // ===================== SCROLL FADE-IN FOR SECONDARY SECTION =====================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.file-card, .case-row').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

  // ===================== CONTACT FORM SUBMIT =====================
  const submitBtn = document.querySelector('.btn-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      submitBtn.textContent = 'EVIDENCE RECEIVED. DO NOT CONTACT US AGAIN.';
      submitBtn.style.borderColor = 'var(--amber-bright)';
      submitBtn.style.color = 'var(--amber-bright)';
      setTimeout(() => {
        submitBtn.textContent = 'FILE REPORT';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
      }, 4000);
    });
  }
});
