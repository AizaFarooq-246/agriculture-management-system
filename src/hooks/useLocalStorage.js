import { useEffect, useState } from "react";
import { getStorageItem, setStorageItem } from "../services/storageService";

function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getStorageItem(key, initialValue);
    });

    useEffect(() => {
        setStorageItem(key, value);
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;
