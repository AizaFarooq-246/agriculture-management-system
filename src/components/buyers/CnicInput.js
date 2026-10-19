

function CnicInput({ value, onChange, error }) {
    function handleChange(event) {
        let digits = event.target.value.replace(/\D/g, "");

        // CNIC mein maximum 13 digits allowed hain
        digits = digits.slice(0, 13);

        // Automatically add CNIC dashes
        let formattedValue = digits;

        if (digits.length > 5) {
            formattedValue =
                digits.slice(0, 5) + "-" + digits.slice(5);
        }

        if (digits.length > 12) {
            formattedValue =
                digits.slice(0, 5) +
                "-" +
                digits.slice(5, 12) +
                "-" +
                digits.slice(12);
        }

        onChange(formattedValue);
    }

    return (
        <div >
            <label className="form-label fw-semibold">CNIC</label>

            <input
                type="text"
                className={`form-control ${error ? "is-invalid" : ""}`}
                value={value}
                onChange={handleChange}
                placeholder="12345-1234567-1"
                inputMode="numeric"
                maxLength={15}
            />

            {error && (
                <div className="invalid-feedback">{error}</div>
            )}
        </div>
    );
}

export default CnicInput;
