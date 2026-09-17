(function(){
  "use strict";

  // Year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  function getStored(){
    try { return window.localStorage.getItem('ie-theme'); } catch(e){ return null; }
  }
  function setStored(v){
    try { window.localStorage.setItem('ie-theme', v); } catch(e){ /* ignore */ }
  }
  function applyIcon(){
    var isDark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (toggle) toggle.textContent = isDark ? '☀️' : '🌙';
  }
  var stored = getStored();
  if (stored === 'dark' || stored === 'light') root.setAttribute('data-theme', stored);
  applyIcon();
  if (toggle){
    toggle.addEventListener('click', function(){
      var current = root.getAttribute('data-theme');
      var isDark = current === 'dark' || (!current && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      setStored(next);
      applyIcon();
    });
  }

  // Mobile nav
  var mobileToggle = document.getElementById('mobileToggle');
  var navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks){
    mobileToggle.addEventListener('click', function(){
      var open = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        navLinks.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  // Contact form -> mailto
  var form = document.getElementById('contactForm');
  if (form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-message').value.trim();
      var subject = encodeURIComponent('Portfolio contact from ' + name);
      var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:ennajmiikram123@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
})();
