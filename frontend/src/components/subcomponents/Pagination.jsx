import { useNavigate, createSearchParams } from "react-router-dom";
import {useEffect, useState} from "react";


export default function Pagination ({searchParams, productsCount}) {
    const page = searchParams.get("page"),
    limit = searchParams.get("limit"),
    search = searchParams.get("search"),
    category = searchParams.get("category");

    let curPage = !page ? 1 : Number(page),
    nextPage = null,
    prevPage = null,
    totalPage = !limit ? Math.ceil(Number(productsCount) / 12) : Math.ceil(Number(productsCount)/limit)
    if (totalPage > curPage) {
        nextPage = curPage + 1;
    }
    if (curPage > 1)
        prevPage = curPage - 1;

    const navigate = useNavigate();

    const prevClick = (e) => {
        e.preventDefault()
        navigate({
            pathname: '/products',
            search: `?${createSearchParams({ 
                page: prevPage, 
                limit: limit? limit: '', 
                search: search? search: '', 
                category: category? category: ''
            })}`
        });    
    }

    const nextClick = (e) => {
        e.preventDefault()
        navigate({
            pathname: '/products',
            search: `?${createSearchParams({ 
                page: nextPage, 
                limit: limit? limit: '', 
                search: search? search: '', 
                category: category? category: ''
            })}`
        });    
    }

    return (
        <div className="pagination">
            <button className='prev-page' 
            onClick={prevClick}
            style={{visibility: prevPage ? 'visible' :'hidden'}}>Previous</button>
            <div className='cur-page'>Page {curPage} out of {totalPage}</div>
            <button className='next-page' 
            onClick={nextClick}
            style={{visibility: nextPage ? 'visible' : 'hidden'}}>Next</button>
    </div>
    )
}

