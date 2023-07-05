import React from 'react'
import { Link } from 'react-router-dom'
import "./category.css"
import { useGetCategoriesQuery } from '../../app/service/categoryApi';

function CategoryList() {
    const { data, isLoading } = useGetCategoriesQuery();
   
    return (
        <>
            {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" /> */}



            <div className="main " >


                <div className="app-wrapper">
                <Link to={'create'}  className="btn btn-warning mg-2">Create</Link>

                    <h4 className="mt-4 mb-5 text-center"><strong>Categories </strong></h4>
                    <section style={{ backgroundColor: 'ghostwhite' }}>
                        <div className="text-center container py-8">

                            <div className="row">
                                {data?.map((e) => (
                                    <div className="col-lg-4 col-md-8 mb-3">
                                        <div className="card">
                                            <Link to={`${e?.id}`} >
                                                <div className="d-flex justify-content-start align-items-end h-100">
                                                    <h5><span className="badge bg-primary ms-2">{e?.nums}</span></h5>
                                                </div>
                                                <Link to={`${e?.id}`} className="img-fluid  hover-zoom ripple ripple-surface ripple-surface-light">
                                                    <img className="rounded w-80" src={e?.thumbail} style={{ objectFit: 'cover' }} height={220} />
                                                </Link>
                                            </Link>
                                            <br></br>
                                            <Link className="mb-1 ps-5"> {e?.name}</Link>

                                          
                                        </div>
                                    </div>
                                )
                                )

                                }
                            </div>
                        </div>
                    </section>
                </div>



            </div>









        </>
    )
}

export default CategoryList
