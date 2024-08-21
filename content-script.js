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

function onKeyPress(event) {
  if (event.code === "ShiftLeft") {
    togglePencilButton()
  }
}

function addKeyListener() {
  window.addEventListener("keydown", onKeyPress)
}

try {
  addKeyListener()
} catch (error) {
  console.error("Content-script error:", error)
}
