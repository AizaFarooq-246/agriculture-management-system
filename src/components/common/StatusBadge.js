

function StatusBadge({ status, className = "" }) {
    const statusColors = {
        "Healthy": "bg-success",
        "Needs Attention": "bg-warning text-dark",
        "Critical": "bg-danger",
        "Pending": "bg-warning text-dark",
        "Delivered": "bg-info",
        "Overdue": "bg-danger",
        "Due Today": "bg-warning text-dark",
        "Due Soon": "bg-warning text-dark",
        "Upcoming": "bg-info",
    };
    const badgeColor = statusColors[status] || "bg-secondary";


    return (
        <span className={`badge ${badgeColor} ${className}`}>
            {status}
        </span>
    );
}

export default StatusBadge;
