/* Desenvolva sua lógica aqui...*/
const inputUser = document.getElementById("input-user")
const divHeader = document.querySelector(".header")
const ulAPI = document.querySelector(".ul-API")

function createProfileHeader (list) {

    let div = document.createElement("div")
        div.classList.add("div-header")
    let div4 = document.createElement("div")
        div4.classList.add("div-img-div2")
    let img = document.createElement("img")
        img.src = list.avatar_url
        img.id = list.login
    let div2 = document.createElement("div")
        div2.classList.add("div-name")
    let h3 = document.createElement("h3")
        h3.innerText = list.login
    let p = document.createElement("p")
        p.innerText = list.bio
    let div3 = document.createElement("div")
        div3.classList.add("div-buttons")
    let email = document.createElement("a")
        email.classList.add("email")
        email.href = list.email
        email.target = "_blank"
        email.innerText = "Email"
    let changeUser = document.createElement("a")
        changeUser.classList.add("change-user")
        changeUser.href = "../home/index.html"
        changeUser.innerText = "Trocar de usuário"

    div4.append(img, div2)
    div2.append(h3, p)
    div3.append(email, changeUser)
    div.append(div4, div3)

    ulAPI.appendChild(div)

}

function ulCardsRepository (list) {
    
    list.map((element) => {
        let li = document.createElement("li")
            li.classList.add("card")
        let div = document.createElement("div")
            div.classList.add("name-description")
        let h3 = document.createElement("h3")
            h3.innerText = element.name
        let p = document.createElement("p")
            p.innerText = element.description
        let divRep = document.createElement("div")
            divRep.classList.add("div-rep")
        let rep = document.createElement("a")
            rep.classList.add("rep")
            rep.innerText = "Repositório"
            rep.href = element.html_url
            rep.target = "_blank"
        let demo = document.createElement("a")
            demo.classList.add("demo")
            demo.innerText = "Demo"
            demo.href = element.homepage
            demo.target = "_blank"

        div.append(h3, p)
        divRep.append(rep, demo)
        li.append(div, divRep)
        ulAPI.appendChild(li)
    })
}

const urlParams = new URLSearchParams(window.location.search)
const params = urlParams.get("value")

async function apiValueProfile (value) {
    const userApiProfile = await getAPI(`https://api.github.com/users/${value}`)
    const userApiRepository = await getAPI(`https://api.github.com/users/${value}/repos`)

    createProfileHeader(userApiProfile)
    ulCardsRepository(userApiRepository)
}
apiValueProfile(params)