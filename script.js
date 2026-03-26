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

      Swal.fire ({
        title:mugallym.ady,
        html:`
         <img src="${mugallym.surat}" style="width:150px; height:150px; border-radius:50%; object-fit:cover; margin-bottom:15px;">
         <p><i class="fa-solid fa-briefcase" style= "color: #007bff"></i><strong>Dersi:</strong> ${mugallym.dersi}</p>
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
         `,
         background:"#1a1a1a",
         color: "#fff",
         confirmButtonText: "Ýap",
         confirmButtonColor: "#007bff"  
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
          tejribe: document.getElementById("mugallymTejribe").value.trim(),
          salgy: document.getElementById("mugallymSalgy").value.trim(),
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
    text: "Bu mugallym sanawdan doly pozular!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Hawa,poz!",
    cancelButtonText: "Bes et",
    background: "#1a1a1a",
    color: "#fff",
  }).then((result) => {
    if (result.isConfirmed) {
      mugallymlar = mugallymlar.filter(
        (mugallymlar) => mugallymlar.id !== Number(id),
      );
      displaymugallymlar(mugallymlar);
      localStorage.setItem("mugallymlar", JSON.stringify(mugallymlar));

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

function mugallymGos(tazemugallym) {
  mugallymlar.push(tazemugallym);
  displaymugallymlar(mugallymlar);
  localStorage.setItem("mugallymlar", JSON.stringify(mugallymlar));

  const modal = document.getElementById("mugallymmodal");
  const form = document.getElementById("mugallymForm");

  if (form) form.reset();
  if (modal) modal.style.display = "none";

  console.log("SweetAlert çagyrylýar...");

  Swal.fire({
    icon: "success",
    title: "mugallym goşuldy!",
    text: "Täze mugallym sanawa üstünlikli girizildi.",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    allowOutsideClick: false,
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
