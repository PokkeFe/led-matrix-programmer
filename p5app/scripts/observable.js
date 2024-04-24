/**
 * An observable allows for subscription of callables to be notified when some event occurs.
 */
class Observable {
    constructor() {
        this.observers = []
    }

    /**
     * Subscribe a callable
     * @param {CallableFunction} f 
     */
    subscribe(f) {
        this.observers.push(f)
    }

    /**
     * Unsubscribe a callable
     * @param {CallableFunction} f 
     */
    unsubscribe(f) {
        this.observers.filter(o => o !== f)
    }

    /**
     * Unsubscribe all callables
     */
    unsubscribeAll() {
        this.observers = []
    }

    /**
     * Invoke all callables with given data
     * @param {*} data 
     */
    notify(data) {
        this.observers.forEach(o => o(data))
    }
}