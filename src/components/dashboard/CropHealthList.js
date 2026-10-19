import StatusBadge from "../common/StatusBadge.js";
import { useContext } from "react";
import AppContext from "../../context/AppContext.js";


function CropHealthList() {
    const { crops } = useContext(AppContext);

    return (
        <div className="card crop-health-card border-0 h-100">
            <div className="card-body px-5 py-4">

                {/* Card Heading  */}
                <h5 className="mb-1" style={{fontSize: "20px", fontWeight: "750", color: "#26653d" }}>
                    Crop Health
                </h5>

                <p className="mb-4 text-secondary" style={{fontSize: "15px"}}>
                    Monitor the health of your crops.
                </p>

                {/* Crop List  */}
                <div >
                    {crops.map((crop) => (
                        <div key={crop.id} className="crop-health-item">
                            <div className="d-flex justify-content-between align-items-center mb-0 mx-2">
                                <span className="crop-name text-black" style={{fontSize: "16px", fontWeight: "600"}}>
                                    {crop.name}
                                </span>

                                <StatusBadge status={crop.status} />
                            </div>

                            <div className="d-flex align-items-center gap-3">
                                <div className="progress crop-progress flex-grow-1" role="progressbar" aria-label={`${crop.name} health`} aria-valuenow={crop.healthScore} aria-valuemin="0" aria-valuemax="100" >
                                    <div className={`progress-bar progress-bar-striped ${crop.status === "Healthy" ? "bg-success" : crop.status === "Needs Attention" ? "bg-warning" : "bg-danger" }`}
                                        style={{ width: `${crop.healthScore}%` }}
                                    />
                                </div>

                                <span className="crop-health-percentage">
                                    {crop.healthScore}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CropHealthList;
