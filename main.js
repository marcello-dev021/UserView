import { clientes } from './API.js'

// ── Elementos do DOM ──────────────────────────────────────────
const lista    = document.getElementById('listaClientes')
const filtro   = document.getElementById('filtrar')
const contador = document.getElementById('contadorClientes')
const btnLimpar = document.getElementById('btnLimpar')

// ── Estado global ─────────────────────────────────────────────
let clientesGlobais = []

// ── Helpers ───────────────────────────────────────────────────

// Gera as iniciais do nome para o avatar
function iniciais(primeiro = '', ultimo = '') {
    return (primeiro[0] ?? '') + (ultimo[0] ?? '')
}

// Gera uma linha <tr> para cada cliente
// Campos disponíveis: id, firstName, lastName, countryCode, companyId
function criarLinha(cliente, indice) {
    const tr = document.createElement('tr')
    tr.style.animationDelay = `${indice * 40}ms`
    tr.innerHTML = `
        <td>
            <div class="td-nome-cell">
                <div class="avatar">${iniciais(cliente.firstName, cliente.lastName)}</div>
                <span class="td-nome">${cliente.firstName ?? ''} ${cliente.lastName ?? ''}</span>
            </div>
        </td>
        <td>${cliente.countryCode ?? '—'}</td>
        <td>#${cliente.companyId ?? '—'}</td>
        <td><span class="badge-status">#${cliente.id}</span></td>
    `
    return tr
}

// ── Renderização ──────────────────────────────────────────────
function renderizarTabela(dados) {
    lista.innerHTML = ''

    if (!dados.length) {
        lista.innerHTML = `
            <tr><td colspan="4">
                <div class="estado">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <p>Nenhum cliente encontrado</p>
                </div>
            </td></tr>`
        return
    }

    dados.forEach((cliente, i) => {
        lista.appendChild(criarLinha(cliente, i))
    })
}

function atualizarContador(visiveis, total) {
    contador.textContent = visiveis === total
        ? `${total} registros`
        : `${visiveis} de ${total} registros`
}

// ── Carregamento inicial ──────────────────────────────────────
async function carregar() {
    try {
        clientesGlobais = await clientes()
        atualizarContador(clientesGlobais.length, clientesGlobais.length)
        renderizarTabela(clientesGlobais)
    } catch (erro) {
        contador.textContent = 'Erro'
        lista.innerHTML = `
            <tr><td colspan="4">
                <div class="estado">
                    <p>Erro ao carregar clientes: ${erro.message}</p>
                </div>
            </td></tr>`
    }
}

// ── Eventos ───────────────────────────────────────────────────
filtro.addEventListener('input', (e) => {
    const valor = e.target.value.toLowerCase()

    const filtrados = clientesGlobais.filter(c =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(valor)
    )

    atualizarContador(filtrados.length, clientesGlobais.length)
    renderizarTabela(filtrados)
})

btnLimpar.addEventListener('click', () => {
    filtro.value = ''
    atualizarContador(clientesGlobais.length, clientesGlobais.length)
    renderizarTabela(clientesGlobais)
})

// ── Init ──────────────────────────────────────────────────────
carregar()