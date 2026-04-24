// Nav scroll
const navEl = document.getElementById('nav');
if(navEl) window.addEventListener('scroll', () => navEl.classList.toggle('scrolled', scrollY > 20), {passive:true});

// Hamburger
const hbgEl = document.getElementById('hbg');
const mobEl = document.getElementById('mob');
if(hbgEl && mobEl){
  hbgEl.addEventListener('click', () => { hbgEl.classList.toggle('open'); mobEl.classList.toggle('open'); });
  mobEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { hbgEl.classList.remove('open'); mobEl.classList.remove('open'); }));
}

// Fade in
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('vis'); io.unobserve(e.target); } });
}, {threshold:.1});
document.querySelectorAll('.fi').forEach(el => io.observe(el));

// FAQ
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const ans  = item.querySelector('.faq-a');
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!open){ item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
  });
});

// Form
const ctaForm = document.getElementById('ctaForm');
if(ctaForm){
  ctaForm.addEventListener('submit', e => {
    e.preventDefault();
    const nom = document.getElementById('nombre');
    const tel = document.getElementById('telefono');
    const eN  = document.getElementById('errNombre');
    const eT  = document.getElementById('errTel');
    eN.textContent = eT.textContent = '';
    let ok = true;
    if(!nom.value.trim()){ eN.textContent = 'Por favor escribe tu nombre.'; ok=false; }
    const tv = tel.value.trim().replace(/\s/g,'');
    if(!tv){ eT.textContent = 'Por favor escribe tu teléfono.'; ok=false; }
    else if(!/^[6789]\d{8}$/.test(tv)){ eT.textContent = 'Introduce un teléfono español válido (9 dígitos).'; ok=false; }
    if(ok){
      ctaForm.style.display = 'none';
      document.getElementById('okName').textContent = nom.value.trim().split(' ')[0];
      document.getElementById('formOk').classList.add('vis');
    }
  });
}
