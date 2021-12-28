// -- DOCUMENT BASE -- /
let root = document.getElementById("root")
let header = document.createElement("header")
let main = document.createElement("main")
let footer = document.createElement("footer")
footer.innerHTML = "This is a footer"

root.append(header, main, footer)

// -- LOGIN FORM --/
let loginForm = document.createElement("form")
loginForm.id = "loginForm"

let userNameInput = document.createElement ("input")
userNameInput.placeholder = "Username"
userNameInput.type = "text"
userNameInput.required = true

let passwordInput = document.createElement ("input")
passwordInput.placeholder = "Password"
passwordInput.type = "password"
passwordInput.required = true

let loginBtn = document.createElement ("button")
loginBtn.innerHTML = "Log In"
loginBtn.id = "loginBtn"

loginForm.append(userNameInput, passwordInput, loginBtn)

// -- ONLINE BOX --/
let onlineBox = document.createElement("div")
onlineBox.id = "onlineBox"

let boxP = document.createElement("p")

let logoutBtn = document.createElement("button")
logoutBtn.innerHTML = "Log out"
logoutBtn.id = "logoutBtn"

let viewToggle = document.createElement("input")
viewToggle.type = "checkbox"
viewToggle.id = "viewToggle"

let viewLabel = document.createElement("label")
viewLabel.htmlFor = "viewToggle"
viewLabel.innerText = "User View"

onlineBox.append(viewLabel, viewToggle, boxP, logoutBtn)


// -- CONTENT --/ 
let contentContainer = document.createElement("div")
contentContainer.id = "contentContainer"
let h1 = document.createElement("h1")
let p = document.createElement("p")
contentContainer.append(h1, p)

window.addEventListener('load', initPage)

let onlineUser = []

// -- WHEN LOADING PAGE --/
function initPage() {
    let onlineUser = JSON.parse(localStorage.getItem("onlineUser"))
    let activeTheme = JSON.parse(localStorage.getItem("activeTheme"))
    setTheme(activeTheme)

    if (onlineUser == null) {
        startPage()
        renderContent()

    } else {
        adminPage()
    }
} 

// -- Page for not logged in users --/ 
function startPage() {
    header.append(loginForm)
}

let content = {
    title: "PlaceHolder Header",
    text: "This is some placeholder text lorem ipsum yada yada yada.."
}

localStorage.setItem("activeContent", JSON.stringify(content))

function renderContent() {
    let activeContent = JSON.parse(localStorage.getItem("activeContent"))
    h1.innerText = activeContent.title
    p.innerText = activeContent.text
    //main.append(contentContainer)
}

// -- GET STUFF FROM LOCAL STORAGE --/
function getUsersFromLS() {
    let collectedUserList = localStorage.getItem("userList");
    let userList = []

    if(collectedUserList) {
        userList = JSON.parse(collectedUserList);
        return userList
    }
}

// -- LOG IN & USER VALIDATION --/
loginBtn.addEventListener('click', validateUser)
function validateUser() {
    let userList = getUsersFromLS();
    let userInput = userNameInput.value;
    let passInput = passwordInput.value;
    let userOk = userList.find(userList => userList.username == userInput);
    let passwordOk = userList.find(userList => userList.password == passInput);
    let validUser = userOk && passwordOk;

    if(validUser) {
        let onlineUser = {username: userInput, status: "online" }
        localStorage.setItem("onlineUser", JSON.stringify(onlineUser))
        renderView()

    } else {
        loginForm.insertAdjacentText("afterend", "Username or password is incorrect")
        console.log("helt fel hallå");
    }
}

// -- Page for logged in users -- /
function adminPage() {
    header.append(onlineBox)
    boxP.innerHTML = "You are now in admin mode"
    renderView()
}

viewToggle.addEventListener("change", renderView)

// -- USER VIEW --/
function renderView(){
    if(viewToggle.checked == false){
        adminView()
    } else {
        userView()
    }
}


Coloris({
    swatches: [
      '#264653',
      '#2a9d8f',
      '#e9c46a',
      '#f4a261',
      '#e76f51',
      '#d62828',
      '#023e8a',
      '#0077b6',
      '#0096c7',
      '#00b4d8',
      '#48cae4',
    ]
  });

  Coloris({
    format: 'hex',
  });

  Coloris({
    el: '.Coloris'
  });

  // -- EDIT SETTINGS -- / 
let editSiteContainer = document.createElement("div")
editSiteContainer.id = "editSiteContainer"
editSiteContainer.innerHTML = "<h2>Customize theme</h2>"

/*let newBackground = document.createElement("select")
newBackground.className = "Coloris"*/

let newTitle = document.createElement("input")
newTitle.type = "text"

let newText = document.createElement("input")
  
let newTitleColour = document.createElement("input")
newTitleColour.className = "Coloris"

let newTextColour = document.createElement("input")
newTextColour.className = "Coloris"

let saveBtn = document.createElement("button")
saveBtn.innerText = "Save Changes"

let newAccentColour = document.createElement("input")
newAccentColour.className = "Coloris"

let newContrastColour = document.createElement("input")
newContrastColour.className = "Coloris"

let themesDiv = document.createElement("div")

