import React from 'react'
import { useParams } from 'react-router';
import "./css/blogView.css"
import { useGetBlogByIdQuery, useLazyGetCommentBlogQuery } from '../../app/service/blogApi';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function BlogView() {
    const { blogId } = useParams();
    const { data, isLoading, isError } = useGetBlogByIdQuery(blogId);
    const [getComment, { data: listComment, isLoading: isLoadingComment }] = useLazyGetCommentBlogQuery();

    useEffect(() => {
        getComment(blogId);
    }, [data])
    return (
        <>
            <div id="layout-fix" className="main">

                <div className="row mx-12 g-6">

                    <div className="col-md-6 mb-8 ">

                        <section className="border-bottom mb-6 mx-8">
                            <div class="btn-group btn-custom">
                                <Link to={`/admin/Own-blog/blog/${data?.id}/${data?.statusBlog}`} type="button" className="btn btn-danger">Update</Link>
                            </div>
                            <br></br>
                            <h2 className='text-center'>
                                {data?.title}
                            </h2>
                            <img
                                src={data?.thumbail}
                                className="img-thumbnail " height="200px" width="1000px" alt="" />
                            <div className="row align-items-center mb-4">
                                <div className="col-lg-5 text-center text-lg-start mb-6 m-lg-3">
                                    <img src={data?.user.avatar} className="rounded-5 shadow-1-strong me-2" height={35} alt="" loading="lazy" />
                                    <span>  <u> </u> tác giả </span>
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
                            <p className="text-center"><strong> Bình Luận :

                            </strong></p>

                            {
                                listComment?.map((comment) => (
                                    <div className="row mb-4">
                                        <div className="col-2">
                                            <img src={comment?.user.avatar}
                                                className="img-fluid shadow-1-strong rounded-5" alt="" />
                                        </div>
                                        <div className="col-10">
                                            <p className="mb-2"><strong>{comment?.user.name}</strong></p>
                                            <span className='text'>
                                                {new Date(...comment?.createAt).toLocaleDateString()}
                                            </span>
                                            <p>
                                                <br />
                                                {comment?.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                        </section>

                    </div>

                </div>
            </div>











        </>
    )
}

export default BlogView