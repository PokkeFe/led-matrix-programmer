/**
 * The Reel Item represents an instance of a frame within the reel.
 * It is responsible for displaying the state of its associated frame and handling any ordering of its neighbors.
 * The reel itself is represented by a doubly-linked list of reel items.
 */
class FrameReelItem {
    constructor(frame_number) {
        // Reel Item Metadata
        this.frame_number = frame_number | 0
        this.next_reel_item = null
        this.previous_reel_item = null
        
        /* Render Setup */
        
        // Copy the template and grab the root element
        let template_copy = ELEM_FRAME_REEL_ITEM_TEMPLATE.content.cloneNode(true)
        this.root_element = template_copy.querySelector(".frameReelItem")

        this.value_display_elements = []

        // Set some starter values
        template_copy.querySelector("*[data-role='frame-number']").textContent = this.frame_number

        // Create our values display matrix
        this.values_display_root_element = template_copy.querySelector("div[data-role='values']")
        for(let row = 0; row < MATRIX_HEIGHT; row++) {
            let row_elem = document.createElement("div")
            row_elem.classList.add("matrix-row")
            for(let col = 0; col < MATRIX_WIDTH; col++) {
                let item = document.createElement("div")
                item.classList.add("matrix-item")
                row_elem.appendChild(item)
                this.value_display_elements.push(item)
            }
            this.values_display_root_element.appendChild(row_elem)
        }

        // Create the frame for the reel item
        this.frame = new Frame()
        this.frame.on_values_changed.subscribe(this.refreshDisplay.bind(this))

        // Create event handlers for controls
        this.root_element.querySelector("div[data-role='controls']").addEventListener('click', (ev) => this.handleControls(ev))
        
        // Push the docfrag to the document tree
        ELEM_FRAME_REEL.appendChild(template_copy)
    }
    
    /* Setters and Getters */

    set frame_number(new_frame_number) {
        if(this.root_element != null) {
            this.root_element.querySelector("*[data-role='frame-number']").textContent = new_frame_number.toString()
        }
        return new_frame_number
    }

    /**
    * Internal function for handling events propagated from the control event listener.
    */
    handleControls(event) {
        if(event.target.hasAttribute('data-exec')) {
            let exec_string = event.target.getAttribute('data-exec')
            if (exec_string == 'insert-before') {
                // Insert a new reel item before
                let new_reel_item = new FrameReelItem()
                if(this.previous_reel_item != null) {
                    this.previous_reel_item.next_reel_item = new_reel_item
                }
                new_reel_item.next_reel_item = this
                new_reel_item.previous_reel_item = this.previous_reel_item
                this.previous_reel_item = new_reel_item
                this.root_element.parentNode.insertBefore(new_reel_item.root_element, this.root_element)
                if(first_reel_item == this) first_reel_item = new_reel_item
                recalculateReelItemIDs()
            } else if (exec_string == 'insert-after') {
                // Insert a new reel item after
                let new_reel_item = new FrameReelItem()
                if(this.next_reel_item != null) {
                    this.next_reel_item.previous_reel_item = new_reel_item
                }
                new_reel_item.previous_reel_item = this
                new_reel_item.next_reel_item = this.next_reel_item
                this.next_reel_item = new_reel_item
                this.root_element.parentNode.insertBefore(new_reel_item.root_element, this.root_element.nextSibling)
                recalculateReelItemIDs()
            } else if (exec_string == 'edit') {
                // Select the reel for editing
                setActiveReelItem(this)
            } else if (exec_string == 'delete') {
                // Delete the reel if possible
                // Don't delete if it's the last reel item
                if(this.next_reel_item == null && this.previous_reel_item == null) return;
                // Delete if first item
                else if(this.next_reel_item != null && this.previous_reel_item == null) {
                    first_reel_item = this.next_reel_item
                    this.next_reel_item.previous_reel_item = null
                    setActiveReelItem(this.next_reel_item)
                    recalculateReelItemIDs()
                    this.root_element.remove()
                    delete this
                    return
                }
                // Delete if last item
                else if(this.next_reel_item == null && this.previous_reel_item != null) {
                    this.previous_reel_item.next_reel_item = null
                    setActiveReelItem(this.previous_reel_item)
                    this.root_element.remove()
                    delete this
                    return
                }
                // Delete if middle item
                else {
                    this.previous_reel_item.next_reel_item = this.next_reel_item
                    this.next_reel_item.previous_reel_item = this.previous_reel_item
                    setActiveReelItem(this.previous_reel_item)
                    recalculateReelItemIDs()
                    this.root_element.remove()
                    delete this
                    return
                }
            } else {
                console.log(`Ignoring unhandled control: ${exec_string}`)
            }
        }
    }

    /**
     * Intermediate function to handle internal operations when the reel item becomes active.
     * @param {boolean} is_active 
     */
    setActive(is_active) {
        if(is_active) {
            this.root_element.classList.add('active')
        } else {
            this.root_element.classList.remove('active')
        }
    }

    /**
     * Re-renders the preview of frame values.
     */
    refreshDisplay() {
        if (this.frame == null) throw new Error("Can't refresh a reel item with a null frame.")
        for(let i = 0; i < this.frame.values.length; i++) {
            if (this.frame.values[i] == true) {
                this.value_display_elements[i].classList.add("active")
            } else {
                this.value_display_elements[i].classList.remove("active")
            }
        }
    }
}