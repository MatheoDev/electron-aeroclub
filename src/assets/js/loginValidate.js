const email = document.getElementById('email')
const paswd = document.getElementById('password')
const loginBtn = document.getElementById('login')
const info = document.getElementById('info')
const suite = document.getElementById('suite')

loginBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let myHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    
    let json = { "username": email.value, "password": paswd.value }
    
    let config = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(json)
    }

    fetch('http://localhost:8080/api/login_check', config)
        .then(res => res.json())
        .then((json) => {
            if (json.token) {
                info.innerHTML = ''
                localStorage.setItem('token', json.token)
                localStorage.setItem('user', email.value)
                suite.innerHTML = '<a class="btn btn-secondary" id="continue" href="window/home.html">Acceder au backoffice</a>'
            } else {
                info.innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert">' + json.message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
            }
        })

})
