
// Read saved data and return fallback if data is missing or invalid 
export function getStorageItem(key, fallback = null) {
    try {
        const storedValue = localStorage.getItem(key);

        // If no data exists for this key
        if (storedValue === null) {
            return fallback;
        }

        // Convert JSON string back into JavaScript data
        return JSON.parse(storedValue);
    } catch (error) {
        console.error(`Error reading "${key}" from localStorage:`, error);
        return fallback;
    }
}



export function setStorageItem(key, value) {
    try {
        const storedValue = JSON.stringify(value);

        localStorage.setItem(key, storedValue);

        return true;
    } catch (error) {
        console.error(`Error saving "${key}" to localStorage:`, error);
        return false;
    }
}


// Remove Specific key data 
export function removeStorageItem(key) {
    try {
        localStorage.removeItem(key);

        return true;
    } catch (error) {
        console.error(`Error removing "${key}" from localStorage:`, error);
        return false;
    }
}
