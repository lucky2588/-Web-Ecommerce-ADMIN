import React, { useEffect } from 'react'
import "./notification.css"
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { useLazyGetNotificationInfoQuery } from '../../app/service/infoApi'
import moment from 'moment';
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { toast } from 'react-toastify'

function Notification() {
  const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
  const { chooseId } = useParams();
  const [getData, { data, isLoading }] = useLazyGetNotificationInfoQuery();
  const natigave = useNavigate();
  useEffect(() => {
    getData(
      {
        page: 0,
        pageSize: 10,
        chooseId: chooseId
      }
    );
  }, [])
  const currentDate = moment();

  const handlePageClick = (page)=> {
    getData(
      {
        page: page.selected,
        pageSize: 5,
        chooseId: chooseId
      }
    );
  }

  const setOptions = (e) => {
    natigave(`/admin/notification/${e}`)
    window.location.reload();
  }

  const handlenBtnDelete = async (id)=> {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const response = await axios.delete(`http://localhost:8888/api/v1/admin/deleteNotification/${id}`, config);
      toast.success("Delete seccesss !! ")
      getData(
        {
          page: 0,
          pageSize: 10,
          chooseId: chooseId
        }
      );
    } catch (err) {
      alert(err);
    }

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
      <br></br>
      <br></br>
      <br></br>
      <div className="app-wrapper">
        <div className="app-content pt-2 p-md-2 p-lg-4">
          <div className="container-xl">
            <div className="position-relative mb-3">
              <div className="row g-3 justify-content-between">
                <div className="col-auto">
                  <h1 className="app-page-title mb-0">Notifications</h1>
                </div>
                <div className="col-auto">
                  <div className="page-utilities">
                    <select defaultValue={chooseId} className="form-select form-select-sm w-auto" onChange={(e) => setOptions(e.target.value)}>
                      <option value="2">All</option>
                      <option value="0">User</option>
                      <option value="1">Admin</option>
                    </select>
                  </div>{/*//page-utilities*/}
                </div>
              </div>
            </div>
            {
              data?.content.map((e) => (
                <div className="app-card app-card-notification shadow-sm mb-4">
                  <div className="app-card-header px-4 py-3">
                    <div className="row g-3 align-items-center">
                      <div className="col-12 col-lg-auto text-center text-lg-start">

                        <div className="notification-type mb-3">
                          {e?.notificationStatus == "ACCOUNT" &&
                            (
                              <>
                                <span className="badge bg-warning">ACCOUNT</span>
                              </>
                            )
                          }
                          {e?.notificationStatus == "UPDATE" &&
                            (
                              <>
                                <span className="badge bg-info">UPDATE</span>
                              </>
                            )
                          }
                          {e?.notificationStatus == "ORDERS" &&
                            (
                              <>
                                <span className="badge bg-">ORDERS</span>
                              </>
                            )
                          }
                          {e?.notificationStatus == "COMMENT" &&
                            (
                              <>
                                <span className="badge bg-primary">COMMENT</span>
                              </>
                            )
                          }

                          {e?.notificationStatus == "BLOG" &&
                            (
                              <>
                                <span className="badge bg-info">BLOG</span>
                              </>
                            )
                          }
                           {e?.notificationStatus == "PRODUCT" &&
                            (
                              <>
                                <span className="badge bg-info">PRODUCT</span>
                              </>
                            )
                          }
                        </div>
                        <h3 className="notification-title mb-2">{e?.title}</h3>
                        <ul className="notification-meta list-inline mb-0">
                          <li className="list-inline-item">
                            <span>
                              <img class="mx-2 img-thumbnail rounded-circle" height="50px" width="50px" src={e?.avatar} alt="" />
                            </span>
                            {e?.username}
                          </li>
                          <li className="list-inline-item">|</li>
                          <li className="list-inline-item">
                            {new Date(...e?.createAt).toLocaleDateString()}

                          </li>
                        </ul>
                      </div>{/*//col*/}
                    </div>{/*//row*/}
                  </div>{/*//app-card-header*/}
                  <div className="app-card-body p-4">
                    <div className="notification-content"> {e?.content}</div>
                  </div>{/*//app-card-body*/}
                  <div className="app-card-footer px-2 py-1">
                    <button className="btn-custom btn btn-danger" onClick={()=>handlenBtnDelete(e?.id)} href="#">Delete
                    </button>
                  </div>{/*//app-card-footer*/}
                </div>
              )

              )
            }
          </div>{/*//container-fluid*/}
        </div>{/*//app-content*/}
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

      </div>{/*//app-wrapper*/}










    </>
  )
}

export default Notification