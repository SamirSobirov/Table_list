let form = document.forms.main
let nameInp = form.name
let ageInp = form.age
let table = document.querySelector('table')
let inps = document.querySelectorAll('input')
let modal = document.querySelector('.modal')
let closeBtns = document.querySelectorAll('.modal_close')
let newNameView = document.querySelector('.modal_content .curr.name')
let newAgeView = document.querySelector('.modal_content .curr.age')
let changeBtn = document.querySelector('.change button')
let nameChangeInp = document.querySelector('.change #name')
let ageChangeInp = document.querySelector('.change #age')
let changeInps = [ageChangeInp, nameChangeInp]
let arr = []
let changeID

form.onsubmit = (e) => {
    e.preventDefault()
    let fd = new FormData(form)
    let obj = { 'id': Math.random() }
    fd.forEach((key, value) => obj[value] = key)
    checkInps(inps)
    if (obj.name && obj.age !== '') {
        arr.push(obj)
        reload(arr, table)
        delBorder(inps)
    }
}
changeBtn.onclick = () => {
    let nameKey = nameChangeInp.value
    let ageKey = ageChangeInp.value
    let filtered = arr.find(el => el.id === changeID)
    if (nameKey !== "") {
        filtered.name = nameKey
        delBorder(changeInps)
        modalToggle()
        reload(arr, table)
        return
    } else if (ageKey !== "") {
        filtered.age = ageKey
        delBorder(changeInps)
        modalToggle()
        reload(arr, table)
        return
    }
    addBorder(changeInps)
}
closeBtns.forEach(el => {
    el.onclick = () => {
        changeInps.forEach(item => item.classList.remove('empty_input'))
        modalToggle()
    }
})

tableHeadCreate(table)



function reload(data, place) {
    place.innerHTML = ''
    tableHeadCreate(table)
    for (let item of data) {
        inps.forEach(el => {
            el.classList.remove('empty_input')
            el.value = ''
        })
        let tr = document.createElement('tr')
        let num = document.createElement('td')
        let name = document.createElement('td')
        let born = document.createElement('td')
        let edit = document.createElement('td')
        let del = document.createElement('td')
        let editImg = document.createElement('span')
        let delImg = document.createElement('span')

        editImg.classList.add('material-symbols-outlined')
        delImg.classList.add('material-symbols-outlined')

        editImg.innerHTML = 'edit_square'
        delImg.innerHTML = 'delete'
        num.innerHTML = data.indexOf(item) + 1
        name.innerHTML = item.name
        born.innerHTML = new Date().getFullYear() - +item.age

        tr.append(num, name, born, edit, del)
        edit.append(editImg)
        del.append(delImg)
        place.append(tr)

        del.onclick = () => {
            arr = arr.filter(el => el.id !== item.id)
            reload(arr, table)
        }
        edit.onclick = () => {
            newNameView.innerHTML = 'Name: ' + item.name
            newAgeView.innerHTML = 'Age: ' + item.age
            changeID = item.id
            modalToggle()
        }
    }
}
function tableHeadCreate(place) {
    let tr = document.createElement('tr')
    let No = document.createElement('th')
    let sName = document.createElement('th')
    let birth = document.createElement('th')
    let act = document.createElement('th')
    No.innerHTML = 'No'
    sName.innerHTML = 'Student name'
    birth.innerHTML = 'Year of birth'
    act.innerHTML = 'Actions'
    act.setAttribute('colspan', '2')
    tr.append(No, sName, birth, act)
    place.append(tr)
}
function modalToggle() {
    modal.classList.contains('modal_act') ? modal.classList.remove('modal_act') : modal.classList.add('modal_act')
}
function checkInps(arr) {
    arr.forEach(el => {
        if (el.value === '') {
            el.classList.add('empty_input')
        } else {
            el.classList.remove('empty_input')
        }
        el.onkeyup = () => {
            if (el.value === '') {
                el.classList.add('empty_input')
            } else {
                el.classList.remove('empty_input')
            }
        }
    })
}
function delBorder(arr) {
    arr.forEach(el => {
        el.classList.remove('empty_input')
        el.value = ''
    })
}
function addBorder(arr) {
    arr.forEach(el => el.classList.add('empty_input'))
}