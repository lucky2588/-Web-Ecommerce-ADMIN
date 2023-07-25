import React, { useState } from 'react'
import "./profile.css"
import { useDispatch, useSelector } from 'react-redux'
import { useGetUserByEmailQuery, useGetUserQuery } from '../../app/service/userApi'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { setAvatar, setEmail, setName } from '../../app/slice/authSlice';
import axios from 'axios'
import { toast } from 'react-toastify'

function Profile() {
  const { auth, isAuthenticated, token } = useSelector((state) => state.auth)
  const { data, isLoading } = useGetUserByEmailQuery(auth.email);
  const natigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [passwordOld , setPasswordOld] = useState("");
  const [passNew , setPassNew] = useState("");
  const [confirmPass , setConfirmPass] = useState("");



  const onSubmit = async (obj) => {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const objUpdate = {
      name: obj.name,
      address: obj.address,
      phoneNumber: obj.phoneNumber
    }
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/user/updateUser/${data?.id}`, objUpdate, config);
      toast.success("Update Infomation of you seccesss !! ")
      dispatch(setName(obj.name))
      window.location.reload()
    } catch (err) {
      alert(err);
    }
  }

 
  const handlenBtnPassword = async  () => {
    if(passNew !== confirmPass){
      toast.error("new Password is  not match !! ")
      return;
    }
    if(passNew.length < 6 ){
      toast.error("Password must be 6 characters or more!! ")
      return;
    }
    const obj = {
      email : auth.email,
      passwordOld : passwordOld,
      passwordNew : passNew
    }
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/user/changePassword`, obj,config);
      toast.success("Re-password seccess !!!  ")
    } catch (err) {
      toast.error(err.message);
    }
  }
  const handlenAvtar = async (e) => {
    const file = e.target.files[0];
    const dataPush = new FormData();
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    dataPush.append("file", file)
    try {
      const rs = await axios.post(`http://localhost:8888/api/v1/files/${data?.id}`, dataPush, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        }
      })
      dispatch(setAvatar(rs.data.url))
      toast.success("Upload Image Seccess !! ")
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) {
    return <h2>Is Loading ..</h2>
  }


  return (
    <>
      <div className="">
        <h1>Profile</h1>
        <nav className='text-center'>
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
                <img src={auth.avatar} alt="Profile" className="rounded-circle" />
                <h2>{data?.name}</h2>
                {
                  auth.roles.map(
                    (e) => (
                      <h5>{e?.name}</h5>
                    )
                  )
                }

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
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
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
                      <div className="col-lg-3 col-md-4 label">Address</div>
                      <div className="col-lg-9 col-md-8">{data?.address}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label"> Email</div>
                      <div className="col-lg-9 col-md-8">{data?.email}</div>
                    </div>

                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Number Phone</div>
                      <div className="col-lg-9 col-md-8">{data?.phone}</div>
                    </div>

                  </div>
                  <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                    {/* Profile Edit Form */}
                    <form method='Post' onSubmit={handleSubmit(onSubmit)}>
                      <div className="row mb-3">
                        <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                        <div className="col-md-8 col-lg-9">
                          <img src={auth.avatar} alt="Profile" />
                          <div className="pt-2">



                            <input type='file' onChange={(e) => handlenAvtar(e)} />
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="fullName" type="text" className="form-control" id="fullName" defaultValue={data?.name}
                            {...register("name",
                              {
                                required: true
                              }
                            )
                            }
                          />
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
                        <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">Address</label>
                        <div className="col-md-8 col-lg-9">
                          <textarea name="about" className="form-control" id="about" style={{ height: '100px' }}
                            defaultValue={data?.address}
                            {...register("address",
                              {
                                required: true
                              }
                            )
                            }
                          />
                          {Object.keys(errors).length !== 0 && (
                            <ul>
                              {errors.address?.type === "required" &&
                                <li className='text-danger'>This field is not empty</li>
                              }
                            </ul>
                          )
                          }
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="company" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="company" type="text" className="form-control" id="company" defaultValue={data?.phone}
                            {...register("phoneNumber",
                              {
                                required: true,
                                pattern: {
                                  value: /^0\d{9,11}$/
                                }
                              }
                            )
                            }
                          />
                          {Object.keys(errors).length !== 0 && (
                            <ul>
                              {errors.phoneNumber?.type === "required" &&
                                <li className='text-danger'>This field is not empty</li>
                              }
                              {errors.phoneNumber?.type === "pattern" &&
                                <li className='text-danger'>This field is not vail</li>
                              }
                            </ul>
                          )
                          }
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="Job" className="col-md-4 col-lg-3 col-form-label">Email</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="job" type="text" className="form-control" id="Job" defaultValue={auth.email} disabled
                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label htmlFor="Linkedin" className="col-md-4 col-lg-3 col-form-label">Create At</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="linkedin" type="text" className="form-control" id="Linkedin" disabled
                            defaultValue={new Date(...data?.createAt).toLocaleDateString()}


                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                      </div>
                    </form>{/* End Profile Edit Form */}
                  </div>

                  <div className="tab-pane fade pt-3" id="profile-change-password">
                    {/* Change Password Form */}
                    <form method='Post'>
                      <div className="row mb-3">
                        <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="password" type="password" className="form-control" id="currentPassword"
                          value={passwordOld} onChange={(e)=>setPasswordOld(e.target.value)}
                            />
                         
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="newpassword" type="password" className="form-control" id="newPassword"
                                  value={passNew} onChange={(e)=>setPassNew(e.target.value)}
                             />
                    
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                        <div className="col-md-8 col-lg-9">
                          <input name="renewpassword" type="password" className="form-control" id="renewPassword" 
                           value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}
                         />
                          
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="button" onClick={handlenBtnPassword} className="btn btn-primary">Change Password</button>
                      </div>
                    </form>
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

export default Profile