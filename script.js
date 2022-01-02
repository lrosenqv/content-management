window.addEventListener('load', initPage)

// -- DOCUMENT BASE -- /
let root = document.getElementById("root")
let header = document.getElementById("siteHeader")
let main = document.getElementById("siteMain")
let footer = document.getElementById("siteFooter")
footer.innerHTML = "This is a footer"

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

let errorMsg = document.createElement("div")
errorMsg.id = "errorMsg"
errorMsg.innerText = "Wrong username or password"

loginForm.append(userNameInput, passwordInput, loginBtn)

// -- BOX THAT REPLACES LOGIN FORM WHEN LOGGED IN --/
let onlineBox = document.createElement("div")
onlineBox.id = "onlineBox"
onlineBox.insertAdjacentHTML("afterbegin", "<p>Logged in as admin</p>")

let logoutBtn = document.createElement("button")
logoutBtn.innerHTML = "Log out"
logoutBtn.id = "logoutBtn"

let viewToggle = document.createElement("button")
viewToggle.id = "viewToggle"

onlineBox.append(viewToggle, logoutBtn)

// -- CONTENT --/ 
let contentContainer = document.createElement("div")
contentContainer.id = "contentContainer"
let h1 = document.createElement("h1")
let p = document.createElement("p")

contentContainer.append(h1, p)

// -- CREATING EDIT CONTENT FORM ELEMENTS -- / 
let editContentContainer = document.createElement("div")
editContentContainer.id = "editContentContainer"
editContentContainer.innerHTML = "<h2>Change Content</h2>"

let newTitle = document.createElement("input")
newTitle.id = "newTitle"
newTitle.type = "text"

let newText = document.createElement("textarea")
newText.cols = 50
newText.rows = 10
newText.id = "newText"

let saveContentBtn = document.createElement("button")
saveContentBtn.innerText = "Save Content"
saveContentBtn.id = "saveContentBtn"

editContentContainer.append(newTitle, newText, saveContentBtn)

// -- CREATING EDIT THEME ETC. FORM ELEMENTS -- /
let editThemeContainer = document.createElement("div")
editThemeContainer.id = "editThemeContainer"
editThemeContainer.innerHTML = "<h2>Customize Theme</h2>"
  
let newTitleColour = document.createElement("input")
newTitleColour.className = "Coloris"

let newTextColour = document.createElement("input")
newTextColour.className = "Coloris"

let newAccentColour = document.createElement("input")
newAccentColour.className = "Coloris"

let newContrastColour = document.createElement("input")
newContrastColour.className = "Coloris"

let saveEditsBtn = document.createElement("button")
saveEditsBtn.innerText = "Save Edits"
saveEditsBtn.id = "saveEditsBtn"

let saveThemeBtn = document.createElement("button")
saveThemeBtn.innerText = "Save as Theme"
saveThemeBtn.id = "saveThemeBtn"

// -- DIV WITH SAVED THEMES TO CHOOSE FROM --/
let themesDiv = document.createElement("div")
themesDiv.id = "themesDiv"

let themeList = document.createElement("ul")
themeList.id = "themeList"

// -- Select-input fields for changing fonts -- /
let newFontTitle = document.createElement("select")
let newFontText = document.createElement("select")

// -- ARRAY WITH FONTS TO CHOOSE FROM --/
let fonts = [
    "Helvetica",
    "Arial",
    "Times New Roman",
    "Courier New"
]

// -- CREATING SELECT ELEMENTS FOR SELECTING FONT --/
fonts.forEach((font) => {
    let aFont = document.createElement("option")
    aFont.innerText = font
    newFontTitle.append(aFont)
})

fonts.forEach((font) => {
    let aFont = document.createElement("option")
    aFont.innerText = font
    newFontText.append(aFont)
})

// -- COLOR PICKER --/
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

editThemeContainer.append(newFontTitle, newTitleColour, newFontText, newTextColour, newAccentColour, newContrastColour, saveEditsBtn, saveThemeBtn, themesDiv)

    // -- Adding headers to theme editing-tools -- /
newFontTitle.insertAdjacentHTML("beforebegin", "<h3>Edit Title Font</h3>")
newTitle.insertAdjacentHTML("beforebegin", "<h3>Edit Title</h3>")
newFontText.insertAdjacentHTML("beforebegin", "<h3>Edit Text Font</h3>")
newText.insertAdjacentHTML("beforebegin", "<h3 id='newTextH3'>Edit Text</h3>")
newTitleColour.insertAdjacentHTML("beforebegin", "<h3>Title Colour</h3>")
newTextColour.insertAdjacentHTML("beforebegin", "<h3>Text Colour</h3>")
newAccentColour.insertAdjacentHTML("beforebegin", "<h3>Accent Colour</h3>")
newContrastColour.insertAdjacentHTML("beforebegin", "<h3>Accent-text Colour</h3>")

