import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


function SearchBar({ value, onChange, placeholder = "Search...",}) {
    return (
        <div className="search-wrapper">
            <FontAwesomeIcon
                icon={faSearch}
                className="search-icon"
            />

            <input
                type="search"
                className="form-control search-input"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

export default SearchBar;
