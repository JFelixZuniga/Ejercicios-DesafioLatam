const form = document.querySelector("form");

const baseUrl = "http://localhost:3000/api";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const [email, password] = [...document.querySelectorAll("input")].map(
    (i) => i.value
  );
  const userCredentials = { email, password };
  // Alternativa con Axios
  // const { data } = await axios.post(`${baseUrl}/login`, userCredentials);

  // Alternativa con Fetch
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    body: JSON.stringify(userCredentials),
  });
  const data = await response.json();
  const token = data.token;

  const posts = await getPosts(token);

  const JWT = await postData(email, password);
  getPosts(JWT);

  // fillTable(posts, "js-table-posts");

  // toggleFormAndTable("js-form-wrapper", "js-table-wrapper");

  console.log(data);
  console.log(posts);
});

const getPosts = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt} `,
      },
    });
    const { data } = await response.json();
    if (data) {
      fillTable(data, "js-table-posts");
      toggleFormAndTable("js-form-wrapper", "js-table-wrapper");
    }
  } catch (err) {
    localStorage.clear();
    console.error(`Error: ${err} `);
  }
};

const fillTable = (data, table) => {
  let rows = "";
  $.each(data, (i, row) => {
    rows += `<tr>
      <td> ${row.title} </td>
      <td> ${row.body} </td>
      </tr>`;
  });
  $(`#${table} tbody`).append(rows);
};

const toggleFormAndTable = (form, table) => {
  $(`#${form}`).toggle();
  $(`#${table}`).toggle();
};

const postData = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    return token;
  } catch (err) {
    console.error(`Error: ${err} `);
  }
};

const init = async () => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    getPosts(token);
    // fillTable(posts, "js-table-posts");
    // toggleFormAndTable("js-form-wrapper", "js-table-wrapper");
  }
};
init();
