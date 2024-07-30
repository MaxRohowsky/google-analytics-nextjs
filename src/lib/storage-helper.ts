'use client';


// Retrieves a value from local storage and parses it as JSON.
export function getLocalStorage(key: string, defaultValue: any) {

    // Get the value from local storage
    const stickyValue = localStorage.getItem(key);

    // Check if stickyValue is not null or undefined
    if (stickyValue !== null && stickyValue !== undefined) {
        try {
            return JSON.parse(stickyValue);
        } catch (error) {
            console.error(`Error parsing JSON for key "${key}":`, error);
            return defaultValue;
        }
    } else {
        return defaultValue;
    }
}

// Stores a value in local storage after serializing it to JSON.
export function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}