// HerBloom: Sidebar navigation, page routing and app start
// ---------- shell ----------
const NAV = [["dash","🏠","Dashboard"],["period","🌸","Period tracker"],["first","🎀","First period care"],["preg","🤰","Pregnancy"],["pkit","🎒","Pregnancy kit"],["meno","🍂","Menopause"],["mkit","🧺","Menopause kit"],["bot","💬","Ask HerBloom"],["me","👤","Profile & About"]];
function viewApp(){
  return `<header class="top"><span class="logo">🌸 HerBloom</span><div class="search">Hi ${esc(U().name.split(" ")[0])}, how are you feeling today?</div><div class="av" title="${esc(U().name)}">${esc(U().name[0].toUpperCase())}</div></header>
  <div class="app"><aside><h1>HerBloom</h1>${NAV.map(n => `<button data-p="${n[0]}" class="${pg===n[0]?"on":""}">${n[1]} &nbsp;${n[2]}</button>`).join("")}<div class="sp"></div><button id="out">↩ &nbsp;Sign out</button></aside><main id="pgm"></main></div>`;
}
const VIEWS = {dash:vDash, period:vPeriod, first:vFirst, preg:vPreg, pkit:vPKit, meno:vMeno, mkit:vMKit, bot:vBot, me:vMe};
const BINDS = {period:bPeriod, first:bKit, preg:bPreg, pkit:bKit, meno:bMeno, mkit:bKit, bot:bBot, me:bMe};
function render(){
  const r = $("#root");
  if(screen === "title"){ r.innerHTML = viewTitle(); $("#start").onclick = () => { screen = DB.session ? "app" : "auth"; authMode = "signup"; render(); }; $("#lg").onclick = () => { screen = DB.session ? "app" : "auth"; authMode = "login"; render(); }; return; }
  if(screen === "auth" || !DB.session){ r.innerHTML = viewAuth(); bindAuth(); return; }
  r.innerHTML = viewApp();
  document.querySelectorAll("aside [data-p]").forEach(b => b.onclick = () => { pg = b.dataset.p; render(); });
  $("#out").onclick = () => { DB.session = null; persist(); screen = "title"; render(); };
  $("#pgm").innerHTML = VIEWS[pg](); BINDS[pg]?.();
}


render();