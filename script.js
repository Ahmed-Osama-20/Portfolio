
// header scroll state
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive:true });
 
  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
 
  // custom cursor
  const dot = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(max-width:860px)').matches;
 
  if(!isTouch){
    window.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx+'px'; dot.style.top = my+'px';
    });
    function ringLoop(){
      rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
      ring.style.left = rx+'px'; ring.style.top = ry+'px';
      requestAnimationFrame(ringLoop);
    }
    ringLoop();
 
    document.querySelectorAll('a, button, .project').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('hover');
        if(el.closest('.project') || el.dataset.cursor === 'view') ring.classList.add('view');
      });
      el.addEventListener('mouseleave', () => { ring.classList.remove('hover'); ring.classList.remove('view'); });
    });
  }
 
  // orb parallax
const orbWrap = document.getElementById('orbWrap');
  const orb = document.getElementById('orb');
  if(orbWrap && !reduceMotion){
    window.addEventListener('mousemove', e => {
      const cx = window.innerWidth/2, cy = window.innerHeight/2;
      const dx = (e.clientX - cx)/cx, dy = (e.clientY - cy)/cy;
      orb.style.transform = `translate(${dx*14}px, ${dy*14}px)`;
    });
  }
 
  // project spotlight follow
  document.querySelectorAll('.project').forEach(p => {
    p.addEventListener('mousemove', e => {
      const r = p.getBoundingClientRect();
      p.style.setProperty('--mx', (e.clientX-r.left)+'px');
      p.style.setProperty('--my', (e.clientY-r.top)+'px');
    });
  });
 
  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold:0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
 
  // hero always visible on load
  window.addEventListener('load', () => {
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in'));
  });
 