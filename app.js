const harcamaFormu = document.getElementById("harcama-formu");
const ekleFormu = document.querySelector("#ekle-formu");
const temizleBtn = document.getElementById("temizle-btn");
let toplamGider = 0;
let kalan = 0;

harcamaFormu.addEventListener("submit", function (event) {
  event.preventDefault();

  const tarihInput = document.querySelector("#tarih");
  const tarihValue = tarihInput.value;

  const harcamaMiktari = document.querySelector("#miktar");
  const harcamaValue = parseFloat(harcamaMiktari.value);

  const harcamaAlani = document.querySelector("#harcama-alani");
  const harcamaAlaniValue = harcamaAlani.value;

  const harcamaBody = document.querySelector("#harcama-body");

  let mevcutIcerik = harcamaBody.innerHTML;

  mevcutIcerik += `<tr>
    <th scope="row">${tarihValue}</th>
    <td>${harcamaAlaniValue}</td>
    <td>${harcamaValue}</td>
    <td><button class="btn btn-danger" onclick="deleteRow(this)">Sil</button></td>
  </tr>`;

  harcamaBody.innerHTML = mevcutIcerik;

  toplamGider += harcamaValue;

  let gideriniz = document.querySelector("#gideriniz");
  gideriniz.innerHTML = `<td id="gideriniz">${toplamGider.toFixed(2)}</td>`;

  kalan = parseFloat(geliriniz.innerText) - toplamGider;
  let kalanPara = document.querySelector("#kalan");
  kalanPara.innerHTML = `<td id="kalan">${kalan.toFixed(2)}</td>`;

  function updateResults() {
    const gelirValue = parseFloat(
      document.querySelector("#geliriniz").innerText
    );
    let gideriniz = document.querySelector("#gideriniz");
    gideriniz.innerHTML = `<td id="gideriniz">${toplamGider.toFixed(2)}</td>`;

    kalan = gelirValue - toplamGider;
    let kalanPara = document.querySelector("#kalan");
    kalanPara.innerHTML = `<td id="kalan">${kalan.toFixed(2)}</td>`;
  }
  saveDataToLocalStorage();
});

ekleFormu.addEventListener("submit", function (event) {
  event.preventDefault();

  const gelirInput = document.querySelector("#gelir-input");
  const gelirValue = parseFloat(gelirInput.value);

  const geliriniz = document.querySelector("#geliriniz");
  geliriniz.innerHTML = `<td id="geliriniz" style="width: 100px">${gelirValue}</td>`;

  kalan = gelirValue - toplamGider;

  let kalanPara = document.querySelector("#kalan");
  kalanPara.innerHTML = `<td id="kalan">${kalan.toFixed(2)}</td>`;

  saveDataToLocalStorage();
});

temizleBtn.addEventListener("click", function () {
  document.getElementById("tarih").value = "";
  document.getElementById("miktar").value = "";
  document.getElementById("harcama-alani").value = "";
  document.getElementById("gelir-input").value = "";

  document.getElementById("harcama-body").innerHTML = "";

  toplamGider = 0;
  let gideriniz = document.getElementById("gideriniz");
  gideriniz.innerHTML = `<td id="gideriniz">${toplamGider.toFixed(2)}</td>`;

  let geliriniz = document.getElementById("geliriniz");
  geliriniz.innerHTML = `<td id="geliriniz" style="width: 100px">0</td>`;

  kalan = 0;
  let kalanPara = document.getElementById("kalan");
  kalanPara.innerHTML = `<td id="kalan">${kalan.toFixed(2)}</td>`;

  localStorage.clear();
});

function deleteRow(btn) {
  const row = btn.parentNode.parentNode;
  const harcamaValue = parseFloat(
    row.querySelector("td:nth-child(3)").innerText
  );
  toplamGider -= harcamaValue;

  let gideriniz = document.querySelector("#gideriniz");
  gideriniz.innerHTML = `<td id="gideriniz">${toplamGider.toFixed(2)}</td>`;

  kalan =
    parseFloat(document.querySelector("#geliriniz").innerText) - toplamGider;

  let kalanPara = document.querySelector("#kalan");
  kalanPara.innerHTML = `<td id="kalan">${kalan.toFixed(2)}</td>`;

  row.parentNode.removeChild(row);

  saveDataToLocalStorage();
}

function saveDataToLocalStorage() {
  localStorage.setItem("toplamGider", toplamGider.toFixed(2));
  localStorage.setItem(
    "gelirValue",
    document.querySelector("#geliriniz").innerText
  );
  localStorage.setItem(
    "harcamaBodyHTML",
    document.querySelector("#harcama-body").innerHTML
  );
}

function loadDataFromLocalStorage() {
  toplamGider = parseFloat(localStorage.getItem("toplamGider")) || 0;
  let gideriniz = document.querySelector("#gideriniz");
  gideriniz.innerHTML = `<td id="gideriniz">${toplamGider.toFixed(2)}</td>`;

  let gelirValue = parseFloat(localStorage.getItem("gelirValue")) || 0;
  let geliriniz = document.querySelector("#geliriniz");
  geliriniz.innerHTML = `<td id="geliriniz" style="width: 100px">${gelirValue}</td>`;

  let harcamaBodyHTML = localStorage.getItem("harcamaBodyHTML") || "";
  let harcamaBody = document.querySelector("#harcama-body");
  harcamaBody.innerHTML = harcamaBodyHTML;

  kalan = gelirValue - toplamGider;
  let kalanPara = document.querySelector("#kalan");
  kalanPara.innerHTML = `<td id="kalan">${kalan.toFixed(2)}</td>`;
}

loadDataFromLocalStorage();
