/* Upload */

let upload_button = document.getElementById("uploadButton")

let ip_addr_elem = document.getElementById("ipInput")

upload_button.addEventListener("click", (elem, ev) => {
    let ip = ip_addr_elem.value
    fetch(`http://${ip}/set`, {
        method: "POST",
        body: matrix_to_hex(),
    })
})

/* Matrix */
let matrix_element = document.getElementById("matrix")
const matrix_width = 8
const matrix_height = 8

let matrix_buttons = []

// Create our button matrix
for (let row = 0; row < matrix_height; row++) {
    let row_element = document.createElement("div")
    row_element.classList.add("matrix-row")
    for (let col = 0; col < matrix_width; col++) {
        let button = document.createElement("button")
        button.classList.add("matrix-button")
        button.setAttribute("button-id", (row * matrix_width) + col)
        row_element.append(button)
        matrix_buttons.push(button)
    }
    matrix_element.append(row_element)
}

matrix_element.addEventListener("click", (ev) => {
    if (ev.target.classList.contains("matrix-button")) {
        let button = ev.target
        let button_id = parseInt(button.getAttribute("button-id"))
        toggle_matrix_button(button_id)
    }
})

function toggle_matrix_button(button_id) {
    matrix_buttons[button_id].classList.toggle("active")
}

// This will break for total matrix sizes that aren't divisible by 4 but that's out of scope for this project right now.
function matrix_to_hex() {
    let hex_array = []
    for(let i = 0; i < matrix_buttons.length; i += 4) {
        let num = button_state_to_bit(i) << 3;
        num += button_state_to_bit(i + 1) << 2
        num += button_state_to_bit(i + 2) << 1
        num += button_state_to_bit(i + 3)
        hex_array.push(num.toString(16))
    }
    return hex_array.join("")
}

// Helper function for matrix_to_hex so I don't have to have a couple ugly lines
function button_state_to_bit(array_index) {
    if (matrix_buttons[array_index].classList.contains("active")) return 1;
    return 0;
}