import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router'
import { useGetUserQuery, useLazyGetUserQuery } from '../../app/service/userApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useGetPaymentsQuery } from '../../app/service/orderApi';
import { Link } from 'react-router-dom';

function UserDetail() {
  const { userId } = useParams();
  const [getData, { data, isLoading }] = useLazyGetUserQuery();
  const { data: orders, isError } = useGetPaymentsQuery(userId);
  const { auth, isAuthenticated, token } = useSelector((state) => state.auth)

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    getData(userId);
  }, [])

  const myString = "ADMIN";
  const roles = data?.roles.map(role => role.name);
  const checkRole = roles?.includes(myString);

  if (checkRole) {
    return <Navigate to={"/"} />
  }
  const uptoBlogger = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/admin/uptoBlogger/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        })
      toast.success(`Update Seccess , User with Id ${userId} has role Blogger !!  `)
      getData(userId);
    } catch (err) {
      console.log(err)
    }
  }

  const removeBlogger = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/admin/removeBlogger/${userId}`, config);
      toast.success(`Update Seccess , User with Id ${userId}  remove Blogger !!  `)
      getData(userId);
    } catch (err) {
      console.log(err)
    }
  }
  const disabledUser = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/admin/disableUser/${userId}`);
      toast.success(`Disable User with  ${userId} success  !!  `)
      getData(userId);
    } catch (err) {
      console.log(err)
    }
  }

  const enableUser = async () => {
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/admin/enableUser/${userId}`);
      toast.success(`Enable User with  ${userId} success  !!  `)
      getData(userId);
    } catch (err) {
      console.log(err)
    }

  }

  if (isLoading && isError) {
    return <h2>Is Loading ..</h2>
  }
  return (
    <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
      <div className="">
        <h1>Profile</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Users</li>
            <li className="breadcrumb-item active">Profile</li>
          </ol>
        </nav>
      </div>{/* End Page Title */}
      <section className="section profile">
        <div className="row custom">
          <div className="col-xl-4 custom-avatar">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <img src={data?.avatar} alt="Profile" className="rounded-circle" />
                <h2>{data?.name}</h2>
                <h3>User</h3>
                <div className="social-links mt-2">
                  <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                  <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                  <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                  <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                {/* Bordered Tabs */}
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                  </li>

                  <li className="nav-item">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Transaction History</button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  <div className="tab-pane fade show active profile-overview" id="profile-overview">

                    <h5 className="card-title">Profile Details</h5>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Full Name</div>
                      <div className="col-lg-9 col-md-8">{data?.name}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Email</div>
                      <div className="col-lg-9 col-md-8">{data?.email}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Address</div>
                      <div className="col-lg-9 col-md-8">{data?.address}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Phone</div>
                      <div className="col-lg-9 col-md-8">{data?.phone}</div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Create At</label>
                      {
                        data != null && (
                          <div className="col-md-8 col-lg-9">
                            <input name="linkedin" type="text" className="form-control" id="Linkedin" disabled
                              defaultValue={new Date(...data.createAt).toLocaleDateString()}
                            />
                          </div>
                        )
                      }

                    </div>

                  </div>
                  <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                    <div className="row mb-3">
                      <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Update Role </label>
                      <div className="col-md-8 col-lg-9">

                        <div className="pt-2">
                          {
                            data?.roles.length === 2 ? (
                              <button href="#" className="btn btn-warning btn-sm" title="remove Blogger" onClick={removeBlogger}>
                                <i class="bi-person-dash"></i>

                              </button>
                            ) : (
                              <>
                                {
                                  data?.roles.length === 1 && data?.roles[0].name == "AUTHOR" ? (
                                    <>
                                      <button href="#" className="btn btn-warning btn-sm" title="remove Blogger" onClick={removeBlogger}>
                                        <i class="bi-person-dash"></i></button>
                                    </>
                                  ) : (
                                    <>
                                      <button href="#" className="btn btn-primary btn-sm" title="up to Blogger" onClick={uptoBlogger}>
                                        <i class="bi-person-plus"></i>
                                      </button>
                                    </>
                                  )
                                }
                              </>

                            )
                          }
                          {
                            data?.isEnable ? (
                              <>
                                <button href="#" onClick={disabledUser} className="btn btn-danger btn-sm mx-3" title="Disable this account ">
                                  <i class="bi-person-x"></i>
                                </button></>
                            ) : (
                              <>
                                <button href="#" onClick={enableUser} className="btn btn-warning btn-sm mx-3" title="Enable  this account ">
                                  <i class="bi-person-check"></i>

                                </button>
                              </>
                            )
                          }

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade pt-3" id="profile-change-password">
                    <div class="col-lg-12 grid-margin stretch-card">
                      <div class="card">
                        <div class="card-body">
                          <h4 class="card-title text-center">Basic Table</h4>

                          <div class="table-responsive">
                            <table class="table">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Total Price.</th>
                                  <th>Delivery</th>
                                  <th>Status</th>
                                  <th>Option</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  orders?.length > 0 ? (
                                    orders.map((e) => (
                                      <tr>
                                        <td>{e.id}</td>
                                        <td>{
                                          parseFloat(e.price).toLocaleString('en-US', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                            minimumIntegerDigits: 3,
                                          })
                                        } đ</td>
                                        <td>
                                          {new Date(...e.createAt).toLocaleDateString()}
                                        </td>
                                        <td>
                                          {
                                            e?.paymentStatus == "INITIAL" && (
                                              <span className="badge bg-primary">INITIAL</span>
                                            )
                                          }
                                          {
                                            e?.paymentStatus == "SUCCESS" && (
                                              <span className="badge bg-success">SUCCESS</span>
                                            )
                                          }
                                          {
                                            e?.paymentStatus == "PROCEED" && (
                                              <span className="badge bg-warning">PROCEED</span>
                                            )
                                          }
                                          {
                                            e?.paymentStatus == "Not_Receive" && (
                                              <span className="badge bg-danger">Not Receive</span>
                                            )
                                          }
                                          {
                                            e?.paymentStatus == "REFUND" && (
                                              <span className="badge bg-warning">REFUND</span>
                                            )
                                          }

                                          {
                                            e?.paymentStatus == "CANCLE" && (
                                              <span className="badge bg-danger">CANCLE</span>
                                            )
                                          }

                                        </td>
                                        <td>
                                <a class="m-n5">
                                  <Link type="button" className="btn btn-eye btn-primary m-2" to={`/admin/order/${e.id}`}><i class="fa fa-eye"></i></Link>
                                </a>
                              </td>
                                      </tr>
                                    )
                                    )

                                  ) : (
                                    <tr>
                                      <td>Emtpy </td>


                                    </tr>
                                  )
                                }


                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{/* End Bordered Tabs */}
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

export default UserDetail