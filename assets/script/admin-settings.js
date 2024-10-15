document.addEventListener("DOMContentLoaded", function () {
  const profileBtn = document.getElementById("profileBtn");
  const securityBtn = document.getElementById("securityBtn");

  const profileTab = document.getElementById("profileTab");
  const securityTab = document.getElementById("securityTab");

  function showTab(tabIndex) {
    profileTab.style.display = "none";
    securityTab.style.display = "none";

    if (tabIndex === 1) {
      profileTab.style.display = "flex";
      profileBtn.classList.add("active");
      securityBtn.classList.remove("active");
    } else if (tabIndex === 2) {
      securityTab.style.display = "flex";
      profileBtn.classList.remove("active");
      securityBtn.classList.add("active");
    }

    const url = new URL(window.location);
    url.searchParams.set("active", tabIndex);
    window.history.pushState({}, "", url);
  }

  profileBtn.addEventListener("click", function () {
    showTab(1);
  });

  securityBtn.addEventListener("click", function () {
    showTab(2);
  });

  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = parseInt(urlParams.get("active")) || 1;

  showTab(activeTab);
  document.getElementById("edit-profile-info").onclick = function () {
    document.getElementById("adminEditProfileModal").style.display = "flex";
  };

  document.getElementById("closeModal").onclick = function () {
    const form = document.getElementById("adminEditProfileForm");
    document.getElementById("adminEditProfileModal").style.display = "none";
    form.reset();
  };

  const editPersonalModal = document.getElementById("adminEditPersonalModal");

  const openModalBtn = document.getElementById("edit-personal-info");

  const closeModalBtn = document.getElementById("closePersonalModal");

  openModalBtn.addEventListener("click", () => {
    editPersonalModal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", () => {
    const form = document.getElementById("adminEditPersonalForm");
    editPersonalModal.style.display = "none";
    form.reset();
  });

  const editBackgroundModal = document.getElementById(
    "adminEditBackgroundModal"
  );

  const openBackgroundModalBtn = document.getElementById(
    "edit-background-info"
  );

  const closeModalBackgroundBtn = document.getElementById(
    "closeBackgroundModal"
  );

  openBackgroundModalBtn.addEventListener("click", () => {
    editBackgroundModal.style.display = "flex";
  });

  closeModalBackgroundBtn.addEventListener("click", () => {
    editBackgroundModal.style.display = "none";
    resetForm();
  });

  const city = document.getElementById("city");
  const barangay = document.getElementById("barangay");
  let initialBarangay = barangay.getAttribute("data-initial-barangay");

  const barangayOptions = {
    Agoncillo: [
      { value: "Adia", text: "Adia" },
      { value: "Bagong Sikat", text: "Bagong Sikat" },
      { value: "Balangon", text: "Balangon" },
      { value: "Bangin", text: "Bangin" },
      { value: "Banyaga", text: "Banyaga" },
      { value: "Barigon", text: "Barigon" },
      { value: "Bilibinwang", text: "Bilibinwang" },
      { value: "Coral na Munti", text: "Coral na Munti" },
      { value: "Guitna", text: "Guitna" },
      { value: "Mabini", text: "Mabini" },
      { value: "Pamiga", text: "Pamiga" },
      { value: "Panhulan", text: "Panhulan" },
      { value: "Pansipit", text: "Pansipit" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "Pook", text: "Pook" },
      { value: "San Jacinto", text: "San Jacinto" },
      { value: "San Teodoro", text: "San Teodoro" },
      { value: "Santa Cruz", text: "Santa Cruz" },
      { value: "Santo Tomas", text: "Santo Tomas" },
      { value: "Subic Ibaba", text: "Subic Ibaba" },
      { value: "Subic Ilaya", text: "Subic Ilaya" },
    ],
    Alitagtag: [
      { value: "Balagbag", text: "Balagbag" },
      { value: "Concepcion", text: "Concepcion" },
      { value: "Concordia", text: "Concordia" },
      { value: "Dalipit East", text: "Dalipit East" },
      { value: "Dalipit West", text: "Dalipit West" },
      { value: "Dominador East", text: "Dominador East" },
      { value: "Dominador West", text: "Dominador West" },
      { value: "Munlawin", text: "Munlawin" },
      { value: "Muzon Primero", text: "Muzon Primero" },
      { value: "Muzon Segundo", text: "Muzon Segundo" },
      { value: "Pinagkurusan", text: "Pinagkurusan" },
      { value: "Ping-As", text: "Ping-As" },
      { value: "Poblacion East", text: "Poblacion East" },
      { value: "Poblacion West", text: "Poblacion West" },
      { value: "Salvador Agito", text: "Salvador Agito" },
      { value: "San Jose", text: "San Jose" },
      { value: "San Juan", text: "San Juan" },
      { value: "Santa Cruz", text: "Santa Cruz" },
      { value: "Tadiac", text: "Tadiac" },
    ],
    Balayan: [
      { value: "Baclaran", text: "Baclaran" },
      { value: "Barangay 1 (Poblacion)", text: "Barangay 1 (Poblacion)" },
      { value: "Barangay 2 (Poblacion)", text: "Barangay 2 (Poblacion)" },
      { value: "Barangay 3 (Poblacion)", text: "Barangay 3 (Poblacion)" },
      { value: "Barangay 4 (Poblacion)", text: "Barangay 4 (Poblacion)" },
      { value: "Barangay 5 (Poblacion)", text: "Barangay 5 (Poblacion)" },
      { value: "Barangay 6 (Poblacion)", text: "Barangay 6 (Poblacion)" },
      { value: "Barangay 7 (Poblacion)", text: "Barangay 7 (Poblacion)" },
      { value: "Barangay 8 (Poblacion)", text: "Barangay 8 (Poblacion)" },
      { value: "Barangay 9 (Poblacion)", text: "Barangay 9 (Poblacion)" },
      { value: "Barangay 10 (Poblacion)", text: "Barangay 10 (Poblacion)" },
      { value: "Barangay 11 (Poblacion)", text: "Barangay 11 (Poblacion)" },
      { value: "Barangay 12 (Poblacion)", text: "Barangay 12 (Poblacion)" },
      { value: "Calan", text: "Calan" },
      { value: "Caloocan", text: "Caloocan" },
      { value: "Calzada", text: "Calzada" },
      { value: "Canda", text: "Canda" },
      { value: "Carenahan", text: "Carenahan" },
      { value: "Caybunga", text: "Caybunga" },
      { value: "Cayponce", text: "Cayponce" },
      { value: "Dalig", text: "Dalig" },
      { value: "Dao", text: "Dao" },
      { value: "Dilao", text: "Dilao" },
      { value: "Duhatan", text: "Duhatan" },
      { value: "Durungao", text: "Durungao" },
      { value: "Gimalas", text: "Gimalas" },
      { value: "Gumamela", text: "Gumamela" },
      { value: "Lagnas", text: "Lagnas" },
      { value: "Lanatan", text: "Lanatan" },
      { value: "Langgangan", text: "Langgangan" },
      { value: "Lucban Putol", text: "Lucban Putol" },
      { value: "Lucban Pook", text: "Lucban Pook" },
      { value: "Magabe", text: "Magabe" },
      { value: "Malalay", text: "Malalay" },
      { value: "Munting Tubig", text: "Munting Tubig" },
      { value: "Navotas", text: "Navotas" },
      { value: "Palikpikan", text: "Palikpikan" },
      { value: "Patugo", text: "Patugo" },
      { value: "Pooc", text: "Pooc" },
      { value: "Sambat", text: "Sambat" },
      { value: "Sampaga", text: "Sampaga" },
      { value: "San Juan", text: "San Juan" },
      { value: "San Piro", text: "San Piro" },
      { value: "Santol", text: "Santol" },
      { value: "Sukol", text: "Sukol" },
      { value: "Tactac", text: "Tactac" },
      { value: "Taludtud", text: "Taludtud" },
      { value: "Tanggoy", text: "Tanggoy" },
    ],
    Balete: [
      { value: "Alangilan", text: "Alangilan" },
      { value: "Calawit", text: "Calawit" },
      { value: "Looc", text: "Looc" },
      { value: "Magapi", text: "Magapi" },
      { value: "Makina", text: "Makina" },
      { value: "Malabanan", text: "Malabanan" },
      { value: "Paligawan", text: "Paligawan" },
      { value: "Palsara", text: "Palsara" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "Sala", text: "Sala" },
      { value: "Sampalocan", text: "Sampalocan" },
      { value: "Solis", text: "Solis" },
      { value: "San Sebastian", text: "San Sebastian" },
    ],
    "Batangas City": [
      { value: "Alangilan", text: "Alangilan" },
      { value: "Balagtas", text: "Balagtas" },
      { value: "Balete", text: "Balete" },
      { value: "Banaba Center", text: "Banaba Center" },
      { value: "Banaba Ibaba", text: "Banaba Ibaba" },
      { value: "Banaba West", text: "Banaba West" },
      { value: "Banaba East", text: "Banaba East" },
      { value: "Barangay 1", text: "Barangay 1" },
      { value: "Barangay 2", text: "Barangay 2" },
      { value: "Barangay 3", text: "Barangay 3" },
      { value: "Barangay 4", text: "Barangay 4" },
      { value: "Barangay 5", text: "Barangay 5" },
      { value: "Barangay 6", text: "Barangay 6" },
      { value: "Barangay 7", text: "Barangay 7" },
      { value: "Barangay 8", text: "Barangay 8" },
      { value: "Barangay 9", text: "Barangay 9" },
      { value: "Barangay 10", text: "Barangay 10" },
      { value: "Barangay 11", text: "Barangay 11" },
      { value: "Barangay 12", text: "Barangay 12" },
      { value: "Barangay 13", text: "Barangay 13" },
      { value: "Barangay 14", text: "Barangay 14" },
      { value: "Barangay 15", text: "Barangay 15" },
      { value: "Barangay 16", text: "Barangay 16" },
      { value: "Barangay 17", text: "Barangay 17" },
      { value: "Barangay 18", text: "Barangay 18" },
      { value: "Barangay 19", text: "Barangay 19" },
      { value: "Barangay 20", text: "Barangay 20" },
      { value: "Barangay 21", text: "Barangay 21" },
      { value: "Barangay 22", text: "Barangay 22" },
      { value: "Barangay 23", text: "Barangay 23" },
      { value: "Barangay 24", text: "Barangay 24" },
      { value: "Bilogo", text: "Bilogo" },
      { value: "Bolbok", text: "Bolbok" },
      { value: "Bucal", text: "Bucal" },
      { value: "Calicanto", text: "Calicanto" },
      { value: "Catandala", text: "Catandala" },
      { value: "Concepcion", text: "Concepcion" },
      { value: "Conde Itaas", text: "Conde Itaas" },
      { value: "Conde Labac", text: "Conde Labac" },
      { value: "Cuta", text: "Cuta" },
      { value: "Dalig", text: "Dalig" },
      { value: "Dela Paz", text: "Dela Paz" },
      { value: "Dela Paz Pulot Aplaya", text: "Dela Paz Pulot Aplaya" },
      { value: "Dela Paz Pulot Itaas", text: "Dela Paz Pulot Itaas" },
      { value: "Domoclay", text: "Domoclay" },
      { value: "Dumantay", text: "Dumantay" },
      { value: "Gulod Itaas", text: "Gulod Itaas" },
      { value: "Gulod Labac", text: "Gulod Labac" },
      { value: "Haligue Kanluran", text: "Haligue Kanluran" },
      { value: "Haligue Silangan", text: "Haligue Silangan" },
      { value: "Ilijan", text: "Ilijan" },
      { value: "Kumba", text: "Kumba" },
      { value: "Kumintang Ibaba", text: "Kumintang Ibaba" },
      { value: "Kumintang Ilaya", text: "Kumintang Ilaya" },
      { value: "Libjo", text: "Libjo" },
      { value: "Liponpon Isla Verde", text: "Liponpon Isla Verde" },
      { value: "Maapas", text: "Maapas" },
      { value: "Mabacong", text: "Mabacong" },
      { value: "Mahabang Dahilig", text: "Mahabang Dahilig" },
      { value: "Mahabang Parang", text: "Mahabang Parang" },
      { value: "Mahacot Kanluran", text: "Mahacot Kanluran" },
      { value: "Mahacot Silangan", text: "Mahacot Silangan" },
      { value: "Malalim", text: "Malalim" },
      { value: "Malibayo", text: "Malibayo" },
      { value: "Malitam", text: "Malitam" },
      { value: "Maruclap", text: "Maruclap" },
      { value: "Pagkilatan", text: "Pagkilatan" },
      { value: "Paharang Kanluran", text: "Paharang Kanluran" },
      { value: "Paharang Silangan", text: "Paharang Silangan" },
      { value: "Pallocan Kanluran", text: "Pallocan Kanluran" },
      { value: "Pallocan Silangan", text: "Pallocan Silangan" },
      { value: "Pinamucan", text: "Pinamucan" },
      { value: "Pinamucan Ibaba", text: "Pinamucan Ibaba" },
      { value: "Pinamucan Silangan", text: "Pinamucan Silangan" },
      { value: "Sampaga", text: "Sampaga" },
      { value: "San Agapito Isla Verde", text: "San Agapito Isla Verde" },
      {
        value: "San Agustin Kanluran Isla Verde",
        text: "San Agustin Kanluran Isla Verde",
      },
      {
        value: "San Agustin Silangan Isla Verde",
        text: "San Agustin Silangan Isla Verde",
      },
      { value: "San Andres Isla Verde", text: "San Andres Isla Verde" },
      { value: "San Antonio Isla Verde", text: "San Antonio Isla Verde" },
      { value: "San Isidro", text: "San Isidro" },
      { value: "San Jose Sico", text: "San Jose Sico" },
      { value: "San Miguel", text: "San Miguel" },
      { value: "San Pedro", text: "San Pedro" },
      { value: "Santa Clara", text: "Santa Clara" },
      { value: "Santa Rita Aplaya", text: "Santa Rita Aplaya" },
      { value: "Santa Rita Karsada", text: "Santa Rita Karsada" },
      { value: "Santo Domingo", text: "Santo Domingo" },
      { value: "Santo Niño", text: "Santo Niño" },
      { value: "Simlong", text: "Simlong" },
      { value: "Sirang Lupa", text: "Sirang Lupa" },
      { value: "Sorosoro Ibaba", text: "Sorosoro Ibaba" },
      { value: "Sorosoro Ilaya", text: "Sorosoro Ilaya" },
      { value: "Sorosoro Karsada", text: "Sorosoro Karsada" },
      { value: "Tabangao Ambulong", text: "Tabangao Ambulong" },
      { value: "Tabangao Aplaya", text: "Tabangao Aplaya" },
      { value: "Tabangao Dao", text: "Tabangao Dao" },
      { value: "Talahib Pandayan", text: "Talahib Pandayan" },
      { value: "Talahib Payapa", text: "Talahib Payapa" },
      { value: "Talumpok Kanluran", text: "Talumpok Kanluran" },
      { value: "Talumpok Silangan", text: "Talumpok Silangan" },
      { value: "Tinga Itaas", text: "Tinga Itaas" },
      { value: "Tinga Labac", text: "Tinga Labac" },
      { value: "Tulo", text: "Tulo" },
      { value: "Wawa", text: "Wawa" },
    ],
    Bauan: [
      { value: "Alagao", text: "Alagao" },
      { value: "Aplaya", text: "Aplaya" },
      { value: "As-Is", text: "As-Is" },
      { value: "Bagong Silang", text: "Bagong Silang" },
      { value: "Baguilawa", text: "Baguilawa" },
      { value: "Balayong", text: "Balayong" },
      { value: "Barangay I (Poblacion)", text: "Barangay I (Poblacion)" },
      { value: "Barangay II (Poblacion)", text: "Barangay II (Poblacion)" },
      { value: "Barangay III (Poblacion)", text: "Barangay III (Poblacion)" },
      { value: "Barangay IV (Poblacion)", text: "Barangay IV (Poblacion)" },
      { value: "Bolo", text: "Bolo" },
      { value: "Colvo", text: "Colvo" },
      { value: "Cupang", text: "Cupang" },
      { value: "Durungao", text: "Durungao" },
      { value: "Gulibay", text: "Gulibay" },
      { value: "Inicbulan", text: "Inicbulan" },
      { value: "Locloc", text: "Locloc" },
      { value: "Magalang-Galang", text: "Magalang-Galang" },
      { value: "Malindig", text: "Malindig" },
      { value: "Manalupang", text: "Manalupang" },
      { value: "Manghinao Proper", text: "Manghinao Proper" },
      { value: "Manghinao Uno", text: "Manghinao Uno" },
      { value: "New Danglayan", text: "New Danglayan" },
      { value: "Orense", text: "Orense" },
      { value: "Pitugo", text: "Pitugo" },
      { value: "Rizal", text: "Rizal" },
      { value: "Sampaguita", text: "Sampaguita" },
      { value: "San Agustin", text: "San Agustin" },
      { value: "San Andres Proper", text: "San Andres Proper" },
      { value: "San Andres Uno", text: "San Andres Uno" },
      { value: "San Diego", text: "San Diego" },
      { value: "San Miguel", text: "San Miguel" },
      { value: "San Pablo", text: "San Pablo" },
      { value: "San Pedro", text: "San Pedro" },
      { value: "San Roque", text: "San Roque" },
      { value: "San Teodoro", text: "San Teodoro" },
      { value: "San Vicente", text: "San Vicente" },
      { value: "Santa Maria", text: "Santa Maria" },
      { value: "Santo Domingo", text: "Santo Domingo" },
      { value: "Sinala", text: "Sinala" },
    ],
    Calaca: [
      { value: "Bagong Tubig", text: "Bagong Tubig" },
      { value: "Baclas", text: "Baclas" },
      { value: "Balimbing", text: "Balimbing" },
      { value: "Bambang", text: "Bambang" },
      { value: "Barangay 1 (Poblacion)", text: "Barangay 1 (Poblacion)" },
      { value: "Barangay 2 (Poblacion)", text: "Barangay 2 (Poblacion)" },
      { value: "Barangay 3 (Poblacion)", text: "Barangay 3 (Poblacion)" },
      { value: "Barangay 4 (Poblacion)", text: "Barangay 4 (Poblacion)" },
      { value: "Barangay 5 (Poblacion)", text: "Barangay 5 (Poblacion)" },
      { value: "Barangay 6 (Poblacion)", text: "Barangay 6 (Poblacion)" },
      { value: "Bisaya", text: "Bisaya" },
      { value: "Cahil", text: "Cahil" },
      { value: "Caluangan", text: "Caluangan" },
      { value: "Calantas", text: "Calantas" },
      { value: "Camastilisan", text: "Camastilisan" },
      { value: "Coral ni Lopez (Sugod)", text: "Coral ni Lopez (Sugod)" },
      { value: "Coral ni Bacal", text: "Coral ni Bacal" },
      { value: "Dacanlao", text: "Dacanlao" },
      { value: "Dila", text: "Dila" },
      { value: "Loma", text: "Loma" },
      { value: "Lumbang Calzada", text: "Lumbang Calzada" },
      { value: "Lumbang na Bata", text: "Lumbang na Bata" },
      { value: "Lumbang na Matanda", text: "Lumbang na Matanda" },
      { value: "Madalunot", text: "Madalunot" },
      { value: "Makina", text: "Makina" },
      { value: "Matipok", text: "Matipok" },
      { value: "Munting Coral", text: "Munting Coral" },
      { value: "Niyugan", text: "Niyugan" },
      { value: "Pantay", text: "Pantay" },
      { value: "Puting Bato West", text: "Puting Bato West" },
      { value: "Puting Kahoy", text: "Puting Kahoy" },
      { value: "Puting Bato East", text: "Puting Bato East" },
      { value: "Quisumbing", text: "Quisumbing" },
      { value: "Salong", text: "Salong" },
      { value: "San Rafael", text: "San Rafael" },
      { value: "Sinisian", text: "Sinisian" },
      { value: "Taklang Anak", text: "Taklang Anak" },
      { value: "Talisay", text: "Talisay" },
      { value: "Tamayo", text: "Tamayo" },
      { value: "Timbain", text: "Timbain" },
    ],
    Calatagan: [
      { value: "Bagong Silang", text: "Bagong Silang" },
      { value: "Baha", text: "Baha" },
      { value: "Balibago", text: "Balibago" },
      { value: "Balitoc", text: "Balitoc" },
      { value: "Barangay 1 (Poblacion)", text: "Barangay 1 (Poblacion)" },
      { value: "Barangay 2 (Poblacion)", text: "Barangay 2 (Poblacion)" },
      { value: "Barangay 3 (Poblacion)", text: "Barangay 3 (Poblacion)" },
      { value: "Barangay 4 (Poblacion)", text: "Barangay 4 (Poblacion)" },
      { value: "Biga", text: "Biga" },
      { value: "Bucal", text: "Bucal" },
      { value: "Carlosa", text: "Carlosa" },
      { value: "Carretunan", text: "Carretunan" },
      { value: "Encarnacion", text: "Encarnacion" },
      { value: "Gulod", text: "Gulod" },
      { value: "Hukay", text: "Hukay" },
      { value: "Lucsuhin", text: "Lucsuhin" },
      { value: "Luya", text: "Luya" },
      { value: "Paraiso", text: "Paraiso" },
      { value: "Quilitisan", text: "Quilitisan" },
      { value: "Real", text: "Real" },
      { value: "Sambungan", text: "Sambungan" },
      { value: "Santa Ana", text: "Santa Ana" },
      { value: "Talibayog", text: "Talibayog" },
      { value: "Talisay", text: "Talisay" },
      { value: "Tanagan", text: "Tanagan" },
    ],
    Cuenca: [
      { value: "Balagbag", text: "Balagbag" },
      { value: "Barangay 1 (Poblacion)", text: "Barangay 1 (Poblacion)" },
      { value: "Barangay 2 (Poblacion)", text: "Barangay 2 (Poblacion)" },
      { value: "Barangay 3 (Poblacion)", text: "Barangay 3 (Poblacion)" },
      { value: "Barangay 4 (Poblacion)", text: "Barangay 4 (Poblacion)" },
      { value: "Barangay 5 (Poblacion)", text: "Barangay 5 (Poblacion)" },
      { value: "Barangay 6 (Poblacion)", text: "Barangay 6 (Poblacion)" },
      { value: "Barangay 7 (Poblacion)", text: "Barangay 7 (Poblacion)" },
      { value: "Barangay 8 (Poblacion)", text: "Barangay 8 (Poblacion)" },
      { value: "Bungahan", text: "Bungahan" },
      { value: "Calumayin", text: "Calumayin" },
      { value: "Dalipit East", text: "Dalipit East" },
      { value: "Dalipit West", text: "Dalipit West" },
      { value: "Dita", text: "Dita" },
      { value: "Don Juan", text: "Don Juan" },
      { value: "Emmanuel", text: "Emmanuel" },
      { value: "Ibabao", text: "Ibabao" },
      { value: "Labac", text: "Labac" },
      { value: "Pinagkaisahan", text: "Pinagkaisahan" },
      { value: "San Felipe", text: "San Felipe" },
      { value: "San Isidro", text: "San Isidro" },
    ],
    Ibaan: [
      { value: "Bago", text: "Bago" },
      { value: "Balanga", text: "Balanga" },
      { value: "Bungahan", text: "Bungahan" },
      { value: "Calamias", text: "Calamias" },
      { value: "Catandala", text: "Catandala" },
      { value: "Coliat", text: "Coliat" },
      { value: "Dayapan", text: "Dayapan" },
      { value: "Lapu-lapu", text: "Lapu-lapu" },
      { value: "Lucsuhin", text: "Lucsuhin" },
      { value: "Mabalor", text: "Mabalor" },
      { value: "Malainin", text: "Malainin" },
      { value: "Matala", text: "Matala" },
      { value: "Munting-Tubig", text: "Munting-Tubig" },
      { value: "Palindan", text: "Palindan" },
      { value: "Pangao", text: "Pangao" },
      { value: "Panghayaan", text: "Panghayaan" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "Quilo", text: "Quilo" },
      { value: "Sabang", text: "Sabang" },
      { value: "Salaban I", text: "Salaban I" },
      { value: "Salaban II", text: "Salaban II" },
      { value: "San Agustin", text: "San Agustin" },
      { value: "Sandalan", text: "Sandalan" },
      { value: "Santo Niño", text: "Santo Niño" },
      { value: "Talaibon", text: "Talaibon" },
      { value: "Tulay na Patpat", text: "Tulay na Patpat" },
    ],
    Laurel: [
      { value: "As-Is", text: "As-Is" },
      { value: "Balakilong", text: "Balakilong" },
      { value: "Barangay 1 (Poblacion)", text: "Barangay 1 (Poblacion)" },
      { value: "Barangay 2 (Poblacion)", text: "Barangay 2 (Poblacion)" },
      { value: "Barangay 3 (Poblacion)", text: "Barangay 3 (Poblacion)" },
      { value: "Barangay 4 (Poblacion)", text: "Barangay 4 (Poblacion)" },
      { value: "Barangay 5 (Poblacion)", text: "Barangay 5 (Poblacion)" },
      { value: "Berinayan", text: "Berinayan" },
      { value: "Bugaan East", text: "Bugaan East" },
      { value: "Bugaan West", text: "Bugaan West" },
      { value: "Buso-buso", text: "Buso-buso" },
      { value: "Dayap Itaas", text: "Dayap Itaas" },
      { value: "Gulod", text: "Gulod" },
      { value: "J. Leviste", text: "J. Leviste" },
      { value: "Molinete", text: "Molinete" },
      { value: "Niyugan", text: "Niyugan" },
      { value: "Paliparan", text: "Paliparan" },
      { value: "San Gabriel", text: "San Gabriel" },
      { value: "San Gregorio", text: "San Gregorio" },
      { value: "Santa Maria", text: "Santa Maria" },
      { value: "Ticub", text: "Ticub" },
    ],
    Lemery: [
      { value: "Anak-Dagat", text: "Anak-Dagat" },
      { value: "Arumahan", text: "Arumahan" },
      { value: "Ayao-iyao", text: "Ayao-iyao" },
      { value: "Bagong Pook", text: "Bagong Pook" },
      { value: "Bagong Sikat", text: "Bagong Sikat" },
      { value: "Balanga", text: "Balanga" },
      { value: "Bukal", text: "Bukal" },
      { value: "Cahilan I", text: "Cahilan I" },
      { value: "Cahilan II", text: "Cahilan II" },
      { value: "Dayapan", text: "Dayapan" },
      { value: "Dita", text: "Dita" },
      { value: "District I (Poblacion)", text: "District I (Poblacion)" },
      { value: "District II (Poblacion)", text: "District II (Poblacion)" },
      { value: "District III (Poblacion)", text: "District III (Poblacion)" },
      { value: "District IV (Poblacion)", text: "District IV (Poblacion)" },
      { value: "Gulod", text: "Gulod" },
      { value: "Lucky", text: "Lucky" },
      { value: "Maguihan", text: "Maguihan" },
      { value: "Mahabang Dahilig", text: "Mahabang Dahilig" },
      { value: "Mahayahay", text: "Mahayahay" },
      { value: "Maigsing Dahilig", text: "Maigsing Dahilig" },
      { value: "Maligaya", text: "Maligaya" },
      { value: "Malinis", text: "Malinis" },
      { value: "Masalisi", text: "Masalisi" },
      { value: "Mataas na Bayan", text: "Mataas na Bayan" },
      { value: "Matingain I", text: "Matingain I" },
      { value: "Matingain II", text: "Matingain II" },
      { value: "Mayasang", text: "Mayasang" },
      { value: "Niogan", text: "Niogan" },
      { value: "Nonong Casto", text: "Nonong Casto" },
      { value: "Palanas", text: "Palanas" },
      { value: "Payapa Ibaba", text: "Payapa Ibaba" },
      { value: "Payapa Ilaya", text: "Payapa Ilaya" },
      { value: "Rizal", text: "Rizal" },
      { value: "Sambal Ibaba", text: "Sambal Ibaba" },
      { value: "Sambal Ilaya", text: "Sambal Ilaya" },
      { value: "San Isidro Ibaba", text: "San Isidro Ibaba" },
      { value: "San Isidro Itaas", text: "San Isidro Itaas" },
      { value: "Sangalang", text: "Sangalang" },
      { value: "Sinisian East", text: "Sinisian East" },
      { value: "Sinisian West", text: "Sinisian West" },
      { value: "Talaga", text: "Talaga" },
      { value: "Tubigan", text: "Tubigan" },
      { value: "Tubuan", text: "Tubuan" },
      { value: "Wawa Ibaba", text: "Wawa Ibaba" },
      { value: "Wawa Ilaya", text: "Wawa Ilaya" },
    ],
    Lian: [
      { value: "Bagong Pook", text: "Bagong Pook" },
      { value: "Balibago", text: "Balibago" },
      { value: "Barangay 1 (Poblacion)", text: "Barangay 1 (Poblacion)" },
      { value: "Barangay 2 (Poblacion)", text: "Barangay 2 (Poblacion)" },
      { value: "Barangay 3 (Poblacion)", text: "Barangay 3 (Poblacion)" },
      { value: "Barangay 4 (Poblacion)", text: "Barangay 4 (Poblacion)" },
      { value: "Barangay 5 (Poblacion)", text: "Barangay 5 (Poblacion)" },
      { value: "Binubusan", text: "Binubusan" },
      { value: "Bungahan", text: "Bungahan" },
      { value: "Cumba", text: "Cumba" },
      { value: "Humayingan", text: "Humayingan" },
      { value: "Kapito", text: "Kapito" },
      { value: "Lumaniag", text: "Lumaniag" },
      { value: "Luyahan", text: "Luyahan" },
      { value: "Malaruhatan", text: "Malaruhatan" },
      { value: "Matabungkay", text: "Matabungkay" },
      { value: "Prenza", text: "Prenza" },
      { value: "Puting-Kahoy", text: "Puting-Kahoy" },
      { value: "San Diego", text: "San Diego" },
    ],
    Lipa: [
      { value: "Adya", text: "Adya" },
      { value: "Anilao", text: "Anilao" },
      { value: "Anilao-Labac", text: "Anilao-Labac" },
      { value: "Antipolo del Norte", text: "Antipolo del Norte" },
      { value: "Antipolo del Sur", text: "Antipolo del Sur" },
      { value: "Bagong Pook", text: "Bagong Pook" },
      { value: "Balintawak", text: "Balintawak" },
      { value: "Banaybanay", text: "Banaybanay" },
      { value: "Bolbok", text: "Bolbok" },
      { value: "Bugtong na Pulo", text: "Bugtong na Pulo" },
      { value: "Bulacnin", text: "Bulacnin" },
      { value: "Bulaklakan", text: "Bulaklakan" },
      { value: "Calamias", text: "Calamias" },
      { value: "Cumba", text: "Cumba" },
      { value: "Dagatan", text: "Dagatan" },
      { value: "Duhatan", text: "Duhatan" },
      { value: "Halang", text: "Halang" },
      { value: "Inosloban", text: "Inosloban" },
      { value: "Kayumanggi", text: "Kayumanggi" },
      { value: "Latag", text: "Latag" },
      { value: "Lodlod", text: "Lodlod" },
      { value: "Lumbang", text: "Lumbang" },
      { value: "Mabini", text: "Mabini" },
      { value: "Malagonlong", text: "Malagonlong" },
      { value: "Malitlit", text: "Malitlit" },
      { value: "Marauoy", text: "Marauoy" },
      { value: "Mataas na Lupa", text: "Mataas na Lupa" },
      { value: "Munting Pulo", text: "Munting Pulo" },
      { value: "Pagolingin Bata", text: "Pagolingin Bata" },
      { value: "Pagolingin East", text: "Pagolingin East" },
      { value: "Pagolingin West", text: "Pagolingin West" },
      { value: "Pangao", text: "Pangao" },
      { value: "Pinagkawitan", text: "Pinagkawitan" },
      { value: "Pinagtongulan", text: "Pinagtongulan" },
      { value: "Plaridel", text: "Plaridel" },
      { value: "Poblacion Barangay 1", text: "Poblacion Barangay 1" },
      { value: "Poblacion Barangay 2", text: "Poblacion Barangay 2" },
      { value: "Poblacion Barangay 3", text: "Poblacion Barangay 3" },
      { value: "Poblacion Barangay 4", text: "Poblacion Barangay 4" },
      { value: "Poblacion Barangay 5", text: "Poblacion Barangay 5" },
      { value: "Poblacion Barangay 6", text: "Poblacion Barangay 6" },
      { value: "Poblacion Barangay 7", text: "Poblacion Barangay 7" },
      { value: "Poblacion Barangay 8", text: "Poblacion Barangay 8" },
      { value: "Poblacion Barangay 9", text: "Poblacion Barangay 9" },
      { value: "Poblacion Barangay 9-A", text: "Poblacion Barangay 9-A" },
      { value: "Poblacion Barangay 10", text: "Poblacion Barangay 10" },
      { value: "Poblacion Barangay 11", text: "Poblacion Barangay 11" },
      { value: "Poblacion Barangay 12", text: "Poblacion Barangay 12" },
      { value: "Pusil", text: "Pusil" },
      { value: "Quezon", text: "Quezon" },
      { value: "Rizal", text: "Rizal" },
      { value: "Sabang", text: "Sabang" },
      { value: "Sampaguita", text: "Sampaguita" },
      { value: "San Benito", text: "San Benito" },
      { value: "San Carlos", text: "San Carlos" },
      { value: "San Celestino", text: "San Celestino" },
      { value: "San Francisco", text: "San Francisco" },
      { value: "San Guillermo", text: "San Guillermo" },
      { value: "San Jose", text: "San Jose" },
      { value: "San Lucas", text: "San Lucas" },
      { value: "San Salvador", text: "San Salvador" },
      { value: "San Sebastian", text: "San Sebastian" },
      { value: "Santo Niño", text: "Santo Niño" },
      { value: "Santo Toribio", text: "Santo Toribio" },
      { value: "Sapac", text: "Sapac" },
      { value: "Sico", text: "Sico" },
      { value: "Talisay", text: "Talisay" },
      { value: "Tambo", text: "Tambo" },
      { value: "Tangob", text: "Tangob" },
      { value: "Tanguay", text: "Tanguay" },
      { value: "Tibig", text: "Tibig" },
      { value: "Tipacan", text: "Tipacan" },
    ],
    Lobo: [
      { value: "Apar", text: "Apar" },
      { value: "Balatbat", text: "Balatbat" },
      { value: "Balibago", text: "Balibago" },
      { value: "Banalo", text: "Banalo" },
      { value: "Biga", text: "Biga" },
      { value: "Bignay", text: "Bignay" },
      { value: "Calo", text: "Calo" },
      { value: "Calumpit", text: "Calumpit" },
      { value: "Fabrica", text: "Fabrica" },
      { value: "Jaybanga", text: "Jaybanga" },
      { value: "Lagadlarin", text: "Lagadlarin" },
      { value: "Mabilog na Bundok", text: "Mabilog na Bundok" },
      { value: "Malabrigo", text: "Malabrigo" },
      { value: "Malalim na Sanog", text: "Malalim na Sanog" },
      { value: "Malapad na Parang", text: "Malapad na Parang" },
      { value: "Masaguitsit", text: "Masaguitsit" },
      { value: "Nagtalongtong", text: "Nagtalongtong" },
      { value: "Nagtoctoc", text: "Nagtoctoc" },
      { value: "Olo-olo", text: "Olo-olo" },
      { value: "Pinaghawanan", text: "Pinaghawanan" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "San Miguel", text: "San Miguel" },
      { value: "San Nicolas", text: "San Nicolas" },
      { value: "Sawang", text: "Sawang" },
      { value: "Soloc", text: "Soloc" },
      { value: "Tayuman", text: "Tayuman" },
    ],
    Mabini: [
      { value: "Anilao East", text: "Anilao East" },
      { value: "Anilao Proper", text: "Anilao Proper" },
      { value: "Bagalangit", text: "Bagalangit" },
      { value: "Bulacan", text: "Bulacan" },
      { value: "Calamias", text: "Calamias" },
      { value: "Estrella", text: "Estrella" },
      { value: "Gasang", text: "Gasang" },
      { value: "Laurel", text: "Laurel" },
      { value: "Ligaya", text: "Ligaya" },
      { value: "Mainaga", text: "Mainaga" },
      { value: "Mainit", text: "Mainit" },
      { value: "Majuben", text: "Majuben" },
      { value: "Malimatoc I", text: "Malimatoc I" },
      { value: "Malimatoc II", text: "Malimatoc II" },
      { value: "Nag-Iba", text: "Nag-Iba" },
      { value: "Pilahan", text: "Pilahan" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "Pulang Lupa", text: "Pulang Lupa" },
      { value: "Pulong Anahao", text: "Pulong Anahao" },
      { value: "Pulong Balibaguhan", text: "Pulong Balibaguhan" },
      { value: "Pulong Niogan", text: "Pulong Niogan" },
      { value: "Saguing", text: "Saguing" },
      { value: "Sampaguita", text: "Sampaguita" },
      { value: "San Francisco", text: "San Francisco" },
      { value: "San Teodoro", text: "San Teodoro" },
      { value: "San Juan", text: "San Juan" },
      { value: "San Jose", text: "San Jose" },
      { value: "Santa Ana", text: "Santa Ana" },
      { value: "Santa Mesa", text: "Santa Mesa" },
      { value: "Santo Niño", text: "Santo Niño" },
      { value: "Santo Tomas", text: "Santo Tomas" },
      { value: "Solo", text: "Solo" },
      { value: "Talaga East", text: "Talaga East" },
      { value: "Talaga Proper", text: "Talaga Proper" },
    ],
    Malvar: [
      { value: "Bagong Pook", text: "Bagong Pook" },
      {
        value: "Bilucao (San Isidro Western)",
        text: "Bilucao (San Isidro Western)",
      },
      { value: "Bulihan", text: "Bulihan" },
      { value: "Luta del Norte", text: "Luta del Norte" },
      { value: "Luta del Sur", text: "Luta del Sur" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "San Andres", text: "San Andres" },
      { value: "San Fernando", text: "San Fernando" },
      { value: "San Gregorio", text: "San Gregorio" },
      { value: "San Isidro East", text: "San Isidro East" },
      { value: "San Juan", text: "San Juan" },
      { value: "San Pedro I (Eastern)", text: "San Pedro I (Eastern)" },
      { value: "San Pedro II (Western)", text: "San Pedro II (Western)" },
      { value: "San Pioquinto", text: "San Pioquinto" },
      { value: "Santiago", text: "Santiago" },
    ],
    Mataasnakahoy: [
      { value: "Barangay II-A (Poblacion)", text: "Barangay II-A (Poblacion)" },
      { value: "Bayorbor", text: "Bayorbor" },
      { value: "Bubuyan", text: "Bubuyan" },
      { value: "Calingatan", text: "Calingatan" },
      { value: "District I (Poblacion)", text: "District I (Poblacion)" },
      { value: "District II (Poblacion)", text: "District II (Poblacion)" },
      { value: "District III (Poblacion)", text: "District III (Poblacion)" },
      { value: "District IV (Poblacion)", text: "District IV (Poblacion)" },
      { value: "Kinalaglagan", text: "Kinalaglagan" },
      { value: "Loob", text: "Loob" },
      { value: "Lumang Lipa", text: "Lumang Lipa" },
      { value: "Manggahan", text: "Manggahan" },
      { value: "Nangkaan", text: "Nangkaan" },
      { value: "San Sebastian", text: "San Sebastian" },
      { value: "Santol", text: "Santol" },
      { value: "Upa", text: "Upa" },
    ],
    Nasugbu: [
      { value: "Aga", text: "Aga" },
      { value: "Balaytigui", text: "Balaytigui" },
      { value: "Banilad", text: "Banilad" },
      { value: "Barangay 1 (Poblacion)", text: "Barangay 1 (Poblacion)" },
      { value: "Barangay 2 (Poblacion)", text: "Barangay 2 (Poblacion)" },
      { value: "Barangay 3 (Poblacion)", text: "Barangay 3 (Poblacion)" },
      { value: "Barangay 4 (Poblacion)", text: "Barangay 4 (Poblacion)" },
      { value: "Barangay 5 (Poblacion)", text: "Barangay 5 (Poblacion)" },
      { value: "Barangay 6 (Poblacion)", text: "Barangay 6 (Poblacion)" },
      { value: "Barangay 7 (Poblacion)", text: "Barangay 7 (Poblacion)" },
      { value: "Barangay 8 (Poblacion)", text: "Barangay 8 (Poblacion)" },
      { value: "Barangay 9 (Poblacion)", text: "Barangay 9 (Poblacion)" },
      { value: "Barangay 10 (Poblacion)", text: "Barangay 10 (Poblacion)" },
      { value: "Barangay 11 (Poblacion)", text: "Barangay 11 (Poblacion)" },
      { value: "Barangay 12 (Poblacion)", text: "Barangay 12 (Poblacion)" },
      { value: "Bilaran", text: "Bilaran" },
      { value: "Bucana", text: "Bucana" },
      { value: "Bulihan", text: "Bulihan" },
      { value: "Bunducan", text: "Bunducan" },
      { value: "Butucan", text: "Butucan" },
      { value: "Calayo", text: "Calayo" },
      { value: "Catandaan", text: "Catandaan" },
      { value: "Cogunan", text: "Cogunan" },
      { value: "Dayap", text: "Dayap" },
      { value: "Kaylaway", text: "Kaylaway" },
      { value: "Kayrilaw", text: "Kayrilaw" },
      { value: "Latag", text: "Latag" },
      { value: "Looc", text: "Looc" },
      { value: "Lumbangan", text: "Lumbangan" },
      { value: "Malapad na Bato", text: "Malapad na Bato" },
      { value: "Mataas na Pulo", text: "Mataas na Pulo" },
      { value: "Maugat", text: "Maugat" },
      { value: "Munting Indan", text: "Munting Indan" },
      { value: "Natipuan", text: "Natipuan" },
      { value: "Pantalan", text: "Pantalan" },
      { value: "Papaya", text: "Papaya" },
      { value: "Putat", text: "Putat" },
      { value: "Reparo", text: "Reparo" },
      { value: "Talangan", text: "Talangan" },
      { value: "Tumalim", text: "Tumalim" },
      { value: "Utod", text: "Utod" },
      { value: "Wawa", text: "Wawa" },
    ],
    "Padre Garcia": [
      { value: "Banaba", text: "Banaba" },
      { value: "Banaybanay", text: "Banaybanay" },
      { value: "Bawi", text: "Bawi" },
      { value: "Bukal", text: "Bukal" },
      { value: "Castillo", text: "Castillo" },
      { value: "Cawongan", text: "Cawongan" },
      { value: "Manggas", text: "Manggas" },
      { value: "Maugat East", text: "Maugat East" },
      { value: "Maugat West", text: "Maugat West" },
      { value: "Pansol", text: "Pansol" },
      { value: "Payapa", text: "Payapa" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "Quilo‑quilo North", text: "Quilo‑quilo North" },
      { value: "Quilo‑quilo South", text: "Quilo‑quilo South" },
      { value: "San Felipe", text: "San Felipe" },
      { value: "San Miguel", text: "San Miguel" },
      { value: "Tamak", text: "Tamak" },
      { value: "Tangob", text: "Tangob" },
    ],
    Rosario: [
      { value: "Alupay", text: "Alupay" },
      { value: "Antipolo", text: "Antipolo" },
      { value: "Bagong Pook", text: "Bagong Pook" },
      { value: "Balibago", text: "Balibago" },
      { value: "Barangay A (Poblacion)", text: "Barangay A (Poblacion)" },
      { value: "Barangay B (Poblacion)", text: "Barangay B (Poblacion)" },
      { value: "Barangay C (Poblacion)", text: "Barangay C (Poblacion)" },
      { value: "Barangay D (Poblacion)", text: "Barangay D (Poblacion)" },
      { value: "Barangay E (Poblacion)", text: "Barangay E (Poblacion)" },
      { value: "Bayawang", text: "Bayawang" },
      { value: "Baybayin", text: "Baybayin" },
      { value: "Bulihan", text: "Bulihan" },
      { value: "Cahigam", text: "Cahigam" },
      { value: "Calantas", text: "Calantas" },
      { value: "Colongan", text: "Colongan" },
      { value: "Itlugan", text: "Itlugan" },
      { value: "Lumbangan", text: "Lumbangan" },
      { value: "Maalas‑As", text: "Maalas‑As" },
      { value: "Mabato", text: "Mabato" },
      { value: "Mabunga", text: "Mabunga" },
      { value: "Macalamcam A", text: "Macalamcam A" },
      { value: "Macalamcam B", text: "Macalamcam B" },
      { value: "Malaya", text: "Malaya" },
      { value: "Maligaya", text: "Maligaya" },
      { value: "Marilag", text: "Marilag" },
      { value: "Masaya", text: "Masaya" },
      { value: "Matamis", text: "Matamis" },
      { value: "Mavalor", text: "Mavalor" },
      { value: "Mayuro", text: "Mayuro" },
      { value: "Namuco", text: "Namuco" },
      { value: "Namunga", text: "Namunga" },
      { value: "Natu", text: "Natu" },
      { value: "Nasi", text: "Nasi" },
      { value: "Palakpak", text: "Palakpak" },
      { value: "Pinagsibaan", text: "Pinagsibaan" },
      { value: "Putingkahoy", text: "Putingkahoy" },
      { value: "Quilib", text: "Quilib" },
      { value: "Salao", text: "Salao" },
      { value: "San Carlos", text: "San Carlos" },
      { value: "San Ignacio", text: "San Ignacio" },
      { value: "San Isidro", text: "San Isidro" },
      { value: "San Jose", text: "San Jose" },
      { value: "San Roque", text: "San Roque" },
      { value: "Santa Cruz", text: "Santa Cruz" },
      { value: "Timbugan", text: "Timbugan" },
      { value: "Tiquiwan", text: "Tiquiwan" },
      { value: "Leviste (Tubahan)", text: "Leviste (Tubahan)" },
      { value: "Tulos", text: "Tulos" },
    ],
    "San Jose": [
      { value: "Aguila", text: "Aguila" },
      { value: "Anus", text: "Anus" },
      { value: "Aya", text: "Aya" },
      { value: "Bagong Pook", text: "Bagong Pook" },
      { value: "Balagtasin", text: "Balagtasin" },
      { value: "Balagtasin I", text: "Balagtasin I" },
      { value: "Banaybanay I", text: "Banaybanay I" },
      { value: "Banaybanay II", text: "Banaybanay II" },
      { value: "Bigain I", text: "Bigain I" },
      { value: "Bigain II", text: "Bigain II" },
      { value: "Bigain South", text: "Bigain South" },
      { value: "Calansayan", text: "Calansayan" },
      { value: "Dagatan", text: "Dagatan" },
      { value: "Don Luis", text: "Don Luis" },
      { value: "Galamay‑Amo", text: "Galamay‑Amo" },
      { value: "Lalayat", text: "Lalayat" },
      { value: "Lapolapo I", text: "Lapolapo I" },
      { value: "Lapolapo II", text: "Lapolapo II" },
      { value: "Lepute", text: "Lepute" },
      { value: "Lumil", text: "Lumil" },
      { value: "Mojon‑Tampoy", text: "Mojon‑Tampoy" },
      { value: "Natunuan", text: "Natunuan" },
      { value: "Palanca", text: "Palanca" },
      { value: "Pinagtung‑Ulan", text: "Pinagtung‑Ulan" },
      { value: "Poblacion Barangay I", text: "Poblacion Barangay I" },
      { value: "Poblacion Barangay II", text: "Poblacion Barangay II" },
      { value: "Poblacion Barangay III", text: "Poblacion Barangay III" },
      { value: "Poblacion Barangay IV", text: "Poblacion Barangay IV" },
      { value: "Sabang", text: "Sabang" },
      { value: "Salaban", text: "Salaban" },
      { value: "Santo Cristo", text: "Santo Cristo" },
      { value: "Taysan", text: "Taysan" },
      { value: "Tugtug", text: "Tugtug" },
    ],
    "San Juan": [
      { value: "Abung", text: "Abung" },
      { value: "Balagbag", text: "Balagbag" },
      { value: "Barualte", text: "Barualte" },
      { value: "Bataan", text: "Bataan" },
      { value: "Buhay na Sapa", text: "Buhay na Sapa" },
      { value: "Bulsa", text: "Bulsa" },
      { value: "Calicanto", text: "Calicanto" },
      { value: "Calitcalit", text: "Calitcalit" },
      { value: "Calubcub I", text: "Calubcub I" },
      { value: "Calubcub II", text: "Calubcub II" },
      { value: "Catmon", text: "Catmon" },
      { value: "Coloconto", text: "Coloconto" },
      { value: "Escribano", text: "Escribano" },
      { value: "Hugom", text: "Hugom" },
      { value: "Imelda (Tubog)", text: "Imelda (Tubog)" },
      { value: "Janaojanao", text: "Janaojanao" },
      { value: "Laiya‑Aplaya", text: "Laiya‑Aplaya" },
      { value: "Laiya‑Ibabao", text: "Laiya‑Ibabao" },
      { value: "Libato", text: "Libato" },
      { value: "Lipahan", text: "Lipahan" },
      { value: "Mabalanoy", text: "Mabalanoy" },
      { value: "Maraykit", text: "Maraykit" },
      { value: "Muzon", text: "Muzon" },
      { value: "Nagsaulay", text: "Nagsaulay" },
      { value: "Palahanan I", text: "Palahanan I" },
      { value: "Palahanan II", text: "Palahanan II" },
      { value: "Palingowak", text: "Palingowak" },
      { value: "Pinagbayanan", text: "Pinagbayanan" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "Poctol", text: "Poctol" },
      { value: "Pulangbato", text: "Pulangbato" },
      { value: "Putingbuhangin", text: "Putingbuhangin" },
      { value: "Quipot", text: "Quipot" },
      { value: "Sampiro", text: "Sampiro" },
      { value: "Sapangan", text: "Sapangan" },
      { value: "Sico I", text: "Sico I" },
      { value: "Sico II", text: "Sico II" },
      { value: "Subukin", text: "Subukin" },
      { value: "Talahiban I", text: "Talahiban I" },
      { value: "Talahiban II", text: "Talahiban II" },
      { value: "Ticalan", text: "Ticalan" },
      { value: "Tipaz", text: "Tipaz" },
    ],
    "San Luis": [
      { value: "Abiacao", text: "Abiacao" },
      { value: "Bagong Tubig", text: "Bagong Tubig" },
      { value: "Balagtasin", text: "Balagtasin" },
      { value: "Balite", text: "Balite" },
      { value: "Banoyo", text: "Banoyo" },
      { value: "Boboy", text: "Boboy" },
      { value: "Bonliw", text: "Bonliw" },
      { value: "Calumpang East", text: "Calumpang East" },
      { value: "Calumpang West", text: "Calumpang West" },
      { value: "Dulangan", text: "Dulangan" },
      { value: "Durungao", text: "Durungao" },
      { value: "Locloc", text: "Locloc" },
      { value: "Luya", text: "Luya" },
      { value: "Mahabang Parang", text: "Mahabang Parang" },
      { value: "Manggahan", text: "Manggahan" },
      { value: "Muzon", text: "Muzon" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "San Antonio", text: "San Antonio" },
      { value: "San Isidro", text: "San Isidro" },
      { value: "San Jose", text: "San Jose" },
      { value: "San Martin", text: "San Martin" },
      { value: "Santa Monica", text: "Santa Monica" },
      { value: "Taliba", text: "Taliba" },
      { value: "Talon", text: "Talon" },
      { value: "Tejero", text: "Tejero" },
      { value: "Tungal", text: "Tungal" },
    ],
    "San Nicolas": [
      { value: "Abelo", text: "Abelo" },
      { value: "Alas-as", text: "Alas-as" },
      { value: "Balete", text: "Balete" },
      { value: "Baluk-baluk", text: "Baluk-baluk" },
      { value: "Bancoro", text: "Bancoro" },
      { value: "Bangin", text: "Bangin" },
      { value: "Calangay", text: "Calangay" },
      { value: "Hipit", text: "Hipit" },
      { value: "Maabud North", text: "Maabud North" },
      { value: "Maabud South", text: "Maabud South" },
      { value: "Munlawin", text: "Munlawin" },
      { value: "Pansipit", text: "Pansipit" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "Pulang-Bato", text: "Pulang-Bato" },
      { value: "Santo Niño", text: "Santo Niño" },
      { value: "Sinturisan", text: "Sinturisan" },
      { value: "Tagudtod", text: "Tagudtod" },
      { value: "Talang", text: "Talang" },
    ],
    "San Pascual": [
      { value: "Alalum", text: "Alalum" },
      { value: "Antipolo", text: "Antipolo" },
      { value: "Balimbing", text: "Balimbing" },
      { value: "Banaba", text: "Banaba" },
      { value: "Bayanan", text: "Bayanan" },
      { value: "Danglayan", text: "Danglayan" },
      { value: "Del Pilar", text: "Del Pilar" },
      { value: "Gelerang Kawayan", text: "Gelerang Kawayan" },
      { value: "Ilat North", text: "Ilat North" },
      { value: "Ilat South", text: "Ilat South" },
      { value: "Kaingin", text: "Kaingin" },
      { value: "Laurel", text: "Laurel" },
      { value: "Malaking Pook", text: "Malaking Pook" },
      { value: "Mataas na Lupa", text: "Mataas na Lupa" },
      { value: "Natunuan North", text: "Natunuan North" },
      { value: "Natunuan South", text: "Natunuan South" },
      { value: "Padre Castillo", text: "Padre Castillo" },
      { value: "Palsahingin", text: "Palsahingin" },
      { value: "Pila", text: "Pila" },
      { value: "Poblacion", text: "Poblacion" },
      { value: "Pook ni Banal", text: "Pook ni Banal" },
      { value: "Pook ni Kapitan", text: "Pook ni Kapitan" },
      { value: "Resplandor", text: "Resplandor" },
      { value: "Sambat", text: "Sambat" },
      { value: "San Antonio", text: "San Antonio" },
      { value: "San Mariano", text: "San Mariano" },
      { value: "San Mateo", text: "San Mateo" },
      { value: "Santa Elena", text: "Santa Elena" },
      { value: "Santo Niño", text: "Santo Niño" },
    ],
    "Santa Teresita": [
      { value: "Antipolo", text: "Antipolo" },
      { value: "Bihis", text: "Bihis" },
      { value: "Burol", text: "Burol" },
      { value: "Calayaan", text: "Calayaan" },
      { value: "Calumala", text: "Calumala" },
      { value: "Cuta East", text: "Cuta East" },
      { value: "Cutang Cawayan", text: "Cutang Cawayan" },
      { value: "Irukan", text: "Irukan" },
      { value: "Pacifico", text: "Pacifico" },
      { value: "Poblacion I", text: "Poblacion I" },
      { value: "Poblacion II", text: "Poblacion II" },
      { value: "Poblacion III", text: "Poblacion III" },
      { value: "Saimsim", text: "Saimsim" },
      { value: "Sampa", text: "Sampa" },
      { value: "Sinipian", text: "Sinipian" },
      { value: "Tambo Ibaba", text: "Tambo Ibaba" },
      { value: "Tambo Ilaya", text: "Tambo Ilaya" },
    ],
    "Santo Tomas": [
      { value: "Barangay I (Poblacion)", text: "Barangay I (Poblacion)" },
      { value: "Barangay II (Poblacion)", text: "Barangay II (Poblacion)" },
      { value: "Barangay III (Poblacion)", text: "Barangay III (Poblacion)" },
      { value: "Barangay IV (Poblacion)", text: "Barangay IV (Poblacion)" },
      { value: "San Agustin", text: "San Agustin" },
      { value: "San Antonio", text: "San Antonio" },
      { value: "San Bartolome", text: "San Bartolome" },
      { value: "San Felix", text: "San Felix" },
      { value: "San Fernando", text: "San Fernando" },
      { value: "San Francisco", text: "San Francisco" },
      { value: "San Isidro Norte", text: "San Isidro Norte" },
      { value: "San Isidro Sur", text: "San Isidro Sur" },
      { value: "San Joaquin", text: "San Joaquin" },
      { value: "San Jose", text: "San Jose" },
      { value: "San Juan", text: "San Juan" },
      { value: "San Luis", text: "San Luis" },
      { value: "San Miguel", text: "San Miguel" },
      { value: "San Pablo", text: "San Pablo" },
      { value: "San Pedro", text: "San Pedro" },
      { value: "San Rafael", text: "San Rafael" },
      { value: "San Roque", text: "San Roque" },
      { value: "San Vicente", text: "San Vicente" },
      { value: "Santa Ana", text: "Santa Ana" },
      { value: "Santa Anastacia", text: "Santa Anastacia" },
      { value: "Santa Clara", text: "Santa Clara" },
      { value: "Santa Cruz", text: "Santa Cruz" },
      { value: "Santa Elena", text: "Santa Elena" },
      { value: "Santa Maria", text: "Santa Maria" },
      { value: "Santa Teresita", text: "Santa Teresita" },
      { value: "Santiago", text: "Santiago" },
    ],
    Taal: [
      { value: "Apacay", text: "Apacay" },
      { value: "Balisong", text: "Balisong" },
      { value: "Bihis", text: "Bihis" },
      { value: "Bolbok", text: "Bolbok" },
      { value: "Buli", text: "Buli" },
      { value: "Butong", text: "Butong" },
      { value: "Carasuche", text: "Carasuche" },
      { value: "Cawit", text: "Cawit" },
      { value: "Caysasay", text: "Caysasay" },
      { value: "Cubamba", text: "Cubamba" },
      { value: "Cultihan", text: "Cultihan" },
      { value: "Gahol", text: "Gahol" },
      { value: "Halang", text: "Halang" },
      { value: "Iba", text: "Iba" },
      { value: "Ilog", text: "Ilog" },
      { value: "Imamawo", text: "Imamawo" },
      { value: "Ipil", text: "Ipil" },
      { value: "Laguile", text: "Laguile" },
      { value: "Latag", text: "Latag" },
      { value: "Luntal", text: "Luntal" },
      { value: "Mahabang Lodlod", text: "Mahabang Lodlod" },
      { value: "Niogan", text: "Niogan" },
      { value: "Pansol", text: "Pansol" },
      { value: "Poblacion 1", text: "Poblacion 1" },
      { value: "Poblacion 2", text: "Poblacion 2" },
      { value: "Poblacion 3", text: "Poblacion 3" },
      { value: "Poblacion 4", text: "Poblacion 4" },
      { value: "Poblacion 5", text: "Poblacion 5" },
      { value: "Poblacion 6", text: "Poblacion 6" },
      { value: "Poblacion 7", text: "Poblacion 7" },
      { value: "Poblacion 8", text: "Poblacion 8" },
      { value: "Poblacion 9", text: "Poblacion 9" },
      { value: "Poblacion 10", text: "Poblacion 10" },
      { value: "Poblacion 11", text: "Poblacion 11" },
      { value: "Poblacion 12", text: "Poblacion 12" },
      { value: "Poblacion 13", text: "Poblacion 13" },
      { value: "Poblacion 14", text: "Poblacion 14" },
      { value: "Pook", text: "Pook" },
      { value: "Seiran", text: "Seiran" },
      { value: "Tatlong Maria", text: "Tatlong Maria" },
      { value: "Tierra Alta", text: "Tierra Alta" },
      { value: "Tulo", text: "Tulo" },
    ],
    Talisay: [
      { value: "Aya", text: "Aya" },
      { value: "Balas", text: "Balas" },
      { value: "Banga", text: "Banga" },
      { value: "Buco", text: "Buco" },
      { value: "Caloocan", text: "Caloocan" },
      { value: "Leynes", text: "Leynes" },
      { value: "Miranda (Kali-e)", text: "Miranda (Kali-e)" },
      { value: "Poblacion Barangay 1", text: "Poblacion Barangay 1" },
      { value: "Poblacion Barangay 2", text: "Poblacion Barangay 2" },
      { value: "Poblacion Barangay 3", text: "Poblacion Barangay 3" },
      { value: "Poblacion Barangay 4", text: "Poblacion Barangay 4" },
      { value: "Poblacion Barangay 5", text: "Poblacion Barangay 5" },
      { value: "Poblacion Barangay 6", text: "Poblacion Barangay 6" },
      { value: "Poblacion Barangay 7", text: "Poblacion Barangay 7" },
      { value: "Poblacion Barangay 8", text: "Poblacion Barangay 8" },
      { value: "Quiling", text: "Quiling" },
      { value: "Sampaloc", text: "Sampaloc" },
      { value: "San Guillermo (Sungay)", text: "San Guillermo (Sungay)" },
      { value: "Santa Maria", text: "Santa Maria" },
      { value: "Tranca", text: "Tranca" },
      { value: "Tumaway", text: "Tumaway" },
    ],
    Tanauan: [
      { value: "Altura Bata", text: "Altura Bata" },
      { value: "Altura Matanda", text: "Altura Matanda" },
      { value: "Altura South", text: "Altura South" },
      { value: "Ambulong", text: "Ambulong" },
      { value: "Bañadero", text: "Bañadero" },
      { value: "Bagbag", text: "Bagbag" },
      { value: "Bagumbayan", text: "Bagumbayan" },
      { value: "Balele", text: "Balele" },
      { value: "Banjo East", text: "Banjo East" },
      { value: "Banjo Laurel (Banjo West)", text: "Banjo Laurel (Banjo West)" },
      { value: "Bilogbilog", text: "Bilogbilog" },
      { value: "Boot", text: "Boot" },
      { value: "Cale", text: "Cale" },
      { value: "Darasa", text: "Darasa" },
      { value: "Gonzales", text: "Gonzales" },
      { value: "Hidalgo", text: "Hidalgo" },
      { value: "Janopol Occidental", text: "Janopol Occidental" },
      { value: "Janopol Oriental", text: "Janopol Oriental" },
      { value: "Laurel", text: "Laurel" },
      { value: "Luyos", text: "Luyos" },
      { value: "Mabini", text: "Mabini" },
      { value: "Malaking Pulo", text: "Malaking Pulo" },
      { value: "Maria Paz", text: "Maria Paz" },
      { value: "Maugat", text: "Maugat" },
      { value: "Montaña (Ik-ik)", text: "Montaña (Ik-ik)" },
      { value: "Natatas", text: "Natatas" },
      { value: "Pagaspas", text: "Pagaspas" },
      { value: "Pantay Matanda", text: "Pantay Matanda" },
      { value: "Pantay Bata", text: "Pantay Bata" },
      { value: "Poblacion Barangay 1", text: "Poblacion Barangay 1" },
      { value: "Poblacion Barangay 2", text: "Poblacion Barangay 2" },
      { value: "Poblacion Barangay 3", text: "Poblacion Barangay 3" },
      { value: "Poblacion Barangay 4", text: "Poblacion Barangay 4" },
      { value: "Poblacion Barangay 5", text: "Poblacion Barangay 5" },
      { value: "Poblacion Barangay 6", text: "Poblacion Barangay 6" },
      { value: "Poblacion Barangay 7", text: "Poblacion Barangay 7" },
      { value: "Sala", text: "Sala" },
      { value: "Sambat", text: "Sambat" },
      { value: "San Jose", text: "San Jose" },
      {
        value: "Santol (Doña Jacoba Garcia)",
        text: "Santol (Doña Jacoba Garcia)",
      },
      { value: "Santor", text: "Santor" },
      { value: "Sulpoc", text: "Sulpoc" },
      { value: "Suplang", text: "Suplang" },
      { value: "Talaga", text: "Talaga" },
      { value: "Tinurik", text: "Tinurik" },
      { value: "Trapiche", text: "Trapiche" },
      { value: "Ulango", text: "Ulango" },
      { value: "Wawa", text: "Wawa" },
    ],
    Taysan: [
      { value: "Bacao", text: "Bacao" },
      { value: "Bilogo", text: "Bilogo" },
      { value: "Bukal", text: "Bukal" },
      { value: "Dagatan", text: "Dagatan" },
      { value: "Guinhawa", text: "Guinhawa" },
      { value: "Laurel", text: "Laurel" },
      { value: "Mabayabas", text: "Mabayabas" },
      { value: "Mahanadiong", text: "Mahanadiong" },
      { value: "Mapulo", text: "Mapulo" },
      { value: "Mataas na Lupa", text: "Mataas na Lupa" },
      { value: "Pag-Asa", text: "Pag-Asa" },
      { value: "Panghayaan", text: "Panghayaan" },
      { value: "Piña", text: "Piña" },
      { value: "Pinagbayanan", text: "Pinagbayanan" },
      { value: "Poblacion East", text: "Poblacion East" },
      { value: "Poblacion West", text: "Poblacion West" },
      { value: "San Isidro", text: "San Isidro" },
      { value: "San Marcelino", text: "San Marcelino" },
      { value: "Santo Niño", text: "Santo Niño" },
      { value: "Tilambo", text: "Tilambo" },
    ],
    Tingloy: [
      { value: "Barangay 13 (Poblacion 1)", text: "Barangay 13 (Poblacion 1)" },
      { value: "Barangay 14 (Poblacion 2)", text: "Barangay 14 (Poblacion 2)" },
      { value: "Barangay 15 (Poblacion 3)", text: "Barangay 15 (Poblacion 3)" },
      { value: "Corona", text: "Corona" },
      { value: "Gamao", text: "Gamao" },
      { value: "Makawayan", text: "Makawayan" },
      { value: "Marikaban", text: "Marikaban" },
      { value: "Papaya", text: "Papaya" },
      { value: "Pisa", text: "Pisa" },
      { value: "San Isidro", text: "San Isidro" },
      { value: "San Jose", text: "San Jose" },
      { value: "San Juan", text: "San Juan" },
      { value: "San Pedro", text: "San Pedro" },
      { value: "Santo Tomas", text: "Santo Tomas" },
      { value: "Talahib", text: "Talahib" },
    ],
    Tuy: [
      { value: "Acle", text: "Acle" },
      { value: "Bayudbud", text: "Bayudbud" },
      { value: "Bolboc", text: "Bolboc" },
      { value: "Burgos (Poblacion)", text: "Burgos (Poblacion)" },
      { value: "Dalima", text: "Dalima" },
      { value: "Dao", text: "Dao" },
      { value: "Guinhawa", text: "Guinhawa" },
      { value: "Lumbangan", text: "Lumbangan" },
      { value: "Luna (Poblacion)", text: "Luna (Poblacion)" },
      { value: "Luntal", text: "Luntal" },
      { value: "Magahis", text: "Magahis" },
      { value: "Malibu", text: "Malibu" },
      { value: "Mataywanac", text: "Mataywanac" },
      { value: "Palincaro", text: "Palincaro" },
      { value: "Putol", text: "Putol" },
      { value: "Rillo (Poblacion)", text: "Rillo (Poblacion)" },
      { value: "Rizal (Poblacion)", text: "Rizal (Poblacion)" },
      { value: "Sabang", text: "Sabang" },
      { value: "San Jose", text: "San Jose" },
      { value: "Talon", text: "Talon" },
      { value: "Toong", text: "Toong" },
      { value: "Tuyon-tuyon", text: "Tuyon-tuyon" },
    ],
  };

  function updateBarangayOptions() {
    barangay.innerHTML = "";

    const selectedCity = city.value;

    if (selectedCity && barangayOptions[selectedCity]) {
      barangayOptions[selectedCity].forEach((option) => {
        const opt = document.createElement("option");
        opt.value = option.value;
        opt.textContent = option.text;
        barangay.appendChild(opt);
      });

      if (initialBarangay && initialBarangay !== "Not Set") {
        barangay.value = initialBarangay;
      } else {
        barangay.insertAdjacentHTML(
          "afterbegin",
          '<option value="" disabled selected>Select Barangay</option>'
        );
      }

      initialBarangay = "";
    } else {
      barangay.innerHTML =
        '<option value="" disabled selected>Select City First</option>';
    }
  }

  function resetForm() {
    const form = document.getElementById("adminEditBackgroundForm");
    const city = document.getElementById("city");
    const barangay = document.getElementById("barangay");

    const initialCityValue = city.getAttribute("data-initial-city");
    const initialBarangayValue = barangay.getAttribute("data-initial-barangay");

    form.reset();

    city.value = initialCityValue || "";
    barangay.innerHTML =
      '<option value="" disabled selected>Select City First</option>';

    if (initialCityValue) {
      updateBarangayOptions();
      if (initialBarangayValue && initialBarangayValue !== "Not Set") {
        barangay.value = initialBarangayValue;
      }
    }
  }

  city.addEventListener("change", updateBarangayOptions);

  updateBarangayOptions();

  document
    .getElementById("change-user-icon")
    .addEventListener("click", function () {
      document.getElementById("new-avatar").click();
    });

  document
    .getElementById("new-avatar")
    .addEventListener("change", function (event) {
      const reader = new FileReader();
      reader.onload = function () {
        document.getElementById("avatar-preview").src = reader.result;
      };
      if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
      }
    });

  document
    .getElementById("change-avatar-icon")
    .addEventListener("click", () => {
      document.getElementById("adminChangeAvatarModal").style.display = "block";
    });

  document.getElementById("closeAvatarModal").addEventListener("click", () => {
    document.getElementById("adminChangeAvatarModal").style.display = "none";
  });

  const modal = document.getElementById("adminPasswordModal");
  const changePasswordBtn = document.getElementById("changePassword");
  const closeBtn = document.getElementById("closePasswordModal");
  const updatePasswordForm = document.getElementById("adminUpdatePassword");

  changePasswordBtn.onclick = function () {
    modal.style.display = "flex";
  };

  closeBtn.onclick = function () {
    modal.style.display = "none";
    updatePasswordForm.reset();
  };

  document.querySelectorAll(".toggle-password").forEach(function (eyeIcon) {
    eyeIcon.onclick = togglePasswordVisibility;
  });
  document.getElementById("verifyEmail").addEventListener("click", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/SCES/backend/admin/send-verif-code.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = xhr.response.trim();
          $.getScript(
            "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
            function () {
              if (response === "200") {
                Swal.fire({
                  icon: "success",
                  title: "Verification Code Sent To Email",
                  confirmButtonColor: "#4CAF50",
                  allowOutsideClick: false,
                }).then(() => {
                  document.getElementById(
                    "emailVerificationModal"
                  ).style.display = "flex";
                });
              } else if (response === "403") {
                Swal.fire({
                  icon: "warning",
                  title: "Email Already Verified",
                  confirmButtonColor: "#4CAF50",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Verification Code Not Sent",
                  text: "Please Try Again Later",
                  confirmButtonColor: "#4CAF50",
                });
              }
            }
          );
        } else {
          $.getScript(
            "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
            function () {
              Swal.fire({
                icon: "error",
                title: "Server Error",
                text: "Server error: " + xhr.status,
                confirmButtonColor: "#4CAF50",
              });
            }
          );
        }
      }
    };
  });

  document
    .getElementById("closeEmailVerifModal")
    .addEventListener("click", function () {
      document.getElementById("emailVerificationModal").style.display = "none";
    });

  document
    .getElementById("verifyCodeBtn")
    .addEventListener("click", function () {
      var enteredCode = document
        .getElementById("verificationCode")
        .value.trim();

      if (enteredCode === "") {
        $.getScript(
          "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
          function () {
            Swal.fire({
              icon: "warning",
              title: "Invalid Input",
              text: "Please Enter The Verification Code Sent To Your Email",
              confirmButtonColor: "#4CAF50",
            });
          }
        );
        return;
      }

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/SCES/backend/admin/verify-code.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xhr.send("verificationCode=" + encodeURIComponent(enteredCode));

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          $.getScript(
            "/SCES/vendor/node_modules/sweetalert2/dist/sweetalert2.all.min.js",
            function () {
              if (xhr.status === 200) {
                var response = xhr.response.trim();
                if (response === "200") {
                  Swal.fire({
                    icon: "success",
                    title: "Email Verified Successfully",
                    confirmButtonColor: "#4CAF50",
                    allowOutsideClick: false,
                  }).then(() => {
                    document.getElementById(
                      "emailVerificationModal"
                    ).style.display = "none";
                    window.location.reload();
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Verification Failed",
                    text: "Incorrect Verification Code",
                    confirmButtonColor: "#4CAF50",
                  });
                }
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Server Error",
                  text: "Server error: " + xhr.status,
                  confirmButtonColor: "#FF0000",
                });
              }
            }
          );
        }
      };
    });
});

function togglePasswordVisibility(event) {
  const eyeIcon = event.currentTarget;
  const input = document.querySelector(eyeIcon.getAttribute("toggle"));
  const type = input.getAttribute("type") === "password" ? "text" : "password";
  input.setAttribute("type", type);

  eyeIcon.classList.toggle("fa-eye-slash");
  eyeIcon.classList.toggle("fa-eye");
}
