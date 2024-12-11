// returns pencil button HTMLButtonElement or null
function getPencilButton() {
  const pencilButtonIconInactive = document.querySelector(".xwd__toolbar_icon--pencil")
  const pencilButtonIconActive = document.querySelector(".xwd__toolbar_icon--pencil-active")
  const pencilButtonAcrostic = document.querySelector(".acrostic-tool__pencil") // inactive or active
  let pencilButton = null
  if (pencilButtonIconInactive) {
    pencilButton = pencilButtonIconInactive.closest("button")
  }
  if (pencilButtonIconActive) {
    pencilButton = pencilButtonIconActive.closest("button")
  }
  if (pencilButtonAcrostic) {
    pencilButton = pencilButtonAcrostic.closest("button")
  }
  return pencilButton ?? null
}

function togglePencilButton() {
  const pencilButton = getPencilButton()
  pencilButton?.click()
}

const defaultKeyCode = "ShiftLeft"
let keyCodeSetting = defaultKeyCode
let tabPressedDuringCurrentShift = false

function onKeyUp(event) {
  // Prevent a conflict between shift pencil hotkey and shift+tab to navigate crossword
  if (keyCodeSetting === "Shift") {
    // If Tab was keyUpped, but shift is being held, track it.
    if (event.code === "Tab" && event.shiftKey) {
      // keeps track if tab was clicked during shift,
      tabPressedDuringCurrentShift = true
      return
    }
    // If keyUpping shift but tab was pressed during the Shift hold, cancel the keyUp & reset the tabbed state
    if (event.code === "Shift" && tabPressedDuringCurrentShift) {
      tabPressedDuringCurrentShift = false
      return
    }
  }

  if (event.code === keyCodeSetting) {
    togglePencilButton()
  }

  // Alt key navigates to 3 dots top right in Chrome - prevent that if we have that selected.
  if ((keyCodeSetting === "AltLeft" || keyCodeSetting === "AltRight") && event.key === "Alt") {
    event.preventDefault()
    return
  }
}

function addKeyListener() {
  window.addEventListener("keyup", onKeyUp)
}

const getOptions = () => {
  try {
    chrome.storage.sync.get(["NYTPencilExtensionOptions"], (result) => {
      const settings = result.NYTPencilExtensionOptions
      if (settings) {
        keyCodeSetting = settings.pencilKeyCode ?? defaultKeyCode
      } else {
        keyCodeSetting = defaultKeyCode
      }
    })
  } catch (error) {
    keyCodeSetting = defaultKeyCode
    console.error("Error getting NYTPencilExtensionOptions from storage", error)
  }
}

try {
  getOptions()
  addKeyListener()
} catch (error) {
  console.error("Content-script error:", error)
}
