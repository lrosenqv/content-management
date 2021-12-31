let themesDiv = document.createElement("div")
themesDiv.id = "themesDiv"

let newTitle = document.createElement("input")
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

export function newInputValue(input){
    return input.value
}