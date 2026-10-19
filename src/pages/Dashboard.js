import { useContext } from "react";
import AppContext from "../context/AppContext.js";
import StatCard from "../components/common/StatCard.js";
import WeatherCard from "../components/dashboard/WeatherCard.js";
import HumidityGuage from "../components/dashboard/HumidityGauge.js";
import CropHealthList from "../components/dashboard/CropHealthList.js";
import CropHealthChart from "../components/dashboard/CropHealthChart.js";
import CuttingSchedule from "../components/dashboard/CuttingSchedule.js";
import ForecastStrip from "../components/dashboard/ForecastStrip.js";
import { faSeedling, faWheatAwn, faShoppingCart, faUsers } from "@fortawesome/free-solid-svg-icons";


function Dashboard() {
    const { crops, orders, buyers } = useContext(AppContext);

    const totalHarvestKg = crops.reduce(
        (total, crop) => total + Number(crop.harvestQty || 0), 0);

    const totalHarvestTons = (totalHarvestKg / 1000).toFixed(1);
    const pendingOrders = orders.filter((order) => order.status === "Pending").length;

    const totalBuyers = new Set(
        buyers.map((buyer) => buyer.cnic.replace(/\D/g, ""))
    ).size;


    return (
        <div>
            <h2 className="fw-bold " style={{ color: "#2a5a38" }}>AgriGrow Dashboard</h2>
            <p className="text-secondary">Welcome back! Here's your farm overview.</p>

            {/* Summary Cards */}
            <div className="row g-3 mt-4">
                <div className="col-12 col-sm-6 col-xl-3">
                    <StatCard icon={faSeedling} title="Total Crops" value={crops.length} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <StatCard icon={faWheatAwn} title="Total Harvest" value={`${totalHarvestTons} tons`} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <StatCard icon={faShoppingCart} title="Total Orders" value={orders.length} />
                </div>
                <div className="col-12 col-sm-6 col-xl-3">
                    <StatCard icon={faUsers} title="Total Buyers" value={totalBuyers} />
                </div>
            </div>


            {/* WeatherCard & HumidityGuage */}
            <div className="row g-4 mt-4">
                <div className="col-12 col-lg-6">
                    <WeatherCard />
                </div>

                <div className="col-12 col-lg-6">
                    <HumidityGuage />
                </div>
            </div>


            {/* 5-Day Weather Forecast */}
            <div className="mt-5">
                <ForecastStrip />
            </div>


            {/* Crops Health List & Chart  */}
            <div className="row g-4 mt-3">
                <div className="col-12 col-lg-6">
                    <CropHealthList />
                </div>

                <div className="col-12 col-lg-6">
                    <CropHealthChart />
                </div>
            </div>

            {/* Cutting Schedule Table */}
            <div className="mt-5 mb-3">
                <CuttingSchedule />
            </div>
        </div>
    );
}

export default Dashboard;