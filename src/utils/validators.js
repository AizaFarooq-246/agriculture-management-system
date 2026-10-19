//  Name Validation Function 
export function validateName(name) {
    const trimmedName = name.trim();

    if (!trimmedName) {
        return "Full name is required.";
    }

    if (trimmedName.length < 3) {
        return "Name must contain at least 3 characters.";
    }

    if (!/^[A-Za-z ]+$/.test(trimmedName)) {
        return "Name must contain letters and spaces only.";
    }

    return "";
}


// CNIC validation function 
export function validateCnic(cnic) {
    const digits = cnic.replace(/\D/g, "");

    if (!digits) {
        return "CNIC is required.";
    }

    if (digits.length !== 13) {
        return "CNIC must contain exactly 13 digits.";
    }

    if (!/^\d{5}-\d{7}-\d{1}$/.test(cnic)) {
        return "CNIC format must be 12345-1234567-1.";
    }

    return "";
}


// Image Validation Function 
export function validateImage(file) {
    if (!file) {
        return "Buyer photo is required.";
    }

    const allowedTypes = ["image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
        return "Only JPG and PNG images are allowed.";
    }

    if (file.size > 1024 * 1024) {
        return "Image size must not exceed 1 MB.";
    }

    return "";
}


// Quantity Validation function 
export function validateQuantity(quantity, availableStock) {
    if (quantity === "" || quantity === null || quantity === undefined) {
        return "Quantity is required.";
    }

    const amount = Number(quantity);

    if (!Number.isFinite(amount) || amount <= 0) {
        return "Quantity must be greater than zero.";
    }

    if (amount > Number(availableStock)) {
        return `Only ${availableStock} kg is available in stock.`;
    }

    return "";
}
