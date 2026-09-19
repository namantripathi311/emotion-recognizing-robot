document.addEventListener('DOMContentLoaded',()=>{
  const loader=document.getElementById('loader');
  if(loader){
    loader.style.opacity='0';
    setTimeout(()=>loader.remove(),250);
  }

  const menu=document.querySelector('.menu-btn');
  const nav=document.querySelector('.navbar nav');
  const closeMenu=()=>{
    if(!menu||!nav)return;
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-label','Open navigation menu');
  };
  if(menu&&nav){
    menu.addEventListener('click',()=>{
      const isOpen=nav.classList.toggle('open');
      menu.setAttribute('aria-expanded',String(isOpen));
      menu.setAttribute('aria-label',isOpen?'Close navigation menu':'Open navigation menu');
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
    document.addEventListener('click',event=>{
      if(!nav.contains(event.target)&&!menu.contains(event.target))closeMenu();
    });
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'){
        const wasOpen=nav.classList.contains('open');
        closeMenu();
        if(wasOpen)menu.focus();
      }
    });
  }

  const toggle=document.getElementById('themeToggle');
  const saved=localStorage.getItem('emotionbot-theme');
  if(saved==='dark')document.body.classList.add('dark');
  const updateThemeButton=()=>{
    if(!toggle)return;
    const dark=document.body.classList.contains('dark');
    toggle.textContent=dark?'☾':'☼';
    toggle.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');
    toggle.setAttribute('aria-pressed',String(dark));
  };
  updateThemeButton();
  if(toggle)toggle.addEventListener('click',()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('emotionbot-theme',document.body.classList.contains('dark')?'dark':'light');
    updateThemeButton();
  });

  const top=document.getElementById('topBtn');
  const progress=document.createElement('div');
  progress.className='scroll-progress';
  progress.setAttribute('aria-hidden','true');
  document.body.append(progress);
  const updateScrollState=()=>{
    const scrollable=document.documentElement.scrollHeight-window.innerHeight;
    const percentage=scrollable>0?(window.scrollY/scrollable)*100:0;
    progress.style.width=`${percentage}%`;
    if(top)top.classList.toggle('visible',window.scrollY>450);
  };
  window.addEventListener('scroll',updateScrollState,{passive:true});
  updateScrollState();
  if(top)top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  const revealItems=document.querySelectorAll('.reveal');
  const revealImmediately=element=>{
    const bounds=element.getBoundingClientRect();
    return bounds.top<window.innerHeight&&bounds.bottom>0;
  };
  revealItems.forEach(item=>{
    if(revealImmediately(item))item.classList.add('visible');
  });
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),{threshold:.12});
    revealItems.forEach(item=>observer.observe(item));
  }else revealItems.forEach(item=>item.classList.add('visible'));

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
      if(re) re.textContent=response[e][0];
      if(rt){
        rt.animate([{opacity:.35,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
        rt.textContent=response[e][1];
      }
    });
  });
});
