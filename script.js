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

let newBgColour = document.createElement("input")
newBgColour.className = "Coloris"

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

editThemeContainer.append(newFontTitle, newTitleColour, newFontText, newTextColour, newBgColour, newAccentColour, newContrastColour, saveEditsBtn, saveThemeBtn, themesDiv)

    // -- Adding headers to theme editing-tools -- /
newText.insertAdjacentHTML("beforebegin", "<h3 id='newTextH3'>Edit Text</h3>")
newTitle.insertAdjacentHTML("beforebegin", "<h3>Edit Title</h3>")

newFontTitle.insertAdjacentHTML("beforebegin", "<h3>Edit Title Font</h3>")
newTitleColour.insertAdjacentHTML("beforebegin", "<h3>Title Colour</h3>")
newFontText.insertAdjacentHTML("beforebegin", "<h3>Edit Text Font</h3>")
newTextColour.insertAdjacentHTML("beforebegin", "<h3>Text Colour</h3>")
newBgColour.insertAdjacentHTML("beforebegin", "<h3>Background Colour</h3>")
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

let cancelBtn = document.createElement("button")
cancelBtn.innerText = "Cancel"
cancelBtn.id = "cancelBtn"

saveThemeContainer.append(newThemeName, saveThemeBtn2, cancelBtn)

// ------------------------------------------------ CODE STARTS HERE ------------------------------------------------ /
// -- WHEN LOADING PAGE --/

function initPage() {
    getThemes()
    checkTheme()
    checkContent()
    let online = JSON.parse(localStorage.getItem("onlineUser"))

    if(online){
        adminPage()
    } else {
        startPage()
    }
}

// -- Page for not logged in users --/ 
function startPage() {
    header.append(loginForm)
    main.append(contentContainer)
    renderContent()
}

// -- Page for logged in users -- /
function adminPage() {
    header.append(onlineBox)
    viewToggle.innerText = "User View"
    adminView()
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
    return activeContent
}

// -- RENDER CONTENT ON SITE --/
function renderContent() {
    let content = checkContent()
    h1.innerText = content.title
    p.innerText = content.text
}

// -- FETCH JSON --//
async function fetchThemes(){
    try{
        let response = await fetch("./json/themes.json")
        let result = response.json()
        return result
    } catch(err){
        console.error(err)
    }
}

// -- SET THEMES OF JSON IN LS --/
async function getThemes(){
    let themesList = JSON.parse(localStorage.getItem("themes"))
    
    if(themesList == null){
        let themes = await fetchThemes()
        console.log(themes)
        localStorage.setItem("themes", JSON.stringify(themes))
    }
    return themesList
}

// -- CHECK FOR ACTIVE THEME, IF NULL, SET STANDARD THEME --/
async function checkTheme(){
    let activeTheme = JSON.parse(localStorage.getItem("activeTheme"))

    if(activeTheme == null) {
        let themes = await fetchThemes()
        let defaultTheme = themes.find(name => name.themeName == "standardTheme");
        localStorage.setItem("activeTheme", JSON.stringify(defaultTheme))
        renderTheme(defaultTheme)
    } 
    renderTheme(activeTheme)
}

// -- RENDER THEME --/ 
function renderTheme(theme){
    h1.style.color = theme.titleColour;
    h1.style.fontFamily = theme.titleFont;
    p.style.color = theme.textColour;
    p.style.fontFamily = theme.textFont;
    main.style.color = theme.textColour;
    root.style.backgroundColor = theme.backgroundColour;
    header.style.backgroundColor = theme.accentColour;
    footer.style.backgroundColor = theme.accentColour;
    header.style.color = theme.contrastColour;
    footer.style.color = theme.contrastColour;
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
    let timeout;

    if(!userOk || !passwordOk) {
        header.append(errorMsg)
        timeout = setTimeout(clearErrorMsg, 2000)
    } else if(userOk && passwordOk){
        let onlineUser = {username: userInput, status: "online" }
        localStorage.setItem("onlineUser", JSON.stringify(onlineUser))
        adminPage()
    } 
}

// -- CLEAR ERROR MESSAGE WHEN LOGIN DETAILS IS INCORRECT --/
function clearErrorMsg(){
    errorMsg.remove()
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
    newBgColour.value = currentTheme.backgroundColour
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
            backgroundColour: newBgColour.value,
            accentColour: newAccentColour.value,
            contrastColour: newContrastColour.value
        }

        localStorage.setItem("activeTheme", JSON.stringify(themeChanges))
        renderTheme(themeChanges)
    });

    saveThemeBtn.addEventListener("click", openSaveThemeContainer)
    header.append(onlineBox)
    main.append(editContentContainer, editThemeContainer, themesDiv)
    contentContainer.remove()

    viewToggle.innerText = "User View"
    viewToggle.addEventListener("click", userView)
}

// -- VIEW TO SHOW ALL THEME AND CONTENT EDITS --/
function userView(){
    editContentContainer.remove()
    editThemeContainer.remove()
    themesDiv.remove()

    renderContent()

    viewToggle.innerText = "Admin View"
    viewToggle.removeEventListener("click", userView)
    viewToggle.addEventListener("click", adminView)

    main.append(contentContainer)
}

// -- Open container for adding theme name --/
function openSaveThemeContainer(){
    cancelBtn.addEventListener("click", () => {
        saveThemeContainer.remove()
    });

    saveThemeBtn2.addEventListener("click", saveTheme)
    editThemeContainer.append(saveThemeContainer)
}

function saveTheme(){
    let collectedThemes = JSON.parse(localStorage.getItem("themes"))
    let lastItem = collectedThemes[collectedThemes.length - 1]
    let newID = lastItem.themeID + 1

    let newTheme = {
        themeID: newID,
        themeName: getValue(newThemeName),
        titleColour: getValue(newTitleColour),
        titleFont:getValue(newFontTitle),
        textColour: getValue(newTextColour),
        textFont: getValue(newFontTitle),
        backgroundColour: getValue(newBgColour),
        accentColour: getValue(newAccentColour),
        contrastColour: getValue(newContrastColour),
    }
    
    collectedThemes.push(newTheme)
    localStorage.setItem("themes", JSON.stringify(collectedThemes))
    saveThemeContainer.remove()
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
})


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
            themeItem.remove()
        })
    })

    themeList.addEventListener("click", (evt) => {
        existingThemes.find((theme) => {

            if(evt.target.id == theme.themeID){
                renderTheme(theme)
                localStorage.setItem("activeTheme", JSON.stringify(theme))
            }
        })
    })
    themesDiv.innerHTML = "<h2>Choose an existing theme</h2>"
    themesDiv.append(themeList)
}

// -- LOG OUT  --/ 
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
    onlineBox.remove()
    editThemeContainer.remove()
    editContentContainer.remove()
    themesDiv.remove()
    startPage()
})

// Arrays och logg till localStorage
let mocklist = [
    {username : "admin", password : "admin"},
]
localStorage.setItem("userList", JSON.stringify(mocklist))

