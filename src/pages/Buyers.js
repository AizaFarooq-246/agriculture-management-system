import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import AppContext from "../context/AppContext.js";
import BuyerTable from "../components/buyers/BuyerTable.js";
import BuyerDetailsModal from "../components/buyers/BuyerDetailsModal.js";
import SearchBar from "../components/common/SearchBar.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";


function Buyers() {
    const navigate = useNavigate();
    const { buyers, setBuyers, setCrops } = useContext(AppContext);
    const [selectedBuyer, setSelectedBuyer] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter Data 
    const filteredBuyers = buyers.filter((buyer) =>
        buyer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        buyer.cnic.includes(searchTerm)
    );

    //  Function to Delete Buyer Record 
    function handleDelete(buyerToDelete) {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${buyerToDelete.fullName}'s sale record?`
        );

        if (!confirmDelete) return;

        // Remove buyer's sales record.
        setBuyers((previousBuyers) =>
            previousBuyers.filter(
                (buyer) => buyer.id !== buyerToDelete.id
            )
        );

        // Return the sold quantity to crop stock.
        setCrops((previousCrops) =>
            previousCrops.map((crop) =>
                String(crop.id) === String(buyerToDelete.cropId)
                    ? {
                        ...crop,
                        availableStock:
                            Number(crop.availableStock ?? 0) +
                            Number(buyerToDelete.quantity),
                    }
                    : crop
            )
        );

        alert("Sales record deleted successfully!");
    }


    return (
        <div>
            <h2 className="fw-bold" style={{ color: "#2a5a38" }} >Buyers Management</h2>

            <p className="text-secondary mb-5">
                Manage buyer details and crop sales records.
            </p>


            {/* Actions Row: Add Button + Search Bar */}
            <div className="buyers-actions-row d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

                <button
                    type="button"
                    className="btn add-crop buyers-add-btn"
                    onClick={() => navigate("/buyers/form")}
                >
                    <FontAwesomeIcon icon={faPlusCircle} className=" me-2"/>
                    Add Sales Record
                </button>

                <div className="buyers-search">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search by buyer name or CNIC..."
                    />
                </div>

            </div>


            <BuyerTable
                buyers={filteredBuyers}
                onView={(buyer) => setSelectedBuyer(buyer)}
                onEdit={(buyer) =>
                    navigate("/buyers/form", {
                        state: { editBuyer: buyer },
                    })
                }
                onDelete={handleDelete}
            />

            <BuyerDetailsModal
                buyer={selectedBuyer}
                onClose={() => setSelectedBuyer(null)}
            />
        </div>
    );
}

export default Buyers;
