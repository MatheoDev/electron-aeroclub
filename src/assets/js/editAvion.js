const back = document.getElementById('back')
const update = document.getElementById('update')
const info = document.getElementById('infoC')

let num = localStorage.getItem('editNum')

let myHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json",
}

let config = {
    method: 'GET',
    headers: myHeaders,
}

fetch('http://localhost:8080/api/avions/'+num, config)
    .then(res => res.json())
    .then((json) => {
        document.getElementById('type').value = json.type
        document.getElementById('immat').value = json.immatriculation
    })

update.addEventListener('click', (e) => {
    e.preventDefault()
    let valueType = document.getElementById('type').value
    let valueImmat = document.getElementById('immat').value

    if (valueImmat === '' || valueType === '') {
        info.innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert">Un des deux champs ne sont pas remplis.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
    } else {
        let myHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        let json = { "type": valueType, "immatriculation": valueImmat }
    
        let config = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(json)
        }

        fetch('http://localhost:8080/api/avions/'+num, config)
        .then(res => res.json())
        .then((json) => {
            if (json.immatriculation === valueImmat) {
                info.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">Avion mis à jour avec succès.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
            }
        })
    }
})

back.addEventListener('click', (e) => {
    localStorage.removeItem('editNum')
})