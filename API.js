// Puxando API publica 
const urlAPI = 'https://testapi.devtoolsdaily.com/users?limit=10'

export async function clientes() {
    try {
        const url = urlAPI

        const dados = await fetch(url)
        const response = await dados.json()
       
        return response

    } catch (err) {
         console.error('Erro ao buscar clientes:', err)
    }


}

