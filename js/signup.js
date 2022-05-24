const inputNomeRef = document.querySelector('#inputNome')
const inputApelidoRef = document.querySelector('#inputApelido')
const inputEmailRef = document.querySelector('#inputEmail')
const inputSenhaRef = document.querySelector('#inputPassword')
const inputSenhaRef2 = document.querySelector('#inputPassword2')
const btnCriarRef = document.querySelector('button')
const inputs  = document.querySelectorAll('[required]');
// const spans  = document.querySelectorAll('[required] ~ span');
let formValidity = {
    inputNome: false,
    inputApelido: false,
    inputEmail: false,
    inputPassword: false,
    inputPassword2: false
}
const validate = () => {
    for(let input of inputs) {
        input.addEventListener('keyup', () => {// Evento de keyup para cada elemento input
            input.value.trim()
            formValidity[input.id] = input.checkValidity()
            if(input.checkValidity()) {
                // btnCriarRef.disabled = false
                input.classList.remove('error')
                input.classList.add('not-error')
                input.style.backgroundColor = "var(--input-ok)"
            } else {
                btnCriarRef.disabled = true
                input.classList.add('error')
                input.style.backgroundColor = "var(--input-not-ok)"
            }
            //************* */
            if(inputs[inputs.length - 1].value === inputs[inputs.length - 2].value) {
                btnCriarRef.disabled = false
                inputs[inputs.length - 1].classList.remove('error')
                inputs[inputs.length - 1].classList.add('not-error')
                inputs[inputs.length - 1].style.backgroundColor = "var(--input-ok)"
            } else {
                btnCriarRef.disabled = true
                inputs[inputs.length - 1].classList.add('error')
                inputs[inputs.length - 1].style.backgroundColor = "var(--input-not-ok)"
            }
            
            if(formValidity.inputNome && formValidity.inputApelido && formValidity.inputEmail && formValidity.inputPassword && formValidity.inputPassword2) {
                btnCriarRef.disabled = false
            } else {
                btnCriarRef.disabled = true

            }
        })
    }
}

validate()

btnCriarRef.addEventListener('click', event => {
    event.preventDefault()
// OUTRO ROLÊ
    const users = {
        firstName: `${inputNomeRef.value}`,
        lastName: `${inputApelidoRef.value}`,
        email: `${inputEmailRef.value}`,
        password: `${inputSenhaRef.value}`
    }
    console.log(users)
    const requestHeaders = {'Content-Type': 'application/json' }
    const requestConfiguration = {
        method: 'POST',
        body: JSON.stringify(users),
        headers: requestHeaders
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users', requestConfiguration)
        .then(response => response.json()
            .then(data => {
                localStorage.setItem('token', data.jwt)
                window.location.href = './index.html'
            }
        )
    )
})