import { useState, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext.js";
import CnicInput from "./CnicInput.js";
import { validateName, validateCnic, validateQuantity } from "../../utils/validators.js";
import ImageUpload from "./ImageUpload.js";
import { useNavigate, useLocation } from "react-router-dom";



function BuyerForm({ editBuyer: editBuyerProp = null }) {
    const location = useLocation();
    const editBuyer = editBuyerProp || location.state?.editBuyer || null;
    const navigate = useNavigate();
    const { crops, setCrops, buyers, setBuyers } = useContext(AppContext);

    const [formData, setFormData] = useState({
        fullName: "",
        cnic: "",
        cropId: "",
        quantity: "",
        saleDate: new Date().toISOString().split("T")[0],
        photo: "",
    });

    useEffect(() => {
        if (editBuyer) {
            setFormData({
                fullName: editBuyer.fullName,
                cnic: editBuyer.cnic,
                cropId: String(editBuyer.cropId),
                quantity: String(editBuyer.quantity),
                saleDate: editBuyer.saleDate,
                photo: editBuyer.photo,
            });
        }
    }, [editBuyer]);

    const [errors, setErrors] = useState({});
    const [photoError, setPhotoError] = useState("");


    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    }

    // Handle Submit Function 
    function handleSubmit(event) {
        event.preventDefault();

        const selectedCrop = crops.find(
            (crop) => String(crop.id) === String(formData.cropId)
        );

        const newErrors = {
            fullName: validateName(formData.fullName),
            cnic: validateCnic(formData.cnic),
            cropId: selectedCrop ? "" : "Please select a crop.",
            quantity: selectedCrop
                ? validateQuantity(
                    formData.quantity,
                    Number(selectedCrop.availableStock ?? 0) +
                    (editBuyer && String(editBuyer.cropId) === String(selectedCrop.id)
                        ? Number(editBuyer.quantity)
                        : 0)
                )
                : "",
            photo: formData.photo ? "" : "Buyer photo is required.",
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(
            (error) => error !== ""
        );

        if (hasErrors) {
            return;
        }




        const quantity = Number(formData.quantity);

        const buyerRecord = {
            id: editBuyer ? editBuyer.id : Date.now(),
            fullName: formData.fullName.trim(),
            cnic: formData.cnic,
            cropId: selectedCrop.id,
            cropName: selectedCrop.name,
            quantity,
            saleDate: formData.saleDate,
            photo: formData.photo,
        };

        if (editBuyer) {
            setBuyers((previousBuyers) =>
                previousBuyers.map((buyer) =>
                    buyer.id === editBuyer.id ? buyerRecord : buyer
                )
            );

            setCrops((previousCrops) =>
                previousCrops.map((crop) => {
                    let updatedStock = Number(crop.availableStock ?? 0);

                    // Purani sale ki quantity wapas stock mein add karo.
                    if (String(crop.id) === String(editBuyer.cropId)) {
                        updatedStock += Number(editBuyer.quantity);
                    }

                    // Nayi sale ki quantity stock se deduct karo.
                    if (String(crop.id) === String(selectedCrop.id)) {
                        updatedStock -= quantity;
                    }

                    return { ...crop, availableStock: updatedStock };
                })
            );

            alert("Buyer record updated successfully!");
        } else {
            setBuyers((previousBuyers) => [...previousBuyers, buyerRecord]);

            setCrops((previousCrops) =>
                previousCrops.map((crop) =>
                    String(crop.id) === String(selectedCrop.id)
                        ? {
                            ...crop,
                            availableStock:
                                Number(crop.availableStock ?? 0) - quantity,
                        }
                        : crop
                )
            );

            alert("Crop sale saved successfully!");
        }
        navigate("/buyers");
    }

    return (
        <div className='buyer-form container-fluid d-flex justify-content-center align-items-center mt-5' >
            <div className="card shadow-lg py-4 mx-auto " style={{ padding: "0px 35px" }}>
                <h4 className=" text-center fw-bold mb-4 text-success" >
                    {editBuyer ? "Edit Sales Record" : "Record a Crop Sale"}
                </h4>

                <form onSubmit={handleSubmit}>
                    <div className=" row mb-3">
                        <div className='col-md-6 mb-3 mb-md-0' >
                            <label className="form-label fw-semibold">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                className="form-control"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter buyer's full name"
                            />
                            {errors.fullName && (
                                <div className="text-danger small mt-1">
                                    {errors.fullName}
                                </div>
                            )}
                        </div>

                        <div className='col-md-6'>
                            <CnicInput
                                value={formData.cnic}
                                onChange={(value) =>
                                    setFormData((previousData) => ({
                                        ...previousData,
                                        cnic: value,
                                    }))
                                }
                                error={errors.cnic}
                            />
                        </div>
                    </div>


                    <div className=" row mb-3">
                        <div className='col-md-6 mb-3 mb-md-0' >
                            <label className="form-label fw-semibold">Select Crop</label>
                            <select
                                name="cropId"
                                className="form-select"
                                value={formData.cropId}
                                onChange={handleChange}
                            >
                                <option value="">Choose a crop</option>

                                {crops.map((crop) => (
                                    <option key={crop.id} value={crop.id}>
                                        {crop.name} — Available:{" "}
                                        {crop.availableStock ?? 0} kg
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className=" col-md-6 ">
                            <label className="form-label fw-semibold">Quantity (kg)</label>
                            <input
                                type="number"
                                name="quantity"
                                className="form-control"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="Enter quantity"
                            />
                            {errors.quantity && (
                                <div className="text-danger small mt-1">
                                    {errors.quantity}
                                </div>
                            )}
                        </div>

                    </div>



                    <div className=" row mb-3">
                        <div className='col-md-6 mb-3 mb-md-0'>
                            <label className="form-label fw-semibold">Sale Date</label>
                            <input
                                type="date"
                                name="saleDate"
                                className="form-control"
                                value={formData.saleDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='col-md-6'>
                            <ImageUpload
                                value={formData.photo}
                                onChange={(value) =>
                                    setFormData((previousData) => ({
                                        ...previousData,
                                        photo: value,
                                    }))
                                }
                                error={photoError}
                                onErrorChange={setPhotoError}
                            />
                        </div>
                    </div>

                    <div className='d-flex justify-content-center mt-4'>
                        <button type="submit" className="btn btn-success">
                            {editBuyer ? "Update Sale" : "Save Sale"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default BuyerForm;
