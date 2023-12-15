import React, { useEffect } from 'react'
import "./listUser.css"
import ReactPaginate from 'react-paginate'
import { useLazyGetUsersQuery,  } from '../../app/service/userApi'
import { Link } from 'react-router-dom';
function ListUser() {
  const [getData, { data, isLoading }] = useLazyGetUsersQuery();
  useEffect(() => {
    getData(
      {
        page: 0,
        pageSize: 4,
      }
    );
  }, [])

  const handlePageClick = (page) => {
    getData(
      {
        page: page.selected,
        pageSize: 4
      }
    );
  }

  if (isLoading) {
    return <h2>Is Loading </h2>
  }

  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
      <div className="main">
        <div className="content-page">
          <div className="content">
            {/* Start Content*/}
            <div className="container-fluid">
              {/* start page title */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box">

                    <h4 className="page-title">Agents</h4>
                  </div>
                </div>
              </div>
              {/* end page title */}
              <div className="row">
                <div className="col-lg-12">
                  <div className="card-box">
                    <div className="row">
                      <div className="col-sm-8">
                        <form>
                          <div className="form-group search-box">
                            <input type="text" id="search-input" className="form-control product-search" placeholder="Search here..." />
                         
                          </div>
                        </form>
                      </div>
                      <div className="col-sm-4">
                      <button type="submit" className="btn btn-search btn-primary"><i className="fa fa-search" /></button>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover agents-mails-checkbox m-0  table-centered table-actions-bar">
                        <thead>
                          <tr>
                            <th>Avatar</th>
                            <th>Email</th>
                            <th>FullName</th>
                            <th>Contact No.</th>
                            <th>Address</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.content.map((e) => (
                            <tr className="active">
                              <td>
                                <img src={e?.avatar} alt="contact-img" title="contact-img" class="img-thumbnail rounded-circle" height="100px" width="50px" />
                              </td>
                              <td>
                                <Link href="#">{e?.email}</Link>
                              </td>
                              <td>
                                <Link href="#">{e?.name}</Link>
                              </td>
                              <td>
                                {e?.phone}
                              </td>
                              <td className='pg-3'>
                                {e?.address}
                              </td>
                              <td>
                                <a class="m-n5">
                                  <Link type="button" class="btn btn-eye btn-primary m-2" to={`/admin/user/${e?.id}`}><i class="fa fa-eye"></i></Link>
                                  <button type="button" class="btn btn-square btn-danger m-2"><i class="fa fa-remove"></i></button>

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

                  <div>

                  </div>
                </div>

              </div>

            </div>

          </div>
          <nav className="my-4" aria-label="...">
            <ul className="pagination pagination-circle justify-content-center">

              <ReactPaginate
                nextLabel="Next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={2}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(data?.totalPages)}
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
        {/* ============================================================== */}
        {/* End Page content */}
        {/* ============================================================== */}
      </div>
      {/* END wrapper */}
      {/* Modal */}









    </>
  )
}

export default ListUser