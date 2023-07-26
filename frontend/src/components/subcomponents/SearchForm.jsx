
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SearchForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchForm() {

    const [searchVal, setSearchVal] = useState("")
    const navigate = useNavigate();
    
    // redirect to search result
    const doSearch = (e) => {
        e.preventDefault();
        navigate(`/products?search=${searchVal}`)  
    }

    return (
        // <div className="search-form">
            <form onSubmit={doSearch} id="search-form-onSubmit">
                <input 
                    placeholder="Search"
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    id = "search-bar"
                    type = "search"
                    className = "search-bar"                 
                    />
                <button type="submit" id="search-button">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>  
            </form>
        // </div>
    )
} 