
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './SearchForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'


export default function SearchForm({searchRef}) {

    let ref = useRef(0)
    let formRef = useRef(0)

    const [searchVal, setSearchVal] = useState("")
    const navigate = useNavigate();


    // redirect to search result
    const doSearch = (e) => {
        e.preventDefault();
        if (searchVal.length){
            navigate(`/products?search=${searchVal}`)
            
            let inputBar = ref.current;
            let closeButton = inputBar.previousSibling;
            let searchButton = inputBar.nextSibling;
            let searchOpen = searchButton.nextSibling;
            let searchForm = inputBar.parentElement;   
            inputBar.classList.remove('active')
            closeButton.classList.remove('active') 
            searchButton.classList.remove('active')
            searchOpen.classList.remove('active')
            searchForm.classList.remove('active')
            searchRef.current.forEach(x => x.classList.remove('active'));
            ref.current.blur();
            setSearchVal('')
        }
    }


    const searchToggle = (e, num) => {
        e.preventDefault()

        let inputBar = ref.current;
        let closeButton = inputBar.previousSibling;
        let searchButton = inputBar.nextSibling;
        let searchOpen = searchButton.nextSibling;
        let searchForm = inputBar.parentElement;
        if (num === 1) {
            inputBar.classList.add('active')
            closeButton.classList.add('active')
            searchButton.classList.add('active')
            searchOpen.classList.add('active')
            searchForm.classList.add('active')
            searchRef.current.forEach(x => x.classList.add('active'));
            ref.current.focus()
        } 
        if (num ===0 ) {
            inputBar.classList.remove('active')
            closeButton.classList.remove('active') 
            searchButton.classList.remove('active')
            searchOpen.classList.remove('active')
            searchRef.current.forEach(x => x.classList.remove('active'));
            searchForm.classList.remove('active')
            ref.current.blur();    
        }
    }


    return (
        <div className="search-form" >
            <form onSubmit={doSearch} 
                className="search-bar-universal" 
                id="search-form-onSubmit"
                ref={formRef}
            >
                <div 
                    className="search-close" 
                    id="search-close" 
                    onClick={e => searchToggle(e, 0)}
                >
                    &times;
                </div>
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
                    id="search-open"
                    onClick={e => searchToggle(e, 1)}
                    >
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="search-open-icon" />
                </button>
            </form>
        </div>
    )
} 