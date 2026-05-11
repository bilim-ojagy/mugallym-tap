import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc,updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged,GoogleAuthProvider, signInWithPopup, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBTjhoZS9FLBvaCHLCGr9f1FnGmnNHFLho",
  authDomain: "mugallym-tap.firebaseapp.com",
  projectId: "mugallym-tap",
  storageBucket: "mugallym-tap.firebasestorage.app",
  messagingSenderId: "636479603378",
  appId: "1:636479603378:web:bbd4de11a804f68c29bfab",
  measurementId: "G-EV3B3RYC6H",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


   async function mugallymlaryGetir() {
    const querySnapshot = await getDocs(collection(db, "mugallymlar"));
    const oncekiSan = parseInt(localStorage.getItem("mugallymSany") || "0");
    mugallymlar = [];
    querySnapshot.forEach((d) => {
        mugallymlar.push({ ...d.data(), firebaseId: d.id});
    });
    window.mugallymlar = mugallymlar;

    const login = localStorage.getItem("login");
    if (mugallymlar.length > oncekiSan && oncekiSan > 0 && login !== "admin") {
      const taze = mugallymlar.length - oncekiSan;
      Swal.fire({
        icon: "info",
        title: `${taze} täze mugallym goşuldy!`,
        background: "#1a1a1a",
        color: "#fff",
        timer: 3000,
        showConfirmButton: false,
        toast: true,
        position: "top-right"
      });
    }
    localStorage.setItem("mugallymSany", mugallymlar.length);
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
  window. soňkyMugallymlar = Sanaw;
  const container = document.getElementById("services-container");
  if (!container) return;
  container.innerHTML = "";

  const loggedIn =localStorage.getItem("login");
  Sanaw.forEach((mugallym) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${mugallym.surat ||''}" alt="${mugallym.ady}" 
    style="width:100%; border-radius:10px; margin-bottom:10px;"
    onerror="this.style.display='none'">
    <h3> <i class="fa-solid fa-user-gear"></i>${mugallym.ady}</h3>
    <p><i class="fa-solid fa-briefcase"></i><strong>${localStorage.getItem("dil") === "ru" ? "Предмет:" : "Dersi:"}<strong><strong>
    ${mugallym.dersi ||(localStorage.getItem("dil") === "ru" ? "Неизвестно" : "Mälim däl")}</strong></p>    
    <p><i class="fa-solid fa-info-circle"></i><strong>${localStorage.getItem("dil") === "ru" ? "К вашим услугам!" : "Siziň hyzmatyňyzda!"}</strong></p>
     
    <div class="card-buttons">
    <button class="btn-call" onclick="janEt('${mugallym.tel}')">
    <i class="fa-solid fa-phone"></i> ${localStorage.getItem ("dil") === "ru" ? "Позвонить" : "Jan Et"}
    </button>
     ${loggedIn ? `<button class="btn-delete" onclick="mugallymPoz('${mugallym.id}')">
      <i class="fa-solid fa-trash"></i>  
     </button>`:''}
    </div>
`;
     card.addEventListener("click", async (e)=>{
      if (e.target.closest(".btn-call")||e.target.closest(".btn-delete")||e.target.closest(".btn-edit")) return;
      const teswirler = await teswirlerGetir(mugallym.id);
      const dil = localStorage.getItem("dil") || "tk";
      const t = dil === "ru" ? {
        tel: "Тел",
        yasy: "Возраст",
        tejribesi: "Опыт",
        yer: "Место проживания",
        nabelli: "Неизвестно",
        teswirler: "Отзывы:",
        teswirYok: "Отзывов пока нет",
        adynyz: "Ваше имя",
        teswirYaz: "Напишите отзыв...",
        teswirGos: "Добавить отзыв",
      } : {
        tel: "Tel",
        yasy: "Ýaşy",
        tejribesi: "Tejribe",
        yer: "Ýaşaýan ýeri",
        nabelli: "Näbelli",
        teswirler: "Teswirler:",
        teswirYok: "Heniz teswir ýok",
        adynyz: "Adyňyz",
        teswirYaz: "Teswiriňizi ýazyň...",
        teswirGos: "Teswir Goş",
      };
     const isDark = document.body.classList.contains("dark-mode");
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
         <p><i class="fa-solid fa-phone" style= "color: #007bff"></i> <strong>${t.tel}:</strong> ${mugallym.tel}</p>
         <p><i class="fa-solid fa-user" style= "color: #007bff"></i> <strong>${t.yasy}:</strong> ${mugallym.yasy ||t.nabelli}</p>
         <p><i class="fa-solid fa-star" style= "color: #007bff"></i> <strong>${t.tejribesi}:</strong> ${mugallym.tejribe ||t.nabelli}</p> 
         <p><i class="fa-solid fa-location-dot" style= "color: #007bff"></i> <strong>${t.yer}:</strong> ${mugallym.salgy ||t.nabelli}</p>      
         <p><i class="fa-solid fa-info-circle" style= "color: #007bff"></i>${localStorage.getItem("dil") === "ru" ? "К вашим услугам!" : "Siziň hyzmatyňyzda!"}</p>
         <div style="margin-top:15px;">
         <p><strong>${localStorage.getItem("dil") === "ru" ? "Цена:":"Baha:"}</strong> ${mugallym.bahaSany> 0 ? 
          (mugallym.baha / mugallym.bahaSany).toFixed(1) + " / 5 ("+ mugallym.bahaSany + (localStorage.getItem("dil") === "ru" 
          ? " голос)" : "ses)") : (localStorage.getItem("dil") === "ru" ? "Цена не указана":"Baha berilmedi")}</p>
         <div id="yildyz-${mugallym.id}">
         ${[1,2,3,4,5].map(i => {
            const ortaBaha = mugallym.bahaSany > 0 ? mugallym.baha / mugallym.bahaSany : 0;
            return `<span onclick="bahaBer(${mugallym.id}, ${i})"style="font-size:28px; cursor:pointer; 
            color:${i <= ortaBaha ? '#f39c12' : '#555'};">★</span>`;
         }).join('')}
          </div>
          </div>

          <div class="teswir-bolum">
          <p><strong>${t.teswirler}:</strong></p>
          <div class="teswirler-container" id="teswirler-${mugallym.id}">
         ${teswirler. length > 0 ? teswirler.map(tw => `
          <div class="teswir-kart">
          <strong>${tw.ady}</strong>
          <p>${tw.teswir}</p>
          </div>
          `).join('') : '<p class="teswir-yok"></p>'}
          </div>
          <input type="text" id="teswirAdy-${mugallym.id}"
          placeholder="${t.adynyz}"  class="teswir-input"/>
          <textarea id="teswirYaz-${mugallym.id}"
          placeholder="${t.teswirYaz}" class="teswir-textarea"></textarea>
          <button onclick="teswirGos(${mugallym.id})" class="teswir-btn">
            ${t.teswirGos}
          </button>
          </div>
         `,
         background:isDark ? "#1a1a1a" : "#ffffff",
         color: isDark ? "#fff" : "#000",
         showConfirmButton: false,
         showCloseButton: true,
         grow: false,
         scrollbarPadding: false,
         customClass: {
          popup: 'mugallym-popup'
         },
         didClose: () => {
           
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
const themeMobilBtn = document.getElementById("theme-mobil-toggle");

function themeUytget() {
   document.body.classList.toggle("dark-mode");
   const isDark = document.body.classList.contains("dark-mode")

   themeBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    if (themeMobilBtn) themeMobilBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';

    localStorage.setItem("theme", isDark ? "dark" : "light");
}
 themeBtn.addEventListener("click", themeUytget);
if (themeMobilBtn) themeMobilBtn.addEventListener ("click", themeUytget);
 
   

function switchTab(tab){
      const isGiris = tab === 'giris';
      document.getElementById('panel-giris').classList.toggle('active', isGiris);
      document.getElementById('panel-hasaba').classList.toggle('active', !isGiris);
      document.getElementById('tab-giris')?.classList.toggle('active', isGiris);
      document.getElementById('tab-hasaba')?.classList.toggle('active', !isGiris);
    }
    document.addEventListener("DOMContentLoaded", () => {
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
  });
}
document.addEventListener("DOMContentLoaded", () => {

  const nav = document.querySelector(".nav-links");
  const burger = document.querySelector(".burger");
  document.querySelectorAll(".dropdown-menu li").forEach(li => {
    li.addEventListener("click", () => {
      nav.classList.remove("nav-active");
      burger.classList.remove("toggle");
    });
  });

  const loginModal = document.getElementById("loginmodal");
  const mugallymModal = document.getElementById("mugallymmodal");

  const loginBtn = document.getElementById("login-btn");
  const btnmugallymBol = document.getElementById("add-mugallym-btn");
  const addMugallymBtn = document.getElementById("add-mugallym-btn");
  
  const loginClose = document.getElementById("loginClose");
  const spanClose = document.querySelector(".close");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const mugallymForm = document.getElementById("mugallymForm");

  onAuthStateChanged(auth, (user) => {
    const dil = localStorage.getItem("dil") ||  "tk";
        if (user) {
            localStorage.setItem("login", user.email === "admin@bilim.com" ? "admin" : user.email);
            if (addMugallymBtn) addMugallymBtn.style.display =  "flex";
            
            if (loginBtn) {
                loginBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> <span id="menu-giris">${dil === "ru" ? "Выход" :  "Çykyş"}</span>`;
                loginBtn.dataset.state = "logout";
            }
        } else {
            localStorage.removeItem("login");
            if (addMugallymBtn) addMugallymBtn.style.display = "none";
            if (loginBtn) {
                loginBtn.innerHTML = `<i class="fa-solid fa-user"></i><span id="menu-giris">${dil === "ru"  ? "Вход" : "Giriş"}</span>`;
                loginBtn.dataset.state = "login";
            }
        }
        if (typeof displaymugallymlar === "function") displaymugallymlar(mugallymlar);
    });

    // --- 3. DÜWMELERIŇ FUNKSIÝALARY ---

    // Giriş / Çykyş düwmesi
    if (loginBtn) {
        loginBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            if (loginBtn.dataset.state === "logout") {
                await signOut(auth);
                localStorage.removeItem("login");
            } else {
                if (nav) nav.classList.remove("nav-active");
                if (burger) burger.classList.remove("toggle");
                loginModal.style.display = "flex";
            }
        });
    }

    // Mugallym bol düwmesi
    if (btnmugallymBol) {
        btnmugallymBol.addEventListener("click", (e) => {
            e.preventDefault();
            if (nav) nav.classList.remove("nav-active");
            if (burger) burger.classList.remove("toggle");
            mugallymModal.style.display = "flex";
            openModal();
        });
    }

    // Ýapmak düwmeleri
    const closeModal = () => {
        loginModal.style.display = "none";
        mugallymModal.style.display = "none";
    };


    if (loginClose) loginClose.onclick = closeModal;
    if (spanClose) spanClose.onclick = closeModal;
    window.onclick = (e) => {
        if (e.target === loginModal || e.target === mugallymModal) closeModal();
    };

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("loginAdy").value;
            const parol = document.getElementById("loginParol").value;
            const dil = localStorage.getItem("dil") || "tk";
            try {
                await signInWithEmailAndPassword(auth, email, parol);
                closeModal();
                const isDark = document.body.classList.contains("dark-mode");
                Swal.fire({ 
                 icon: "success", 
                 iconColor: "#2ecc71",
                 title: dil === "ru" ? "Добро пожаловать!" : "Hoş geldiňiz!", 
                 background: isDark ? "#1a1a1a" : "#ffffff", 
                 color:  isDark ? "#fff" : "#000", 
                 timer: 2000, 
                 showConfirmButton: false 
                });
            } catch (err) {
                const isDark = document.body.classList.contains("dark-mode");
                Swal.fire({ 
                 icon: "error", 
                 title: dil === "ru" ? "Ошибка!" : "Ýalňyş!", 
                 text:  dil === "ru" ? "Неверный Email или пароль!" : "Email ýa-da parol ýalňyş!", 
                 background: isDark ? "#1a1a1a" : "#ffffff", 
                 color: isDark ? "#fff" : "#000",
                 customClass: {
                 htmlContainer: 'swal-center'
                 }
                });
            }
        });
    }

    
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const hasabaPanel = document.getElementById('panel-hasaba');
            if (!hasabaPanel.classList.contains('active')) return;
            const email = document.getElementById("registerEmail").value;
            const parol = document.getElementById("registerParol").value;
            const dil = localStorage.getItem("dil") || "tk";
            try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, parol);
              closeModal();
              const isDark = document.body.classList.contains("dark-mode");
              Swal.fire({ 
                icon: "success", 
                iconColor: "#2ecc71",
                title: dil === "ru" ? "Успешно!" : "Üstünlikli!", 
                text: dil === "ru" ? "Вы успешно зарегистрированы!" : "Hasabyňyz döredildi!",
                background: isDark ? "#1a1a1a" : "#ffffff", 
                color: isDark ? "#fff" : "#000", 
                timer: 3000, 
                showConfirmButton: false,
                customClass: {
                  htmlContainer: 'swal-center'
                }
              });
            } catch (err) {
              const isDark = document.body.classList.contains("dark-mode");
                Swal.fire({ 
                 icon: "error", 
                 title: dil === "ru" ? "Ошибка!" : "Ýalňyş!", 
                 text: dil === "ru" ? "Email занят или пароль слишком короткий (мин 6 символов)!" : "Email bar ýa-da parol gysga (min 6 harp)!", 
                 background: isDark ? "#1a1a1a" : "#ffffff", 
                 color: isDark ? "#fff" : "#000",
                 customClass: {
                  htmlContainer: 'swal-center'
                 } 
                });
            }
        });
    }

    // Mugallym Goşmak
    if (mugallymForm) {
        mugallymForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const tel = document.getElementById("mugallymTel").value.trim();
            const telError= document.getElementById("tel-error");
            if (!tel.startsWith("+993")) {
             telError.style.display = "block";
              return;
            } else {
              telError.style.display = "none";
            } 
            const file = document.getElementById("mugallymSurat").files[0];
            if (file) {
              const surat = await window.suratKicelt(file);
                
                    const tazemugallym = {
                    id: Date.now(),
                        ady: document.getElementById("mugallymAdy").value.trim(),
                        dersi: document.getElementById("dersi").value.trim(),
                        tel: document.getElementById("mugallymTel").value.trim(),
                        yasy: document.getElementById("mugallymYasy").value.trim(),
                        tejribe: document.getElementById("mugallymTejribe").value,
                        salgy:[
                         document.getElementById("mugallymWelayat").value,
                         document.getElementById("mugallymEtrap").value,
                         document.getElementById("mugallymShaher").value,
                        ].filter(Boolean).join(", "),
                        welayat: document.getElementById("mugallymWelayat").value,
                        etrap: document.getElementById("mugallymEtrap").value,
                        shaher: document.getElementById("mugallymShaher").value,
                        surat: surat,
                        description: "Siziň hyzmatyňyzda!",
                        baha: 0,
                        bahaSany: 0,
                        email: localStorage.getItem("login"),
                     };
                    mugallymGos(tazemugallym);
                    closeModal();
                    mugallymForm.reset();
                }
            });
         }
     });


