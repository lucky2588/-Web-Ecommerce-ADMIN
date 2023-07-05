import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGetCategoryByIdQuery } from '../../app/service/categoryApi';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGetBrandByIdQuery } from '../../app/service/brandApi';


function BrandDetail() {
  const { brandId } = useParams();
  const natigave = useNavigate();
  const { data, isLoading } = useGetBrandByIdQuery(brandId);
  const { register, handleSubmit, formState: { errors } } = useForm();
  console.log(data)

  const onSubmit = async (obj) => {
    const objPush = {
      brandId: brandId,
      name: obj.name,
      description: obj.description,
      thumbail: obj.thumbail
    }
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/admin/updateBrand`, objPush);
      toast.success("Update  Success !")
       natigave(`/admin/brand/${brandId}`)
    } catch (err) {
      alert(err);
    }
  }

  const handlenBtnDelete = async (objPush) => {
    try {
      const response = await axios.delete(`http://localhost:8888/api/v1/public/deleteBrand/${brandId}`);
      toast.success("Delete Brand Success ! ")
      natigave(`/admin/brand`)
    } catch (err) {
      alert(err);
    }
  }
  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Forms/</span> Horizontal Layouts</h4>
          <div className="row">
            <div className="col-xxl">
              <Link to={'/admin/category'} className="btn btn-warning mg-2">Back</Link>
              <br></br>
              <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="mb-0"> Information Of Brand</h5>

                </div>
                <div className="card-body">
                  <form method='Post' onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label" htmlFor="basic-default-name">Name</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control"
                             
                          id="basic-default-name" defaultValue={data?.name}
                          {...register("name",
                            {
                              required: true
                            }
                          )
                          }
                         
                          placeholder="Import name for Brand" />
                        {Object.keys(errors).length !== 0 && (
                          <ul>
                            {errors.name?.type === "required" &&
                              <li className='text-danger'>This field is not empty</li>
                            }
                          </ul>
                        )
                        }
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label" htmlFor="basic-default-phone">Thumbail</label>
                      <div className="col-sm-10">
                        <input type="text" id="basic-default-phone" defaultValue={data?.thumbail} className="form-control phone-mask"
                          {...register("thumbail",
                            {
                              required: true
                            }
                          )
                          }
                          placeholder="Image for Brand" aria-label="658 799 8941" aria-describedby="basic-default-phone" />

                        {Object.keys(errors).length !== 0 && (
                          <ul>
                            {errors.thumbail?.type === "required" &&
                              <li className='text-danger'>This field is not empty</li>
                            }
                          </ul>
                        )
                        }
                      </div>

                    </div>
                    <div className="row mb-3">
                      <label className="col-sm-2 col-form-label" htmlFor="basic-default-message">Description</label>
                      <div className="col-sm-10">
                        <textarea id="basic-default-message" className="form-control" defaultValue={data?.description} placeholder="Description to description"
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
                    <div className="col-xl-12 custom-avatar">

                      <div className="card-body profile-card   flex-column align-items-center">
                        <img alt="Profile" src={data?.thumbail} className="img-thumbnail" height="100px" width="300px" />
                      </div>
                    </div>
                    <div className="row justify-content-end">
                      <div className="">
                        <button type="submit" className="btn btn-primary">Update</button>
                        <button onClick={() => handlenBtnDelete()} className="btn btn-danger mx-3">Delete</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>









    </>
  )
}

export default BrandDetail