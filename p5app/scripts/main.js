/* Upload */

let upload_button = document.getElementById("uploadButton")

let ip_addr_elem = document.getElementById("ipInput")

upload_button.addEventListener("click", (elem, ev) => {
    let ip = ip_addr_elem.value
    fetch(`http://${ip}/set`, {
        method: "POST",
        body: active_frame.getValuesAsHexString(),
    })
})

/* Matrix */
let matrix_element = document.getElementById("matrix")

let matrix_buttons = []

let active_frame = new Frame()

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
        let button = ev.target
        let button_id = parseInt(button.getAttribute("button-id"))
        // Invert the value in the active frame
        active_frame.values[button_id] = !active_frame.values[button_id]
        // Refresh the relevant button
        if(active_frame.values[button_id] == true) {
            matrix_buttons[button_id].classList.add('active')
        } else {
            matrix_buttons[button_id].classList.remove('active')
        }
        console.log(active_frame.getValuesAsHexString())
    }
})