import React, { useState } from 'react'
import { useParams } from 'react-router';
import "./css/blogView.css"
import { useGetBlogByIdQuery, useLazyGetCommentBlogQuery } from '../../app/service/blogApi';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function BlogView() {
    const { blogId } = useParams();
    const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
    const { data, isLoading, isError } = useGetBlogByIdQuery(blogId);
    const [getComment, { data: listComment, isLoading: isLoadingComment }] = useLazyGetCommentBlogQuery();
    const [showModal, setShowModal] = useState(false);
    const [cmt , setCmt] = useState();

    useEffect(() => {
        getComment(
            {
                page: 0,
                pageSize: 5,
                blogId: blogId
            }
        );
    }, [])

    const handlePageClick = (page) => {
        getComment(
            {
                page: page.selected,
                pageSize: 5,
                blogId: blogId
            }
        );
    }
   

    const handleShowModal = (id) => {
        setShowModal(true);
        setCmt(id)
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDelete = async () => {
        const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          };
        try {
            const response = await axios.delete(`http://localhost:8888/api/v1/public/deleteCommentOfBlog/${cmt}`, config);
            toast.success("Delete Seccess  ! ")
            getComment(
                {
                    page: 0,
                    pageSize: 5,
                    blogId: blogId
                }
            );
          } catch (err) {
            alert(err);
          }
        setShowModal(false);
    };





    if (isLoadingComment) {
        return <h2>Is Loading ... </h2>
    }

    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
            <div id="layout-fix" className="main">

                <div className="row mx-12 g-6">

                    <div className="col-md-6 mb-8 ">

                        <section className="border-bottom mb-6 mx-8">
                            <div class="btn-group btn-custom">
                                <Link to={`/admin/Own-blog/blog/${data?.id}/${data?.statusBlog}`} type="button" className="btn btn-danger">Update</Link>
                            </div>
                        

                            <Modal show={showModal} onHide={handleCloseModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>  Delete this Comment ?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Do you sure Delete this Comment </p>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Cancle
                                    </Button>
                                    <Button variant="danger" onClick={handleDelete}>
                                        Sure 
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <br></br>
                            <h2 className='text-center'>
                                {data?.title}
                            </h2>
                            <img
                                src={data?.thumbail}
                                className="img-thumbnail " height="200px" width="1000px" alt="" />
                            <div className="row align-items-center mb-4">
                                <div className="col-lg-5 text-center text-lg-start mb-6 m-lg-3">
                                    <img src={data?.user.avatar} className="rounded-5 shadow-1-strong me-1" height={35} alt="" loading="lazy" />
                                    <span>  <u> </u> tác giả :  </span>
                                    <a href className="text-dark">
                                        {data?.user.name}

                                    </a>
                                    <br />
                                    <br></br>
                                    <div id="span-view" >Lượt xem :  {data?.viewBlog}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section>
                            <p><strong>
                                {data?.content}

                            </strong></p>
                            <p>
                                {data?.description}
                            </p>
                        </section>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                        <section className="border-bottom mb-3">
                            <p className="text-center"><strong> Comments : {listComment?.totalElements}

                            </strong></p>

                            {listComment?.content.length > 0 && (

                                listComment?.content.map((comment) => (
                                    <div className="row mb-2">
                                        <div className="col-lg-1  mb-1 m-lg-3">

                                            <img src={comment?.user.avatar}
                                                className=" img-custom img-thumbnail rounded-circle" height="200px" width="200px" alt="" />
                                        </div>
                                        <div className="col-6">

                                            <p className="mb-2">
                                                <span class="btn-custom">
                                                    <button type="button" class=" btn  btn-danger" onClick={()=>handleShowModal(comment.id)}><i class="fa fa-remove"></i></button>

                                                </span>
                                                <strong>{comment?.user.name}


                                                </strong>
                                            </p>
                                            <span className='text'>
                                                {new Date(...comment?.createAt).toLocaleDateString()}
                                            </span>
                                            <p>
                                                <br />
                                                {comment?.content}
                                            </p>

                                        </div>

                                    </div>
                                ))

                            )
                            }
                            {
                                listComment?.content.length == 0 && (
                                    <p className="text-center"><strong> Not Comment for Blog

                                    </strong></p>
                                )
                            }
                            <nav className="my-4" aria-label="...">
                                <ul className="pagination pagination-circle justify-content-center">

                                    <ReactPaginate
                                        nextLabel="Next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={2}
                                        marginPagesDisplayed={2}
                                        pageCount={listComment?.totalPages}
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

                        </section>


                    </div>

                </div>
            </div>











        </>
    )
}

export default BlogView