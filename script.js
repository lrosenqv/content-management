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

let viewToggle = document.createElement("button")
viewToggle.id = "viewToggle"

onlineBox.append(boxP, viewToggle, logoutBtn)


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

function renderContent() {
    let activeContent = JSON.parse(localStorage.getItem("activeContent"))

    if(activeContent.title == "") {
        let placeholderContent = {
            title: "PlaceHolder Header",
            text: activeContent.text
        }
        localStorage.setItem("activeContent", JSON.stringify(placeholderContent))
    }

    if(activeContent.text == "") {
        let placeholderContent = {
            title: activeContent.title,
            text: "PlaceHolder Text"
        }
        localStorage.setItem("activeContent", JSON.stringify(placeholderContent))
    }

    h1.innerText = activeContent.title
    p.innerText = activeContent.text

    main.append(contentContainer)
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
        adminPage()

    } else {
        loginForm.insertAdjacentText("afterend", "Username or password is incorrect")
        console.log("helt fel hallå");
    }
}

// -- Page for logged in users -- /
function adminPage() {
    header.append(onlineBox)
    boxP.innerHTML = "You are now in admin mode"
    viewToggle.innerText = "User View"
    adminView()
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
let editContentContainer = document.createElement("div")
editContentContainer.id = "editSiteContainer"
editContentContainer.innerHTML = "<h2>Change Content</h2>"

let editThemeContainer = document.createElement("div")
editThemeContainer.id = "editThemeContainer"
editThemeContainer.innerHTML = "<h2>Customize Theme</h2>"

let themesDiv = document.createElement("div")
themesDiv.id = "themesDiv"

let newTitle = document.createElement("input")
newTitle.id = "newTitle"
newTitle.type = "text"

let newText = document.createElement("input")
  
let newTitleColour = document.createElement("input")
newTitleColour.className = "Coloris"

let newTextColour = document.createElement("input")
newTextColour.className = "Coloris"

let newAccentColour = document.createElement("input")
newAccentColour.className = "Coloris"

let newContrastColour = document.createElement("input")
newContrastColour.className = "Coloris"

let saveBtn = document.createElement("button")
saveBtn.innerText = "Save Changes"

editContentContainer.append(newTitle, newText)
editThemeContainer.append(newTitleColour, newTextColour, newAccentColour, newContrastColour, saveBtn)

newTitle.insertAdjacentHTML("beforebegin", "<h3>Edit Title</h3>")
newText.insertAdjacentHTML("beforebegin", "<h3>Edit Text Text</h3>")
newTitleColour.insertAdjacentHTML("beforebegin", "<h3>Title Colour</h3>")
newTextColour.insertAdjacentHTML("beforebegin", "<h3>Text Colour</h3>")
newAccentColour.insertAdjacentHTML("beforebegin", "<h3>Accent Colour</h3>")
newContrastColour.insertAdjacentHTML("beforebegin", "<h3>Accent-text Colour</h3>")

// -- ADMIN VIEW --/
function adminView(){
    let currentValues = JSON.parse(localStorage.getItem("activeContent"))
    let currentTheme = JSON.parse(localStorage.getItem("activeTheme"))

    newTitle.value = currentValues.title
    newText.value = currentValues.text
    newTitleColour.value = currentTheme.titleColour
    newTextColour.value = currentTheme.textColour
    newAccentColour.value = currentTheme.accentColour
    newContrastColour.value = currentTheme.accentTextColour

    themesList()

    saveBtn.addEventListener("click", () => {
        let themeChanges = {
            themeName: "customTheme",
            backgroundColour: "white",
            titleColour: newTitleColour.value,
            textColour: newTextColour.value,
            accentColour: newAccentColour.value,
            accentTextColour: newContrastColour.value
        }

        let contentChanges = {
            title: newTitle.value,
            text: newText.value
        }
        localStorage.setItem("activeTheme", JSON.stringify(themeChanges))
        setTheme(themeChanges)
        localStorage.setItem("activeContent", JSON.stringify(contentChanges))
    })

    // -- Change font for title -- /
    /*let newFontTitle = document.createElement("select")
    let newFontText = document.createElement("select")

    fonts.forEach((font) => {
        let aFont = document.createElement("option")
        aFont.innerText = font
        newFontText.append(aFont)
    })*/
    main.append(editContentContainer, editThemeContainer)
    contentContainer.remove()

    viewToggle.innerText = "User View"
    viewToggle.addEventListener("click", userView)
}

function userView(){
    editContentContainer.remove()
    editThemeContainer.remove()

    h1.innerHTML = getValue(newTitle)
    h1.style.color = getValue(newTitleColour)
    p.innerHTML = getValue(newText)
    p.style.color = getValue(newTextColour)

    header.style.backgroundColor = getValue(newAccentColour)
    footer.style.backgroundColor = getValue(newAccentColour)
    header.style.color = getValue(newContrastColour)
    footer.style.color = getValue(newContrastColour)

    viewToggle.innerText = "Admin View"
    viewToggle.removeEventListener("click", userView)
    viewToggle.addEventListener("click", adminView)

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
    })

    themeList.addEventListener("click", (evt) => {
        existingThemes.find((theme) => {

            if(evt.target.id == theme.themeID){
                setTheme(theme)
                location.reload()
                localStorage.setItem("activeTheme", JSON.stringify(theme))
            }
        })
        console.log(evt.target.id);
    })
    themesDiv.innerHTML = "<h2>Choose an existing theme</h2>"
    themesDiv.append(themeList)
    main.append(themesDiv)
}

let fonts = [
    "Helvetica",
    "Arial",
    "Times New Roman",
    "Courier New"
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

/*let themes = 

localStorage.setItem("themes", JSON.stringify(themes))*/

function setTheme(theme){
    h1.style.color = theme.titleColour;
    p.style.color = theme.textColour;
    header.style.backgroundColor = theme.accentColour;
    footer.style.backgroundColor = theme.accentColour;
    header.style.color = theme.accentTextColour;
    footer.style.color = theme.accentTextColour;
}


async function fetchJSON(url){
    try{
        let response = await fetch(url)
        console.log(response)
        let result = response.json()
        console.log(result);
        return result
    } catch(err){
        console.error(err)
    }
}

let testBtn = document.createElement("button")
testBtn.innerText = "testknapp"

let testInput = document.createElement("input")
testInput.type = "text"

footer.append(testBtn, testInput)

async function test() {
    let themesT = await fetchJSON("./json/themes.json")
    console.log(themesT)

    testBtn.addEventListener("click", () => {
        let hej = getValue(testInput)
        console.log(hej);

        /*let themeChangesT = {
            "hej": testInput.value
        }
        console.log("klick", themeChangesT)
        themesT.push(themeChangesT)
        console.log(themesT)*/
    })

    
}

test()

function getValue(input){
    return input.value
}
