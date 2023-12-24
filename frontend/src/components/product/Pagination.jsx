export default function Pagination ({searchParams, setSearchParams, productsCount}) {
    const page = searchParams.get("page"),
    limit = searchParams.get("limit");

    let curPage = !page ? 1 : Number(page),
    nextPage = null,
    prevPage = null,
    totalPage = !limit ? Math.ceil(Number(productsCount) / 12) : Math.ceil(Number(productsCount)/limit)
    if (totalPage > curPage) {
        nextPage = curPage + 1;
    }
    if (curPage > 1)
        prevPage = curPage - 1;

    const changePage = (e, num) => {
        e.preventDefault()
        searchParams.delete('page')
        if (num===0)
            searchParams.set("page", prevPage)
        if (num===1)
            searchParams.set("page", nextPage)
        setSearchParams(searchParams)
    }

    return (
        <div className="pagination">
            <button className='prev-page' 
            onClick={e=> changePage(e, 0)}
            style={{visibility: prevPage ? 'visible' :'hidden'}}>Previous</button>
            <div className='cur-page'>{curPage} out of {totalPage}</div>
            <button className='next-page' 
            onClick={e =>changePage(e, 1)}
            style={{visibility: nextPage ? 'visible' : 'hidden'}}>Next</button>
    </div>
    )
}

