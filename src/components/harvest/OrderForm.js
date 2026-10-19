import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppContext from "../../context/AppContext.js";


function OrderForm() {
    const { crops, setOrders } = useContext(AppContext);
    const location = useLocation();
    const navigate = useNavigate();

    const editOrder = location.state?.order || null;

    const [formData, setFormData] = useState({
        cropId: "",
        quantity: "",
        orderDate: "",
        status: "Pending",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (editOrder) {
            setFormData({
                cropId: String(editOrder.cropId),
                quantity: String(editOrder.quantity),
                orderDate: editOrder.orderDate,
                status: editOrder.status,
            });
            setError("");
        } else {
            setFormData({
                cropId: "",
                quantity: "",
                orderDate: "",
                status: "Pending",
            });
        }
    }, [editOrder]);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));

        setError("");
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (
            !formData.cropId ||
            !formData.orderDate ||
            !formData.quantity
        ) {
            setError("Please fill in all fields.");
            return;
        }

        const quantity = Number(formData.quantity);

        if (!Number.isFinite(quantity) || quantity <= 0) {
            setError("Quantity must be greater than zero.");
            return;
        }

        const selectedCrop = crops.find(
            (crop) => String(crop.id) === String(formData.cropId)
        );

        if (!selectedCrop) {
            setError("Please select a valid crop.");
            return;
        }

        if (editOrder) {
            setOrders((previousOrders) =>
                previousOrders.map((order) =>
                    order.id === editOrder.id
                        ? {
                            ...order,
                            cropId: selectedCrop.id,
                            cropName: selectedCrop.name,
                            quantity,
                            orderDate: formData.orderDate,
                            status: formData.status,
                        }
                        : order
                )
            );
        } else {
            const newOrder = {
                id: Date.now(),
                cropId: selectedCrop.id,
                cropName: selectedCrop.name,
                quantity,
                orderDate: formData.orderDate,
                status: formData.status,
            };

            setOrders((previousOrders) => [
                ...previousOrders,
                newOrder,
            ]);
        }

        setFormData({
            cropId: "",
            quantity: "",
            orderDate: "",
            status: "Pending",
        });

        setError("");

        navigate("/harvest-orders/all-orders", { replace: true });
    }

    return (
        <div className='buyer-form container-fluid d-flex justify-content-center align-items-center mt-5' >
            <div className="card shadow-lg py-4 mx-auto " style={{ padding: "0px 35px" }}>
                <h4 className=" text-center fw-bold mb-4 text-success" >
                    {editOrder ? "Edit Order" : "Create New Order"}
                </h4>

                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className='col-md-6 mb-3 mb-md-0' >
                            <label className="form-label fw-semibold">Select Crop</label>
                            <select
                                className="form-select"
                                name="cropId"
                                value={formData.cropId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Choose a crop</option>
                                {crops.map((crop) => (
                                    <option key={crop.id} value={crop.id}>
                                        {crop.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">
                                Quantity (kg)
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                name="quantity"
                                min="1"
                                value={formData.quantity}
                                onChange={handleChange}
                                placeholder="Enter quantity"
                                required
                            />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className='col-md-6 mb-3 mb-md-0' >
                            <label className="form-label fw-semibold">Order Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="orderDate"
                                value={formData.orderDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Order Status</label>
                            <select
                                className="form-select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>

                    </div>


                    {error && (
                        <div className="alert alert-danger mt-3 mb-0">
                            {error}
                        </div>
                    )}

                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button type="submit" className="btn btn-success">
                            {editOrder ? "Update Order" : "Create Order"}
                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate("/harvest-orders")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default OrderForm;
