
import { useContext } from "react";
import AppContext from "../../context/AppContext.js";
import StatCard from "../common/StatCard.js";
import {
    faWheatAwn,
    faTruckRampBox,
    faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

function HarvestSummary() {
    const { crops, buyers } = useContext(AppContext);

    const totalHarvested = crops.reduce(
        (total, crop) =>
            total + Number(crop.harvestQty || 0),
        0
    );

    const totalSold = buyers.reduce(
        (total, buyer) => total + Number(buyer.quantity || 0),
        0
    );

    const remainingStock = crops.reduce(
        (total, crop) =>
            total + Number(
                crop.availableStock ?? crop.harvestQty ?? 0
            ),
        0
    );

    return (
        <div className="row g-3 mb-4">
            <div className="col-12 col-md-4">
                <StatCard
                    icon={faWheatAwn}
                    title="Total Harvested"
                    value={`${totalHarvested.toLocaleString()} kg`}
                />
            </div>

            <div className="col-12 col-md-4">
                <StatCard
                    icon={faTruckRampBox}
                    title="Total Sold"
                    value={`${totalSold.toLocaleString()} kg`}
                />
            </div>

            <div className="col-12 col-md-4">
                <StatCard
                    icon={faWarehouse}
                    title="Remaining Stock"
                    value={`${remainingStock.toLocaleString()} kg`}
                />
            </div>
        </div>
    );
}

export default HarvestSummary;
