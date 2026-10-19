
import { useEffect, useState } from "react";
import { validateImage } from "../../utils/validators.js";

function ImageUpload({ value, onChange, error, onErrorChange }) {
    const [preview, setPreview] = useState(value || "");

    useEffect(() => {
        setPreview(value || "");
    }, [value]);

    function handleFileChange(event) {
        const file = event.target.files?.[0];

        if (!file) return;

        const validationError = validateImage(file);

        if (validationError) {
            onErrorChange(validationError);
            event.target.value = "";
            return;
        }

        onErrorChange("");

        const reader = new FileReader();

        reader.onload = () => {
            const base64Image = reader.result;

            setPreview(base64Image);
            onChange(base64Image);
        };

        reader.onerror = () => {
            onErrorChange("Unable to read this image. Please try again.");
        };

        reader.readAsDataURL(file);
    }

    function handleRemove() {
        setPreview("");
        onChange("");
        onErrorChange("");
    }

    return (
        <div className="mb-3">
            <label className="form-label fw-semibold">Buyer Photo</label>

            <input
                type="file"
                accept="image/jpeg,image/png"
                className={`form-control ${error ? "is-invalid" : ""}`}
                onChange={handleFileChange}
            />

            <div className="form-text">
                JPG or PNG only. Maximum file size: 1 MB.
            </div>

            {error && (
                <div className="text-danger small mt-1">
                    {error}
                </div>
            )}

            {preview && (
                <div>
                    <img
                        src={preview}
                        alt="Buyer preview"
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                        }}
                    />

                    <div>
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-danger mt-2"
                            onClick={handleRemove}
                        >
                            Remove Photo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