async function googleBilenGir() {
   const dil = localStorage.getItem("dil") || "tk";
    const isDark = document.body.classList.contains("dark-mode");
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        localStorage.setItem("login", user.email);
        Swal.fire({
            icon: "success",
            iconColor: "#2ecc71",
            title: dil === "ru" ? "Добро пожаловать!" : "Hoş geldiňiz!",
            text: dil === "ru" ? "Вы вошли в систему!" : "Siz ulgama girdiňiz!",
            background:  isDark ? "#1a1a1a" : "#ffffff",         
            color:  isDark ? "#fff" : "#000",
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              htmlContainer: 'swal-centec'
            }     
        });

        // Modaly ýapmak
        const loginModal = document.getElementById("loginmodal");
        if (loginModal) loginModal.style.display = "none";
         
       } catch (error) {
    console.log("Doly hata kody:", error.code);
    console.log("Hata mesaji:", error.message);
    Swal.fire({
        icon: "error",
        title: dil === "ru" ? "Ошибка!" : "Ýalňyşlyk!",
        text: error.code, 
        background: isDark ? "#1a1a1a"  : "#ffffff",
        color: isDark ? "#fff" : "#000",
    });
}
}

function mugallymPoz(id) {
   const dil = localStorage.getItem("dil") || "tk";
    const isDark = document.body.classList.contains("dark-mode");
  Swal.fire({
    title: dil === "ru" ? "Вы хотите удалить?" :"Siz pozmak isleyärsiňizmi?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: dil === "ru" ? "Да, удалить!" :"Hawa,poz!",
    cancelButtonText: dil === "ru" ?  "Отмена" :"Bes et",
    background: isDark ? "#1a1a1a" : "#ffffff",
    color: isDark ? "#fff" : "#000",
  }).then(async(result) => {
    if (result.isConfirmed) {
      const mugallym = mugallymlar.find(m => m.id === Number(id));
      if (mugallym && mugallym.firebaseId) {
        await deleteDoc(doc(db, "mugallymlar", mugallym.firebaseId));
      }
      mugallymlar = mugallymlar.filter(m => m.id !== Number(id));
      displaymugallymlar(mugallymlar);
      
      Swal.fire({
        title: dil === "ru" ?"Удалено!" :"Pozuldy!",
        icon: "success",
        background: isDark ? "#1a1a1a" : "#ffffff",
        color: isDark ? "#fff" : "#000",
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

window.suratKicelt = function(file, maxWidth = 800) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ration = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * ration;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
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
  const dil = localStorage.getItem("dil") || "tk"
  const isDark = document.body.classList.contains("dark-mode");
  Swal.fire({
    icon: "success",
    title: dil === "ru" ? "Учитель добавлен!" : "Mugallym goşuldy!",
    text: dil === "ru" ? "Новый учитель успешно добавлен в список." :"Täze mugallym sanawa üstünlikli girizildi.",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: isDark ? "#1a1a1a" : "#ffffff",
    color: isDark ? "#fff" : "#000",
    iconColor: "#057031",
    customClass: {
      htmlContainer: 'swal-center'
    }
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
   const dil = localStorage.getItem("dil") || "tk";
  Swal.fire({
    title: dil === "ru" ? "Связаться" : 'Habarlaşmak',
    text:'Tel: ' + tel,
    background:'#1a1a1a',
    color: '#fff'
  });
}
async function bahaBer(id, yildyz) {
  const berenler = JSON.parse (localStorage.getItem ("bahaBerenler")) || [];
  if (berenler.includes(Number(id))){
    const dil = localStorage.getItem("dil") || "tk"
    Swal.fire({
      icon: "warning",
      title:  dil === "ru" ? "Вы уже оценили!" :"Eýýäm baha berdiňiz!",
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
    try {
      await updateDoc(doc(db, "mugallymlar", mugallym.firebaseId), {
        baha: mugallym.baha,
        bahaSany: mugallym.bahaSany,
      });
    }catch(err) {
      console.error("Baha ýazylmady:", err);
    }
  
    berenler .push(Number(id));
    localStorage.setItem("bahaBerenler", JSON.stringify(berenler));
    displaymugallymlar(mugallymlar);
    const dil = localStorage.getItem("dil") || "tk"
    Swal.fire({
      icon:"success",
      title: yildyz + " yildyz!",
      text:  dil === "ru" ? "Спасибо за вашу оценку!" :"Bahaňyz üçün sag boluň!",
      background: "#1a1a1a",
      color: "#fff",
      timer: 1500,
      showConfirmButton: false,
   
    });
  }
}
async function teswirGos(id) {
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

  try {
    await addDoc(collection(db, "teswirler"), {
      mugallymId:id,
      ady:ady,
      teswir:teswir,
      wagt:Date.now()
    });
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
} catch {
  console.error("Ýalňyşlyk:", err);
  }
}

async function teswirlerGetir(mugallymId) {
    try {
      const querySnapshot = await getDocs(collection(db,"teswirler"));
      const teswirler = [];
      querySnapshot.forEach((d) =>{
        const data = d.data();
        if (data.mugallymId === mugallymId){
          teswirler.push(data);
        }
     });
     return teswirler;
    }catch (err) {
      console.error("Teswirler alynmady:", err);
      return [];
    }
}
  window.addEventListener("scroll", () =>{
    const scrollBtn = document.getElementById("scroll-top");
    if (window.scrollY > 300) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });
const diller = {
  tk: {
    "menu-bas": "Baş Sahypa",
    "menu-mugallym": "Mugallym Bol",
    "menu-jan": "Habarlaşmak",
    "menu-giris": "Giriş",
    "hero-title": "BILIM OJAGY",
    "hero-subtitle": "Size haýsy ugurdan bilim bermeli?", 
    "search-placeholder-text": "Ders gözle... (meselem: Matematika)",
    "search-btn": "Gözle",
    "filter-all": "Ählisi",
    "nav-dersler": "Dersler",
    "select-welayat": "- Ähi welayat -",
    "select-etrap": "- Ähi etrap -",
    "select-shaher": "- Ähi şäher -",
    "modal-title": "Mugallym hasaba almak",
    "btn-submit": "Hasaba Al",
    "surat-label": "Surat saýlaň",
    "giris-title": "Giriş",
    "giris-btn": "Giriş",
    "giris-yada": "ya-da",
    "google-giris": "Google bilen gir",
    "hasaba-al-link": "Hasaba Al",
    "hasaba-title": "Hasaba Al",
    "hasaba-btn": "Hasaba Al",
    "hasaba-yada": "ya-da",
    "google-hasaba": "Google bilen gir",
    "giris-link": "Giriş",
    "biz-hakda-title": "Biz hakda",
    "biz-hakda-desc": '"Mugallym Tap"- Türkmenistanda iň gowy mugallymy tapmak üçin döredilen platforma. Biziň maksadymyz her bir okuwçy öz ugrundan tejribeli mugallymy aňsat tapmaga kömek etmek.',
    "biz-yer": "Aşgabat, Türkmenistan",
  },
  ru: {
    "menu-bas": "Главная", 
    "menu-mugallym": "Стать учителем",
    "menu-jan": "Позвонить",
    "menu-giris": "Вход",
    "hero-title": "BILIM OJAGY",
    "hero-subtitle": "По какому направлению вы хотите учиться?",
    "search-placeholder-text": "Поиск предмета... (например: Matematika)", 
    "search-btn": "Найти",
    "filter-all": "Все",
    "nav-dersler": "Предметы",
    "select-welayat": "- Все велаяты -",
    "select-etrap": "- Все этрапы -",
    "select-shaher":   "- Все города -",
    "modal-title": "Регистрация учителя",
    "btn-submit": "Зарегистрироваться",
    "surat-label": "Выберите фото",
    "giris-title": "Вход",
    "giris-btn": "Войти",
    "giris-yada": "или",
    "google-giris": "Войти через Google",
    "hasaba-al-link": "Зарегистрироваться",
    "hasaba-title": "Регистрация",
    "hasaba-btn": "Зарегистрироваться",
    "hasaba-yada": "или",
    "google-hasaba": "Войти через Google",
    "giris-link": "Войти",
    "biz-hakda-title": "О нас",
    "biz-hakda-desc": '"Mugallym Tap" — платформа для поиска лучших учителей в Туркменистане. Наша цель — помочь каждому ученику легко найти опытного учителя по своему направлению.',
    "biz-yer": "Ашхабад, Туркменистан",
  },
 
};
function dilUytget(dil) {
  if(!diller[dil])  return;
  localStorage.setItem("dil", dil);
  const sozluk = diller[dil];
  for (const id in sozluk){
    const el = document.getElementById(id);
    if (el) el.textContent = sozluk[id];
  }
  const input = document.getElementById("searchInput");
  if (input) input.placeholder = sozluk["search-placeholder-text"];
  const welayat = document.querySelector("#suzgucWelayat option[value='']");
  if (welayat) welayat.textContent = sozluk["select-welayat"];
  const etrap = document.querySelector("#suzgucEtrap option[value='']");
  if (etrap) etrap.textContent = sozluk["select-etrap"]; 
  const shaher = document.querySelector("#suzgucShaher option[value='']");
  if (shaher) shaher.textContent = sozluk["select-shaher"]; 
  document.querySelectorAll(".dil-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById("dil-" + dil)?.classList.add("active");

const loginAdy = document.getElementById("loginAdy");
if (loginAdy) loginAdy.placeholder = dil === "ru" ? "Ваш Email" : "Email adresiňiz";

const loginParol = document.getElementById("loginParol");
if (loginParol) loginParol.placeholder = dil === "ru" ? "Ваш пароль" : "Parolyňyz";

const registerEmail = document.getElementById("registerEmail");
if (registerEmail) registerEmail.placeholder = dil === "ru" ? "Ваш Email" : "Email adresiňiz";

const registerParol = document.getElementById("registerParol");
if (registerParol) registerParol.placeholder = dil === "ru" ? "Ваш пароль (мин 6 символов)" : "Parolyňyz (min 6 harp)";

const switchTab1 = document.querySelector("#panel-giris .switch-tab");
if (switchTab1) switchTab1.firstChild.textContent = dil === "ru" ? "Нет аккаунта?" :"Hasabyň ýokmy?";

const switchTab2 = document.querySelector("#panel-hasaba .switch-tab");
if (switchTab2) switchTab2.firstChild.textContent = dil === "ru" ? "Уже есть аккаунт?" :"Hasabyň barmy?";

if (typeof displaymugallymlar === "function") {
  displaymugallymlar(window.soňkyMugallymlar || []);
}




   const placeholder = {
    tk: {
      mugallymAdy: "Adyňyz we Familýaňyz",
      dersi: "Okatýan ugruňyz",
      mugallymYasy: "Ýaşyňyz",
      mugallymTejribe: "Tejribäňiz (meselem: 5 ýyl)",
    },
    ru: {
      mugallymAdy: "Ваше имя и фамилия",
      dersi: "Ваш предмет",
      mugallymYasy: "Ваш возраст",
      mugallymTejribe:"Ваш опыт (например: 5 лет)",
    }
  };
  const p = placeholder[dil];
  for (const id in p) {
    const el = document.getElementById(id);
    if (el) el.placeholder = p[id];
  }
}
function openModal(){
const dil = localStorage.getItem("dil") || "tk"
const mWelayat = document.querySelector("#mugallymWelayat option[value='']");
if (mWelayat) mWelayat.textContent = localStorage.getItem("dil") === "tk" ? "- Welayat saýlaň -" :"- Выберите велаят -";

const mEtrap = document.querySelector("#mugallymEtrap option[value='']");
if (mEtrap) mEtrap.textContent = localStorage.getItem("dil") === "tk" ? "- Etrap saýlaň -" :"- Выберите этрап -";

const mShaher = document.querySelector("#mugallymShaher option[value='']");
if (mShaher) mShaher.textContent =localStorage.getItem("dil") === "tk" ? "- Şäher saýlaň -" :"- Выберите город -";
}

const saklananDil = localStorage.getItem("dil") || "tk";
console.log(saklananDil);
dilUytget(saklananDil);

function showContact(e) {
  e.preventDefault();
  document.getElementById("nav-menu").classList.remove("nav-active");
  document.getElementById("burger").classList.remove("toggle")
  document.getElementById("contact-modal").classList.add("active");
}
function closeModal() {
  document.getElementById("contact-modal").classList.remove("active");
   if (mugallymForm) mugallymForm.reset();
  const suratInput = document.getElementById("mugallymSurat");
  if (suratInput) suratInput.value = "";
} 

window.updateFileName = function(input) {
  const text = document.getElementById("upload-text");
  if (input.files && input.files[0]) {
    text.textContent = input.files[0].name;
  } else {
    text.textContent = "Surat saýlaň";
  }
}



window.showContact = showContact;
window.closeModal = closeModal;
window.dilUytget = dilUytget;
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
window.googleBilenGir = googleBilenGir;
window.switchTab = switchTab;
