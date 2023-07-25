import React from 'react'
import "./css//blogCreate.css"
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetBrandQuery } from '../../app/service/brandApi';
import { useNavigate, useParams } from 'react-router';
import axios, { Axios } from 'axios';
import { useGetInfoQuery } from '../../app/service/infoApi';
import { number } from 'yup';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useLazyGetLastIdOfBlogsQuery } from '../../app/service/blogApi';
import { useEffect } from 'react';
function BlogCreate() {
  const { auth, token } = useSelector((state) => state.auth);
  const { data: categories, isLoading: isLoadingOfCategories } = useGetBrandQuery();
  const natigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState();
  const [xFile, setFile] = useState();
  const [status, setStatus] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    getFile(file)
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    reader.readAsDataURL(file)
  }
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const getFile = (file) => {
    setFile(file);
  };
  const onSubmit = async (data) => {
    if (xFile == null) {
      toast.error("Choose Image for Blog !! ")
      return;
    }
    const obj = {
      content: data.content,
      brandId: selectedValue == null ? 100 : selectedValue,
      publicOf: status,
      description: data.description,
      title: data.title
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await axios.post(`http://localhost:8888/api/v1/public/createBlog`, obj, config);
      if (xFile == null) {
        toast.success("create Blog secesss !! ")
        natigate("/admin/Own-blog")
      }
      const objImage = {
        blogId: response,
        file: xFile
      }
      updloadImage(objImage)
    } catch (err) {
      alert(err);
    }
  }
  const updloadImage = async (data) => {
    console.log(data)

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const dataPush = new FormData();
    dataPush.append("file", data.file)
    try {
      const rs = await axios.post(`http://localhost:8888/api/v1/files/blog/${data.blogId.data}`, dataPush, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      })
      toast.success("Create Blog success !! ")
      natigate("/admin/Own-blog")
    } catch (err) {
      console.log(err);
    }

    if (isLoadingOfCategories) {
      return <h2>is loading ... </h2>
    }

  }
  return (
    <>
      <div className='main'>

        <div className="page-heading">
          <div className="page-title">
            <div className="row">
              <div className="col-12 col-md-6 order-md-1 order-last">
                <h3>Create Blog</h3>
                <p className="text-subtitle text-muted">Import Infomation about Blog </p>
              </div>
              <div className="col-12 col-md-6 order-md-2 order-first">
                <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Blogs</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form method='Post' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div class="row mb-3">
                <label for="inputNumber" class="col-sm-2 col-form-label">File Upload</label>
                <div class="col-sm-10">
                  <input
                    type="file"
                    className="form-control"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              {selectedImage && (
                <div className="mt-5 col-6 ">
                  <img src={selectedImage} alt="Preview" className="img-thumbnail text-center" height="250px" width="1000px" />
                </div>
              )}
            </div>


            <br></br>

            <div class="row mb-4 col-5">
              <legend class="col-form-label col-sm-2 pt-0">Status  Blog</legend>
              <div class="col-sm-10">

                <div class="form-check">
                  <input className="form-check-input"
                    type="checkbox" value={1}
                    checked={status === 1}
                    onClick={() => setStatus(1)}
                  />
                  <label class="form-check-label" >
                    Public
                  </label>
                </div>

                <div class="form-check">
                  <input className="form-check-input"
                    id="gridCheck2"
                    type="checkbox" value={0}
                    checked={status === 0}
                    onClick={() => setStatus(0)}
                  />
                  <label class="form-check-label" for="gridCheck2">
                    Private
                  </label>
                </div>

              </div>
            </div>

            <div class="row mb-3 col-4">
              <label class="col-sm-2 col-form-label">Category</label>
              <div class="col-sm-10">
                <select className="form-select" aria-label="Default select example" value={selectedValue} onChange={handleSelectChange}>
                  <option value={100}> Choose for Blog</option>
                  {categories?.map((e) => (
                    <option value={e?.id} >{e?.name}</option>
                  )
                  )
                  }
                </select>
              </div>
            </div>
            <section className="section">
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-header">
                      Title for Blog
                    </div>
                    <div className="card-body">
                      <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label"> Set name for your blog
                        </label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""}
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
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      Content for Blog
                    </div>
                    <div className="card-body">
                      <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label"> Write about some blog ideas
                        </label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""}
                          {...register("content",
                            {
                              required: true
                            }
                          )
                          } />
                        {Object.keys(errors).length !== 0 && (
                          <ul>
                            {errors.content?.type === "required" &&
                              <li className='text-danger'>This field is not empty</li>
                            }
                          </ul>
                        )
                        }
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      Describe
                    </div>
                    <div className="card-body">
                      <div className="form-group mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">
                          description of your blog</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""}
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
                    </div>
                  </div>



                </div>
              </div>
            </section>
            <div className="text-center">
              <button type="submit" className="btn btn-success waves-effect waves-light">Create</button>
              <button type="button" className="btn btn-danger waves-effect waves-light">Cancle</button>
            </div>
          </form>
        </div>



      </div>


























    </>
  )
}

export default BlogCreate