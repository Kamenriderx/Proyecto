const Page = (props) =>{


    return(

        <li onClick={()=>props.setPage({...props.pagination,page:props.page})} className={`w-1/12 text-center border h-full flex justify-center items-center hover:bg-gray-200 cursor-pointer `}>{props.page}</li>
    );
}

const Pagination = (props) =>{
    const pages = [];
    for(let i = 0;i<props.pagination.pages;i++){
        pages.push(i+1);
    }
    return(
        <div className="w-2/3 h-10 my-3 ">
            <ul className="flex flex-row w-full justify-center content-center  h-full">
                {pages.map(page=><Page setPage={props.setPagination} page={page}  pagination = {props.pagination}></Page>)}

            </ul>

        </div>

    );

}

export default Pagination;