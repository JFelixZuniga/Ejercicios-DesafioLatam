// Referencia de elementos del DOM

const form = document.querySelector("form");
const inputs = document.querySelectorAll("form input");
const resultados = document.querySelector("#resultados");

$(document).ready(function () {
  $("form").submit(async (event) => {
    event.preventDefault();

    // Version con destructuring compuesto
    // let [{value:nombreValue},{value:paginaValue},{value:reposPaginaValue}] = inputs;
    let [nombreValue, paginaValue, reposPaginaValue] = [...inputs].map(
      (i) => i.value
    );

    console.log(nombreValue);
    try {
      const userData = await getUserData(nombreValue);
      showDataUser(userData);

      const reposByPage = await getReposByPage([
        nombreValue,
        paginaValue,
        reposPaginaValue,
      ]);
      showListRepos(reposByPage);

      // console.log(userData);
    } catch (err) {
      console.log(err);
    }
  });
});
// https://api.github.com/users/:userName
const getUserData = async (user) => {
  const url = `https://api.github.com/users/${user}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// https://api.github.com/users/{user}/repos?page={pagina}&per_page={cantidad_repos}.

const getReposByPage = async ([user, pagina, cantidad_repos]) => {
  const url = `https://api.github.com/users/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const showDataUser = (userData) => {
  const resultado = document.querySelector("#resultadoUser");

  resultado.innerHTML = `
    <img width="300" class="img-fluid rounded-circle mb-2" src="${userData.avatar_url}" >
    <h6 class="py-1">Nombre: ${userData.name} </h6>
    <h6 class="py-1">Nombre de Login: ${userData.login} </h6>
    <h6 class="py-1">Cantidad de Repositrioso: ${userData.public_repos}</h6>
    <h6 class="py-1">Localidad:${userData.location} </h6>
    <h6 class="py-1">Tipo de Usuario:${userData.type} </h6>
  `;
};
const showListRepos = (reposByPage) => {
  const resultado = document.querySelector("#resultadoRepo");
  console.log(resultado);

  const listRepos = reposByPage.map((repositorio) => {
    return `<p> <a href="${repositorio.html_url}">${repositorio.name}</a> </p>`;
  });

  resultado.innerHTML = listRepos.join("");
};
