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

onlineBox.append(boxP, logoutBtn,viewLabel, viewToggle)
header.append(onlineBox)

// -- CONTENT --/ 
let h1 = document.createElement("h1")
let p = document.createElement("p")
main.append(h1, p)

window.addEventListener('load', initPage)

let onlineUser = []

// -- WHEN LOADING PAGE --/
function initPage() {
    let onlineUser = JSON.parse(localStorage.getItem("onlineUser"))
    let activeTheme = JSON.parse(localStorage.getItem("activeTheme"))
    renderContent()
    renderTheme(activeTheme)

    console.log(onlineUser)

    if (onlineUser) {
        loggedInPage()

    } else {
        notLoggedInPage();
    }
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
loginBtn.addEventListener('click', validateUser, true)
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
        console.log("success!");

    } else {
        loginForm.insertAdjacentText("afterend", "Username or password is incorrect")
        console.log("helt fel hallå");
    }
}

// -- Page for logged in users -- /
function loggedInPage() {
    header.append(onlineBox)
    boxP.innerHTML = "You are now in admin mode"
    boxP.style.color = "white"
    themesList()
}

function themesList(){
    let existingThemes = JSON.parse(localStorage.getItem("themes"))
    let themeList = document.createElement("select")
    let themeBtn = document.createElement("button")
    themeBtn.innerText = "Select theme"
    themeList.placeholder = "Choose existing"

    existingThemes.forEach((theme) => {
        let selTheme = document.createElement("option")
        selTheme.innerText = theme.themeName
        themeList.append(selTheme)
    })
    main.append(themeList, themeBtn)

    themeBtn.addEventListener("click", () => {
        let chosenTheme = themeList.value

        existingThemes.find((theme) => {
            if(chosenTheme == theme.themeName){
                setTheme(theme)
                localStorage.setItem("activeTheme", JSON.stringify(theme))
            }
        })
        console.log("clicked", chosenTheme)
    })
}

// -- USER VIEW --/
viewToggle.addEventListener("change", function(){
    if(this.checked){
        userView()
    } else {
        adminView()
    }
})

function userView(){
    console.log("checked box, inne i func")
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
    el: '.coloris'
  });

function adminView(){
    let newTitle = document.createElement("input")
    newTitle.placeholder = "new Title"
    
    let newText = document.createElement("input")
    newText.placeholder = "new Text"

    let newTitleColor = document.createElement("option")
    newTitleColor.className = "coloris"

    let newTextColor = document.createElement("option")
    newTextColor.className = "coloris"

    // -- Change font for title -- /
    let newFontTitle = document.createElement("select")

    fonts.forEach((font) => {
        let aFont = document.createElement("option")
        aFont.innerText = font
        newFontTitle.append(aFont)
    })

    let newFontText = document.createElement("select")

    // -- Change font for text -- /
    fonts.forEach((font) => {
        let aFont = document.createElement("option")
        aFont.innerText = font
        newFontText.append(aFont)
    })

    main.append(newTitle, newFontTitle, newFontText, newTitleColor, newTextColor)
    h1.style.visibility = "none"
    p.style.visibility = "none"
    console.log("not checked")
}

function swatchColour() {
    let colorSwatch = document.createElement("div")
    colorSwatch.innerHTML = ""
    colorSwatch.style.height = "1rem"
    colorSwatch.style.width = "1rem"
    colorSwatch.style.backgroundColor = newTitle.value
    main.append(colorSwatch)
}

let fonts = [
    "Helvetica",
    "Arial",
    "Times New Roman",
]


// -- LOG OUT  --/ 
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("onlineUser")
    notLoggedInPage()
    location.reload()
})

// -- Page for not logged in users --/ 
function notLoggedInPage() {
    header.appendChild(loginForm)
}


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
    backgroundColor: "white",
    titleColor: "black",
    textColor: "black",
    headerBackground: "thistle",
    footerBackground: "thistle",
    footerTextColour: "white"
    },
    {
    themeID: 1, 
    themeName: "darkTheme",
    backgroundColour: "black",
    titleColour: "white",
    textColour: "white",
    headerBackground: "black",
    footerBackground: "black",
    footerTextColour: "white"
    },
    {
    themeID: 2, 
    themeName: "lightTheme",
    backgroundColour: "white",
    titleColour: "black",
    textColour: "black",
    headerBackground: "lightsteelblue",
    footerBackground: "lightsteelblue",
    footerTextColour: "black"
    },
    {
    themeID: 3, 
    themeName: "vibrantTheme",
    backgroundColour: "cornflowerblue",
    titleColour: "black",
    textColour: "black",
    headerBackground: "pink",
    footerBackground: "pink",
    footerTextColour: "black"
    },
    {
    themeID: 4, 
    themeName: "purpleTheme",
    backgroundColour: "mediumpurple",
    titleColour: "white",
    textColour: "white",
    headerBackground: "rebeccapurple",
    footerBackground: "rebeccapurple",
    footerTextColour: "white"
    },
]

localStorage.setItem("themes", JSON.stringify(themes))

function setTheme(theme){
    root.style.backgroundColor = theme.backgroundColor;
    h1.style.color = theme.titleColor;
    p.style.color = theme.textColor;
    header.style.backgroundColor = theme.headerBackground;
    footer.style.backgroundColor = theme.footerBackground;
    footer.style.color = theme.footerTextColour;
}

function renderTheme(activeTheme){
    root.style.backgroundColor = activeTheme.backgroundColor;
    h1.style.color = activeTheme.titleColor;
    p.style.color = activeTheme.textColor;
    header.style.backgroundColor = activeTheme.headerBackground;
    footer.style.backgroundColor = activeTheme.footerBackground;
    footer.style.color = activeTheme.footerTextColour;
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
}

/*function changeContent(thing) {
    let newContent = {
        title: thing.value,
        text: thing.value
    }
    localStorage.setItem("activeContent", JSON.stringify(newContent))
}*/