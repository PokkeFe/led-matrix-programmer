/**
 * A Frame represents the state of the matrix at a single point in time.
 * This includes the visual component as well as any relevant metadata related to the frame
 * (ie amount of time held on that frame to allow for a variable framerate within an animation)
 * The frame values can be addresses as a flattened array with size (WIDTH*HEIGHT) where the
 * data flows left-to-right first and top-to-bottom second, as shown below for a 3x3 matrix.
 * [ 1, 2, 3
 *   4, 5, 6,
 *   7, 8, 9]
 */
class Frame {
    constructor() {
        // Initialize the array with false booleans
        this.values = Array(MATRIX_HEIGHT * MATRIX_WIDTH).fill(false)

        this.on_values_changed = new Observable()

        // Display length (uint8)
        this.frames_held = 1
    }

    /* Setters and Getters */

    /**
    * Setter for frames_held to limit the values to uint8 range.
    */
    set frames_held(new_value) {
        if(new_value > 255 || new_value < 0) throw new RangeError("frames_held is a uint8 and cannot represent values outside of [0-255]")
        return new_value
    }

    /**
     * Sets the frame value at a the given index
     * @param {number} index 
     * @param {boolean} new_value 
     */
    setValue(index, new_value) {
        this.values[index] = new_value
        this.on_values_changed.notify()
    }


    /* Export functions */

    getValuesAsHexString() {
        let hexstring_array = []
        // During boolean bit-shifts, the bool is treated as a 64-bit signed integer
        // Iterate over each set of 4 values and create its nibble representation
        for(let i = 0; i < this.values.length; i += 4) {
            let num = this.values[i    ] << 3
            num +=    this.values[i + 1] << 2
            num +=    this.values[i + 2] << 1
            num +=    this.values[i + 3]
            // Push the nibble to our output string
            hexstring_array.push(num.toString(16))
        }
        return hexstring_array.join("")
    }

    getHeadersAsHexString() {
        let hexstring_array = []
        hexstring_array.push(this.frames_held.toString(16).padStart(2, '0'))
        return hexstring_array.join("")
    }

    getAsHexString() {
        return this.getHeadersAsHexString() + this.getValuesAsHexString()
    }

    /* Frame value manipulation functions */

    /**
     * Inverts all values in a frame (1 -> 0, 0 -> 1)
     */
    invert() {
        this.values = this.values.map(v => !v)
        this.on_values_changed.notify()
    }

    /**
     * Sets all values with a given bool.
     * @param {boolean} v Boolean value to fill the array with. 
     */
    fill(v) {
        this.values = this.values.fill(v)
        this.on_values_changed.notify()
    }
}