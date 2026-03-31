import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTjhoZS9FLBvaCHLCGr9f1FnGmnNHFLho",
  authDomain: "mugallym-tap.firebaseapp.com",
  projectId: "mugallym-tap",
  storageBucket: "mugallym-tap.firebasestorage.app",
  messagingSenderId: "636479603378",
  appId: "1:636479603378:web:bbd4de11a804f68c29bfab",
  measurementId: "G-EV3B3RYC6H"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
async function mugallymlaryGetir() {
    const querySnapshot = await getDocs(collection(db, "mygallymlar"));
    mugallymlar = [];
    querySnapshot.forEach((d) => {
        mugallymlar.push({ ...d.data(), firebaseId: d.id});
    });
    displaymugallymlar(mugallymlar);
}
mugallymlaryGetir();



document.getElementById("category-btn").addEventListener("click", function (e) {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    document.getElementById("category-dropdown").classList.toggle("active");
  }
});
function filtermugallymlar(ders) {
  document.querySelectorAll(".filter-btn").forEach(btn =>{
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  
  if (ders === "Ählisi") {
    displaymugallymlar(mugallymlar);
  } else {
    const suzulen = mugallymlar.filter((u) => u.dersi.toLowerCase() === ders.toLowerCase());
    displaymugallymlar(suzulen);
  }
  const menu = document.getElementById("nav-menu");
  if (menu) menu.classList.remove("nav-active");
}let mugallymlar = JSON.parse(localStorage.getItem("mugallymlar")) || [];
const container = document.getElementById("services-container");

function displaymugallymlar(Sanaw) {
  const container = document.getElementById("services-container");
  if (!container) return;
  container.innerHTML = "";

  const loggedIn =localStorage.getItem("login");
  Sanaw.forEach((mugallym) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${mugallym.surat}" alt="${mugallym.ady}" 
    style="width:100%; border-radius:10px; margin-bottom:10px;">
    <h3> <i class="fa-solid fa-user-gear"></i>${mugallym.ady}</h3>
    <p><i class="fa-solid fa-briefcase"></i><strong>Dersi: </strong><strong>${mugallym.dersi || "Mälim däl"}</strong></p>    
    <p><i class="fa-solid fa-info-circle"></i><strong>${mugallym.description}</strong></p>
     
    <div class="card-buttons">
    <button class="btn-call" onclick="janEt('${mugallym.tel}')">
    <i class="fa-solid fa-phone"></i>Jan Et
    </button>
    ${loggedIn ? `<button class="btn-delete" onclick="mugallymPoz(${mugallym.id})">
      <i class="fa-solid fa-trash"></i>  
     </button>`:""}
    </div>
`;
     card.addEventListener("click",(e)=>{
      if (e.target.closest(".btn-call")||e.target.closest(".btn-delete"))return;
      document.querySelector('.theme-btn').style.display = 'none';
      Swal.fire ({
        title: '',
        html:`
        <div class="mugallym-profil">
         <img src="${mugallym.surat}" class="profil-surat">
         <div class="profil-info">
         <h3 class="profil-ady">${mugallym.ady}</h3>
         <p class="profil-dersi">
         <i class="fa-solid fa-briefcase"></i> ${mugallym.dersi}
         </p>
        </div>
       </div>
         <p><i class="fa-solid fa-phone" style= "color: #007bff"></i> <strong>Tel:</strong> ${mugallym.tel}</p>
         <p><i class="fa-solid fa-user" style= "color: #007bff"></i> <strong>Ýaşy:</strong> ${mugallym.yasy ||"Näbelli"}</p>
         <p><i class="fa-solid fa-star" style= "color: #007bff"></i> <strong>Tejribe:</strong> ${mugallym.tejribe ||"Näbelli"}</p> 
         <p><i class="fa-solid fa-location-dot" style= "color: #007bff"></i> <strong>Ýaşaýan ýeri:</strong> ${mugallym.salgy ||"Näbelli"}</p>      
         <p><i class="fa-solid fa-info-circle" style= "color: #007bff"></i>${mugallym.description}</p>
         <div style="margin-top:15px;">
         <p><strong>Baha:</strong> ${mugallym.bahaSany> 0 ? (mugallym.baha / mugallym.bahaSany).toFixed(1) + " / 5 ("+ mugallym.bahaSany + " ses)" : "Baha berilmedi"}</p>
         <div id="yildyz-${mugallym.id}">
         ${[1,2,3,4,5].map(i => {
            const ortaBaha = mugallym.bahaSany > 0 ? mugallym.baha / mugallym.bahaSany : 0;
            return `<span onclick="bahaBer(${mugallym.id}, ${i})"style="font-size:28px; cursor:pointer; 
            color:${i <= ortaBaha ? '#f39c12' : '#555'};">★</span>`;
         }).join('')}
          </div>
          </div>

          <div class="teswir-bolum">
          <p><strong>Teswirler:</strong></p>
          <div class="teswirler-container" id="teswirler-${mugallym.id}">
          ${(JSON.parse(localStorage.getItem("teswirler-" + mugallym.id)) || []).map(t => `
          <div class="teswir-kart">
          <strong>${t.ady}</strong>
          <p>${t.teswir}</p>
          </div>
          `).join('') || '<p class="teswir-yok">Heniz teswir yok</p>'}
          </div>
          <input type="text" id="teswirAdy-${mugallym.id}"
          placeholder="Adyňyz"  class="teswir-input"/>
          <textarea id="teswirYaz-${mugallym.id}"
          placeholder="Teswiriňizi ýazyň..." class="teswir-textarea"></textarea>
          <button onclick="teswirGos(${mugallym.id})" class="teswir-btn">
            Teswir Goş
          </button>
          </div>
         `,
         background:"#1a1a1a",
         color: "#fff",
         showConfirmButton: false,
         showCloseButton: true,
         grow: false,
         scrollbarsPadding: false,
         customClass: {
          popup: 'mugallym-popup'
         },
         didClose: () => {
          document.querySelector('.theme-btn').style.display = 'flex';
         }
      });
    });
     container.appendChild(card);  
  });
}
   
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const gozlegSozi = searchInput.value.toLowerCase().trim();
    if(gozlegSozi === "") {
      displaymugallymlar(mugallymlar);
    }else{
    const tapylanlar = mugallymlar.filter((u) =>
      u.ady.toLowerCase().includes(gozlegSozi)||
      u.dersi.toLowerCase().includes(gozlegSozi)
    );
    displaymugallymlar(tapylanlar);
    }
  });
}

searchInput.addEventListener("input",() => {
const gozlegSozi =searchInput.value.toLowerCase().trim();
if (gozlegSozi === "") {
  displaymugallymlar(mugallymlar);
}else{
  const tapylanlar = mugallymlar.filter ((u) =>
    u.ady.toLowerCase().includes(gozlegSozi) ||
    u.dersi.toLowerCase().includes(gozlegSozi)
  );
  displaymugallymlar(tapylanlar);
}
});


const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});
const burger = document.getElementById("burger");
const nav = document.getElementById("nav-menu");

if (burger && nav) {
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
    if (nav.classList.contains("nav-active")) {
      themeBtn.style.display = "none";
    } else {
      themeBtn.style.display = "flex";
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("mugallymmodal");
  const btnmugallymBol = document.getElementById("add-mugallym-btn");
  const spanClose = document.querySelector(".close");
  const mugallymForm = document.getElementById("mugallymForm");

  if (btnmugallymBol) {
    btnmugallymBol.addEventListener("click", (e) => {
      e.preventDefault();

      if (nav) nav.classList.remove("nav-active");
      if (burger) burger.classList.remove("toggle");

      modal.style.display = "flex";
    });
  }

  mugallymForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const file = document.getElementById("mugallymSurat").files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const tazemugallym = {
          id: Date.now(),
          ady: document.getElementById("mugallymAdy").value.trim(),
          dersi: document.getElementById("dersi").value.trim(),
          tel: document.getElementById("mugallymTel").value.trim(),
          yasy: document.getElementById("mugallymYasy").value.trim(),
          welayat: document.getElementById("mugallymWelayat").value,
          etrap: document.getElementById("mugallymEtrap").value,
          shaher: document.getElementById("mugallymShaher").value,
          salgy: document.getElementById("mugallymWelayat").value + ", " +
                 document.getElementById("mugallymEtrap").value + ", " +
                 document.getElementById("mugallymShaher").value,
          surat: event.target.result,
          description: "Siziň hyzmatyňyzda!",
          baha:0,
          bahaSany:0,
        };
        console.log("Täze mugallym obýekti:", tazemugallym);
        mugallymGos(tazemugallym);
      };

      reader.readAsDataURL(file);
    }
  });

  if (spanClose) {
    spanClose.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
 const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("loginmodal");
const loginClose = document.getElementById("loginClose");
const loginForm = document.getElementById("loginForm");
const addMugallymBtn = document.getElementById("add-mugallym-btn");

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginBtn.dataset.state === "logout") {
    localStorage.removeItem("login");
    loginBtn.innerHTML = '<i class="fa-solid fa-user"></i> Giriş';
    loginBtn.dataset.state = "login";
    displaymugallymlar(mugallymlar);
    document.getElementById("mugallymmodal").style.display = "none";
  } else {
    loginModal.style.display = "flex";
  }
});

if (loginClose) {
  loginClose.addEventListener("click", () => {
    loginModal.style.display = "none";
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ady = document.getElementById("loginAdy").value;
    const parol = document.getElementById("loginParol").value;
    if (ady === "admin" && parol === "1234") {
      localStorage.setItem("login", "admin");
      loginModal.style.display = "none";
      addMugallymBtn.style.display = "flex";
      loginBtn.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Çykyş';
      loginBtn.dataset.state = "logout";
      displaymugallymlar(mugallymlar);
      Swal.fire({
        icon: "success",
        title: "Hoş geldiňiz!",
        text: ady + " adly girdi!",
        background: "#1a1a1a",
        color: "#fff",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Ýalnyş!",
        text: "Ulanyjy ady ya-da parol ýalňyş!",
        background: "#1a1a1a",
        color: "#fff",
      });
      }
  });
}
   
  displaymugallymlar(mugallymlar);
});

function mugallymPoz(id) {
  Swal.fire({
    title: "Siz pozmak isleyärsiňizmi?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Hawa,poz!",
    cancelButtonText: "Bes et",
    background: "#1a1a1a",
    color: "#fff",
  }).then(async(result) => {
    if (result.isConfirmed) {
      const mugallym = mugallymlar.find(m => m.id === Number(id));
      if (mugallym && mugallym.firebaseId) {
        await deleteDoc(doc(db, "mugallymlar", mugallym.firebaseId));
      }
      mugallymlar = mugallymlar.filter(m => m.id !== Number(id));
      displaymugallymlar(mugallymlar);
      
      Swal.fire({
        title: "Pozuldy!",
        icon: "success",
        background: "#1a1a1a",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  });
}

const locationData = {
  "Aşgabat": {
    "Aşgabat şäheri": ["Köpetdag", "Büzmeýin", "Bagtyýarlyk", "Berkararlyk"],
    "Abadan etraby": ["Abadan", "Änew"]
  },
  "Ahal": {
    "Ak bugdaý etraby": ["Änew", "Bagabat"],  
    "Bäherden etraby": ["Bäherden",  "Gäwers"],
    "Kaka etraby": ["Kaka", "Artyk"],
    "Tejen etraby":["Tejen", "Sarahs"],
    "Babadaýhan etraby":["Babadaýhan"],
    "Derweze etraby": ["Derweze"], 
  },
  "Balkan": {
    "Balkanabat şäheri":["Balkanabat"],
    "Serdar etraby":["Serdar", "Gyzylarbat"],
    "Türkmenbaşy şäheri":["Türkmenbaşy", "Awaza"],
    "Bereket etraby":["Bereket"],
    "Etrek etraby":["Etrek"],
    "Magtymguly etraby":["Magtymguly"],
  },
  "Daşoguz": {
    "Daşoguz şäheri": ["Daşoguz"],
    "Görogly etraby":["Görogly"],
    "Gubadag etraby":["Gubadag"],
    "Köneürgenç etraby":["Köneürgenç"],
    "Ruhubelent etraby":["Ruhybelent"],
    "Şabat etraby":["Şabat"],
    "Tagta etraby":["Tagta"],
    "Akdepe etraby":["Akdepe"],
    "Boldumsaz etraby":["Buldumsaz"]
  },
  "Lebap": {
    "Türkmenabat şäheri":["Türkmenabat"],
    "Atamyrat etraby":["Atamyrat"],
    "Çärjew etraby":["Çärjew"],
    "Dänew etraby":["Dänew"],
    "Farap etraby":["Farap"],
    "Halaç etraby":["Halaç"],
    "Köýtendag etraby":["Köýtendag"],
    "Saýat etraby":["Saýat"],
    "Ýolöten etraby":["Ýolöten"]
  },
  "Mary": {
    "Mary şäheri":["Mary"],
    "Baýramaly etraby":["Baýramaly"],
    "Murgap etraby":["Murgap"],
    "Sakarçäge etraby":["Sakarçäge"],
    "Serhedabat etraby":["Serhedabat"],
    "Tagtabazar etraby":["Tagtabazar"],
    "Türkmengala etraby":["Türkmengala"],
    "Wekilbazar etraby":["Wekilbazar"]
  }
};

function formWelayatChange(){
    const w = document.getElementById("mugallymWelayat").value;
    const etrapEl = document.getElementById("mugallymEtrap");
    const shaherEl = document.getElementById("mugallymShaher");
    etrapEl.innerHTML = '<option value="">- Etrap saýlaň -</option>';
    shaherEl.innerHTML = '<option value="">- Şäher saýlaň -</option>';
    shaherEl.disabled = true;
    if (w && locationData[w]){
      Object.keys (locationData[w]).forEach(e =>{
        const opt = document.createElement("option");
        opt.value = e; opt.textContent = e;
        etrapEl.appendChild(opt);
      });
      etrapEl.disabled = false;
    }else{
      etrapEl.disabled = true;
  }    
}

function formEtrapChange(){
  const w = document.getElementById("mugallymWelayat").value;
  const e = document.getElementById("mugallymEtrap").value;
  const shaherEl = document.getElementById("mugallymShaher");
  shaherEl.innerHTML = '<option value="">- Şäher saýlaň -</option>';
  if (w && e && locationData[w][e]) {
    locationData[w][e].forEach(s => {
      const opt = document.createElement("option");
      opt.value = s; opt.textContent = s;
      shaherEl.appendChild(opt);
    });
    shaherEl.disabled = false;
  }else{
    shaherEl.disabled = true;
  }  
}
function formShaherChange() {

}

function suzgucWelayatChange(){
  const w = document.getElementById("suzgucWelayat").value;
  const etrapEl = document.getElementById("suzgucEtrap");
  const shaherEl = document.getElementById("suzgucShaher");
  etrapEl.innerHTML = '<option value="">- Ähli etrap -</option>';
  shaherEl.innerHTML = '<option value="">- Ähli şäher -</option>';
  shaherEl.disabled = true;
  if (w  && locationData[w]) {
   Object.keys(locationData[w]).forEach(e => {
      const opt = document.createElement("option");
      opt.value = e; opt.textContent = e;
      etrapEl.appendChild(opt);
    });
    etrapEl.disabled = false;
  }else{
    etrapEl.disabled = true;
  }  
  yerSuzguc();
}

function suzgucEtrapChange(){
  const w = document.getElementById("suzgucWelayat").value;
  const e = document.getElementById("suzgucEtrap").value;
  const shaherEl = document.getElementById("suzgucShaher");
  shaherEl.innerHTML = '<option value="">- Ähli şäher -</option>';
  if (w  && e && locationData[w][e]) {
locationData[w][e].forEach(s => {
      const opt = document.createElement("option");
      opt.value = s; opt.textContent = s;
      shaherEl.appendChild(opt);
    });
    shaherEl.disabled = false;
  }else{
    shaherEl.disabled = true;
  }  
  yerSuzguc();
}

function yerSuzguc() {
  const w = document.getElementById("suzgucWelayat").value;
  const e = document.getElementById("suzgucEtrap").value;
  const s = document.getElementById("suzgucShaher").value;
  let netije = mugallymlar;
  if (s) {
    netije = mugallymlar.filter(m =>
      m.shaher === s || m.etrap === e || m. welayat === w
    );
    netije.sort((a, b)=> {
      const aPuan = a.shaher === s ? 3 : a.etrap === e ? 2 : 1;
      const bPuan = b.shaher === s ? 3 : b.etrap === e ? 2 : 1;
      return aPuan - bPuan;
    });
  }else if (e){
   netije = mugallymlar.filter(m => m.etrap === e || m.welayat === w);
  }else if (w){
    netije = mugallymlar.filter(m => m.welayat === w);
  }
  displaymugallymlar(netije);
}


async function mugallymGos(tazemugallym) {
  try {
   const docRef = await addDoc(collection(db, "mugallymlar"), tazemugallym);
   tazemugallym.firebaseId = docRef.id;
   mugallymlar.push(tazemugallym);
   displaymugallymlar(mugallymlar);

  const modal = document.getElementById("mugallymmodal");
  const form = document.getElementById("mugallymForm");
  if (form) form.reset();
  if (modal) modal.style.display = "none";

  Swal.fire({
    icon: "success",
    title: "Mugallym goşuldy!",
    text: "Täze mugallym sanawa üstünlikli girizildi.",
    showConfirmButton: false,
    timer: 2000,
    background: "#1a1a1a",
    color: "#fff",
    iconColor: "#2ecc71",
  });

  setTimeout(() => {
    const container = document.getElementById("services-container");
    if (container) {
      window.scrollTo({
        top: container.offsetTop - 140,
        behavior: "smooth",
      });
    }
  }, 100);
} catch (e){
  console.error("Ýalňyşlyk:", e);
}
}
document.querySelector('a[href="#top"]').addEventListener("click",(e) =>{
  e.preventDefault()
  window.scrollTo({top: 0, behavior: "smooth"});
});
function janEt(tel) {
  Swal.fire({
    title:'Habarlaşmak',
    text:'Tel: ' + tel,
    background:'#1a1a1a',
    color: '#fff'
  });
}
function bahaBer(id, yildyz) {
  const berenler = JSON.parse (localStorage.getItem ("bahaBerenler")) || [];
  if (berenler.includes(Number(id))){
    Swal.fire({
      icon: "warning",
      title: "Eýýäm baha berdiňiz!",
      background: "#1a1a1a",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });
    return;
  }
    const mugallym =mugallymlar.find(m=> m.id === Number(id));
    if (mugallym) {
    mugallym.baha += yildyz;
    mugallym.bahaSany += 1;
    berenler .push(Number(id));
    localStorage.setItem("bahaBerenler", JSON.stringify(berenler));
    localStorage.setItem("mugallymlar", JSON.stringify(mugallymlar));
    displaymugallymlar(mugallymlar);
    Swal.fire({
      icon:"success",
      title: yildyz + " yildyz!",
      text: "Bahaňyz üçün sag boluň!",
      background: "#1a1a1a",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
   
    });
  }
}

function teswirGos(id) {
  const ady = document.getElementById("teswirAdy-" + id).value.trim();
  const teswir = document.getElementById("teswirYaz-" + id).value.trim();
  if (!ady || !teswir) {
    Swal.fire({
      icon: "warning",
      title: "Dolduryň",
      text: "Adyňyzy we teswirlerňizi ýazyň!",
      background: "#1a1a1a",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
    });
    return;
  }

const teswirler = JSON.parse(localStorage.getItem("teswirler-" + id)) || [];
teswirler.push({ady, teswir});
localStorage.setItem("teswirler-" + id, JSON.stringify(teswirler));
const container = document.getElementById("teswirler-" + id);
const täzeDiv = document.createElement("div");
täzeDiv.className ="teswir-kart";
täzeDiv.innerHTML =`
   <strong>${ady}</strong>
   <p>${teswir}</p>
`;
container.appendChild(täzeDiv);
document.getElementById("teswirAdy-" + id).value = "";
document.getElementById("teswirYaz-" + id).value = "";
}
window.formWelayatChange = formWelayatChange;
window.formShaherChange = formShaherChange;
window.formEtrapChange = formEtrapChange;
window.suzgucWelayatChange = suzgucWelayatChange;
window.suzgucEtrapChange = suzgucEtrapChange;
window.yerSuzguc = yerSuzguc;
window.filtermugallymlar = filtermugallymlar;
window.mugallymPoz = mugallymPoz;
window.janEt = janEt;
window.bahaBer = bahaBer;
window.teswirGos = teswirGos;
