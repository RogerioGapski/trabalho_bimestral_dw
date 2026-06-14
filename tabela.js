import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyByDLT5KYYG-Yimj6Nr8Xwb7NgR_M0HXa8",
    authDomain: "projeto-bimestral-7403d.firebaseapp.com",
    projectId: "projeto-bimestral-7403d",
    storageBucket: "projeto-bimestral-7403d.firebasestorage.app",
    messagingSenderId: "706948342235",
    appId: "1:706948342235:web:f907ad4513e89166db47fe"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

const corpo = document.getElementById("corpo");
const total = document.getElementById("total");

async function carregarCadastros() {
    try {
        const snap = await getDocs(collection(db, "cadastros"));

        if (snap.empty) {
            corpo.innerHTML = `<tr><td colspan="5" class="vazio">Nenhum cadastro encontrado.</td></tr>`;
            return;
        }

        corpo.innerHTML = "";
        let index = 1;

        snap.forEach((doc) => {
            const c = doc.data();
            corpo.innerHTML += `
                <tr>
                    <td>${index++}</td>
                    <td>${c.nome}</td>
                    <td>${c.email}</td>
                    <td>${c.idade}</td>
                    <td>${c.data || "—"}</td>
                </tr>`;
        });

        total.textContent = `Total: ${snap.size} cadastro(s)`;

    } catch (erro) {
        console.error("Erro ao carregar:", erro);
        corpo.innerHTML = `<tr><td colspan="5" class="vazio">Erro ao carregar os cadastros.</td></tr>`;
    }
}

carregarCadastros();
