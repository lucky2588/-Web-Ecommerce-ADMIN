import React, { useState } from 'react';


import { useSelector } from 'react-redux';
import { useLoginMutation } from '../../app/service/authApi';

import { Navigate, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function Login() {
    const { auth, isAuthenticated } = useSelector((state) => state.auth)
    const [LoginResquest] = useLoginMutation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to={"/admin"} />;
    }
    const onSubmit = (data) => {
        LoginResquest(
            {
                email: data.email,
                password: data.password
            }
        )
            .unwrap()
            .then((res) => {
                toast.success(" Login Seccess ")
                navigate("/admin")
            }
            )
            .catch((err) => {
                toast.error("Login fail !! Please check email and password again ")
                window.location.reload()
            }

            )
    }
    return (
        <>

            <main>
                <div className="container">
                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                    <div className="d-flex justify-content-center py-4">
                                        <a href="index.html" className="logo d-flex align-items-center w-auto">
                                            <img src="assets/img/logo.png" alt="" />
                                            <span className="d-none d-lg-block">NiceAdmin</span>
                                        </a>
                                    </div>{/* End Logo */}
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                                <p className="text-center small">Enter your username &amp; password to login</p>
                                            </div>
                                            <form method='post' onSubmit={handleSubmit(onSubmit)} >
                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">Username</label>
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                        <input type="email" name="email" className="form-control" id="yourUsername" required

                                                            {...register("email"
                                                                , {
                                                                    required: true,
                                                                    pattern: {
                                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                                                    }
                                                                }
                                                            )}

                                                        />
                                                        {Object.keys(errors).length !== 0 && (
                                                            <ul>
                                                                {errors.email?.type === "required" &&
                                                                    <li className='text-danger'>Email không được để trống</li>
                                                                }
                                                                {errors.email?.type === "pattern" &&
                                                                    <li className='text-danger'>Email không hợp lệ</li>
                                                                }
                                                            </ul>
                                                        )
                                                        }
                                                        <div className="invalid-feedback">Please enter your username.</div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Password</label>
                                                    <input type="password" name="password" className="form-control" id="yourPassword"
                                                        {...register("password",
                                                            {
                                                                required: true
                                                            }
                                                        )}
                                                    />
                                                    {Object.keys(errors).length !== 0 && (
                                                        <ul>
                                                            {errors.password?.type === "required" &&
                                                                <li className='text-danger'>Password  not blank</li>
                                                            }

                                                        </ul>
                                                    )
                                                    }
                                                    <div className="invalid-feedback">Please enter your password!</div>
                                                    <br></br>
                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100" type="submit">Login</button>
                                                    </div>
                                                </div>
                                                <br></br>
                                                <div className="col-12">
                                                    <div className="credits">

                                                       Forget Password ? <Link to={"/forgetPassword"}>Click here</Link>
                                                    </div>
                                                </div>

                                                <div className="col-12">

                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>{/* End #main */}








        </>
    )
}

export default Login