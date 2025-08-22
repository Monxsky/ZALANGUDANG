let usersData = [];

// Toggle buka/tutup submenu
document.querySelectorAll(".dropdown").forEach(item => {
  item.addEventListener("click", (e) => {
    // biar submenu toggle, tapi gak langsung tutup semua
    e.stopPropagation();
    item.classList.toggle("active");
  });
});

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Collapse sidebar
const sidebar = document.getElementById("sidebar");
const mainContent = document.getElementById("main-content");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
  if (sidebar.classList.contains("collapsed")) {
    mainContent.style.marginLeft = "70px";
    mainContent.style.width = "calc(100% - 70px)";
  } else {
    mainContent.style.marginLeft = "240px";
    mainContent.style.width = "calc(100% - 240px)";
  }
});

// Highlight menu aktif
const menuItems = document.querySelectorAll(".menu > li");
const submenuItems = document.querySelectorAll(".submenu li");

// Menu utama
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menuItems.forEach(i => i.classList.remove("active-main")); 
    item.classList.add("active-main");
  });
});

// Submenu
submenuItems.forEach(sub => {
  sub.addEventListener("click", (e) => {
    e.stopPropagation(); // biar gak nutup parent
    submenuItems.forEach(s => s.classList.remove("active-sub")); 
    sub.classList.add("active-sub");
  });
});


// ambil data user dari dummy API
async function getUsers() {

    const loading = document.getElementById("loading");
    const tbody = document.querySelector("#userTable tbody");

    try {
      loading.style.display = "block";
        tbody.innerHTML = "";

        const res = await axios.get("https://jsonplaceholder.typicode.com/users");
        usersData = res.data;
        renderTable(usersData);
    } catch (err) {
        console.error("Error ambil data:", err);
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:red;">Gagal ambil data</td></tr>`;
    } finally {
      loading.style.display = "none";
    }
}

// render isi tabel
function renderTable(data) {
    const tbody = document.querySelector("#userTable tbody");
    tbody.innerHTML = "";

    data.forEach((user, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.address.city}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// fungsi pencarian
document.getElementById("searchBar").addEventListener("keyup", function (e) {
    const keyword = e.target.value.toLowerCase();
    const filtered = usersData.filter(user =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword) ||
        user.address.city.toLowerCase().includes(keyword)
    );
    renderTable(filtered);
});

// auto load data waktu halaman dibuka
window.onload = getUsers;
