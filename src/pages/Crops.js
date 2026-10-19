import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import CropTable from "../components/crops/CropTable.js";
import SearchBar from "../components/common/SearchBar.js";
import useDebounce from "../hooks/useDebounce.js";


function Crops() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 300);
    const { crops, setCrops } = useContext(AppContext);
    const navigate = useNavigate();

    // Filtered Crops 
    const filteredCrops = useMemo(() => {
        return crops.filter((crop) =>
            crop.name.toLowerCase().includes(debouncedSearch.trim().toLowerCase())
        );
    }, [crops, debouncedSearch]);


    function handleAdd() {
        navigate("/crops/form");
    }

    function handleEdit(crop) {
        navigate("/crops/form", {
            state: { crop },
        });
    }

    function handleDelete(id) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this crop?"
        );

        if (!confirmed) return;

        setCrops((previousCrops) =>
            previousCrops.filter((crop) => crop.id !== id)
        );
    }

    return (
        <div>
            <h2 className="fw-bold" style={{ color: "#2a5a38" }}>
                Crops Management
            </h2>

            <p className="text-secondary mb-4">
                Manage your crops and monitor their health.
            </p>

            {/* Search Bar — table se pehle */}
            <div className="row mb-2  justify-content-end">
                <div className="col-12 col-md-5">
                    <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search crops by name..."
                        label="Search Crops"
                    />
                </div>
            </div>

            {/* Crop Table  */}
            <CropTable
                crops={filteredCrops}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default Crops;
