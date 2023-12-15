import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../../app/service/categoryApi';
import { useGetBrandQuery } from '../../app/service/brandApi';
import { useNavigate } from 'react-router';

function ProductDetail() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { auth, token } = useSelector((state) => state.auth);
  const { data: categories, isLoading: isLoadingOfCategories } = useGetCategoriesQuery();
  const { data: brands, isLoading: isLoading } = useGetBrandQuery();
  const natigate = useNavigate();
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
            <form action method="post" encType="multipart/form-data" className="form-horizontal">
            
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="text-input" className=" form-control-label">Tên sản phẩm</label></div>
                <div className="col-12 col-md-9"><input type="text" id="text-input" name="text-input" placeholder="Nhập tên sản phẩm" className="form-control" /><small className="form-text text-muted">  </small></div>
              </div>
              <br/>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="email-input" className=" form-control-label">Giới thiệu </label></div>
                <div className="col-12 col-md-9"><input type="email" id="email-input" name="email-input" placeholder="Tổng quan về sản phẩm" className="form-control" /><small className="help-block form-text"></small></div>
              </div>
              <br/>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="textarea-input" className=" form-control-label">Mô tả</label></div>
                <div className="col-12 col-md-9"><textarea name="textarea-input" id="textarea-input" rows={9} placeholder="Mô tả  sản phẩm" className="form-control" defaultValue={""} /></div>
              </div>
              <br></br>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="textarea-input" className=" form-control-label">Thông tin chi tiết</label></div>
                <div className="col-12 col-md-9"><textarea name="textarea-input" id="textarea-input" rows={9} placeholder="chi tiết về sản phẩm" className="form-control" defaultValue={""} /></div>
              </div>
              <br/>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="select" className=" form-control-label">Thương Hiệu</label></div>
                <div className="col-12 col-md-9">
                  <select name="select" id="select" className="form-control">
                    <option value={0}>Please select</option>
                    <option value={1}>Option #1</option>
                    <option value={2}>Option #2</option>
                    <option value={3}>Option #3</option>
                  </select>
                </div>
              </div>
              <br/>
               <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="select" className=" form-control-label">Thể Loại</label></div>
                <div className="col-12 col-md-9">
                  <select name="select" id="select" className="form-control">
                    <option value={0}>Please select</option>
                    <option value={1}>Option #1</option>
                    <option value={2}>Option #2</option>
                    <option value={3}>Option #3</option>
                  </select>
                </div>
              </div>
              <br></br>
              
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="text-input" className=" form-control-label">Giá Sản Phẩm</label></div>
                <div className="col-3 col-md-3"><input type="number" id="text-input" name="text-input" placeholder="Nhập giá tiền của sản phẩm" className="form-control" /><small className="form-text text-muted">  </small></div>
              </div>
             
              <br />
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="text-input" className=" form-control-label">Số Lượng Sản Phẩm</label></div>
                <div className=" col-md-3"><input type="number" id="text-input" name="text-input" placeholder="Nhập giá tiền của sản phẩm" className="form-control" /><small className="form-text text-muted">  </small></div>
              </div>
              <br />
           
              <br />
              <div className="row form-group">
                <div className="col col-md-3"><label className=" form-control-label">Radios</label></div>
                <div className="col col-md-9">
                  <div className="form-check">
                    <div className="radio">
                      <label htmlFor="radio1" className="form-check-label ">
                        <input type="radio" id="radio1" name="radios" defaultValue="option1" className="form-check-input" />Option 1
                      </label>
                    </div>
                    <div className="radio">
                      <label htmlFor="radio2" className="form-check-label ">
                        <input type="radio" id="radio2" name="radios" defaultValue="option2" className="form-check-input" />Option 2
                      </label>
                    </div>
                    <div className="radio">
                      <label htmlFor="radio3" className="form-check-label ">
                        <input type="radio" id="radio3" name="radios" defaultValue="option3" className="form-check-input" />Option 3
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <br />
            
            
              <div className="row form-group">
                <div className="col col-md-3"><label className=" form-control-label">Checkboxes</label></div>
                <div className="col col-md-9">
                  <div className="form-check">
                    <div className="checkbox">
                      <label htmlFor="checkbox1" className="form-check-label ">
                        <input type="checkbox" id="checkbox1" name="checkbox1" defaultValue="option1" className="form-check-input" />Option 1
                      </label>
                    </div>
                    <div className="checkbox">
                      <label htmlFor="checkbox2" className="form-check-label ">
                        <input type="checkbox" id="checkbox2" name="checkbox2" defaultValue="option2" className="form-check-input" /> Option 2
                      </label>
                    </div>
                    <div className="checkbox">
                      <label htmlFor="checkbox3" className="form-check-label ">
                        <input type="checkbox" id="checkbox3" name="checkbox3" defaultValue="option3" className="form-check-input" /> Option 3
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="file-input" className=" form-control-label">Ảnh Đại Diện</label></div>
                <div className="col-12 col-md-9"><input type="file" id="file-input" name="file-input" className="form-control-file" /></div>
              </div>
              <br></br>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="file-multiple-input" className=" form-control-label">Ảnh Chi Tiết</label></div>
               
                <div className="col-12 col-md-9"><input type="file" id="file-multiple-input" name="file-multiple-input" multiple className="form-control-file" /></div>
              </div>
            </form>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary btn-sm">
              <i className="fa fa-dot-circle-o" /> Submit
            </button>
            <button type="reset" className="btn btn-danger btn-sm">
              <i className="fa fa-ban" /> Reset
            </button>
          </div>
        </div>
     
      </div>
    </div>
  </div>{/* .animated */}
</div>{/* .content */}

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default ProductDetail