/* Upload */

let upload_button = document.getElementById("uploadButton")

let ip_addr_elem = document.getElementById("ipInput")

upload_button.addEventListener("click", (elem, ev) => {
    let ip = ip_addr_elem.value
    fetch(`http://${ip}/set`, {
        method: "POST",
        body: getFrameReelPayload(),
    })
})

/* Frame Reel */

let first_reel_item = null

function createFirstReelItem() {
    let new_reel_item = new FrameReelItem()
    if(first_reel_item != null) {
        new_reel_item.next_reel_item = first_reel_item
        first_reel_item.previous_reel_item = new_reel_item
    }
    first_reel_item = new_reel_item
    setActiveReelItem(new_reel_item)
}

function recalculateReelItemIDs() {
    let cur_reel_item = first_reel_item
    let id = 0
    while(cur_reel_item != null) {
        cur_reel_item.frame_number = id
        id += 1
        cur_reel_item = cur_reel_item.next_reel_item
    }
}

function getFrameReelPayload() {
    let payload = ""
    let current_reel_item = first_reel_item
    while (current_reel_item != null) {
        payload += current_reel_item.frame.getHeadersAsHexString()
        payload += "|"
        payload += current_reel_item.frame.getValuesAsHexString()
        payload += "\n"
        current_reel_item = current_reel_item.next_reel_item
    }
    return payload
}

window.addEventListener("load", () => {
    createFirstReelItem()
    recalculateReelItemIDs()
})