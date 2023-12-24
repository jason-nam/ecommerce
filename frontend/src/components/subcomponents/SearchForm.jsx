
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import './SearchForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

export default function SearchForm({headerRef}) {

    let formRef = useRef(0)

    const [searchVal, setSearchVal] = useState("")
    const navigate = useNavigate();


    // redirect to search result
    const doSearch = (e) => {
        e.preventDefault();
        if (searchVal.length){
            navigate(`/products?search=${searchVal.replace(/\s/g, '+')}`)
        }
    }


    const searchToggle = useCallback((e, num) => {
        let form = formRef.current;
        let inputBar = form.children[0];
        let searchOpen = form.children[4];
        if (num === 1) {
            formRef.current.classList.add('active')
            searchOpen.classList.add('active')
            searchOpen.classList.remove('not-active')
            headerRef.current.classList.add('active')
            inputBar.focus()
        } 
        if (num === 0 ) {
            formRef.current.classList.remove('active')
            searchOpen.classList.replace('active' , 'not-active')
            headerRef.current.classList.remove('active')
            inputBar.blur();
            setSearchVal('')
        }
    }, [formRef, setSearchVal])


    useEffect( () => {
        document.addEventListener('click', e => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                searchToggle(e, 0)
            }
        })

        return () => document.removeEventListener('click', e => {
            if (formRef.current && !formRef.current.contains(e.target)) {
                searchToggle(e, 0)
            }
        })
    },[searchToggle])

    useEffect( () => {
        if (searchVal.length) 
            formRef.current.children[1].style.display = "block";
        else
            formRef.current.children[1].style.display = "none";
    }, [searchVal, formRef])

    return (
        <div className="search-container" >
            <form onSubmit={doSearch} 
                className="search-bar-universal" 
                id="sf"
                ref={formRef}
            >
                <input 
                    placeholder="Search"
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                    id = "search-bar"
                    type = "search"
                    className = "search-bar"
                    onKeyDown={ e => e.key === "Escape" ? searchToggle(e, 0) : null }
                />
                <div className="search-clear" onClick={() => setSearchVal("")}>Clear</div>
                <div 
                    className="search-close" 
                    id="search-close" 
                    onClick={e => searchToggle(e, 0)}
                >
                &times;
                </div>
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