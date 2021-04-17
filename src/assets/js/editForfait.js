const back = document.getElementById('back')
const update = document.getElementById('update')
const info = document.getElementById('infoC')

let num = localStorage.getItem('editNum')

let myHeaders = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}
let config = {
    method: 'GET',
    headers: myHeaders
}
function creationLine() {
    fetch('http://localhost:8080/api/avions', config)
        .then(res => res.json())
        .then((json) => {
            let html = ''
            json.forEach(element => {
                html += '<div class="form-check form-check-inline"><input class="form-check-input avionSelect" type="checkbox" id="avion'+element.numAvion+'" value="'+
                element.numAvion+'"><label class="form-check-label" for="avion'+element.numAvion+'">'+element.immatriculation+'</label></div>'
            })
            document.getElementById('avions').innerHTML = html
                    
            checkAvion()
        })
}

function checkAvion() {
    fetch('http://localhost:8080/api/forfaits/'+num, config)
        .then(res => res.json())
        .then((json) => {
            document.getElementById('libelle').value = json.libelle
            document.getElementById('heure').value = json.heure
            document.getElementById('prix').value = json.prix
            const avionSelect = document.getElementsByClassName('avionSelect')
            json.numAvion.forEach(element => {
                for (let i = 0; i < avionSelect.length; i++) {
                    if (avionSelect[i].value === element.substring(12)) {
                        avionSelect[i].checked = true
                    }
                }
            });
        })
}

creationLine()

update.addEventListener('click', (e) => {
    e.preventDefault()
    const avionSelect = document.getElementsByClassName('avionSelect')
    const valueLibelle = document.getElementById('libelle').value
    const valueHeure = parseInt(document.getElementById('heure').value, 10)
    const valuePrix = parseInt(document.getElementById('prix').value, 10)

    let avForfait = []
    for (let i = 0; i < avionSelect.length; i++) {
        const element = avionSelect[i];
        if (element.checked) {
            avForfait.push('/api/avions/'+element.value)
        }
    }
    
    if (valueLibelle === '' || valueHeure === '' || valuePrix === '') {
        infoC.innerHTML = '<div class="alert alert-warning alert-dismissible fade show" role="alert">Un des champs n\'est pas remplis.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
    } else {
        let myHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

        let json = { "libelle": valueLibelle, "heure": valueHeure, "prix": valuePrix, "numAvion": avForfait }
    
        let config = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(json)
        }

        fetch('http://localhost:8080/api/forfaits/'+num, config)
        .then(res => res.json())
        .then((json) => {
            if (json.libelle) {
                infoC.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">Forfait mis à jour avec succès.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
            }
        })
    }
})

back.addEventListener('click', (e) => {
    localStorage.removeItem('editNum')
})