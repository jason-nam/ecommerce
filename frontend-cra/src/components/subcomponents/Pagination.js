
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
        <a href={`/products?page=${prevPage}${!limit ? `` : `&limit=${limit}`}${!search ? `` : `&search=${search}`}${!category ? `` : `&category=${category}`}`}>
            <div className='prev-page' 
            style={{display: prevPage ? 'block' :'none'}}>Prev</div>
        </a>
        <div className='cur-page'>{curPage}</div>
        <a href={`/products?page=${nextPage}${!limit ? `` : `&limit=${limit}`}${!search ? `` : `&search=${search}`}${!category ? `` : `&category=${category}`}`}>
            <div className='next-page'
            style={{display: nextPage ? 'block' : 'none'}}>Next</div>
        </a>
    </div>
    )
}

