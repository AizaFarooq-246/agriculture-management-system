
import { useContext } from "react";
import AppContext from "../../context/AppContext.js";
import StatCard from "../common/StatCard.js";
import { faShoppingCart, faClock, faCheckCircle } from "@fortawesome/free-solid-svg-icons";


function OrdersSummary() {
    const { orders } = useContext(AppContext);

    const totalOrders = orders.length;

    const pendingOrders = orders.filter(
        (order) => order.status === "Pending"
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order.status === "Delivered"
    ).length;

    return (
        <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
                <StatCard
                    icon={faShoppingCart}
                    title="Total Orders"
                    value={totalOrders}
                />
            </div>

            <div className="col-12 col-md-4">
                <StatCard
                    icon={faClock}
                    title="Pending Orders"
                    value={pendingOrders}
                />
            </div>

            <div className="col-12 col-md-4">
                <StatCard
                    icon={faCheckCircle}
                    title="Delivered Orders"
                    value={deliveredOrders}
                />
            </div>
        </div>
    );
}

export default OrdersSummary;
