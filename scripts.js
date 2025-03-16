const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");
const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");
const inputTags = document.getElementById("input-tags");
const listaTags = document.getElementById("lista-tags");
const botaoPublicar = document.querySelector(".botao-publicar");
const botaoDescartar = document.querySelector(".botao-descartar");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };

    leitor.onerror = function () {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];

  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (e) {
      console.error("Erro na leitura do arquivo");
    }
  }
});

const tagsDisponiveis = [
  "Front-end",
  "Programação",
  "Data Science",
  "Full-stack",
  "HTML",
  "CSS",
  "JavaScript",
  "Java",
];

async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    });
  });
}

inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    // if (tagTexto !== "") {
    //   try {
    //     const tagExiste = await verificaTagsDisponiveis(tagTexto);

    //     if (tagExiste) {
    //       const tagNova = document.createElement("li");
    //       tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
    //       listaTags.appendChild(tagNova);
    //       inputTags.value = "";
    //     } else {
    //       alert("Tag não foi encontrada.");
    //     }
    //   } catch (error) {
    //     console.error("Erro ao verificar existência da tag.");
    //     alert("Erro ao verificar existência da tag. Verifique o console.");
    //   }
    // }
    if (tagTexto !== "") {
      try {
        const tagExiste = await verificaTagsDisponiveis(tagTexto);

        if (tagExiste) {
          const tagNova = document.createElement("li");
          const novoParagrafo = document.createElement("p");
          const imgXTag = document.createElement("img");

          novoParagrafo.innerHTML = `${tagTexto}`;
          tagNova.appendChild(novoParagrafo);

          imgXTag.src = "./img/close-black.svg";
          imgXTag.classList.add("remove-tag");
          tagNova.appendChild(imgXTag);

          listaTags.appendChild(tagNova);
          inputTags.value = "";
        } else {
          alert("Tag não foi encontrada.");
        }
      } catch (error) {
        console.error("Erro ao verificar existência da tag.");
        alert("Erro ao verificar existência da tag. Verifique o console.");
      }
    }
  }
});

listaTags.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("remove-tag")) {
    const tagParaRemover = evento.target.parentElement;
    listaTags.removeChild(tagParaRemover);
  }
});

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;

      if (deuCerto) {
        resolve("Projeto publicado com sucesso");
      } else {
        reject("Erro ao pubicar projeto");
      }
    }, 2000);
  });
}

botaoPublicar.addEventListener("click", async (evento) => {
  evento.preventDefault();

  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao").value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map(
    (tag) => tag.textContent
  );

  try {
    const resultado = await publicarProjeto(
      nomeDoProjeto,
      descricaoDoProjeto,
      tagsProjeto
    );
    console.log(resultado);
    const formulario = document.querySelector("form");
    alert("Projeto publicado com sucesso");
    formulario.reset();
    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image_projeto.png";
    listaTags.textContent = "";
  } catch (error) {
    console.log("Deu errado: ", error);
    alert("Algo deu errado");
  }
});

botaoDescartar.addEventListener("click", (evento) => {
  evento.preventDefault();

  const formulario = document.querySelector("form");
  formulario.reset();

  imagemPrincipal.src = "./img/imagem1.png";
  nomeDaImagem.textContent = "image_projeto.png";
  listaTags.textContent = "";
});
