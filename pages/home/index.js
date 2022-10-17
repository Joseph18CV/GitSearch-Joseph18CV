/* Desenvolva sua lógica aqui...*/
const inputUser = document.getElementById("input-user")
const buttonUser = document.getElementById("button-user")
const spanNotFound = document.querySelector(".user-not-found")
spanNotFound.style.visibility = "hidden"
let newArray = []

inputUser.addEventListener("keyup", () => {
    if(inputUser.value.length > 0){
        buttonUser.style.backgroundColor = "var(--color-brand-2)"
        buttonUser.style.color = "var(--color-grey-7)"
        spanNotFound.style.visibility = "hidden"
        inputUser.style.border = ""
    }else{
        buttonUser.style.backgroundColor = ""
        buttonUser.style.color = ""
        spanNotFound.style.visibility = "hidden"
        inputUser.style.border = ""
    }
})

buttonUser.addEventListener("click", () => {

    async function getUser(element) {

        const userAPI = await fetch(`https://api.github.com/users/${element}`)
        const user = await userAPI.json()

        if(user.message == "Not Found"){
            spanNotFound.style.visibility = "visible"
            inputUser.style.border = "1px solid var(--color-brand-1)"
        }else{

            buttonUser.innerText = ""
            buttonUser.innerHTML = `<span class="loading"></span>`
            setTimeout(() =>{
                window.location.href = `../profile/index.html?value=${inputUser.value}`
            }, 5000)

            if(newArray.length < 3){
                newArray.unshift(user)
                const userJSON = JSON.stringify(newArray)
                localStorage.setItem("user", userJSON)
            }else{
                newArray.pop()
                newArray.unshift(user)
                const userJSON = JSON.stringify(newArray)
                localStorage.setItem("user", userJSON)
            }

            setTimeout(() =>{
                const divLastUsers = document.querySelector(".last-users")
                divLastUsers.innerHTML = ""
                lastUsers()
            }, 5500)
        }
    }
    setTimeout(() => {
        getUser(inputUser.value)
    }, 0)
})

function listUsers () {
    const userItem = localStorage.getItem("user")
    if(!userItem){
        localStorage.setItem("user", newArray)
    }else{
        const users = JSON.parse(userItem)
        newArray = users
        lastUsers()
    }
}
listUsers()

function createLastUsers (img){
    const divLastUsers = document.querySelector(".last-users")
    let figure = document.createElement("figure")
        figure.classList.add("figure")
    let imgLast = document.createElement("img")
        imgLast.classList.add("img-last-users")
        imgLast.id = img.login
        imgLast.src = img.avatar_url
    let figcaption = document.createElement("figcaption")
        figcaption.innerText = "Acessar este perfil"
        // figcaption.style.display = "none"
        figure.append(imgLast, figcaption)

    divLastUsers.appendChild(figure)
}

function lastUsers (list){
    const userItem = localStorage.getItem("user")
    const users = JSON.parse(userItem)
    users.forEach((element) => {
        createLastUsers(element)
    })
}

const imgLast = document.querySelectorAll(".img-last-users")
      imgLast.forEach((element) => {
      element.addEventListener("click", (event) => {
            setTimeout(function(){
                window.location.href = `../profile/index.html?value=${event.target.id}`
            }, 1000)
         })
      })