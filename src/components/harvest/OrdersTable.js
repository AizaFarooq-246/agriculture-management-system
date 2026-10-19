import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../context/AppContext.js";
import StatusBadge from "../common/StatusBadge.js";



function OrdersTable({ onEdit }) {
    const navigate = useNavigate();
    const { orders, setOrders } = useContext(AppContext);

    function handleStatusChange(orderId, newStatus) {
        setOrders((previousOrders) =>
            previousOrders.map((order) =>
                order.id === orderId
                    ? { ...order, status: newStatus }
                    : order
            )
        );
    }

    function handleDelete(order) {
        const confirmed = window.confirm(
            `Are you sure you want to delete the order for ${order.cropName || "this crop"}?`
        );

        if (!confirmed) return;

        setOrders((previousOrders) =>
            previousOrders.filter((item) => item.id !== order.id)
        );
    }

    if (orders.length === 0) {
        return (
            <div className="alert alert-light border text-center">
                No orders received yet.
            </div>
        );
    }

    return (
        <div >
            <h2 className="fw-bold" style={{ color: "#2a5a38" }} >Orders Record</h2>
            <p className="text-secondary mb-5">
                View and manage all crop orders in one place,
            </p>

            {/* Order table */}
            <div className="table-responsive">
                <table className="table table-hover table-striped align-middle text-center mb-0">
                    <thead>
                        <tr>
                            <th className="crop-table-heading">#</th>
                            <th className="crop-table-heading">Crop</th>
                            <th className="crop-table-heading">Quantity</th>
                            <th className="crop-table-heading">Order Date</th>
                            <th className="crop-table-heading">Status</th>
                            <th className="crop-table-heading">Change Status</th>
                            <th className="crop-table-heading">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>

                                <td>
                                    {order.cropName || `Crop ${order.cropId}`}
                                </td>

                                <td>
                                    {Number(order.quantity).toLocaleString()} kg
                                </td>

                                <td>{order.orderDate}</td>

                                <td>
                                    <StatusBadge status={order.status} />
                                </td>

                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={order.status}
                                        onChange={(event) =>
                                            handleStatusChange(
                                                order.id,
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>

                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-success"
                                            onClick={() => {
                                                if (onEdit) {
                                                    onEdit(order);
                                                } else {
                                                    navigate("/harvest-orders/create", {
                                                        state: { order },
                                                    });
                                                }
                                            }}

                                        >
                                            Edit
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => handleDelete(order)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default OrdersTable;
