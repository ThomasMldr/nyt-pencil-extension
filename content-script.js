function togglePencilButton() {
  const pencilButtonIcon = document.querySelector(".xwd__toolbar_icon--pencil")
  const pencilButton = pencilButtonIcon.closest("button")
  pencilButton.click()
}

function onKeyPress(event) {
  if (event.code === "LeftShift") {
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
