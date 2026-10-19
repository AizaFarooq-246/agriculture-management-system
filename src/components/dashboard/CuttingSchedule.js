import { useContext } from "react";
import AppContext from "../../context/AppContext.js";
import StatusBadge from "../common/StatusBadge.js";


function CuttingSchedule() {
    const { crops } = useContext(AppContext);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const scheduledCrops = crops
        .filter((crop) => crop.cuttingDate)
        .map((crop) => {
            const cuttingDate = new Date(`${crop.cuttingDate}T00:00:00`);
            const daysRemaining = Math.round(
                (cuttingDate - today) / (1000 * 60 * 60 * 24)
            );

            return { ...crop, daysRemaining };
        })
        .sort((a, b) => a.daysRemaining - b.daysRemaining);

    function getScheduleStatus(days) {
        if (days < 0) return "Overdue";
        if (days === 0) return "Due Today";
        if (days <= 3) return "Due Soon";
        return "Upcoming";
    }

    return (
        <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-body p-3 p-md-4">
                <div className="mb-3">
                    <h5 className="fw-bold mb-1" style={{ color: "#26653d" }}>
                        Cutting Schedule
                    </h5>
                    <p className="text-secondary small mb-0">
                        Upcoming and overdue crop harvests
                    </p>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover table-striped align-middle text-center mb-0">
                        <thead>
                            <tr>
                                <th className="crop-table-heading">Crop</th>
                                <th className="crop-table-heading">Cutting Date</th>
                                <th className="crop-table-heading">Days Remaining</th>
                                <th className="crop-table-heading">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {scheduledCrops.length > 0 ? (
                                scheduledCrops.map((crop) => {
                                    const status = getScheduleStatus(
                                        crop.daysRemaining
                                    );

                                    const rowClass =
                                        crop.daysRemaining < 0
                                            ? "table-danger"
                                            : crop.daysRemaining === 0
                                                ? "table-warning"
                                                : "";

                                    return (
                                        <tr key={crop.id} className={rowClass}>
                                            <td className="fw-semibold">
                                                {crop.name}
                                            </td>

                                            <td>
                                                {new Date(
                                                    `${crop.cuttingDate}T00:00:00`
                                                ).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </td>

                                            <td>
                                                {crop.daysRemaining < 0
                                                    ? `${Math.abs(crop.daysRemaining)} days overdue`
                                                    : crop.daysRemaining === 0
                                                        ? "Today"
                                                        : `${crop.daysRemaining} days`}
                                            </td>

                                            <td>
                                                <StatusBadge status={status} className="px-3 py-2" />
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center text-secondary py-4"
                                    >
                                        No cutting dates scheduled.
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

export default CuttingSchedule;
