import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext.js";


const emptyForm = {
    name: "",
    field: "",
    type: "",
    plantingDate: "",
    cuttingDate: "",
    healthScore: 70,
    harvestQty: "",
};


function CropForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { crops, setCrops } = useContext(AppContext);

    const crop = location.state?.crop || null;

    const [formData, setFormData] = useState(emptyForm);
    const [error, setError] = useState("");

    useEffect(() => {
        if (crop) {
            setFormData({
                ...emptyForm,
                ...crop,
                harvestQty: crop.harvestQty ?? "",
            });
        } else {
            setFormData(emptyForm);
        }

        setError("");
    }, [crop]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.field.trim() ||
            !formData.type ||
            !formData.plantingDate ||
            !formData.cuttingDate ||
            formData.harvestQty === ""
        ) {
            setError("Please fill all required fields.");
            return;
        }

        if (formData.cuttingDate < formData.plantingDate) {
            setError("Cutting date cannot be earlier than planting date.");
            return;
        }

        const quantity = Number(formData.harvestQty);
        const health = Number(formData.healthScore);

        if (!Number.isFinite(quantity) || quantity <= 0) {
            setError("Expected quantity must be greater than zero.");
            return;
        }

        if (!Number.isFinite(health) || health < 0 || health > 100) {
            setError("Health score must be between 0 and 100.");
            return;
        }

        const status = health >= 70 ? "Healthy" : health >= 40 ? "Needs Attention" : "Critical";

        const cropData = {
            ...formData,
            name: formData.name.trim(),
            field: formData.field.trim(),
            healthScore: health,
            harvestQty: quantity,
            status,
        };

        if (crop) {
            setCrops((previousCrops) =>
                previousCrops.map((item) =>
                    item.id === crop.id
                        ? { ...item, ...cropData }
                        : item
                )
            );
        } else {
            setCrops((previousCrops) => [
                ...previousCrops,
                { ...cropData, id: Date.now() },
            ]);
        }

        navigate("/crops");
    }

    return (
        <div className='buyer-form container-fluid d-flex justify-content-center align-items-center mt-5' >
            <div className="card shadow-lg py-4 mx-auto " style={{ padding: "0px 35px" }}>
                <h4 className=" text-center fw-bold mb-4 text-success" >
                    {crop ? "Edit Crop" : "Add New Crop"}
                </h4>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className='col-md-6 mb-3 mb-md-0' >
                            <label className="form-label fw-semibold">Crop Name *</label>
                            <input
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Wheat"
                                required
                            />
                        </div>


                        <div className='col-md-6'>
                            <label className="form-label fw-semibold">Field *</label>
                            <input
                                className="form-control"
                                name="field"
                                value={formData.field}
                                onChange={handleChange}
                                placeholder="e.g. Field A"
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3" >
                        <div className='col-md-6 mb-3 mb-md-0'>
                            <label className="form-label fw-semibold">Crop Type *</label>
                            <select
                                className="form-select"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select crop type</option>
                                <option value="Grain">Grain</option>
                                <option value="Vegetable">Vegetable</option>
                                <option value="Leafy Vegetable">Leafy Vegetable</option>
                                <option value="Fruit">Fruit</option>
                                <option value="Oilseed">Oilseed</option>
                                <option value="Cash Crop">Cash Crop</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Health Score (0–100) *</label>
                            <input
                                type="number"
                                className="form-control"
                                name="healthScore"
                                min="0"
                                max="100"
                                value={formData.healthScore}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="row mb-3">
                        <div className='col-md-6 mb-3 mb-md-0' >
                            <label className="form-label fw-semibold">Planting Date *</label>
                            <input
                                type="date"
                                className="form-control"
                                name="plantingDate"
                                value={formData.plantingDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Cutting Date *</label>
                            <input
                                type="date"
                                className="form-control"
                                name="cuttingDate"
                                value={formData.cuttingDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="row fw-semibold">
                        <div className="col-12 ">
                            <label className="form-label">Expected Quantity (kg) *</label>
                            <input
                                type="number"
                                className="form-control"
                                name="harvestQty"
                                min="1"
                                step="any"
                                value={formData.harvestQty}
                                onChange={handleChange}
                                placeholder="e.g. 2500"
                                required
                            />
                        </div>
                    </div>


                    <div className="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/crops")} >
                            Cancel
                        </button>

                        <button type="submit" className="btn btn-success px-4">
                            {crop ? "Save Changes" : "Add Crop"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CropForm;
