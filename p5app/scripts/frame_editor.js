let matrix_element = ELEM_FRAME_EDITOR.querySelector("#frameEditor>div[data-role='values']")

let matrix_buttons = []

let active_reel_item = null
let on_active_reel_item_changed = new Observable()
on_active_reel_item_changed.subscribe(reloadEditor)

function setActiveReelItem(new_reel_item) {
    // Logic for replacing an active reel item
    if(active_reel_item != null) {
        active_reel_item.frame.on_values_changed.unsubscribe(refreshEditorDisplay)
        active_reel_item.setActive(false)
    }
    active_reel_item = new_reel_item
    // Logic for initializing the new reel item
    if(active_reel_item != null) {
        active_reel_item.frame.on_values_changed.subscribe(refreshEditorDisplay)
        active_reel_item.setActive(true)
    }
    on_active_reel_item_changed.notify()
}

function reloadEditor() { 
    if(active_reel_item == null) {
        ELEM_FRAME_EDITOR.classList.add("disabled")
        return
    }
    ELEM_FRAME_EDITOR.classList.remove("disabled")
    refreshEditorDisplay()
}

// Create our button matrix
for (let row = 0; row < MATRIX_HEIGHT; row++) {
    let row_element = document.createElement("div")
    row_element.classList.add("matrix-row")
    for (let col = 0; col < MATRIX_WIDTH; col++) {
        let button = document.createElement("button")
        button.classList.add("matrix-button")
        button.setAttribute("button-id", (row * MATRIX_WIDTH) + col)
        row_element.append(button)
        matrix_buttons.push(button)
    }
    matrix_element.append(row_element)
}


matrix_element.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("matrix-button")) {
        if (active_reel_item != null) {
            let button = ev.target
            let button_id = parseInt(button.getAttribute("button-id"))
            // Invert the value in the active frame
            active_reel_item.frame.setValue(button_id, !active_reel_item.frame.values[button_id])
        }
    }
})

function refreshEditorDisplay() {
    if(active_reel_item != null) {
        for(array_index in active_reel_item.frame.values) {
            if(active_reel_item.frame.values[array_index] == true) {
                matrix_buttons[array_index].classList.add("active")
            } else {
                matrix_buttons[array_index].classList.remove("active")
            }
        }
    } else {
        matrix_buttons.forEach(button => button.classList.remove("active"))
    }
}

reloadEditor()