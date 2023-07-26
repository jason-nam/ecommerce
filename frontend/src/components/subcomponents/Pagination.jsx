import { useNavigate, createSearchParams } from "react-router-dom";

export default function Pagination ({searchParams, productsCount}) {
    const page = searchParams.get("page"),
    limit = searchParams.get("limit"),
    search = searchParams.get("search"),
    category = searchParams.get("category");


    let curPage = !page ? 1 : Number(page),
        nextPage = null,
        prevPage = null,
        totalPage = !limit ? (Number(productsCount) / 10) : Number(productsCount)/limit
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
            style={{display: prevPage ? 'block' :'none'}}>Prev</button>
        <div className='cur-page'>{curPage}</div>
            <button className='next-page' 
            onClick={nextClick}
            style={{display: nextPage ? 'block' : 'none'}}>Next</button>
    </div>
    )
}

