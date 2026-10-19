import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoon, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/AgriGrow-Logo.png";


function Navbar({ onMenuClick }) {
    const todayDate = new Date().toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });


    return (
        <nav className="navbar navbar-expand sticky-top bg-success border-bottom px-4 py-2 shadow-sm" >
            <div className="container-fluid">

                {/* Left Side: Brand Name */}
                <Link to="/dashboard" className="navbar-brand d-flex align-items-center gap-2 text-white mb-0" >
                    <img src={logo} alt="AgriGrow Logo" className="brand-logo" />

                    <div className="d-flex flex-column">
                        <span className="fw-bold brand-name">AgriGrow</span>
                        <small className="brand-tagline">Smart Agriculture Management</small>
                    </div>
                </Link>

                {/* Right Side */}
                <div className="d-flex align-items-center gap-4">

                    {/* Date */}
                    <span className="text-white small d-none d-md-inline" >
                        {todayDate}
                    </span>

                    {/* Notification */}
                    <button className="btn btn-light border position-relative" type="button" aria-label="Notifications">
                        <FontAwesomeIcon icon={faBell} className="text-secondary" />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
                    </button>

                    {/* Dark Mode Button */}
                    <button
                        className="btn btn-light border"
                        type="button"
                        aria-label="Toggle dark mode"
                    >
                        <FontAwesomeIcon icon={faMoon} className="text-secondary" />
                    </button>

                    {/* Menu Button for Toggle SideBar */}
                    <button
                        className="btn btn-light border d-md-none me-2"
                        type="button"
                        aria-label="Open sidebar"
                        onClick={onMenuClick}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;