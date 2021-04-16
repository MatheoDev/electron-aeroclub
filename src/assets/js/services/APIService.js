class APISerice {
    constructor() {
        this.url = 'http://localhost:8080/api'
        let myHeaders = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        this.config = {
            method: 'GET',
            headers: myHeaders
        }
        this.jsonData = null
    }

    getAvions(write) {
        fetch(this.url+'/avions', this.config)
            .then(res => res.json())
            .then((json) => {
                if (write) {
                    let html = '<h3>Les avions</h3><a class="btn-new btn btn-info" href="form/_newAvion.html">Ajouter un avion</a><table class="table"><thead class="thead-dark"><tr><th scope="col">num</th><th scope="col">type</th><th scope="col">immat</th><th scope="col">action</th></tr></thead><tbody>'
                    json.forEach(element => {
                        html += '<tr><th scope="row">'+element.numAvion+'</th><td>'+
                        element.type+'</td><td>'+element.immatriculation+
                        '</td><td><i class="far fa-trash-alt action text-danger" id="trash" onclick="suppLine('+
                        element.numAvion+', \'avions\')"></i> <a href="form/_editAvion.html" class="far action fa-edit text-info" id="edit" onclick="majLine('+
                        element.numAvion+', \'avions\')"></a></td></tr>'
                    })
                    html += '</tbody></table>'
                    wrapper.innerHTML = html
                } else {
                    this.jsonData = json
                }
            })
    }

    getForfaits(write) {
        fetch(this.url+'/forfaits', this.config)
            .then(res => res.json())
            .then((json) => {
                if (write) {
                    let html = '<h3>Les forfaits</h3><a class="btn-new btn btn-info" href="form/_newForfait.html">Ajouter un forfait</a><table class="table"><thead class="thead-dark"><tr><th scope="col">id</th><th scope="col">libelle</th><th scope="col">heure</th><th scope="col">prix</th><th scope="col">action</th></tr></thead><tbody>'
                    json.forEach(element => {
                        html += '<tr><th scope="row">'+element.id+'</th><td>'+
                        element.libelle+'</td><td>'+element.heure+
                        '</td><td>'+element.prix+
                        '</td><td><i class="far fa-trash-alt action text-danger" id="trash" onclick="suppLine('+
                        element.id+', \'forfaits\')"></i> <i class="far action fa-edit text-info" id="edit" onclick="majLine('+
                        element.id+', \'forfaits\')"></i></td></tr>'
                    })
                    html += '</tbody></table>'
                    wrapper.innerHTML = html
                } else {
                    this.jsonData = json
                }
            })
    }

    getInstructeurs() {
        fetch(this.url+'/instructeurs', this.config)
            .then(res => res.json())
            .then((json) => {
                return json
            })
    }

    getMembres() {
        fetch(this.url+'/membres', this.config)
            .then(res => res.json())
            .then((json) => {
                return json
            })
    }

    getSeqvol() {
        fetch(this.url+'/???', this.config)
            .then(res => res.json())
            .then((json) => {
                return json
            })
    }
}