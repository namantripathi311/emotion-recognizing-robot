document.addEventListener('DOMContentLoaded',()=>{
  const loader=document.getElementById('loader');
  if(loader){setTimeout(()=>{loader.style.opacity='0';setTimeout(()=>loader.remove(),450)},700)}
  const menu=document.querySelector('.menu-btn'), nav=document.querySelector('.navbar nav');
  if(menu) menu.addEventListener('click',()=>nav.classList.toggle('open'));
  const toggle=document.getElementById('themeToggle');
  const saved=localStorage.getItem('emotionbot-theme');
  if(saved==='dark') document.body.classList.add('dark');
  if(toggle) toggle.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('emotionbot-theme',document.body.classList.contains('dark')?'dark':'light');
  });
  const top=document.getElementById('topBtn');
  window.addEventListener('scroll',()=>{if(top) top.style.display=scrollY>450?'block':'none'});
  if(top) top.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  const response={
    HAPPY:['😊','“You seem happy today!”'], SAD:['😢','“Is everything okay?”'],
    ANGRY:['😠','“I understand you may be frustrated.”'], FEAR:['😨','“Don’t worry, I’m here to help.”'],
    SURPRISE:['😲','“That was unexpected!”'], NEUTRAL:['😐','“Hello! How are you feeling?”']
  };
  document.querySelectorAll('#demoEmotions button').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('#demoEmotions button').forEach(b=>b.classList.remove('selected'));
      btn.classList.add('selected');
      const e=btn.dataset.emotion,c=btn.dataset.confidence,emoji=btn.dataset.emoji;
      const em=document.getElementById('demoEmotion'), ee=document.getElementById('demoEmoji'), ct=document.getElementById('confidenceText'), bar=document.getElementById('confidenceBar');
      if(em) em.textContent=e;if(ee) ee.textContent=emoji;if(ct) ct.textContent=c+'%';if(bar) bar.style.width=c+'%';
      const re=document.getElementById('responseEmoji'),rt=document.getElementById('responseText');
      if(re) re.textContent=response[e][0];if(rt) rt.textContent=response[e][1];
    });
  });
});