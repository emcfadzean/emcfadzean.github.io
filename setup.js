import { playMouse } from "./script.js";

export function createKeyboard() {
  const keyboard = ["QWERTYUIOP", "-ASDFGHJKL-", ">ZXCVBNM<"];

  for (let r = 0; r < 3; r++) {
    let keyRow = document.createElement("div");
    keyRow.id = "keyrow-" + r.toString();
    keyRow.classList.add("row");
    keyRow.classList.add("keyrow");
    document.getElementById("keyboard").appendChild(keyRow);
    for (let c of keyboard[r]) {
      let key = document.createElement("button");
      key.addEventListener("touchend", (e) => {
        playMouse(key);
      });
      key.id = c.toString();

      if (c.toString() === "-") {
        key.innerHTML = " ";
        key.classList.add("space");
        document.getElementById("keyrow-" + r.toString()).appendChild(key);
        continue;
      }

      key.classList.add("key");
      key.innerHTML = c;

      // backspace
      if (c.toString() === "<") {
        key.innerHTML = "<ion-icon name='backspace-outline'></ion-icon>";
        key.classList.add("wide");
      }
      if (c.toString() === ">") {
        key.innerHTML = "ENTER";
        key.classList.add("wide");
      }

      document.getElementById("keyrow-" + r.toString()).appendChild(key);
    }
  }
}
