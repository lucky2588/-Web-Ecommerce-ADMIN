import React, { useEffect } from 'react'
import "./product.css"
import { useLazyGetListQuery } from '../../app/service/productApi';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function ProductList() {
  const [getProducts, { data, isLoading }] = useLazyGetListQuery();
  useEffect(() => {
    getProducts(
      {
        page: 0,
        pageSize: 12,
      }
    );
  }, [])

  const handlePageClick = (page) => {
    getProducts(
      {
        page: page.selected-1,
        pageSize: 12
      }
    );
  }

  
  return (
    <>
      <div class="main">
        <div className="content mt-10">
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-md-14">
                <div className="card">
                  <div className="card-header">
                    <strong className="card-title">Data Table</strong>
                  </div>
                  <div className="card-body">
                    <table id="bootstrap-data-table-export" className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Describe</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                     {
                      data?.content.map((e)=>(
                        <tr>
                        <td>{e?.name}</td>
                        <td>{e?.content}</td>
                        <td>{e?.category.name}</td>
                        <td>
                        {
                            parseFloat(e?.price).toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              minimumIntegerDigits: 3,
                            })
                          }đ

                        </td>
                        <td>
                          <a class="m-n5">
                            <Link to={`${e?.id}`} type="button" class="btn btn-eye btn-primary m-2"><i class="fa fa-eye"></i></Link>
                            <Link type="button" class="btn btn-square btn-danger m-2"><i class="fa fa-remove"></i></Link>
                          </a>
                        </td>
                      </tr>
                      )
                      )
                     }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <nav className="my-4" aria-label="...">
          <ul className="pagination pagination-circle justify-content-center">

            <ReactPaginate
              nextLabel="Next>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              pageCount={data?.totalPages}
              previousLabel="< Prev"
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
          </ul>
        </nav>


      </div>








    </>
  )
}

export default ProductList