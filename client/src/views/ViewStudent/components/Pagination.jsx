const Page = (props) =>{



    return(

        <li className={`w-1/12 text-center border h-full flex justify-center items-center hover:bg-gray-200 cursor-pointer `}>{props.page}</li>
    );
}

const Pagination = (props) =>{
    const pages = [];
    for(let i = 0;i<10;i++){
        pages.push(i+1);
    }
    return(
        <div className="w-2/3 h-10 my-3 border">
            <ul className="flex flex-row w-full justify-evenly content-center  h-full">
                <li className="w-1/12 text-center ">...</li>
                {pages.map(page=><Page page = {page}></Page>)}
                <li className="w-1/12 text-center">...</li>

            </ul>

        </div>

    );

}

export default Pagination;