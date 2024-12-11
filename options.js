const NYTPencilExtensionOptions = "NYTPencilExtensionOptions"
const DefaultPencilKeyCode = "ShiftLeft"
const KeyCodeId = "KeyCode"
const StatusId = "status"

// Saves options to chrome.storage
const saveOptions = () => {
  const keyCode = document.getElementById(KeyCodeId).value

  chrome.storage.sync.set({ NYTPencilExtensionOptions: { pencilKeyCode: keyCode } }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById(StatusId)
    console.log(status)
    status.textContent = "Options saved. Please refresh the page to apply options."
    setTimeout(() => {
      status.textContent = ""
    }, 5000)
  })
}

// Restores select box with value stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get({ NYTPencilExtensionOptions: { pencilKeyCode: `${DefaultPencilKeyCode}` } }, (items) => {
    document.getElementById(KeyCodeId).value = items.NYTPencilExtensionOptions.pencilKeyCode
  })
}

document.addEventListener("DOMContentLoaded", restoreOptions)
document.getElementById("save").addEventListener("click", saveOptions)
