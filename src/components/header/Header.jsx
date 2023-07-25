import React, { useEffect, useState } from 'react'
import "./header.css"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/slice/authSlice';
import { useLazyGetNoticationOfAdminQuery, useLazyGetNoticationOfUserQuery } from '../../app/service/infoApi';
import { Button, Modal } from 'react-bootstrap';

function Header() {
  const { auth, isAuthenticated } = useSelector((state) => state.auth)
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [iconUser, setIconUser] = useState(true);
  const [nouticationOfUser, { data: usersNotication, isLoading }] = useLazyGetNoticationOfUserQuery();
 

  useEffect(() => {
      nouticationOfUser()
  }, [])



  function toggleCollapse(id) {
    setIconUser(!iconUser)
    const element = document.getElementById(id);
    element.classList.toggle('show');
  }

  const RefreshNotication = () => {
    nouticationOfUser()
  }
  const handleShowModal = () => {
    setShowModal(true);
};

const handleCloseModal = () => {
    setShowModal(false);
};

const handlenBtnLogout =  () => {
  dispatch(logout());
    navigate("/login")
};

  return (
    <>
      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">Admin Project Web</span>
          </a>
          <button className="btn bi bi-list toggle-sidebar-btn" onClick={() => handlenBtn(false)} />
        </div>{/* End Logo */}
        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search" /></button>
          </form>
        </div>{/* End Search Bar */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i class='far fa-bell'></i>
              </a>
            </li>{/* End Search Icon*/}
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i class='far fa-bell'></i>
                <span className="badge bg-primary badge-number">{usersNotication?.length}</span>
              </a>{/* End Notification Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have {usersNotication?.length} new notifications
                  <button onClick={() => RefreshNotication()} className="btn badge rounded-pill bg-primary p-2 ms-2">Refresh</button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                {
                  usersNotication?.length > 0 ? (
                    <>
                      {
                        usersNotication.map((e) => (
                          <>
                            <li className="notification-item">
                           {
                            e.notificationStatus == "ACCOUNT" && (
                              <i className="bi bi-person-circle text-warning" />
                            )
                           }
                             {
                            e.notificationStatus == "UPDATE" && (
                              <i className="bi bi-gear text-danger" />
                            )
                           }
                           {
                            e.notificationStatus == "COMMENT" && (
                              <i className="bi bi-chat-text text-primary" />
                            )
                           }
                            {
                            e.notificationStatus == "PRODUCT" && (
                              <i className="bi bi-database-check text-info" />
                            )
                           }
                               {
                            e.notificationStatus == "BLOG" && (
                              <i className="bi bi-database-check text-info" />
                            )
                           }
                              {
                            e.notificationStatus == "ORDERS" && (
                              <i className="bi bi-cart text-success" />
                            )
                           }
                            
                              <div>
                                <h4>{e.title}</h4>
                                <p>{e.content}</p>
                                <p>{new Date(...e?.createAt).toLocaleDateString() }</p>
                              </div>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                          </>
                        )

                        )
                      }
                    </>
                  ) : (
                    <>
                    <li className="notification-item">
                              <i className="bi bi-exclamation-circle text-warning" />
                              <div>
                                <h3>Not found notication in recently</h3>
                              </div>
                            </li>
                    </>
                  )
                }

              
                <li className="dropdown-footer">
                  <Link to={"/admin/notification/0"}>Show all notifications</Link>
                </li>
              </ul>{/* End Notification Dropdown Items */}
            </li>{/* End Notification Nav */}

            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown" onClick={() => toggleCollapse('profile1')}>
                <img src={auth.avatar} alt="Profile" className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">{auth.name}</span>
              </a>{/* End Profile Iamge Icon */}
              <Modal show={showModal} onHide={handleCloseModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <h3>Are you sure you want to sign out </h3>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Cancle
                                    </Button>
                                    <Button variant="danger" onClick={handlenBtnLogout}>
                                        Sure 
                                    </Button>
                                </Modal.Footer>
                            </Modal>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{auth.name}</h6>
                  {
                    auth.roles.map((e) => (
                      <span> {e.name} </span>
                    )
                    )
                  }

                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link to={"account"} className="dropdown-item d-flex align-items-center" >
                    <i className="bi bi-person text-center" />
                    <span>My Profile</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right" />
                    <button className="btn btn-danger btn-rounded " onClick={handleShowModal}>Sign Out </button>
                  </a>
                </li>
              </ul>{/* End Profile Dropdown Items */}
            </li>{/* End Profile Nav */}
          </ul>
        </nav>{/* End Icons Navigation */}
      </header>{/* End Header */}











    </>
  )
}

export default Header