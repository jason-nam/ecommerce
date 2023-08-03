
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
        e.preventDefault()
        ref.current.classList.toggle('active') //input 
        ref.current.previousSibling.classList.add('active') // close button
        setTimeout( () => {
            ref.current.nextSibling.classList.add('active') //search button
        }, 450)
        ref.current.nextSibling.nextSibling.classList.add('active') //search toggle button
        ref.current.parentElement.classList.add('active')
        searchRef.current.forEach(x => x.style.display = "none");
    }

    const mobileSearchClose = (e) => {
        e.preventDefault()
        ref.current.classList.toggle('active') //input 
        ref.current.previousSibling.classList.remove('active') // close button
        ref.current.nextSibling.classList.remove('active') //search button
        ref.current.nextSibling.nextSibling.classList.remove('active') //search toggle button
        ref.current.parentElement.classList.remove('active')
        searchRef.current.forEach(x => x.style.display = "flex");
    }


    return (
        <>
            <form onSubmit={doSearch} className="search-bar-universal" id="search-form-onSubmit">
                <button 
                    className="mobile-search-close" 
                    id="mobile-search-close"
                    onClick={mobileSearchClose}
                >
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
                    className="mobile-search-button" 
                    id="mobile-search-button"
                    onClick={mobileSearchOpen}
                    >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </>
    )
} 