import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSeedling, faWheatAwn, faUserFriends } from "@fortawesome/free-solid-svg-icons";


function SideBar({ isOpen }) {
    return (
        <>
            {/* SideBar */}
            <aside className={`sidebar border-end p-3 ${ isOpen ? "sidebar-open" : "sidebar-closed" }`} >
                <div className="nav nav-pills flex-column gap-2 pt-2">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active bg-success text-white" : "nav-link text-black"}>
                        <FontAwesomeIcon icon={faHome} className="me-2" />
                        Dashboard
                    </NavLink>
                    <NavLink to="/crops" className={({ isActive }) => isActive ? "nav-link active bg-success text-white" : "nav-link text-black"}>
                        <FontAwesomeIcon icon={faSeedling} className="me-2" />
                        Crops
                    </NavLink>
                    <NavLink to="/harvest-orders" className={({ isActive }) => isActive ? "nav-link active bg-success text-white" : "nav-link text-black"}>
                        <FontAwesomeIcon icon={faWheatAwn} className="me-2" />
                        Harvest & Orders
                    </NavLink>
                    <NavLink to="/buyers" className={({ isActive }) => isActive ? "nav-link active bg-success text-white" : "nav-link text-black"}>
                        <FontAwesomeIcon icon={faUserFriends} className="me-2" />
                        Buyers
                    </NavLink>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
