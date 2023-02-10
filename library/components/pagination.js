import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

function Items({ currentItems1, currentItems2, currentItems3 }) {
  
  let final_Arr=[];
  for(let i=0;i<currentItems1.length;i++){
    final_Arr.push({title:currentItems1[i],publish_year:currentItems2[i], author:currentItems3[i]})
  }
  return (
    <div id="display">
      <table className="ui striped table table-padding">
        <thead>
          <tr>
          <td className="table-width">Book Title</td>
          <td className="table-width">First Publish Year</td>
          <td className="table-width">Author Name</td>
          </tr>
        </thead>
        <tbody>
          {
            final_Arr.map((book)=>{
              return (<tr key={book.key}>
                <td className="table-width">{book.title}</td>
                <td className="table-width">{book.publish_year}</td>
                <td className="table-width">{book.author}</td>
              </tr>);
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default function PaginatedItems({ itemsPerPage, items1,items2,items3 }) {
  const [itemOffset, setItemOffset] = useState(0);
  // if(items1!==items1) setItemOffset(0)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems1 = items1.slice(itemOffset, endOffset);
  const currentItems2 = items2.slice(itemOffset, endOffset);
  const currentItems3 = items3.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items1.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items1.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div >
      <Items currentItems1={currentItems1} currentItems2={currentItems2} currentItems3={currentItems3} />
        <div  className="paginate">
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
    </div>
  );
}
