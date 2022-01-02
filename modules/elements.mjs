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

// loginForm.append(userNameInput, passwordInput, loginBtn)
export { loginForm, userNameInput, passwordInput, loginBtn, errorMsg }

// -- BOX THAT REPLACES LOGIN FORM WHEN LOGGED IN --/
let onlineBox = document.createElement("div")
onlineBox.id = "onlineBox"
onlineBox.insertAdjacentHTML("afterbegin", "<p>Logged in as admin</p>")

let logoutBtn = document.createElement("button")
logoutBtn.innerHTML = "Log out"
logoutBtn.id = "logoutBtn"

let viewToggle = document.createElement("button")
viewToggle.id = "viewToggle"

//onlineBox.append(viewToggle, logoutBtn)
export { onlineBox, logoutBtn, viewToggle }

// -- CONTENT --/ 
let contentContainer = document.createElement("div")
contentContainer.id = "contentContainer"
let h1 = document.createElement("h1")
let p = document.createElement("p")

//contentContainer.append(h1, p)
export { contentContainer, h1, p }

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

//editContentContainer.append(newTitle, newText, saveContentBtn)
export { editContentContainer, newTitle, newText, saveContentBtn }

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
themeList.innerText = ""

// -- Select-input fields for changing fonts -- /
let newFontTitle = document.createElement("select")
let newFontText = document.createElement("select")

// -- ARRAY WITH FONTS TO CHOOSE FROM --/
/*let fonts = [
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
})*/


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


//editThemeContainer.append(newFontTitle, newTitleColour, newFontText, newTextColour, newAccentColour, newContrastColour, saveEditsBtn, saveThemeBtn, themesDiv)
export { editThemeContainer, newFontTitle, newTitleColour, newFontText, newTextColour, newAccentColour, newContrastColour, saveEditsBtn, saveThemeBtn, themesDiv, themeList}

//-- Pop Up save new Theme --/
let saveThemeContainer = document.createElement("div")
saveThemeContainer.id = "saveThemeContainer"
saveThemeContainer.insertAdjacentHTML("afterbegin", "<h4>Add Theme Name</h4>")

let newThemeName = document.createElement("input")
newThemeName.id = "newThemeName"

let saveThemeBtn2 = document.createElement("button")
saveThemeBtn2.innerText = "Save Theme"
saveThemeBtn2.id = "saveThemeBtn2"

//saveThemeContainer.append(newThemeName, saveThemeBtn2)
export { saveThemeContainer, newThemeName, saveThemeBtn2 }