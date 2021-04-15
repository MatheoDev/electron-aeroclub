document.getElementById('userConnected').textContent = localStorage.getItem('user')

const logoutBtn = document.getElementById('logout')
const wrapper = document.getElementById('wrapper')

const avionsItem = document.getElementById('avions')
const forfaitsItem = document.getElementById('forfaits')
const instructeursItem = document.getElementById('instructeurs')
const membresItem = document.getElementById('membres')
const seqvolsItem = document.getElementById('seqvols')

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
    }

    getAvions() {
        fetch(this.url+'/avions', this.config)
            .then(res => res.json())
            .then((json) => {
                let html = '<h3>Les avions</h3><table class="table"><thead class="thead-dark"><tr><th scope="col">num</th><th scope="col">type</th><th scope="col">immat</th><th scope="col">action</th></tr></thead><tbody>'
                json.forEach(element => {
                    html += '<tr><th scope="row">'+element.numAvion+'</th><td>'+
                    element.type+'</td><td>'+element.immatriculation+
                    '</td><td><i class="far fa-trash-alt action text-danger" id="trash" onclick="suppLine('+
                    element.numAvion+', \'avions\')"></i> <i class="far action fa-edit text-info" id="edit" onclick="majLine('+
                    element.numAvion+')"></i></td></tr>'
                })
                html += '</tbody></table>'
                wrapper.innerHTML = html
            })
    }

    getForfaits() {
        fetch(this.url+'/forfaits', this.config)
            .then(res => res.json())
            .then((json) => {
                return json
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

let service = new APISerice()

function suppLine(num, type) {
    let myHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    fetch('http://localhost:8080/api/'+type+'/'+num, {method: 'DELETE', headers: myHeaders})
        .then(res => res.json()) // or res.json()
        .then((res) => {
            console.log(res)
        })

    
    service.getAvions()
}

function majLine(el) {
    console.log(el)
}

const makePage = (tab) => {
    tab.forEach(element => {
        console.log(element)
    });
}

logoutBtn.addEventListener('click', (e) => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
})

avionsItem.addEventListener('click', (e) => {
    avionsItem.classList.add('active')
    forfaitsItem.classList.remove('active')
    instructeursItem.classList.remove('active')
    membresItem.classList.remove('active')
    seqvolsItem.classList.remove('active')
    let avions = service.getAvions()
})
