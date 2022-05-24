let inputEmailReq = document.querySelector('#inputEmail')
let inputPasswordReq = document.querySelector('#inputPassword')
let btnSubmitRef = document.querySelector('button')
const inputs  = document.querySelectorAll('[required]')
// const spans = document.querySelectorAll('[required] ~ span')
let formValidity = {
    inputEmail: false,
    inputPassword: false
}
const validate = () => {
    for(let input of inputs) {
        input.addEventListener('keyup', () => {// Evento de keyup para cada elemento input
            input.value.trim()
            formValidity[input.id] = input.checkValidity()
            console.log(input.checkValidity())
            if(input.checkValidity()) {
                input.classList.remove('error')
                input.classList.add('not-error')
                input.style.backgroundColor = "var(--input-ok)"
            } else {
                btnSubmitRef.disabled = true
                input.classList.add('error')
                input.style.backgroundColor = "var(--input-not-ok)"
            }

            if(formValidity.inputEmail && formValidity.inputPassword) {
                btnSubmitRef.disabled = false
            } else {
                btnSubmitRef.disabled = true

            }
        })
    }
}
validate()
btnSubmitRef.addEventListener('click', event => {
    event.preventDefault()
    //**************************************OUTRO ROLÊ*******************************************//
    let credentials = {
        email: `${inputEmailReq.value}`,
        password: `${inputPasswordReq.value}`
    }
    let requestHeaders = {
        'Content-Type': 'application/json'
    }
    let requestConfiguration = {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(credentials)
    }

    fetch('https://ctd-todo-api.herokuapp.com/v1/users/login', requestConfiguration).then(
        response => {
            if(response.ok){
                response.json().then(
                    data => {
                        console.log(data)
    
                        localStorage.setItem('token', data.jwt)
                        window.location.href = './memory.html'
    
                    }
    
                )
            } else {
                alert('Usuario ou senha inexistente')// Substituir por div
            }

        }
    )

})
