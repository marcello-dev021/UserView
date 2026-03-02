import { clientes } from "./API.js";

async function reder() {
    const dadosUser = await clientes()

    console.log(dadosUser)
}
reder()