const NYTPencilExtensionOptions = "NYTPencilExtensionOptions";
const DefaultPencilKeyCode = "ShiftLeft";
const KeyCodeId = "KeyCode";
const StatusId = "status";

// Saves options to chrome.storage
const saveOptions = () => {
  const keyCode = document.getElementById(KeyCodeId).value;

  chrome.storage.sync.set(
    { NYTPencilExtensionOptions: { pencilKeyCode: keyCode } },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById(StatusId);
      status.textContent = "Options saved.";
      setTimeout(() => {
        status.textContent = "";
      }, 1500);
    }
  );
};

// Restores select box with value stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { NYTPencilExtensionOptions: { pencilKeyCode: `${DefaultPencilKeyCode}` } },
    (items) => {
      document.getElementById(KeyCodeId).value = items.NYTPencilExtensionOptions.pencilKeyCode;
    }
  );
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
