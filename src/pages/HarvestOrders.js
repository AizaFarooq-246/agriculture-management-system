import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWheatAwn, faArrowUpRightFromSquare, faChartLine, } from "@fortawesome/free-solid-svg-icons";
import HarvestSummary from "../components/harvest/HarvestSummary.js";
import OrdersSummary from "../components/harvest/OrdersSummary.js";
import StockProgressBar from "../components/harvest/StockProgressBar.js";
import HarvestChart from "../components/harvest/HarvestChart.js";



function HarvestOrders() {
    const navigate = useNavigate();

    return (
        <div>
            {/* Page Header */}
            <div className="harvest-header">
                <div >
                    <h2 className="fw-bold " style={{ color: "#2a5a38" }}>Harvest & Orders</h2>
                    <p className="text-secondary">
                        Monitor your harvest, manage orders, and track
                        your available stock in one place.
                    </p>
                </div>

                <button
                    type="button"
                    className="add-crop"
                    onClick={() => navigate("/harvest-orders/create")}
                >
                    <FontAwesomeIcon icon={faPlus} className="me-1" />
                    Create Order
                </button>
            </div>


            {/* Harvest Summary */}
            <section className="harvest-section">
                <div className="harvest-section-heading">
                    <div>
                        <h5 className="text-success">Harvest Summary</h5>
                    </div>
                    <div className="harvest-section-icon">
                        <FontAwesomeIcon icon={faWheatAwn} />
                    </div>
                </div>
                <HarvestSummary />
            </section>


            {/* Orders Summary */}
            <section className="harvest-section">
                <div className="harvest-section-heading">
                    <div>
                        <h5 className="text-success">Orders Summary</h5>
                    </div>

                    <button type="button" className="btn btn-outline-success harvest-secondary-btn"
                        onClick={() =>
                            navigate("/harvest-orders/all-orders")
                        }
                    >
                        View All Orders
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="ms-2" />
                    </button>
                </div>
                <OrdersSummary />
            </section>



            {/* Stock Progress */}
            <StockProgressBar />


            {/* Harvest Chart */}
            <section className="harvest-section" style={{backgroundColor: " #a9a9a937"}}>
                <div className="harvest-section-heading">
                    <div>
                        <span className="small text-secondary">
                            FARM PERFORMANCE
                        </span>
                        <h5 className="text-success">Harvest Overview</h5>
                    </div>

                    <div className="harvest-section-icon">
                        <FontAwesomeIcon icon={faChartLine} />
                    </div>
                </div>

                <HarvestChart />
            </section>

        </div>
    );
}

export default HarvestOrders;
