import React, { useState } from 'react'
import "./product.css"
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useGetBrandQuery } from '../../app/service/brandApi';
import { useNavigate } from 'react-router';
import { useGetCategoriesQuery } from '../../app/service/categoryApi';
import { toast } from 'react-toastify';
import axios from 'axios';

function ProductCreate() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { auth, token } = useSelector((state) => state.auth);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [xFile, setFile] = useState();
  const [xFiles, setFiles] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const { data: categories, isLoading: isLoadingOfCategories } = useGetCategoriesQuery();
  const { data: brands, isLoading: isLoading } = useGetBrandQuery();
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const natigate = useNavigate();
  console.log(xFile)
  console.log(xFiles)
  const onSubmit = async (data) => {
    const obj = {
      content: data.content,
      brandId: selectedValue,
      categoryId : selectedCategory,
      description: data.description,
      detail : data.detail,
      name: data.title,
      nums: data.nums,
      price : data.price
    }
    try {
      const response = await axios.post(`http://localhost:8888/api/v1/public/createProduct`, obj);
      const objImage = {
        productId: response,
        file: xFile
      }
      updloadImage(objImage)
    } catch (err) {
      alert(err);
    }
  }
  const updloadImage = async (data) => {
    const dataPush = new FormData();
    dataPush.append("file", data.file)
    try {
      const rs = await axios.post(`http://localhost:8888/api/v1/files/product/${data.productId.data}`, dataPush, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success("Create Product Success !! ")
      natigate("/admin/Own-product")
    } catch (err) {
      console.log(err);
    }
  }


 const getFile = (file) => {
  setFile(file);
};

 const handleImageChange = (event) => {
  const file = event.target.files[0];
  getFile(file)
  const reader = new FileReader();
  reader.onload = (e) => {
    setSelectedImage(e.target.result);
  };
  reader.readAsDataURL(file)
}

 const handleSelectChange = (event)=>{
  setSelectedValue(event.target.value);
 }
 const handlenSelectCategory = (event)=>{
  setSelectedCategory(event.target.value);
 }
 const getFiles = (file) => {
  setFiles(file);
};
 const handleFileChange = (event) => {
  const fileList = event.target.files;
  getFiles(fileList)
  const imageArray = [];
  for (let i = 0; i < fileList.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imageArray.push(e.target.result);
      if (imageArray.length === fileList.length) {
        setImages([...imageArray]);
      }
    };
    reader.readAsDataURL(fileList[i]);
  }
};








  return (
    <>
    <div className="main">
  <div className="animated fadeIn">
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <strong>Thông tin sản phẩm</strong> 
          </div>
          <div className="card-body card-block">
            <form  method='Post' onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="text-input" className=" form-control-label">Tên sản phẩm</label></div>
                <div className="col-12 col-md-9">
                  <input 
                  type="text" id="text-input" name="text-input" placeholder="Nhập tên sản phẩm" className="form-control" 
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
                  <small className="form-text text-muted">  </small></div>
              </div>
              <br/>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="email-input" className=" form-control-label"> Giới thiệu </label></div>
                <div className="col-12 col-md-9">
                  <input
                  type="text" placeholder="Giới thiệu qua về sản phẩm" className="form-control" 
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
                  
                  <small className="help-block form-text"></small></div>
              </div>
              <br/>
              <br/>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="textarea-input" className=" form-control-label">Mô tả</label></div>
                <div className="col-12 col-md-9">
                  <input  rows={9} placeholder="Mô tả  sản phẩm" className="form-control"  
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
              <br></br>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="textarea-input" className=" form-control-label">Thông tin chi tiết</label></div>
                <div className="col-12 col-md-9">
                  <textarea rows={9} placeholder="chi tiết về sản phẩm" className="form-control" defaultValue={""}
                  {...register("detail",
                  {
                    required: true
                   
                  }
                )
                }
                  />
                  {Object.keys(errors).length !== 0 && (
                          <ul>
                            {errors.detail?.type === "required" &&
                              <li className='text-danger'>This field is not empty</li>
                            }
                          </ul>
                        )
                        }
                  
                  </div>
              </div>
              <br/>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="select" className=" form-control-label">Thương Hiệu</label></div>
                <div className="col-12 col-md-9">
                  <select name="select" id="select" className="form-control"  value={selectedValue} onChange={handleSelectChange}>
                  <option value={100}> Chọn Thương Hiệu</option>
                   {
                     brands?.map((e)=>(
                      <option value={e?.id}>{e?.name}</option>
                     )
                    )
                   }
                  </select>
                </div>
              </div>
              <br/>
               <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="select" className=" form-control-label">Thể Loại</label></div>
                <div className="col-12 col-md-9">
                  <select name="select" id="select" className="form-control"   value={selectedCategory} onChange={handlenSelectCategory}>
                  <option value={100}> Chọn Thể Loại</option>
                    {categories?.map((e)=>(
                       <option value={e?.id}>{e?.name}</option>
                    ))
                    
                    }

                  
                   
                  </select>
                </div>
              </div>
              <br></br>
              
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="text-input" className=" form-control-label">Giá Sản Phẩm</label></div>
                <div className="col-3 col-md-3">
                  <input type="number" id="text-input" name="text-input" placeholder="Nhập giá tiền của sản phẩm" className="form-control" 
                     {...register("price",
                     {
                       required: true,
                       min:0
                     }
                   )
                   }
                  />
                    {Object.keys(errors).length !== 0 && (
                          <ul>
                            {errors.price?.type === "required" &&
                              <li className='text-danger'>Giá của sản phẩm không để trống</li>
                            }
                            {errors.price?.type === "min" &&
                              <li className='text-danger'>Giá của sản phẩm không được âm</li>
                            }
                          </ul>
                        )
                        }
                  <small className="form-text text-muted">  </small></div>
              </div>
             
              <br />
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="text-input" className=" form-control-label">Số Lượng Sản Phẩm</label></div>
                <div className=" col-md-3">
                  <input type="number" id="text-input"  placeholder="Nhập giá tiền của sản phẩm" className="form-control" 
                  {...register("nums",
                  {
                    required: true,
                    min:1
                  }
                )
                }
                  />
                    {Object.keys(errors).length !== 0 && (
                          <ul>
                            {errors.nums?.type === "required" &&
                              <li className='text-danger'>This field is not empty</li>
                            }
                            {errors.nums?.type === "min" &&
                              <li className='text-danger'>Số lượng không thể nhỏ hơn 1 </li>
                            }
                          </ul>
                        )
                        }
                  <small className="form-text text-muted">  </small></div>
              </div>
              <br />  
              <br />

              <br />
            
              <br></br>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="file-input" className=" form-control-label">Ảnh Đại Diện</label></div>
                <div className="col-12 col-md-9"><input
               type="file"
               className="form-control"
               id="imageUpload"
               accept="image/*"
               onChange={handleImageChange}
                
                />
                 {selectedImage && (
                <div className="mt-5 col-12 ">
                  <img src={selectedImage} alt="Preview" className="img-thumbnail text-center" height="175px" width="175px" />
                </div>
              )}
                </div>
                
              </div>
              <br></br>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="file-multiple-input" className=" form-control-label">Ảnh Chi Tiết</label></div>
               
                <div className="col-12 col-md-9"><input 
                
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                />
                
                  
                {images.length > 0 && (
        <div>
          <h3>Ảnh đã chọn:</h3>
          {images.map((image, index) => (
            <>
             <img key={index} src={image} alt={`Image ${index}`} width="150" />
            </>

          ))}
        </div>
      )}
                </div>
              </div>
              <div className="card-footer">
            <button type="submit" className="btn btn-primary btn-sm">
              <i className="fa fa-dot-circle-o" /> Tạo
            </button>
            <button type="reset" className="btn btn-danger btn-sm">
              <i className="fa fa-ban" /> Hủy
            </button>
          </div>
            </form>
          </div>
        
        </div>
     
      </div>
    </div>
  </div>{/* .animated */}
</div>{/* .content */}

    
    
    
    
    
    
    
    
    </>
  )
}

export default ProductCreate