/* CreateMineRepeat — petit script : bascule FR/EN, menu mobile, boutons « copier ». Aucun pistage. */
(function(){
  var root=document.documentElement;
  function setLang(l){
    root.setAttribute('data-lang',l); root.setAttribute('lang',l==='en'?'en':'fr-CA');
    try{localStorage.setItem('cmr-lang',l)}catch(e){}
    var t=document.querySelector('meta[name="title-'+l+'"]'); if(t) document.title=t.content;
    document.querySelectorAll('.lang-toggle').forEach(function(b){
      b.textContent=l==='en'?'FR':'EN';
      b.setAttribute('aria-label',l==='en'?'Afficher en français':'Show in English');});
  }
  var saved=null; try{saved=localStorage.getItem('cmr-lang')}catch(e){}
  var q=new URLSearchParams(location.search).get('lang');
  setLang(q==='en'||q==='fr'?q:(saved||'fr'));
  document.addEventListener('click',function(e){
    var b=e.target.closest('.lang-toggle');
    if(b){setLang(root.getAttribute('data-lang')==='en'?'fr':'en');return;}
    var m=e.target.closest('.menu-btn');
    if(m){var n=document.getElementById('site-nav');var o=n.classList.toggle('open');m.setAttribute('aria-expanded',o);return;}
    var c=e.target.closest('.copy');
    if(c){
      var v=c.getAttribute('data-copy');
      var ok=function(){var old=c.innerHTML;c.classList.add('done');c.innerHTML=root.getAttribute('data-lang')==='en'?'Copied!':'Copié!';
        setTimeout(function(){c.classList.remove('done');c.innerHTML=old},1600)};
      if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(v).then(ok,function(){fallback(v);ok()})}
      else{fallback(v);ok()}
    }
  });
  function fallback(v){var t=document.createElement('textarea');t.value=v;t.setAttribute('readonly','');t.style.position='absolute';t.style.left='-9999px';document.body.appendChild(t);t.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(t)}
})();
