import StatusBadge from "../common/StatusBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";


function CropTable({ crops, onEdit, onDelete, onAdd }) {

    return (
        <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-body p-3 p-md-4" >

                {/* Table Header */}
                <div className=" d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4 mx-2">
                    <div>
                        <h5 className="fw-bold mb-2 text-success" style={{ fontSize: "26px" }}>
                            All Crops :
                            <span className="text-success mx-2"
                                style={{ fontSize: "30px" }}>
                                {crops.length}
                            </span>
                        </h5>
                    </div>

                    <button type="button" className="btn add-crop "
                        onClick={onAdd}
                    >
                        <FontAwesomeIcon icon={faPlus} className=" me-2" />
                        Add New Crop
                    </button>
                </div>



                {/* Crops Table */}
                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle text-center mb-0">
                        <thead >
                            <tr>
                                <th className="crop-table-heading">Crop Name</th>
                                <th className="crop-table-heading">Type</th>
                                <th className="crop-table-heading">Status</th>
                                <th className="crop-table-heading">Planting Date</th>
                                <th className="crop-table-heading">Cutting Date</th>
                                <th className="crop-table-heading">harvestQty</th>
                                <th className="crop-table-heading">Stock</th>
                                <th className="crop-table-heading">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {crops.length > 0 ? (
                                crops.map((crop) => (
                                    <tr key={crop.id}>
                                        <td className=" fw-semibold">
                                            {crop.name}
                                        </td>
                                        <td>{crop.type}</td>
                                        <td>
                                            <StatusBadge status={crop.status} className="px-3 py-2 rounded-pill" />
                                        </td>
                                        <td>{crop.plantingDate || "—"}</td>
                                        <td>{crop.cuttingDate || "—"}</td>
                                        <td>
                                            {Number(crop.harvestQty || 0).toLocaleString()} kg
                                        </td>
                                        <td>
                                            {Number(crop.availableStock ?? crop.harvestQty ?? 0).toLocaleString()} kg
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <button type="button" className="btn btn-sm btn-outline-success"
                                                    onClick={() => onEdit(crop)}
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} className="me-1" />
                                                    Edit
                                                </button>

                                                <button type="button" className="btn btn-sm btn-outline-danger"
                                                    onClick={() => onDelete(crop.id)}
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
                                    <td colSpan="8" className="text-center py-5">
                                        <p className="fw-semibold mb-1">No crops available</p>
                                        <p className="text-secondary small mb-0">
                                            Add your first crop to get started.
                                        </p>
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

export default CropTable;
