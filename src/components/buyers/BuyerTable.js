import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";


function BuyerTable({ buyers, onEdit, onDelete, onView }) {
    return (
        <div className="card border-0 shadow-sm rounded-4 mt-4"  style={{backgroundColor: "rgba(155, 210, 235, 0.39)"}}>
            <div className="card-body p-3 p-md-4">
                <h4 className="fw-bold text-success mb-4">
                    Buyer Sales Records
                </h4>

                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle text-center">
                        <thead>
                            <tr>
                                <th className="crop-table-heading">Photo</th>
                                <th className="crop-table-heading">Buyer Name</th>
                                <th className="crop-table-heading">CNIC</th>
                                <th className="crop-table-heading">Crop</th>
                                <th className="crop-table-heading">Quantity</th>
                                <th className="crop-table-heading">Sale Date</th>
                                <th className="crop-table-heading">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {buyers.length > 0 ? (
                                buyers.map((buyer) => (
                                    <tr key={buyer.id}>
                                        <td>
                                            <img
                                                src={buyer.photo}
                                                alt={buyer.fullName}
                                                style={{
                                                    width: "45px",
                                                    height: "45px",
                                                    objectFit: "cover",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        </td>
                                        <td>{buyer.fullName}</td>
                                        <td>{buyer.cnic}</td>
                                        <td>{buyer.cropName}</td>
                                        <td>
                                            {Number(buyer.quantity).toLocaleString()} kg
                                        </td>
                                        <td>{buyer.saleDate}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-info"
                                                    onClick={() => onView(buyer)}
                                                >
                                                    <FontAwesomeIcon icon={faEye} className="me-1" />
                                                    View
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-warning"
                                                    onClick={() => onEdit(buyer)}
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} className="me-1" />
                                                     Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => onDelete(buyer)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className="me-1" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-5 text-secondary">
                                        No buyer sales recorded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BuyerTable;
