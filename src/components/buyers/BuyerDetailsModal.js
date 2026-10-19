
function BuyerDetailsModal({ buyer, onClose }) {
    if (!buyer) return null;

    return (
        <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bold">
                            Buyer Details
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body text-center">
                        <img
                            src={buyer.photo}
                            alt={buyer.fullName}
                            className="rounded-circle mb-3"
                            style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "cover",
                            }}
                        />

                        <h5 className="fw-bold">{buyer.fullName}</h5>

                        <div className="text-start mt-4">
                            <p><strong>CNIC:</strong> {buyer.cnic}</p>
                            <p><strong>Crop:</strong> {buyer.cropName}</p>
                            <p>
                                <strong>Quantity:</strong>{" "}
                                {Number(buyer.quantity).toLocaleString()} kg
                            </p>
                            <p><strong>Sale Date:</strong> {buyer.saleDate}</p>
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => window.print()}
                        >
                            Print Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerDetailsModal;
