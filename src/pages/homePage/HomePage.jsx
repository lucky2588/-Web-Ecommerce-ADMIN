import React, { useState } from 'react'
import "./home.css"
import { useGetBlogsQuery, useGetInfoQuery, useLazyGetNoticationOfAdminQuery } from '../../app/service/infoApi'
import { Link } from 'react-router-dom';
import { useGetOrderTodayQuery } from '../../app/service/orderApi';
import { useGetTopCustomerQuery } from '../../app/service/userApi';
import { useSelector } from 'react-redux';
import { useLazyGetBlogsByAuthorQuery, useLazyGetBlogsQuery } from '../../app/service/blogApi';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function HomePage() {
    const { auth, isAuthenticated } = useSelector((state) => state.auth)
    const { data, isLoading } = useGetInfoQuery();
    const [getBlogs, { data: blogs }] = useLazyGetBlogsByAuthorQuery();
    const { data: orders } = useGetOrderTodayQuery();
    const { data: blogsNew } = useGetBlogsQuery();
    const { data: customers } = useGetTopCustomerQuery();
    const [nouticationOfAdmin, { data: adminNotication }] = useLazyGetNoticationOfAdminQuery();
    const roles = auth.roles.map((role) => role.name);
    const showRole = (authRoles, requireRoles) => {
        return authRoles.some((role) => requireRoles.includes(role));
    };
    const isShowMenu = (authRoles, requireRoles) => {
        return authRoles.some((role) => requireRoles.includes(role));
    };
    useEffect(() => {
        getBlogs(
            {
                page: 0,
                pageSize: 3,
            }
        );
        nouticationOfAdmin()
    }, [])



    console.log(adminNotication)
    const handlePageClick = (page) => {
        getBlogs(
            {
                page: page.selected,
                pageSize: 3
            }
        );
    }
    const handlenBtnRefresh = () => {
        nouticationOfAdmin()
    }
    if (isLoading) {
        return <h2> Is Loading ...</h2>
    }
    return (
        <>
            {
                isShowMenu(roles, ["ADMIN"]) ? (
                    <>
                        <div className='layout-main'>
                            <div className="pagetitle">
                                <h1>Dashboard</h1>
                                <nav>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                            <section className="section dashboard">
                                <div className="row">

                                    <div className="col-lg-8">
                                        <div className="row">

                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Option</h6>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#">View Detail</a></li>
                                                            <li><a className="dropdown-item" href="#">Create User</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">User <span>| Total</span></h5>
                                                        <div className="d-flex align-items-center">
                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i className="bi bi-person" />
                                                            </div>
                                                            <div className="ps-3">
                                                                <h6 className='text'>{data?.numsUser}</h6>
                                                                <span className="text-success small pt-1 fw-bold"> ACTIVE</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Option</h6>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#">View Detail</a></li>
                                                            <li><a className="dropdown-item" href="#">Create Blog</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Blog <span>| Total</span></h5>
                                                        <div className="d-flex align-items-center">
                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i class="bi-list-ol"></i>
                                                            </div>
                                                            <div className="ps-3">
                                                                <h6 className='text'>{data?.numsBlog}</h6>
                                                                <span className="text-success small pt-1 fw-bold"> PUBLIC</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Option</h6>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#">View Detail</a></li>
                                                            <li><a className="dropdown-item" href="#">Create </a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Product <span>| Total</span></h5>
                                                        <div className="d-flex align-items-center">
                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i class="bi-star"></i>
                                                            </div>
                                                            <div className="ps-3">
                                                                <h6 className='text'>{data?.numsProductBuy}</h6>
                                                                <span className="text-success small pt-1 fw-bold"> IN STOCK</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Option</h6>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#">View Detail</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Pending Orders <span>| Total</span></h5>
                                                        <div className="d-flex align-items-center">
                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i class="bi-cart-dash"></i>
                                                            </div>
                                                            <div className="ps-3">
                                                                <h6 className='text'>{data?.orderStatus}</h6>
                                                                <span className="text-success small pt-1 fw-bold"> INITIAL</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Option</h6>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#">View Detail</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title"> Processing<span>| Total</span></h5>
                                                        <div className="d-flex align-items-center">
                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i class="bi-truck"></i>
                                                            </div>
                                                            <div className="ps-3">
                                                                <h6 className='text'>{data?.orderProcess}</h6>
                                                                <span className="text-danger small pt-1 fw-bold">ARE BEING PROCEESING </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-xxl-4 col-md-6">
                                                <div className="card info-card sales-card">
                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Option</h6>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#">View Detail</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Sales <span>| Total</span></h5>
                                                        <div className="d-flex align-items-center">
                                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                                <i class="bi-cash-coin"></i>
                                                            </div>
                                                            <div className="ps-4">
                                                                <h6 className='text'>
                                                                    {
                                                                        parseFloat(data?.totalSales).toLocaleString('en-US', {
                                                                            minimumFractionDigits: 0,
                                                                            maximumFractionDigits: 0,
                                                                            minimumIntegerDigits: 3,
                                                                        })
                                                                    }đ
                                                                </h6>
                                                                <span className="text-danger small pt-1 fw-bold"> </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="card recent-sales overflow-auto">
                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Filter</h6>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#">View Detail</a></li>

                                                        </ul>
                                                    </div>

                                                    <div className="card-body">
                                                        <h5 className="card-title">Recent Sales  <span>| Two last day</span></h5>
                                                        {
                                                            orders?.length == 0 && (
                                                                <>
                                                                    <h5 className="card-title"> Not have order for two day </h5>
                                                                </>
                                                            )
                                                        }
                                                        {
                                                            orders?.length > 0 && (
                                                                <table className="table table-borderless datatable">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col ">Id </th>
                                                                            <th scope="col">Customer</th>
                                                                            <th scope="col">Note</th>
                                                                            <th scope="col">Price</th>
                                                                            <th scope="col">Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {
                                                                        orders.map((e) => (
                                                                            <tbody>
                                                                                <tr>
                                                                                    <th scope="row"><Link className='text-decoration-none'>{e?.id}</Link></th>
                                                                                    <td><Link className='text-decoration-none'>{e?.user.name}  </Link></td>
                                                                                    <td className='d-flex justify-content-between'><span href="#" className="text">
                                                                                        {e?.text != null ? (
                                                                                            <>
                                                                                                <span className='text-decoration-none'>{e?.text}.................</span>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <span className='text-decoration-none'>No message from customer</span>
                                                                                            </>
                                                                                        )
                                                                                        }
                                                                                    </span></td>
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
                                                                                            e?.paymentStatus == "CANCLE" && (
                                                                                                <span className="badge bg-danger">CANCLE</span>
                                                                                            )
                                                                                        }

                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>

                                                                        )
                                                                        )
                                                                    }
                                                                </table>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Reports */}
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Filter</h6>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">Reports <span>/Today</span></h5>
                                                        {/* Line Chart */}
                                                        <div id="reportsChart" />
                                                        {/* End Line Chart */}
                                                    </div>
                                                </div>
                                            </div>{/* End Reports */}
                                            {/* Recent Sales */}

                                            {/* Top Selling */}
                                            <div className="col-12">
                                                <div className="card top-selling overflow-auto">
                                                    <div className="filter">
                                                        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                            <li className="dropdown-header text-start">
                                                                <h6>Filter</h6>
                                                            </li>
                                                            <li><a className="dropdown-item" href="#">Today</a></li>
                                                            <li><a className="dropdown-item" href="#">This Month</a></li>
                                                            <li><a className="dropdown-item" href="#">This Year</a></li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-body pb-0">
                                                        <h5 className="card-title">Top Customers <span>| Info</span></h5>
                                                        <table className="table table-borderless">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">Avatar</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Nums Bill</th>
                                                                    <th scope="col">Revenue</th>


                                                                </tr>
                                                            </thead>
                                                            {
                                                                customers?.length > 0 && customers?.map((e) => (

                                                                    <tbody>
                                                                        <tr>
                                                                            <th scope="row"><a href="#"><img className='' src={e.thumbail} alt="" /></a></th>
                                                                            <td><a href="#" className="text-decoration-none">{e.username}</a></td>

                                                                            <td className="fw-bold ">
                                                                                {e.countBill}
                                                                            </td>
                                                                            <td>{
                                                                                parseFloat(e.getTotal).toLocaleString('en-US', {
                                                                                    minimumFractionDigits: 0,
                                                                                    maximumFractionDigits: 0,
                                                                                    minimumIntegerDigits: 3,
                                                                                })
                                                                            }</td>
                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                                )
                                                            }
                                                        </table>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">

                                        <div className="card">
                                            <div className="filter">
                                                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                    <li className="dropdown-header text-start">
                                                        <h6 className='text-center'>Filter</h6>
                                                    </li>
                                                    <li><button className="btn badge bg-primary my-2   dropdown-item" onClick={handlenBtnRefresh} >Refresh</button></li>

                                                    <li><Link className="btn badge  bg-info dropdown-item text-center" to={"/admin/notification/1"} >View All</Link></li>

                                                </ul>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">Recent Activity <span>| Today</span></h5>
                                                <div className="activity">
                                                    {
                                                        adminNotication?.length > 0 ? (
                                                            <>
                                                                {
                                                                    adminNotication.map((e) => (
                                                                        <>
                                                                            <div className="activity-item d-flex">
                                                                                <div className="activite-label">
                                                                                    {
                                                                                        new Date(...e.createAt).toLocaleDateString()
                                                                                    }

                                                                                </div>
                                                                                {
                                                                                    e.notificationStatus == "ACCOUNT" && (
                                                                                        <i className="bi bi-circle-fill activity-badge text-warning align-self-start" />
                                                                                    )
                                                                                }
                                                                                {
                                                                                    e.notificationStatus == "UPDATE" && (
                                                                                        <i className="bi bi-circle-fill activity-badge text-danger align-self-start" />
                                                                                    )
                                                                                }
                                                                                {
                                                                                    e.notificationStatus == "COMMENT" && (
                                                                                        <i className="bi bi-circle-fill activity-badge text-primary align-self-start" />
                                                                                    )
                                                                                }
                                                                                {
                                                                                    e.notificationStatus == "BLOG" && (
                                                                                        <i className="bi bi-circle-fill activity-badge text-info align-self-start" />
                                                                                    )
                                                                                }
                                                                                {
                                                                                    e.notificationStatus == "PRODUCT" && (
                                                                                        <i className="bi bi-circle-fill activity-badge text-primary align-self-start" />
                                                                                    )
                                                                                }
                                                                                {
                                                                                    e.notificationStatus == "ORDERS" && (
                                                                                        <i className="bi bi-circle-fill activity-badge text-info align-self-start" />
                                                                                    )
                                                                                }

                                                                                <div className="activity-content">
                                                                                    <a href="#" className="fw-bold text-dark">{e.username}</a> {e.title}
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                    )
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="activity-content">
                                                                    <p className="fw-bold text-dark">Not found Notification in Today</p>
                                                                </div>
                                                            </>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="filter">
                                                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                    <li className="dropdown-header text-start">
                                                        <h6>Filter</h6>
                                                    </li>
                                                    <li><Link to={"Own-blog"} className="dropdown-item" href="#">View All</Link></li>

                                                </ul>
                                            </div>
                                            <div className="card-body pb-0">
                                                <h5 className="card-title">Website Traffic <span>| Today</span></h5>
                                                <div id="trafficChart" style={{ minHeight: '400px' }} className="echart" />
                                            </div>
                                        </div>{/* End Website Traffic */}
                                        {/* News & Updates Traffic */}
                                        <div className="card">
                                            <div className="filter">
                                                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                    <li className="dropdown-header text-start">
                                                        <h6>Filter</h6>
                                                    </li>
                                                    <li><Link to={"Own-blog"} className="dropdown-item" href="#">View All </Link> </li>

                                                </ul>
                                            </div>
                                            <div className="card-body pb-0">
                                                <h5 className="card-title">News &amp; Updates <span>| News</span></h5>
                                                <div className="news">
                                                    {
                                                        blogsNew?.map((e) => (
                                                            <div className="post-item clearfix">
                                                                <img src={e?.thumbail} alt="" />
                                                                <h4><Link to={`Own-blog/view/${e?.id}`} href="#">{e?.title}</Link></h4>
                                                                <p>{e?.content}</p>
                                                            </div>
                                                        ))
                                                    }
                                                   

                                                </div> 
                                            </div>
                                        </div> 
                                    </div>          
                                </div>
                            </section>
                        </div>

                    </>
                ) : (
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
                                                        blogs?.content.map((e) => (
                                                            <div className="col-lg-4 col-md-10 mb-3">
                                                                <div className="p-2">
                                                                    {/* Image Post */}
                                                                    <div className="card blog-post">
                                                                        <Link to={`view/${e?.id}`} className="bg-image hover-overlay ripple">
                                                                            <img src={e?.thumbail} style={{ objectFit: 'cover' }} className="img-fluid rounded w-100" />
                                                                            <span className="badge badge-danger">Lifestyle</span>
                                                                        </Link>
                                                                        <div className="card-body">
                                                                            <div className="text-muted"><span>by <a className="text-dark">{e?.user.name}</a>,</span> <span>{new Date(...e?.createAt).toLocaleDateString()}</span></div>
                                                                            <div className="post-title">
                                                                                <h5 className="text-limit"><a>{e?.title}</a></h5>
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-limit">{e?.content}</p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <Link className="btn btn-danger btn-sm waves-effect waves-light mx-3" to={`/admin/Own-blog/blog/${e?.id}/${e?.statusBlog}`} >Update <i className="mdi mdi-arrow-right ml-1" />
                                                                                </Link>

                                                                                <Link className="btn btn-success btn-sm waves-effect waves-light" to={`/admin/Own-blog/view/${e?.id}`} >Read More <i className="mdi mdi-arrow-right ml-1" />
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
                                        pageRangeDisplayed={1}
                                        marginPagesDisplayed={1}
                                        pageCount={blogs?.totalPages}
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


















        </>
    )
}

export default HomePage