editSiteContainer.append(newTitle, newText, newTitleColour, newTextColour, newAccentColour, newContrastColour, saveBtn)

// -- ADMIN VIEW --/
function adminView(){
    themesList()
    let currentValues = JSON.parse(localStorage.getItem("activeContent"))
    let currentTheme = JSON.parse(localStorage.getItem("activeTheme"))
    newTitle.value = currentValues.title
    newText.value = currentValues.text
    newTitleColour.value = currentTheme.titleColour
    newTextColour.value = currentTheme.textColour
    newAccentColour.value = currentTheme.accentColour
    newContrastColour.value = currentTheme.accentTextColour

    saveBtn.addEventListener("click", () => {
        let changes = {
            themeName: "customTheme",
            backgroundColour: "white",
            titleColour: newTitleColour.value,
            textColour: newTextColour.value,
            accentColour: newAccentColour.value,
            accentTextColour: newContrastColour.value
        }
        localStorage.setItem("activeTheme", JSON.stringify(changes))
        setTheme(changes)
    })

    // -- Change font for title -- /
    /*let newFontTitle = document.createElement("select")
    let newFontText = document.createElement("select")

    fonts.forEach((font) => {
        let aFont = document.createElement("option")
        aFont.innerText = font
        newFontText.append(aFont)
    })*/
    main.append(editSiteContainer)
    main.removeChild(contentContainer)
}

function userView(){
    main.removeChild(editSiteContainer)
    h1.innerHTML = newTitle.value
    h1.style.color = newTitleColour.value
    p.innerHTML = newText.value
    p.style.color = newTextColour.value

    header.style.backgroundColor = newAccentColour.value
    footer.style.backgroundColor = newAccentColour.value
    header.style.color = newContrastColour.value
    footer.style.color = newContrastColour.value

    main.append(contentContainer)
}

function themesList(){
    let existingThemes = JSON.parse(localStorage.getItem("themes"))
    let themeList = document.createElement("ul")
    
    existingThemes.forEach((theme) => {
        let themeListTemplate = `
        <li id="${theme.themeID}">
        ${theme.themeName}
        <div id="colorSwatch" style="background-color:${theme.accentColour}"></div>
        </li>
        `

        themeList.insertAdjacentHTML("beforeend", themeListTemplate)

        themeList.addEventListener("click", (evt) => {
            existingThemes.find((theme) => {

                if(evt.target.id == theme.themeID){
                    setTheme(theme)
                    localStorage.setItem("activeTheme", JSON.stringify(theme))
                }
            })
        })
    })
    themesDiv.innerHTML = "<h2>Choose an existing theme</h2>"
    themesDiv.append(themeList)
    editSiteContainer.append(themesDiv)
}


let fonts = [
    "Helvetica",
    "Arial",
    "Times New Roman",
]


// -- LOG OUT  --/ 
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
    location.reload()
})


// Arrays och logg till localStorage
let userList = []

let mocklist = [
    {username : "admin", password : "admin"},
]
localStorage.setItem("userList", JSON.stringify(mocklist))

let themes = [
    {
    themeID: 0, 
    themeName: "standardTheme",
    backgroundColour: "white",
    titleColour: "black",
    textColour: "black",
    accentColour: "thistle",
    accentTextColour: "white"
    },
    {
    themeID: 1, 
    themeName: "darkTheme",
    backgroundColour: "black",
    titleColour: "black",
    textColour: "black",
    accentColour: "black",
    accentTextColour: "white"
    },
    {
    themeID: 2, 
    themeName: "lightTheme",
    backgroundColour: "white",
    titleColour: "black",
    textColour: "black",
    accentColour: "lightsteelblue",
    accentTextColour: "black"
    },
    {
    themeID: 3, 
    themeName: "vibrantTheme",
    backgroundColour: "cornflowerblue",
    titleColour: "black",
    textColour: "black",
    accentColour: "pink",
    accentTextColour: "black"
    },
    {
    themeID: 4, 
    themeName: "purpleTheme",
    backgroundColour: "purple",
    titleColour: "black",
    textColour: "black",
    accentColour: "rgb(167, 145, 216)",
    accentTextColour: "white"
    },
]

localStorage.setItem("themes", JSON.stringify(themes))

function setTheme(theme){
    h1.style.color = theme.titleColour;
    p.style.color = theme.textColour;
    header.style.backgroundColor = theme.accentColour;
    footer.style.backgroundColor = theme.accentColour;
    header.style.color = theme.accentTextColour;
    footer.style.color = theme.accentTextColour;
}

/*function renderTheme(){
    let activeTheme = localStorage.getItem("activeTheme")
    h1.style.color = activeTheme.titleColour;
    p.style.color = activeTheme.textColour;
    header.style.backgroundColor = activeTheme.accentColour;
    footer.style.backgroundColor = activeTheme.accentColour;
    header.style.color = activeTheme.accentTextColour;
    footer.style.color = activeTheme.accentTextColour;
}*/

/*function changeContent(thing) {
    let newContent = {
        title: thing.value,
        text: thing.value
    }
    localStorage.setItem("activeContent", JSON.stringify(newContent))
}*/
