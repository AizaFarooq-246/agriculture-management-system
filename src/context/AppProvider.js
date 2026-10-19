import { useEffect, useMemo } from "react";
import AppContext from "./AppContext.js";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialCrops } from "../data/seedData.js";


function AppProvider({ children }) {
    const [crops, setCrops] = useLocalStorage(
        "agri_crops",
        initialCrops.map((crop) => ({
            ...crop,
            availableStock: crop.availableStock ?? crop.harvestQty ?? 0,
        }))
    );

    const [orders, setOrders] = useLocalStorage(
        "agri_orders",
        []
    );

    const [buyers, setBuyers] = useLocalStorage(
        "agri_buyers",
        []
    );

    useEffect(() => {
        const needsMigration = crops.some(
            (crop) => crop.availableStock === undefined
        );

        if (needsMigration) {
            setCrops((previousCrops) =>
                previousCrops.map((crop) => ({
                    ...crop,
                    availableStock:
                        crop.availableStock ?? crop.harvestQty ?? 0,
                }))
            );
        }
    }, [crops, setCrops]);

    const contextValue = useMemo(
        () => ({
            crops,
            setCrops,
            orders,
            setOrders,
            buyers,
            setBuyers,
        }),
        [crops, setCrops, orders, setOrders, buyers, setBuyers]
    );

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
