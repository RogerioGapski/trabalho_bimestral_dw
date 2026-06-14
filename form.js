import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyByDLT5KYYG-Yimj6Nr8Xwb7NgR_M0HXa8",
    authDomain: "projeto-bimestral-7403d.firebaseapp.com",
    projectId: "projeto-bimestral-7403d",
    storageBucket: "projeto-bimestral-7403d.firebasestorage.app",
    messagingSenderId: "706948342235",
    appId: "1:706948342235:web:f907ad4513e89166db47fe"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("formulario");

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nome  = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const idade = parseInt(document.getElementById("idade").value);

    if (!nome || !email || !idade || !senha) {
        alert("Por favor, preencha todos os campos para o envio!");
        return;
    }

    if (idade < 18) {
        alert("Erro! Idade abaixo de 18 anos!");
        return;
    }

    if (senha.length < 6) {
        alert("A senha tem tamanho de no mínimo 6 dígitos");
        return;
    }

    try {
        await addDoc(collection(db, "cadastros"), {
            nome:  nome,
            email: email,
            idade: idade,
            data:  new Date().toLocaleString("pt-BR")
        });

        alert("Cadastro realizado com sucesso!");
        form.reset();

    } catch (erro) {
        console.error("Erro ao salvar:", erro);
        alert("Erro ao salvar o cadastro. Tente novamente.");
    }
});
