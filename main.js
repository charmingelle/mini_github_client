(()=>{"use strict";class e{constructor(e){this._firstScreen=document.createElement("div");let t=document.createElement("input"),a=document.createElement("button");this._firstScreen.id="first-screen-container",t.id="user-or-org-name-input",t.type="text",t.placeholder="Enter username",a.id="submit-button",a.innerHTML="GET CARDS";const n=()=>{t.value.length?(t.removeEventListener("keydown",n),t.removeEventListener("focus",i),e(t.value),s()):t.classList.add("invalid")},s=()=>{t.setAttribute("disabled",!0),a.setAttribute("disabled",!0),a.innerHTML="Loading..."},i=()=>{t.classList.remove("invalid")};a.addEventListener("click",n),t.addEventListener("keydown",(e=>{13===e.which&&n()})),t.addEventListener("focus",i),this._firstScreen.appendChild(t),this._firstScreen.appendChild(a)}get domElement(){return this._firstScreen}}const t="https://api.github.com/";function a(e,a={}){return new Promise(((n,s)=>{var i=new XMLHttpRequest;i.onreadystatechange=()=>{4===i.readyState&&(i.status>200?s(i,i.status):n(JSON.parse(i.responseText)))},i.open("GET",`${t}${e}`),Object.keys(a).forEach((e=>{i.setRequestHeader(e,a[e])})),i.send()}))}const n="repo-name-sort",s="stars-count-sort",i="open-issues-sort",r="update-date-sort";class d{constructor(e){this._sortingPanel=document.createElement("div");const t=[this.createButton(n,"Sort by repo name"),this.createButton(s,"Sort by stars count"),this.createButton(i,"Sort by open issues count"),this.createButton(r,"Sort by updated date")];this._sortingPanel.id="sorting-panel",h(this._sortingPanel,t),this._sortingPanel.addEventListener("click",(a=>{const n=a.target.closest(".sort");n&&(e({button:n.id,order:n.getAttribute("data-order")}),t.forEach((e=>e.classList.remove("clicked"))),n.classList.add("clicked"),"descending"===n.getAttribute("data-order")?(n.setAttribute("data-order","ascending"),n.childNodes[1].innerHTML="&#8593;"):(n.setAttribute("data-order","descending"),n.childNodes[1].innerHTML="&#8595;"))}))}createButton(e,t){let a=document.createElement("button");a.id=e,a.classList.add("sort"),a.setAttribute("data-order","ascending");let n=document.createElement("span");n.textContent=t,n.classList.add("button-title");let s=document.createElement("span");return s.classList.add("sort-order-arrow"),a.appendChild(n),a.appendChild(s),a}get domElement(){return this._sortingPanel}}const o={[n]:l("name"),[s]:l("stargazers_count"),[i]:l("open_issues_count"),[r]:l("updated_at")};function l(e){return function(t,a){t.sort(((t,n)=>t[e]>n[e]?a:t[e]<n[e]?-a:void 0))}}const c=[function(e,t){return t.hasOpenIssues?e.filter((e=>e.open_issues_count>0)):e},function(e,t){return t.hasTopics?e.filter((e=>Array.isArray(e.topics)&&e.topics.length)):e},function(e,t){return t.starred>0?e.filter((e=>e.stargazers_count>=t.starred)):e},function(e,t){return t.date?e.filter((e=>e.updated_at-t.date>0)):e},function(e,t){return"forks"===t.type?e.filter((e=>!0===e.fork)):"sources"===t.type?e.filter((e=>!1===e.fork)):e},function(e,t){return"All languages"!==t.language?e.filter((e=>e.language===t.language)):e}];function h(e,t){t.forEach((t=>e.appendChild(t)))}function u(e){for(;e.firstChild;)e.removeChild(e.firstChild)}class m{constructor(e){const{owner:t,repoName:a,isFork:n}=e;this.mainScreen=document.getElementById("main-screen"),this.overlay=document.createElement("div"),this.overlay.id="overlay",this.isWithData=!1,this.window=document.createElement("div"),this.window.id="card-details-window",this.window.innerHTML="<span>Loading...</span>";let s=[this.getContributors(t,a),this.getLanguages(t,a),this.getPullRequests(t,a)];n&&s.push(this.getForkedFrom(t,a)),Promise.all(s).then((t=>{this.isWithData=!0,this.initModalWindow(t,e)})),this.close=this.close.bind(this),this.overlay.addEventListener("click",this.close)}initModalWindow(e,t){const[a,n,s,i]=e,{repoName:r,url:d}=t;let o=[this.getHeading(r,d,i),this.getContributorsContainer(a),this.getLanguagesContainer(n)];s.length&&o.push(this.getPrsContainer(s)),u(this.window),this.window.appendChild(this.getWindowContent(o))}getHeading(e,t,a){let n=document.createElement("div"),s=document.createElement("a");if(n.id="heading",s.id="repo-name-link",s.innerHTML=e,s.href=t,n.appendChild(s),a){let e=document.createElement("p");e.id="source",e.innerHTML=`Forked from <a href = 'https://github.com/${a}'>${a}</a>`,n.appendChild(e)}return n}getContributorsContainer(e){let t=document.createElement("div"),a=document.createElement("h2"),n=document.createElement("table");return t.classList.add("block-container"),a.classList.add("block-container-heading"),a.innerHTML="Contributors",n.innerHTML="<thead><td>Username</td><td>Contributions</td></thead>",e.forEach((e=>{let t=document.createElement("tr"),a=document.createElement("td"),s=document.createElement("td");a.innerHTML=`<a href = '${e.html_url}'>${e.login}</a>`,s.innerHTML=e.contributions,s.classList.add("number-of-prs"),t.appendChild(a),t.appendChild(s),n.appendChild(t)})),t.appendChild(a),t.appendChild(n),t}getLanguagesContainer(e){let t=document.createElement("div"),a=document.createElement("h2"),n=document.createElement("table");for(var s in t.classList.add("block-container"),a.classList.add("block-container-heading"),a.innerHTML="Languages",n.innerHTML="<thead><td>Language</td><td>Kb</td></thead>",e){if(!e.hasOwnProperty(s))return;let t=document.createElement("tr"),a=document.createElement("td"),i=document.createElement("td");a.innerHTML=s,i.innerHTML=e[s],i.classList.add("amount-of-kbs"),t.appendChild(a),t.appendChild(i),n.appendChild(t)}return t.appendChild(a),t.appendChild(n),t}getPrsContainer(e){let t=document.createElement("div"),a=document.createElement("h2"),n=document.createElement("ul");return t.classList.add("block-container"),a.classList.add("block-container-heading"),a.innerHTML="Pull&#160;Requests",h(n,e.map((e=>{let t=document.createElement("li");return t.innerHTML=`<a href = '${e.html_url}'>${e.title}</a>`,t}))),h(t,[a,n]),t}getOkButton(){let e=document.createElement("button");return e.id="ok-button",e.innerHTML="OK",e.addEventListener("click",this.close),e}getWindowContent([e,...t]){let a=document.createElement("div"),n=document.createElement("div"),s=this.getOkButton();return a.id="card-details-wrapper",n.id="content-container",h(n,t),h(a,[e,n,s]),a}getForkedFrom(e,t){return a(`repos/${e.login}/${t}`).then((e=>e.parent.full_name))}getContributors(e,t){return a(`repos/${e.login}/${t}/contributors`).then((e=>e.map((({login:e,html_url:t,contributions:a})=>({login:e,html_url:t,contributions:a}))).splice(0,3)),(e=>{alert(e.message)}))}getLanguages(e,t){return a(`repos/${e.login}/${t}/languages`).then((e=>Object.keys(e).reduce(((t,a)=>{const n=(s=e[a],Math.round(s/125));var s;return n>1&&(t[a]=n),t}),{})),(e=>{alert(e.message)}))}getPullRequests(e,t){return a(`repos/${e.login}/${t}/pulls?sort=popularity`).then((e=>e.map((({title:e,html_url:t})=>({title:e,html_url:t}))).splice(0,5)),(e=>{alert(e.message)}))}draw(){document.getElementsByTagName("body")[0].classList.add("no-scroll"),this.mainScreen.appendChild(this.overlay),this.mainScreen.appendChild(this.window)}close(){this.mainScreen.removeChild(this.overlay),this.mainScreen.removeChild(this.window),document.getElementsByTagName("body")[0].classList.remove("no-scroll")}}const p=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];class g{constructor(e,t){this.repoName=e.name,this.url=e.svn_url,this.description=e.description,this.isFork=e.fork,this.language=e.language,this.starsCount=e.stargazers_count,this.date=e.updated_at,this.owner=e.owner,this.openIssuesCount=e.open_issues_count,this.topics=e.topics,this.index=t}get domElement(){let e=document.createElement("div");e.classList.add("card"),e.id=this.index,e.classList.add("card");let t=document.createElement("div");t.classList.add("card-name-fork-container");let a=document.createElement("div");a.classList.add("title-container");let n=document.createElement("a");n.innerText=this.repoName,n.href=this.url,n.classList.add("card-repo-name"),t.appendChild(a),a.appendChild(n),this.isFork&&t.appendChild(this.createCardForkedRepo()),e.appendChild(t),null!==this.description&&e.appendChild(this.createCardDescription()),null!==this.language&&e.appendChild(this.createCardLanguage());let s=document.createElement("div");s.classList.add("card-inline-group"),0!==this.starsCount&&s.appendChild(this.createStarsCounter());let i=this.getCardDate();return s.appendChild(i),e.appendChild(s),e}getCardDate(){let e="",t=document.createElement("div"),a=new Date,n=Math.floor((a-this.date)/864e5);return 0===n?e="Updated today":1===n?e="Updated yesterday":n<=31?e=`Updated ${n} days ago`:(e=`Updated on ${p[this.date.getMonth()]} ${this.date.getDate()}`,this.date.getFullYear()!=a.getFullYear()&&(e+=`, ${this.date.getFullYear()}`)),t.innerText=e,t.classList.add("card-update-date"),t}createCardDescription(){let e=document.createElement("p");return e.innerHTML=this.description,e.classList.add("card-description"),e}createCardLanguage(){let e=document.createElement("p");return e.innerHTML=this.language,e.classList.add("card-language"),e}createCardForkedRepo(){let e=document.createElement("p");return e.innerHTML="This repo is a fork",e.classList.add("card-is-repo-a-fork"),e}createStarsCounter(){let e=document.createElement("div");return e.innerHTML=`&#9733; ${this.starsCount}`,e.classList.add("card-stars-count"),e}}class C{constructor(){this.cards=[],this._domElement=this.createCardsListDomElement(),this.addCards=this.addCards.bind(this),this._domElement.addEventListener("click",this.handleCardClick.bind(this))}get domElement(){return this._domElement}addCards(e){this.cards=e.map(((e,t)=>new g(e,t))),u(this._domElement),this.draw()}handleCardClick(e){const t=e.target.closest(".card");t&&new m(this.cards[+t.id]).draw()}createCardsListDomElement(){let e=document.createElement("div");return e.id="card-container",e}draw(){let e=document.createElement("div");e.classList.add("cards-block-wrapper"),h(e,this.cards.map((e=>e.domElement))),this._domElement.appendChild(e)}}class L{constructor(e,t){this._filterPanel=document.createElement("div"),this._languageDropdown=document.createElement("select");let a=document.createElement("div"),n=document.createElement("label"),s=document.createElement("input"),i=document.createElement("div"),r=document.createElement("label"),d=document.createElement("input"),o=document.createElement("div"),l=document.createElement("label"),c=document.createElement("input"),u=document.createElement("div"),m=document.createElement("label"),p=document.createElement("input"),g=document.createElement("select"),C=document.createElement("option"),L=document.createElement("option"),E=document.createElement("option"),b=document.createElement("button");this._filterPanel.id="filter-panel",n.innerHTML="Has open issues",s.type="checkbox",h(a,[n,s]),r.innerHTML="Has topics",d.type="checkbox",i.appendChild(r),i.appendChild(d),l.innerHTML="Starred",c.id="star-input",c.type="number",c.value="0",c.min="0",o.appendChild(l),o.appendChild(c),m.innerHTML="Updated after",p.type="date",u.appendChild(m),u.appendChild(p),g.size="1",C.innerHTML="all",L.innerHTML="forks",E.innerHTML="sources",this.drawLanguages(t),b.innerHTML="Apply filters",b.classList.add("apply-filter-button"),b.addEventListener("click",(()=>{let t={};t.hasOpenIssues=s.checked,t.hasTopics=d.checked,t.starred=c.value,""!==p.value&&(t.date=new Date(Date.parse(p.value))),t.type=g.options[g.selectedIndex].innerHTML,t.language=this._languageDropdown.options[this._languageDropdown.selectedIndex].innerHTML,e(t)})),h(g,[C,L,E]),h(this._filterPanel,[a,i,o,u,g,this._languageDropdown,b]),this.drawLanguages=this.drawLanguages.bind(this)}get domElement(){return this._filterPanel}drawLanguages(e){u(this._languageDropdown),e.forEach((e=>{let t=document.createElement("option");t.innerHTML=e,this._languageDropdown.appendChild(t)}))}redrawLanguages(e){let t=this._languageDropdown.options[this._languageDropdown.selectedIndex].innerHTML;this.drawLanguages(e),this._languageDropdown.selectedIndex=~e.indexOf(t)?e.indexOf(t):0}}const E={ascending:1,descending:-1};(new class{constructor(){this.appWasStarted=!1,this.owner="",this.reposTotal=0,this.onSubmitClick=this.onSubmitClick.bind(this),this.firstScreen=new e(this.onSubmitClick),this.cardsData=[],this.cardsList=new C,this.isLoading=!1,this.languages=[],this.sortState={button:"repo-name-sort",order:"ascending"},this.filterState={hasOpenIssues:!1,hasTopics:!1,starred:0,date:"",type:"all",language:"All languages"},this.mainScreen=document.getElementById("main-screen"),this.initAppWithData=this.initAppWithData.bind(this),this.addCardsData=this.addCardsData.bind(this),this.loadNewCards=this.loadNewCards.bind(this),this.sortCardsData=this.sortCardsData.bind(this),this.filterCardsData=this.filterCardsData.bind(this),this.passData=this.passData.bind(this),this.catchError=this.catchError.bind(this),window.addEventListener("scroll",this.loadNewCards),this.onSortPanelChange=this.onSortPanelChange.bind(this),this.sortingPanel=new d(this.onSortPanelChange),this.onFilterPanelChange=this.onFilterPanelChange.bind(this),this.filterPanel=new L(this.onFilterPanelChange,this.languages),this.filterFunctions}getLanguages(e){return e.reduce(((e,t)=>(null===t.language||e.includes(t.language)||e.push(t.language),e)),["All languages"])}saveDatesInDateFormat(e){e.forEach((e=>{e.updated_at=new Date(e.updated_at)}))}passData(e){return this.isLoading=!1,e}catchError(e){this.isLoading=!1,alert(e.message)}getCardsData(e){var t;return this.isLoading=!0,a(`users/${e}/repos?page=${t=this.cardsData.length,t/30+1}`,{Accept:"application/vnd.github.mercy-preview+json"}).then(this.passData,this.catchError)}getNumberOfRepos(e){return a(`users/${e}`).then((e=>e.public_repos),this.catchError)}loadNewCards(){window.innerHeight+document.body.scrollTop+1>=document.body.scrollHeight&&(this.cardsData.length<this.reposTotal?this.isLoading||this.getCardsData(this.owner).then((e=>{this.addCardsData(e),this.cardsList.addCards(this.sortCardsData(this.filterCardsData()))})):window.removeEventListener("scroll",this.loadNewCards))}onSubmitClick(e){this.owner=e,Promise.all([this.getCardsData(e),this.getNumberOfRepos(e)]).then(this.initAppWithData)}addCardsData(e){this.saveDatesInDateFormat(e),this.cardsData=this.cardsData.concat(e)}initAppWithData(e){let[t,a]=e;this.saveDatesInDateFormat(t),this.cardsData=t,this.reposTotal=a,this.appWasStarted=!0,this.cardsList.addCards(this.cardsData),this.languages=this.getLanguages(this.cardsData),this.filterPanel.drawLanguages(this.languages),this.draw()}draw(){u(this.mainScreen),this.appWasStarted?h(this.mainScreen,[this.filterPanel.domElement,this.sortingPanel.domElement,this.cardsList.domElement]):this.mainScreen.appendChild(this.firstScreen.domElement)}onSortPanelChange(e){this.sortState=e,this.cardsList.addCards(this.sortCardsData(this.filterCardsData()))}sortCardsData(e){let t=e.slice();return n===this.sortState.button&&t.forEach((e=>{e.name=e.name.toLowerCase()})),o[this.sortState.button](t,E[this.sortState.order]),t}onFilterPanelChange(e){this.filterState=e,this.cardsList.addCards(this.sortCardsData(this.filterCardsData()))}filterCardsData(){let e=this.cardsData;var t,a;return t=e,a=this.filterState,e=c.reduce(((e,t)=>t(e,a)),t),this.languages=this.getLanguages(e),this.filterPanel.redrawLanguages(this.languages),e}}).draw()})();