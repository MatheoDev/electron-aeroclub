document.getElementById('userConnected').textContent = localStorage.getItem('user')
document.getElementById('userConnected2').textContent = localStorage.getItem('user')

const logoutBtn = document.getElementById('logout')
const wrapper = document.getElementById('wrapper')

const avionsItem = document.getElementById('avions')
const forfaitsItem = document.getElementById('forfaits')
const instructeursItem = document.getElementById('instructeurs')
const membresItem = document.getElementById('membres')
const seqvolsItem = document.getElementById('seqvols')

let service = new APISerice()

function suppLine(num, type) {
    let myHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    fetch('http://localhost:8080/api/'+type+'/'+num, {method: 'DELETE', headers: myHeaders})
        .then(res => res.json())
        .then((res) => {
            console.log(res)
        })

    switch (type) {
        case 'avions':
            service.getAvions(true)
            break;

        case 'forfaits':
            service.getForfaits(true)
            break;
    
        default:
            break;
    }
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
    service.getAvions(true)
})

forfaitsItem.addEventListener('click', (e) => {
    avionsItem.classList.remove('active')
    forfaitsItem.classList.add('active')
    instructeursItem.classList.remove('active')
    membresItem.classList.remove('active')
    seqvolsItem.classList.remove('active')
    service.getForfaits(true)
})
