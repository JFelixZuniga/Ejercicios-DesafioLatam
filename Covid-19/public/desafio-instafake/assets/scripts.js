const formulario = document.querySelector("form");
const btnLogout = document.querySelector("#logout");
const btnMoreImage = document.querySelector("#moreImage");

const url = "http://localhost:3000/api/photos";

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const [email, password] = [...document.querySelectorAll("input")].map(
    (i) => i.value
  );

  const userCredentials = { email, password };

  // postData nos retorna el Token, el cual ya está guadado en LocalStorage
  const JWT = await postData(userCredentials);

  // Pasamos como argumento el Token a la función getPhotos
  getDataPhotos(JWT);
});

const postData = async ({ email, password }) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { token } = await response.json();
    localStorage.setItem("JWToken", token);
    return token;
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

const getDataPhotos = async (jwt) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    if (data) {
      paintPhotos(data);
      toggleFormAndTable("formulario", "fotografias");
    }
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err}`);
  }
};

function paintPhotos(dataPhotos) {
  console.log("Tengos los datos", dataPhotos);
  const contenedor = document.querySelector("#contenedor-fotos");

  let contentImgage = document.createElement("div");
  contentImgage.classList.add("card-columns");

  dataPhotos.map((photo) => {
    contentImgage.innerHTML += `
    <div class="card">
      <img src="${photo.download_url}" class="card-img-top" alt="foto random">
      <div class="card-body">
        <p class="card-text">Autor: ${photo.author}</p>
      </div>
    </div>
    `;
  });
  contenedor.appendChild(contentImgage);
}

const toggleFormAndTable = (form, images) => {
  $(`#${form}`).toggle();
  $(`#${images}`).toggle();
};

btnLogout.addEventListener("click", () => {
  localStorage.clear();
  toggleFormAndTable("formulario", "fotografias");
});

btnMoreImage.addEventListener("click", () => {});

const init = async () => {
  const token = localStorage.getItem("JWToken");
  if (token) {
    getDataPhotos(token);
    // console.log(getDataPhotos(token));
    // fillTable(posts, "js-table-posts");
    // toggleFormAndTable("formulario", "fotografias");
  }
};
init();
