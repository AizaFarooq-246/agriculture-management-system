
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StatCard({ title, value, icon }) {
    return (
        <div className="card stat-card border-0 h-100">
            <div className="card-body p-4 d-flex flex-column justify-content-between">

                <div>
                    <div className="stat-icon mb-2">
                        <FontAwesomeIcon icon={icon} />
                    </div>

                    <p className="stat-title mb-1">
                        {title}
                    </p>
                </div>

                <div className="text-end mt-3">
                    <h3 className="stat-value mb-0">
                        {value}
                    </h3>
                </div>
            </div>
        </div>
    );
}

export default StatCard;
