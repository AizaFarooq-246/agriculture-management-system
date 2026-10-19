import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext } from "react";
import AppContext from "../../context/AppContext.js";


ChartJS.register(ArcElement, Tooltip, Legend);

function CropHealthChart() {
    const { crops } = useContext(AppContext);

    const healthyCount = crops.filter(
        (crop) => crop.status === "Healthy"
    ).length;

    const attentionCount = crops.filter(
        (crop) => crop.status === "Needs Attention"
    ).length;

    const criticalCount = crops.filter(
        (crop) => crop.status === "Critical"
    ).length;


    //    Data that Show on Chart 
    const chartData = {
        labels: ["Healthy", "Needs Attention", "Critical"],
        datasets: [
            {
                data: [healthyCount, attentionCount, criticalCount],
                backgroundColor: [
                    "#01e1d9",
                    "#f0b429",
                    "#b50761",
                ],
                borderColor: "#ffffff",
                borderWidth: 3,
            },
        ],
    };


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 18,
                    usePointStyle: true,
                    pointStyle: "rect",
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const total = context.dataset.data.reduce(
                            (sum, value) => sum + value,
                            0
                        );

                        const percentage = (
                            (context.raw / total) * 100
                        ).toFixed(1);

                        return ` ${context.label}: ${context.raw} crops (${percentage}%)`;
                    },
                },
            },
        },
    };



    return (
        <div className="card crop-health-chart border-0 h-100">
            <div className="card-body px-5 py-4">

                {/* Card Heading  */}
                <h5 className=" mb-1" style={{ fontSize: "20px", fontWeight: "750", color: "#26653d" }}>
                    Crop Health Overview
                </h5>

                <p className="mb-4 text-secondary" style={{ fontSize: "15px" }}>
                    Overall health status of your crops.
                </p>

                {/* Pie Chart  */}
                <div className="crop-chart-wrapper">
                    <Pie data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}

export default CropHealthChart;