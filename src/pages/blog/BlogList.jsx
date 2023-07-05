import React from 'react'
import "./css/blogList.css"
import { useLazyGetBlogsQuery } from '../../app/service/blogApi'
import ReactPaginate from 'react-paginate';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function BlogList() {
  const [getBlogs, { data, isLoading }] = useLazyGetBlogsQuery();
  useEffect(() => {
    getBlogs(
      {
        page: 0,
        pageSize: 6,
      }
    );
  }, [])

  if (isLoading) {
    return <h2>... Is Loading</h2>
  }
  const handlePageClick = (page) => {
    getBlogs(
      {
        page: page.selected,
        pageSize: 6
      }
    );
  }
  return (
    <>


      <div className="layout-fix">
        <div className="content-page">
          <div className="content">
            {/* Start Content*/}
            <div className="container-fluid">
              {/* start page title */}
              <div className="row info-custom">
                <div className="col-8">
                  <div className="page-title-box">
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item "><a>Zircos</a></li>
                        <li className="breadcrumb-item"><a>Blog </a></li>

                      </ol>
                      <div class="btn-group">
                        <button type="button" class="btn btn-info">Primary</button>
                        <button
                          type="button"
                          class="btn btn-info dropdown-toggle dropdown-toggle-split"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                          <li><a class="dropdown-item" >Action</a></li>
                          <li><a class="dropdown-item" >Another action</a></li>
                          <li><a class="dropdown-item">Something else here</a></li>
                          <li>
                            <hr class="dropdown-divider" />
                          </li>
                          <li><a class="dropdown-item" >Separated link</a></li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <h4 className="page-title text-center">Blog List</h4>
              {/* end page title */}
              <div className="row justify-content">
                <div className="col-lg-8">
                  <div className="row">
                    {
                      data?.content.map((e) => (
                        <div className="col-lg-4 col-md-10 mb-3">
                          <div className="p-2">
                            {/* Image Post */}
                            <div className="card blog-post">
                              <Link to={`view/${e?.id}`} className="bg-image hover-overlay ripple">
                                <img src={e?.thumbail} style={{ objectFit: 'cover' }}  className="img-fluid rounded w-100" />
                                <span className="badge badge-danger">Lifestyle</span>
                              </Link>
                              <div className="card-body">
                                <div className="text-muted"><span>by <a className="text-dark">{e?.user.name}</a>,</span> <span>{new Date(...e?.createAt).toLocaleDateString() }</span></div>
                                <div className="post-title">
                                  <h5 className="text-limit"><a>{e?.title}</a></h5>
                                </div>
                                <div>
                                  <p className="text-limit">{e?.content}</p>
                                </div>
                                <div className="text-right">
                                  <Link className="btn btn-danger btn-sm waves-effect waves-light mx-3" to={`blog/${e?.id}/${e?.statusBlog}`} >Update <i className="mdi mdi-arrow-right ml-1" />
                                  </Link>

                                  <Link className="btn btn-success btn-sm waves-effect waves-light" to={`view/${e?.id}`} >Read More <i className="mdi mdi-arrow-right ml-1" />
                                  </Link>
                                  </div>
                                  
                              </div>
                            </div>



                          </div>
                        </div>
                      )

                      )
                    }









































                  </div>
                  {/* end row */}
                </div>
              </div>


            </div>
            {/* end container-fluid */}
          </div>
          {/* end content */}
          {/* Footer Start */}

        </div>

        <nav className="my-4" aria-label="...">
          <ul className="pagination pagination-circle justify-content-center">

            <ReactPaginate
              nextLabel="Next>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
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

export default BlogList