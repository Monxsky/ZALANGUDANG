let usersData = [];

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
