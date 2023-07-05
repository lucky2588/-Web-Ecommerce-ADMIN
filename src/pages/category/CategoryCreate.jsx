import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CategoryCreate() {
    const natigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();


    const onSubmit = async (obj) => {
        const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          };
        const objPush = {
            name: obj.name,
            description: obj.description,
            thumbail: obj.thumbail
        }
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/admin/createCategory`, objPush,config);
            toast.success("create category secesss !! ")
            natigate("/admin/category")
        } catch (err) {
            alert(err);
        }
    }



    return (
        <>
            <div className='main'>

                <div className="page-heading">
                    <div className="page-title">
                        <div className="row">
                            <div className="col-12 col-md-6 order-md-1 order-last">
                                <Link className="btn btn-warning waves-effect waves-light m-3">Back</Link>
                                <h3>Create Category</h3>
                                <p className="text-subtitle text-muted">Import Infomation about Category </p>
                            </div>

                        </div>
                    </div>
                    <form method='Post' onSubmit={handleSubmit(onSubmit)}>



                        <section className="section">
                            <div className="row">
                                <div className="col">
                                    <div className="card">
                                        <div className="card-header">
                                            Name
                                        </div>
                                        <div className="card-body">
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"
                                                    id="basic-default-name"
                                                    {...register("name",
                                                        {
                                                            required: true
                                                        }
                                                    )
                                                    }
                                                    placeholder="Import name for Category" />
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
                                    </div>

                                    <div className="card">
                                        <div className="card-header">
                                            Thumbail
                                        </div>
                                        <div className="card-body">
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control"
                                                    id="basic-default-name"
                                                    {...register("thumbail",
                                                        {
                                                            required: true
                                                        }
                                                    )
                                                    }
                                                />
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
                                    </div>



                                    <div className="card">
                                        <div className="card-header">
                                            Description
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group mb-3">
                                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                                    description of your category</label>
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
                            <button type="submit" className="btn btn-success waves-effect waves-light mx-3">Create</button>

                        </div>
                    </form>
                </div>



            </div>
        </>
    )
}

export default CategoryCreate