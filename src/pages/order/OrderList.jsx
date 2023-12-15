import React, { useState } from 'react'
import { useLazyGetOrderAllQuery } from '../../app/service/orderApi'
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

function OrderList() {
  const [getData, { data: orders, isLoading }] = useLazyGetOrderAllQuery();
  const [choose, setChoose] = useState(1)
  const [time, setTime] = useState(1)
  useEffect(() => {
    getData(
      {
        page: 0,
        pageSize: 6,
        choose: choose == null ? 1 : choose,
        time: time
      }
    );
  }, [choose, time])

  const handlenBtnTime = (e) => {
    setTime(e)
    getData(
      {
        page: 0,
        pageSize: 6,
        choose: choose,
        time: time
      }
    );

  }
  const handlenBtnRefresh = () => {
    window.location.reload();
  }

  const handlenBtnChoose = (value) => {
    setChoose(value)
    getData(
      {
        page: 0,
        pageSize: 6,
        choose: choose,
        time: time
      }
    );
  }

  const handlePageClick = (page) => {
    getData(
      {
        page: page.selected,
        pageSize: 6,
        choose: choose,
        time: time
      }
    );

  }
  if (isLoading) {
    return <h2>Is Loading ...</h2>
  }


  return (
    <>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
      <br></br>
      <br></br>
      <br></br>
      <div className="app-content pt-3 p-md-3 p-lg-4 ">
        <div className="container-xl">
          <button onClick={handlenBtnRefresh} type="button" className="btn btn-success waves-effect waves-light mx-3 mb-3" to={"/admin/Own-blog"}>Refresh</button>
          <div className="row g-3 mb-4 align-items-center justify-content-between">
            <div className="col-auto">
              <h1 className="app-page-title mb-0">Orders</h1>
            </div>
            <div className="col-auto">
              <div className="page-utilities">
                <div className="row g-2 justify-content-start justify-content-md-end align-items-center">
                  <div className="col-auto">
                    <form className="table-search-form row gx-1 align-items-center">
                      <div className="col-auto">
                        <input type="text" id="search-orders" name="searchorders" className="form-control search-orders" placeholder="Search" />
                      </div>
                      <div className="col-auto">
                        <button type="submit" className="btn app-btn-secondary">Search</button>
                      </div>
                    </form>
                  </div>{/*//col*/}
                  <div className="col-auto">
                    <select onChange={(e) => setTime(e.target.value)} className="form-select w-auto">
                      <option value="1">All</option>
                      <option value="2">This week</option>
                      <option value="3">This month</option>

                    </select>
                  </div>
                  <div className="col-auto">
                    <a className="btn app-btn-secondary" href="#">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-download me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path fillRule="evenodd" d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                      Export PDF
                    </a>
                  </div>
                </div>{/*//row*/}
              </div>{/*//table-utilities*/}
            </div>{/*//col-auto*/}
          </div>{/*//row*/}
          <nav id="orders-table-tab" className="orders-table-tab app-nav-tabs nav shadow-sm flex-column flex-sm-row mb-4">
            <button onClick={() => setChoose(1)} className="flex-sm-fill text-sm-center nav-link" id="orders-all-tab" data-bs-toggle="tab" href="#orders-all" role="tab" aria-controls="orders-all" aria-selected="true">All</button>
            <button onClick={() => setChoose(2)} className="flex-sm-fill text-sm-center nav-link" id="orders-seccess-tab" data-bs-toggle="tab" href="#orders-seccess" role="tab" aria-controls="orders-seccess" aria-selected="false">Seccess</button>
            <button onClick={() => setChoose(3)} className="flex-sm-fill text-sm-center nav-link" id="orders-paid-tab" data-bs-toggle="tab" href="#orders-paid" role="tab" aria-controls="orders-paid" aria-selected="false">INITIAL</button>
            <button onClick={() => setChoose(4)} className="flex-sm-fill text-sm-center nav-link" id="orders-pending-tab" data-bs-toggle="tab" href="#orders-pending" role="tab" aria-controls="orders-pending" aria-selected="false">PROCEED</button>
            <button onClick={() => setChoose(5)} className="flex-sm-fill text-sm-center nav-link" id="orders-cancelled-tab" data-bs-toggle="tab" href="#orders-cancelled" role="tab" aria-controls="orders-cancelled" aria-selected="false">Cancelled</button>
          </nav>
          <div className="tab-content" id="orders-table-tab-content">
            <div className="tab-pane fade show active" id="orders-all" role="tabpanel" aria-labelledby="orders-all-tab">
              <div className="app-card app-card-orders-table shadow-sm mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th className="cell">Order</th>
                          <th className="cell">Customer</th>
                          <th className="cell">Date</th>
                          <th className="cell">Status</th>
                          <th className="cell">Total</th>
                          <th className="cell" />
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.content.length > 0 ? (<>
                          {orders.content.map((e) => (
                            <tr>
                              <td className="cell ">{e.id}</td>
                              <td className="cell">{e.user.name}</td>
                              <td className="cell"><span className="cell-data">{
                                new Date(...e.createAt).toLocaleDateString()
                              }</span></td>

                              {
                                e?.paymentStatus == "INITIAL" && (
                                  <td className="cell"><span className="badge bg-primary">INITIAL</span></td>

                                )
                              }
                              {
                                e?.paymentStatus == "Not_Receive" && (
                                  <td className="cell"><span className="badge bg-danger">Not Receive</span></td>

                                )
                              }
                              {
                                e?.paymentStatus == "REFUND" && (
                                  <td className="cell"><span className="badge bg-danger">REFUND</span></td>

                                )
                              }

                              {
                                e?.paymentStatus == "SUCCESS" && (
                                  <td className="cell"><span className="badge bg-success">SUCCESS</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "PROCEED" && (
                                  <td className="cell"><span className="badge bg-warning">PROCEED</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "CANCLE" && (
                                  <td className="cell"><span className="badge bg-danger">CANCLE</span></td>
                                )
                              }
                              <td className="cell">

                                {
                                  parseFloat(e.price).toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                    minimumIntegerDigits: 3,
                                  })
                                }đ
                              </td>
                              <td className="cell">

                                <a class="m-n2">
                                  <Link to={`/admin/order/${e.id}`} type="button" class="btn btn-eye btn-primary "><i class="fa fa-eye"></i></Link>
                                  <button type="button" class="btn btn-square btn-danger"><i class="fa fa-remove"></i></button>
                                </a>


                              </td>
                            </tr>
                          ))}

                        </>) : (<>
                          <tr>
                            <td className="cell">Not found Order </td>
                          </tr>
                        </>)}

                      </tbody>
                    </table>
                  </div>{/*//table-responsive*/}
                </div>{/*//app-card-body*/}
              </div>{/*//app-card*/}

            </div>
            <div className="tab-pane fade" id="orders-seccess" role="tabpanel" aria-labelledby="orders-seccess-tab">
              <div className="app-card app-card-orders-table mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th className="cell">Order</th>
                          <th className="cell">Customer</th>
                          <th className="cell">Date</th>
                          <th className="cell">Status</th>
                          <th className="cell">Total</th>
                          <th className="cell" />
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.content.length > 0 ? (<>
                          {orders.content.map((e) => (
                            <tr>
                              <td className="cell ">{e.id}</td>
                              <td className="cell">{e.user.name}</td>
                              <td className="cell"><span className="cell-data">{
                                new Date(...e.createAt).toLocaleDateString()
                              }</span></td>

                              {
                                e?.paymentStatus == "INITIAL" && (
                                  <td className="cell"><span className="badge bg-primary">INITIAL</span></td>

                                )
                              }
                              {
                                e?.paymentStatus == "SUCCESS" && (
                                  <td className="cell"><span className="badge bg-success">SUCCESS</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "PROCEED" && (
                                  <td className="cell"><span className="badge bg-warning">PROCEED</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "CANCLE" && (
                                  <td className="cell"><span className="badge bg-danger">CANCLE</span></td>
                                )
                              }
                              <td className="cell">

                                {
                                  parseFloat(e?.price).toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                    minimumIntegerDigits: 3,
                                  })
                                }đ
                              </td>
                              <td className="cell">

                                <a class="m-n2">
                                  <Link to={`/admin/order/${e.id}`} type="button" class="btn btn-eye btn-primary "><i class="fa fa-eye"></i></Link>
                                  <button type="button" class="btn btn-square btn-danger"><i class="fa fa-remove"></i></button>
                                </a>


                              </td>
                            </tr>
                          ))}

                        </>) : (<>
                          <tr>
                            <td className="cell">Not found Order </td>
                          </tr>
                        </>)}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="orders-paid" role="tabpanel" aria-labelledby="orders-paid-tab">
              <div className="app-card app-card-orders-table mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th className="cell">Order</th>
                          <th className="cell">Customer</th>
                          <th className="cell">Date</th>
                          <th className="cell">Status</th>
                          <th className="cell">Total</th>
                          <th className="cell" />
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.content.length > 0 ? (<>
                          {orders.content.map((e) => (
                            <tr>
                              <td className="cell ">{e.id}</td>
                              <td className="cell">{e.user.name}</td>
                              <td className="cell"><span className="cell-data">{
                                new Date(...e.createAt).toLocaleDateString()
                              }</span></td>

                              {
                                e?.paymentStatus == "INITIAL" && (
                                  <td className="cell"><span className="badge bg-primary">INITIAL</span></td>

                                )
                              }
                              {
                                e?.paymentStatus == "SUCCESS" && (
                                  <td className="cell"><span className="badge bg-success">SUCCESS</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "PROCEED" && (
                                  <td className="cell"><span className="badge bg-warning">PROCEED</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "CANCLE" && (
                                  <td className="cell"><span className="badge bg-danger">CANCLE</span></td>
                                )
                              }
                              <td className="cell">

                                {
                                  parseFloat(e.price).toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                    minimumIntegerDigits: 3,
                                  })
                                }đ
                              </td>
                              <td className="cell">

                                <a class="m-n2">
                                  <Link to={`/admin/order/${e.id}`} type="button" class="btn btn-eye btn-primary "><i class="fa fa-eye"></i></Link>
                                  <button type="button" class="btn btn-square btn-danger"><i class="fa fa-remove"></i></button>
                                </a>


                              </td>
                            </tr>
                          ))}

                        </>) : (<>
                          <tr>
                            <td className="cell">Not found Order </td>
                          </tr>
                        </>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="orders-pending" role="tabpanel" aria-labelledby="orders-pending-tab">
              <div className="app-card app-card-orders-table mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th className="cell">Order</th>
                          <th className="cell">Customer</th>
                          <th className="cell">Date</th>
                          <th className="cell">Status</th>
                          <th className="cell">Total</th>
                          <th className="cell" />
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.content.length > 0 ? (<>
                          {orders.content.map((e) => (
                            <tr>
                              <td className="cell ">{e.id}</td>
                              <td className="cell">{e.user.name}</td>
                              <td className="cell"><span className="cell-data">{
                                new Date(...e.createAt).toLocaleDateString()
                              }</span></td>

                              {
                                e?.paymentStatus == "INITIAL" && (
                                  <td className="cell"><span className="badge bg-primary">INITIAL</span></td>

                                )
                              }
                              {
                                e?.paymentStatus == "SUCCESS" && (
                                  <td className="cell"><span className="badge bg-success">SUCCESS</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "PROCEED" && (
                                  <td className="cell"><span className="badge bg-warning">PROCEED</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "CANCLE" && (
                                  <td className="cell"><span className="badge bg-danger">CANCLE</span></td>
                                )
                              }
                              <td className="cell">

                                {
                                  parseFloat(e.price).toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                    minimumIntegerDigits: 3,
                                  })
                                }đ
                              </td>
                              <td className="cell">

                                <a class="m-n2">
                                  <Link to={`/admin/order/${e.id}`} type="button" class="btn btn-eye btn-primary "><i class="fa fa-eye"></i></Link>
                                  <button type="button" class="btn btn-square btn-danger"><i class="fa fa-remove"></i></button>
                                </a>


                              </td>
                            </tr>
                          ))}

                        </>) : (<>
                          <tr>
                            <td className="cell">Not found Order </td>
                          </tr>
                        </>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="orders-cancelled" role="tabpanel" aria-labelledby="orders-cancelled-tab">
              <div className="app-card app-card-orders-table mb-5">
                <div className="app-card-body">
                  <div className="table-responsive">
                    <table className="table app-table-hover mb-0 text-left">
                      <thead>
                        <tr>
                          <th className="cell">Order</th>
                          <th className="cell">Customer</th>
                          <th className="cell">Date</th>
                          <th className="cell">Status</th>
                          <th className="cell">Total</th>
                          <th className="cell" />
                        </tr>
                      </thead>
                      <tbody>
                        {orders?.content.length > 0 ? (<>
                          {orders.content.map((e) => (
                            <tr>
                              <td className="cell ">{e.id}</td>
                              <td className="cell">{e.user.name}</td>
                              <td className="cell"><span className="cell-data">{
                                new Date(...e.createAt).toLocaleDateString()
                              }</span></td>

                              {
                                e?.paymentStatus == "INITIAL" && (
                                  <td className="cell"><span className="badge bg-primary">INITIAL</span></td>

                                )
                              }
                              {
                                e?.paymentStatus == "SUCCESS" && (
                                  <td className="cell"><span className="badge bg-success">SUCCESS</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "PROCEED" && (
                                  <td className="cell"><span className="badge bg-warning">PROCEED</span></td>
                                )
                              }
                              {
                                e?.paymentStatus == "CANCLE" && (
                                  <td className="cell"><span className="badge bg-danger">CANCLE</span></td>
                                )
                              }
                              <td className="cell">

                                {
                                  parseFloat(e?.price).toLocaleString('en-US', {
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                    minimumIntegerDigits: 3,
                                  })
                                }đ
                              </td>
                              <td className="cell">

                                <a class="m-n2">
                                  <Link to={`/admin/order/${e.id}`} type="button" class="btn btn-eye btn-primary "><i class="fa fa-eye"></i></Link>
                                  <button type="button" class="btn btn-square btn-danger"><i class="fa fa-remove"></i></button>
                                </a>


                              </td>
                            </tr>
                          ))}

                        </>) : (<>
                          <tr>
                            <td className="cell">Not found Order </td>
                          </tr>
                        </>)}
                      </tbody>
                    </table>
                  </div>{/*//table-responsive*/}
                </div>{/*//app-card-body*/}
              </div>{/*//app-card*/}
            </div>
          </div>
        </div>
        <nav className="my-4" aria-label="...">
          <ul className="pagination pagination-circle justify-content-center">

            <ReactPaginate
              nextLabel="Next>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={orders?.totalPages}
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

export default OrderList