//-- Pop Up save new Theme --/
let saveThemeContainer = document.createElement("div")
saveThemeContainer.id = "saveThemeContainer"
saveThemeContainer.insertAdjacentHTML("afterbegin", "<h4>Add Theme Name</h4>")

let newThemeName = document.createElement("input")
newThemeName.id = "newThemeName"

let saveThemeBtn2 = document.createElement("button")
saveThemeBtn2.innerText = "Save Theme"
saveThemeBtn2.id = "saveThemeBtn2"

saveThemeContainer.append(newThemeName, saveThemeBtn2)

// ------------------------------------------------ CODE STARTS HERE ------------------------------------------------ /

// -- WHEN LOADING PAGE --/
function initPage() {
    checkTheme()
    let onlineUser = JSON.parse(localStorage.getItem("onlineUser"))
    let activeTheme = JSON.parse(localStorage.getItem("activeTheme"))
    renderTheme(activeTheme)
    
    if (onlineUser == null) {
        startPage()
        checkContent()

    } else {
        adminPage()
    }
} 

// -- Page for not logged in users --/ 
function startPage() {
    header.append(loginForm)
}

// -- CHECK FOR EXISTING CONTENT, IF NULL, SET PLACEHOLDER-TEXT

function checkContent(){
    let activeContent = JSON.parse(localStorage.getItem("activeContent"))

    if(activeContent == null) {
        let placeholderContent = {
            title: "Placeholder Header",
            text: "Placeholder Text"
        }
        localStorage.setItem("activeContent", JSON.stringify(placeholderContent))
    }
    renderContent(activeContent)
}

// -- CHECK FOR ACTIVE THEME, IF NULL, SET STANDARD THEME --/
async function checkTheme(){
    let activeTheme = JSON.parse(localStorage.getItem("activeTheme"))

    if(activeTheme == null) {
        let themes = await getThemes()

        let defaultTheme = themes.find(name => name.themeName == "standardTheme");
        localStorage.setItem("activeTheme", JSON.stringify(defaultTheme))
    }
}

// -- RENDER CONTENT ON SITE --/
function renderContent(content) {
    h1.innerText = content.title
    p.innerText = content.text
}

// -- RENDER THEME --/ 
function renderTheme(theme){
    h1.style.color = theme.titleColour;
    h1.style.fontFamily = theme.titleFont;
    p.style.color = theme.textColour;
    p.style.fontFamily = theme.textFont;
    header.style.backgroundColor = theme.accentColour;
    footer.style.backgroundColor = theme.accentColour;
    header.style.color = theme.contrastColour;
    footer.style.color = theme.contrastColour;
}

