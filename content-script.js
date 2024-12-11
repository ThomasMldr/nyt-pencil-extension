// returns pencil button HTMLButtonElement or null
function getPencilButton() {
  const pencilButtonIconInactive = document.querySelector(
    ".xwd__toolbar_icon--pencil"
  );
  const pencilButtonIconActive = document.querySelector(
    ".xwd__toolbar_icon--pencil-active"
  );
  const pencilButtonAcrostic = document.querySelector(".acrostic-tool__pencil"); // inactive or active
  let pencilButton = null;
  if (pencilButtonIconInactive) {
    pencilButton = pencilButtonIconInactive.closest("button");
  }
  if (pencilButtonIconActive) {
    pencilButton = pencilButtonIconActive.closest("button");
  }
  if (pencilButtonAcrostic) {
    pencilButton = pencilButtonAcrostic.closest("button");
  }
  return pencilButton ?? null;
}

function togglePencilButton() {
  const pencilButton = getPencilButton();
  pencilButton?.click();
}

const defaultKeyCode = "ShiftLeft";
let keyCode = defaultKeyCode;
let tabShifted = false;

function onKeyUp(event) {
  if((keyCode === "AltLeft" || keyCode === "AltRight") && event.key === "Alt"){
    event.preventDefault(); //Alt key navigates to 3 dots top right in Chrome
  }
  if (event.code === "Tab" && event.shiftKey) {
    //keeps track if tab was clicked during shift, to prevent conflict between shift pencil hotkey and shift+tab to navigate crossword
    tabShifted = true;
  }
  if (event.code === keyCode && !tabShifted) {
    togglePencilButton();
  }
  if (event.key === "Shift") {
    tabShifted = false;
  }
}

function addKeyListener() {
  window.addEventListener("keyup", onKeyUp);
}

const getOptions = () => {
  try {
    chrome.storage.sync.get(["NYTPencilExtensionOptions"], (result) => {
      const settings = result.NYTPencilExtensionOptions;
      if (settings) {
        keyCode = settings.pencilKeyCode ?? defaultKeyCode;
      } else {
        keyCode = defaultKeyCode;
      }
    });
  } catch (error) {
    keyCode = defaultKeyCode;
    console.error(
      "Error getting NYTPencilExtensionOptions from storage",
      error
    );
  }
};

try {
  getOptions();
  addKeyListener();
} catch (error) {
  console.error("Content-script error:", error);
}
