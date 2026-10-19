
import { useContext, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import AppContext from "../../context/AppContext.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



function HarvestChart() {
    const { crops, buyers } = useContext(AppContext);

    const chartData = useMemo(() => {
        const activityByDate = {};

        // Planned harvest quantity by cutting date
        crops.forEach((crop) => {
            if (!crop.cuttingDate) return;

            const date = crop.cuttingDate;

            if (!activityByDate[date]) {
                activityByDate[date] = {
                    harvested: [],
                    sold: [],
                };
            }

            activityByDate[date].harvested.push({
                cropName: crop.name,
                quantity: Number(crop.harvestQty) || 0,
            });
        });

        // Actual sales quantity by sale date
        buyers.forEach((buyer) => {
            if (!buyer.saleDate) return;

            const date = buyer.saleDate;

            if (!activityByDate[date]) {
                activityByDate[date] = {
                    harvested: [],
                    sold: [],
                };
            }

            activityByDate[date].sold.push({
                cropName: buyer.cropName || "Unknown Crop",
                quantity: Number(buyer.quantity) || 0,
            });
        });

        const dates = Object.keys(activityByDate).sort();

        return {
            labels: dates,
            datasets: [
                {
                    label: "Planned Harvest (kg)",
                    data: dates.map((date) =>
                        activityByDate[date].harvested.reduce(
                            (total, item) => total + item.quantity,
                            0
                        )
                    ),
                    backgroundColor: "rgba(42, 90, 56, 0.8)",
                    cropDetails: dates.map(
                        (date) => activityByDate[date].harvested
                    ),
                },
                {
                    label: "Sales (kg)",
                    data: dates.map((date) =>
                        activityByDate[date].sold.reduce(
                            (total, item) => total + item.quantity,
                            0
                        )
                    ),
                    backgroundColor: "rgba(212, 160, 23, 0.8)",
                    cropDetails: dates.map(
                        (date) => activityByDate[date].sold
                    ),
                },
            ],
        };
    }, [crops, buyers]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Harvest and Sales Over Time",
            },
            tooltip: {
                callbacks: {
                    afterLabel: (context) => {
                        const items =
                            context.dataset.cropDetails?.[
                                context.dataIndex
                            ] || [];

                        if (items.length === 0) {
                            return "No crop activity";
                        }

                        return items.map(
                            (item) =>
                                `${item.cropName}: ${item.quantity.toLocaleString()} kg`
                        );
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Quantity (kg)",
                },
            },
        },
    };

    return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
                <div style={{ height: "350px" }}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}

export default HarvestChart;
