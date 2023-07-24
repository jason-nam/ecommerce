import { Link } from "react-router-dom";

export default function Pagination ({page, limit, search, category, productsCount}) {

    let curPage = !page ? 1 : Number(page),
        nextPage = null,
        prevPage = null,
        totalPage = !limit ? (Number(productsCount) / 10) : Number(productsCount)/limit
    if (totalPage > curPage) {
        nextPage = curPage + 1;
    }
    if (curPage > 1)
        prevPage = curPage - 1;

    return (
        <div className="pagination">
        <Link to={`/products?page=${prevPage}${!limit ? `` : `&limit=${limit}`}${!search ? `` : `&search=${search}`}${!category ? `` : `&category=${category}`}`}>
            <div className='prev-page' 
            style={{display: prevPage ? 'block' :'none'}}>Prev</div>
        </Link>
        <div className='cur-page'>{curPage}</div>
        <Link to={`/products?page=${nextPage}${!limit ? `` : `&limit=${limit}`}${!search ? `` : `&search=${search}`}${!category ? `` : `&category=${category}`}`}>
            <div className='next-page'
            style={{display: nextPage ? 'block' : 'none'}}>Next</div>
        </Link>
    </div>
    )
}

