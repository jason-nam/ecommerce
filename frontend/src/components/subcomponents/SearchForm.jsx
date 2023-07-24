
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SearchForm() {

    const [searchVal, setSearchVal] = useState("")
    const navigate = useNavigate();
    
    // redirect to search result
    const doSearch = (e) => {
        e.preventDefault();
        navigate(`/products?search=${searchVal}`)
    }

    return (
        <div className="search-form">
            <form onSubmit={doSearch}>
                <input 
                    placeholder="search for product"
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    id = "search-bar"
                    type = "search"
                    className = "search-bar"                 
                    />
                <button type="submit">Search</button>  
            </form>
        </div>
    )
} 