
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './SearchForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'


export default function SearchForm({searchRef}) {

    const [searchVal, setSearchVal] = useState("")
    const navigate = useNavigate();

    // redirect to search result
    const doSearch = (e) => {
        e.preventDefault();
        navigate(`/products?search=${searchVal}`)
        ref.current.blur();
    }

    let ref = useRef(0)

    const mobileSearchOpen = (e) => {
        let inputBar = ref.current;
        let closeButton = inputBar.previousSibling;
        let searchButton = inputBar.nextSibling;
        let searchToggle = searchButton.nextSibling;
        let searchForm = inputBar.parentElement;
    
        e.preventDefault()
        inputBar.classList.add('active')
        closeButton.classList.add('active')
        setTimeout( () => {
            searchButton.classList.add('active')
        }, 450)
        searchToggle.classList.add('active')
        searchForm.classList.add('active')
        searchRef.current.forEach(x => x.style.display = "none");
    }

    const mobileSearchClose = (e) => {
        let inputBar = ref.current;
        let closeButton = inputBar.previousSibling;
        let searchButton = inputBar.nextSibling;
        let searchToggle = searchButton.nextSibling;
        let searchForm = inputBar.parentElement;
    
        e.preventDefault()
        inputBar.classList.remove('active')
        closeButton.classList.remove('active') 
        searchButton.classList.remove('active')
        searchToggle.classList.remove('active')
        searchForm.classList.remove('active')
        searchRef.current.forEach(x => x.style.display = "flex");
    }


    return (
        <div className="search-form">
            <form onSubmit={doSearch} className="search-bar-universal" id="search-form-onSubmit">
                <button 
                    type="button"
                    className="mobile-search-close" 
                    id="mobile-search-close" 
                    onClick={mobileSearchClose}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <input 
                    placeholder="Search"
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    id = "search-bar"
                    type = "search"
                    className = "search-bar"
                    ref={ref}
                    />
                <button type="submit" className="search-bar-universal" id="search-button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button> 
                <button 
                    type="button"
                    className="mobile-search-button" 
                    id="mobile-search-button"
                    onClick={mobileSearchOpen}
                    >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </div>
    )
} 