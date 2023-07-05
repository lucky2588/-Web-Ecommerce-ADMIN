import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGetBlogByIdQuery } from '../../app/service/blogApi';
import { useGetCategoriesQuery } from '../../app/service/categoryApi';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGetBrandQuery } from '../../app/service/brandApi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function BlogDetail() {
  const { auth, token } = useSelector((state) => state.auth);
  const { blogId } = useParams();
  const { publicId } = useParams();
  const { data, isLoading } = useGetBlogByIdQuery(blogId);
  const { data: categories, isLoading: isLoadingOfCategories } = useGetBrandQuery();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const natigave = useNavigate();
  const [item, setItem] = useState(publicId);

  useEffect(() => {
    setSelectedCategoryId(data?.brand.id);
  }, [data]);

  const publicOf = [
    {
      id: 0,
      title: "Private"
    },
    {
      id: 1,
      title: "Public"
    },
  ]

  const onSubmit = async (objPush) => {
    const obj = {
      blogId: data?.id,
      content: objPush.content,
      description: objPush.description,
      title: objPush.title,
      brandId: selectedCategoryId,
      publicOf: item
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/public/updateBlog`, obj,config);
      toast.success("Upload Blog Success ! ")
      natigave(`/admin/Own-blog/view/${blogId}`)
    } catch (err) {
      alert(err);
    }
  }

  const handlenBtnDelete = async (objPush) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    try {
      const response = await axios.delete(`http://localhost:8888/api/v1/public/deleteBlog/${blogId}`,config);
      toast.success("Delete Blog Success ! ")
      natigave(`/admin/Own-blog`)
    } catch (err) {
      alert(err);
    }
  }
  const handleRadioChange = (event) => {
    const id = parseInt(event.target.value);
    setItem(id);
  };

  const handleCategoryChange = (event) => {
    const categoryId = parseInt(event.target.value);
    setSelectedCategoryId(categoryId);
  };

  const handlenAvtar = async (e) => {
  
    const file = e.target.files[0];
    const dataPush = new FormData();
    dataPush.append("file", file)
    try {
      const rs = await axios.post(`http://localhost:8888/api/v1/files/blog/${data?.id}`, dataPush, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      })
      toast.success("Update immage for Blog !!!  !! ")
      window.location.reload()

    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading && isLoadingOfCategories) {
    return <h2>Is Loading ...</h2>
  }

  return (
    <>
      <div className='main'>
        <div className="content">
          {/* Start Content*/}
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">

              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-md-12">
                <div className="card-box">
                  <Link type="button" className="btn btn-warning waves-effect waves-light" to={"/admin/Own-blog"}>Back</Link>
                  <br></br>
                  <h4 className="header-title mt-3">Edit Blog </h4>
                  <form method='Post' onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="p-4">
                          <div className="form-group">
                            <label htmlFor="propertyname"> Title </label>
                            <input type="text" className="form-control" id="propertyname" placeholder="Enter title" defaultValue={data?.title}
                              {...register("title",
                                {
                                  required: true
                                }
                              )
                              }
                            />
                            {Object.keys(errors).length !== 0 && (
                              <ul>
                                {errors.title?.type === "required" &&
                                  <li className='text-danger'>This field is not empty</li>
                                }
                              </ul>
                            )
                            }
                          </div>
                          <div className="form-group">
                            <label htmlFor="property-desc">Content</label>
                            <textarea className="form-control" id="property-desc" rows={5} defaultValue={data?.content}
                              {...register("content",
                                {
                                  required: true
                                }
                              )
                              }
                            />
                            {Object.keys(errors).length !== 0 && (
                              <ul>
                                {errors.content?.type === "required" &&
                                  <li className='text-danger'>This field is not empty</li>
                                }
                              </ul>
                            )
                            }
                          </div>
                          <div className="form-group">
                            <label htmlFor="property-desc">Description</label>
                            <textarea className="form-control" id="property-desc" rows={5} defaultValue={data?.description}
                              {...register("description",
                                {
                                  required: true
                                }
                              )
                              }
                            />
                            {Object.keys(errors).length !== 0 && (
                              <ul>
                                {errors.description?.type === "required" &&
                                  <li className='text-danger'>This field is not empty</li>
                                }
                              </ul>
                            )
                            }
                          </div>
                          <div className="form-group">
                            <label className="mb-2">Status for Blog </label>
                            <br />
                            {
                              publicOf.map((e) => (
                                <div className="radio radio-info form-check-inline">
                                  <input
                                    type="checkbox"
                                    value={e.id}
                                    checked={e.id == item ? true : false}
                                    onClick={() => setItem(e.id)}
                                  />
                                  <label htmlFor="inlineRadio1"> {e?.title} </label>
                                </div>
                              )
                              )
                            }


                          </div>
                        </div>
                        {/* end class p-20 */}
                      </div>
                      {/* end col */}
                      <div className="col-lg-6">
                        <div className="p-4">
                          <div className="form-group mb-4">
                            <label className="mb-3">Choose Brand </label>
                            <div className="row">
                              <div className="col-7">
                                {categories?.map((e) => (
                                  <div className="checkbox checkbox-primary mb-4">

                                    <input className="form-check-input"
                                      type="checkbox"

                                      value={e?.id}
                                      checked={selectedCategoryId === e?.id}
                                      onChange={handleCategoryChange}
                                    />
                                    <label htmlFor="checkbox1" className="mb-0">
                                      {e?.name}
                                    </label>
                                  </div>
                                )
                                )}



                                <div className="col-xl-12 custom-avatar">

                                  <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                                    <img alt="Profile" src={data?.thumbail} className="img-thumbnail" height="300px" width="500px" />
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                          <div className="form-group mb-4">
                            <label >File Uploads</label>
                            <input type="file" onChange={(e) => handlenAvtar(e)} className="dropify" data-height={2000} />
                          </div>
                        </div>
                        {/* end class p-20 */}
                      </div>
                      {/* end col */}
                    </div>
                    {/* end row */}
                    <div className="text-center">
                      <button type="submit" className="btn btn-success waves-effect waves-light mx-3">Update</button>
                      <button type="button" className="btn btn-danger waves-effect waves-light mx-3" onClick={() => handlenBtnDelete(blogId)} >Delete Blog</button>

                    </div>
                  </form>

                </div>

              </div>
              {/* end col */}
            </div>
            {/* end row */}
          </div>
          {/* end container-fluid */}
        </div>
        {/* end content */}
        {/* Footer Start */}


      </div>
    </>
  )
}

export default BlogDetail