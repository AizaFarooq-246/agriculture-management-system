
import { useContext } from "react";
import AppContext from "../../context/AppContext.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheatAwn } from "@fortawesome/free-solid-svg-icons";



function StockProgressBar() {
    const { crops, buyers } = useContext(AppContext);

    return (
        <div className="card stock-progress border-0 mt-5 mb-5">
            <div className="card-body px-5 py-4">
                <div className="harvest-section-heading mb-5">
                    <div>
                        <span className="text-secondary small">
                            INVENTORY
                        </span>
                        <h5 className=" text-success" style={{fontWeight: "900"}}>
                            Stock Progress
                        </h5>
                    </div>
                    <div className="harvest-section-icon">
                        <FontAwesomeIcon icon={faWheatAwn} />
                    </div>
                </div>

                {crops.length === 0 ? (
                    <p className="text-secondary mb-0">
                        No crops available.
                    </p>
                ) : (
                    <div className="d-flex flex-column gap-4">
                        {crops.map((crop) => {
                            const harvestQty = Number(crop.harvestQty) || 0;

                            const soldQty = buyers
                                .filter(
                                    (buyer) =>
                                        String(buyer.cropId) ===
                                        String(crop.id)
                                )
                                .reduce(
                                    (total, buyer) =>
                                        total + Number(buyer.quantity || 0),
                                    0
                                );

                            const percentage =
                                harvestQty > 0
                                    ? Math.min(
                                        (soldQty / harvestQty) * 100,
                                        100
                                    )
                                    : 0;

                            return (
                                <div key={crop.id}>
                                    <div className="d-flex justify-content-between mb-1">
                                        <span className="fw-semibold">
                                            {crop.name}
                                        </span>
                                        <span className="small text-secondary ">
                                            {percentage.toFixed(1)}%
                                        </span>
                                    </div>

                                    <div
                                        className="progress crop-progress"
                                        role="progressbar"
                                        aria-label={`${crop.name} sold progress`}
                                        aria-valuenow={percentage}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ height: "10px" }}
                                    >
                                        <div
                                            className="progress-bar progress-bar-striped bg-success"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <small className="text-muted">
                                        {soldQty.toLocaleString()} /{" "}
                                        {harvestQty.toLocaleString()} kg sold
                                    </small>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default StockProgressBar;
