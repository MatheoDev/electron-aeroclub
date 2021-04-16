const btnCreate = document.getElementById('create')
const info = document.getElementById('infoC')

btnCreate.addEventListener('click', (e) => {
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
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(json)
        }

        fetch('http://localhost:8080/api/avions', config)
        .then(res => res.json())
        .then((json) => {
            if (json.immatriculation === valueImmat) {
                document.getElementById('immat').value = ''
                document.getElementById('type').value = ''
                info.innerHTML = '<div class="alert alert-success alert-dismissible fade show" role="alert">Avion ajouté avec succès.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
            }
        })
    }
})