// -- SET THEMES OF JSON IN LS --/
async function getThemes(){
    let themesList = JSON.parse(localStorage.getItem("themes"))
    if(themesList == null){
        let themes = await fetchJSON("./json/themes.json")

        localStorage.setItem("themes", JSON.stringify(themes))
    }
    return themesList
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
// -- CLEAR ERROR MESSAGE WHEN LOGIN DETAILS IS INCORRECT --/
function clearErrorMsg(){
    errorMsg.remove()
}

// -- LOG IN & USER VALIDATION --/
loginBtn.addEventListener('click', validateUser)
function validateUser() {
    let userList = getUsersFromLS();
    let userInput = userNameInput.value;
    let passInput = passwordInput.value;
    let userOk = userList.find(userList => userList.username == userInput);
    let passwordOk = userList.find(userList => userList.password == passInput);
    let timeout;

    if(!userOk || !passwordOk) {
        header.append(errorMsg)
        timeout = setTimeout(clearErrorMsg, 2000)
    }

    if(userOk && passwordOk){
        let onlineUser = {username: userInput, status: "online" }
        localStorage.setItem("onlineUser", JSON.stringify(onlineUser))
        adminPage()
    } 
}

// -- ADMIN VIEW --/
function adminView(){
    let currentValues = JSON.parse(localStorage.getItem("activeContent"))
    let currentTheme = JSON.parse(localStorage.getItem("activeTheme"))
    themeList.innerHTML = ""

    newTitle.value = currentValues.title
    newText.value = currentValues.text

    newFontTitle.value = currentTheme.titleFont
    newTitleColour.value = currentTheme.titleColour
    newFontText.value = currentTheme.textFont
    newTextColour.value = currentTheme.textColour
    newAccentColour.value = currentTheme.accentColour
    newContrastColour.value = currentTheme.contrastColour

    themesList()

    saveEditsBtn.addEventListener("click", () => {
        let themeChanges = {
            themeName: "customTheme",
            titleFont: newFontTitle.value,
            titleColour: newTitleColour.value,
            textFont: newFontText.value,
            textColour: newTextColour.value,
            accentColour: newAccentColour.value,
            contrastColour: newContrastColour.value
        }

        let contentChanges = {
            title: newTitle.value,
            text: newText.value
        }
        localStorage.setItem("activeTheme", JSON.stringify(themeChanges))
        renderTheme(themeChanges)

        localStorage.setItem("activeContent", JSON.stringify(contentChanges))
    })

    saveThemeBtn.addEventListener("click", openSaveThemeContainer)
    main.append(editContentContainer, editThemeContainer, themesDiv)
    contentContainer.remove()

    viewToggle.innerText = "User View"
    viewToggle.addEventListener("click", userView)
}

// -- Page for logged in users -- /
function adminPage() {
    header.append(onlineBox)
    viewToggle.innerText = "User View"
    adminView()
}

function openSaveThemeContainer(){
    saveThemeBtn2.addEventListener("click", saveTheme)
    editContentContainer.append(saveThemeContainer)
}

function saveTheme(){
    let collectedThemes = JSON.parse(localStorage.getItem("themes"))

    let lastItem = collectedThemes[collectedThemes.length - 1]
    let newID = lastItem.themeID + 1

    let newTheme = {
        themeID: newID,
        themeName: getValue(newThemeName),
        titleColour: getValue(newTitleColour),
        textColour: getValue(newTextColour),
        accentColour: getValue(newAccentColour),
        contrastColour: getValue(newContrastColour),
        titleFont:getValue(newFontTitle),
        textFont: getValue(newFontTitle)
    }
    
    collectedThemes.push(newTheme)
    localStorage.setItem("themes", JSON.stringify(collectedThemes))
    themeList.innerHTML = ""
    themesList()
    renderTheme(newTheme)
}

saveContentBtn.addEventListener("click", () => {
    let newContent = {
        title: getValue(newTitle),
        text: getValue(newText)
    }
    localStorage.setItem("activeContent", JSON.stringify(newContent))
    checkContent()
})

// -- VIEW TO SHOW ALL THEME AND CONTENT EDITS --/
function userView(){
    editContentContainer.remove()
    editThemeContainer.remove()

    checkContent()

    viewToggle.innerText = "Admin View"
    viewToggle.removeEventListener("click", userView)
    viewToggle.addEventListener("click", adminView)

    main.append(contentContainer)
}

// -- GET VALUES FROM INPUT FIELDS --/
function getValue(input){
    return input.value
}

// -- LIST OF PRESET & SAVED THEMES --/
function themesList(){
    let existingThemes = JSON.parse(localStorage.getItem("themes"))
    
    existingThemes.forEach((theme, index) => {
        let themeItem = document.createElement("li")
        themeItem.id = theme.themeID
        themeItem.innerText = theme.themeName

        let deleteThemeBtn = document.createElement("button")
        deleteThemeBtn.innerText = "X"

        let swatch = document.createElement("div")
        swatch.id = "colorSwatch"
        swatch.style.backgroundColor = theme.accentColour

        themeItem.append(swatch, deleteThemeBtn)
        themeList.append(themeItem)

        deleteThemeBtn.addEventListener("click", () => {
            existingThemes.splice(index, 1)
            localStorage.setItem("themes", JSON.stringify(existingThemes))
        })
    })

    themeList.addEventListener("click", (evt) => {
        existingThemes.find((theme) => {

            if(evt.target.id == theme.themeID){
                renderTheme(theme)
                location.reload()
                localStorage.setItem("activeTheme", JSON.stringify(theme))
            }
        })
        console.log(evt.target.id);
    })

    themesDiv.innerHTML = "<h2>Choose an existing theme</h2>"
    themesDiv.append(themeList)
}

// -- LOG OUT  --/ 
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
    location.reload()
})

// Arrays och logg till localStorage
let mocklist = [
    {username : "admin", password : "admin"},
]
localStorage.setItem("userList", JSON.stringify(mocklist))



// -- FETCH JSON --//
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
