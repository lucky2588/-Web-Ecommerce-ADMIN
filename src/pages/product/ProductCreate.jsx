import React from 'react'
import "./product.css"

function ProductCreate() {
  return (
    <>
    <div className="main">
  <div className="animated fadeIn">
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <strong>Basic Form</strong> Elements
          </div>
          <div className="card-body card-block">
            <form action method="post" encType="multipart/form-data" className="form-horizontal">
              <div className="row form-group">
                <div className="col col-md-3"><label className=" form-control-label">Static</label></div>
                <div className="col-12 col-md-9">
                  <p className="form-control-static">Username</p>
                </div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="text-input" className=" form-control-label">Text Input</label></div>
                <div className="col-12 col-md-9"><input type="text" id="text-input" name="text-input" placeholder="Text" className="form-control" /><small className="form-text text-muted">This is a help text</small></div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="email-input" className=" form-control-label">Email Input</label></div>
                <div className="col-12 col-md-9"><input type="email" id="email-input" name="email-input" placeholder="Enter Email" className="form-control" /><small className="help-block form-text">Please enter your email</small></div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="password-input" className=" form-control-label">Password</label></div>
                <div className="col-12 col-md-9"><input type="password" id="password-input" name="password-input" placeholder="Password" className="form-control" /><small className="help-block form-text">Please enter a complex password</small></div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="disabled-input" className=" form-control-label">Disabled Input</label></div>
                <div className="col-12 col-md-9"><input type="text" id="disabled-input" name="disabled-input" placeholder="Disabled" disabled className="form-control" /></div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="textarea-input" className=" form-control-label">Textarea</label></div>
                <div className="col-12 col-md-9"><textarea name="textarea-input" id="textarea-input" rows={9} placeholder="Content..." className="form-control" defaultValue={""} /></div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="select" className=" form-control-label">Select</label></div>
                <div className="col-12 col-md-9">
                  <select name="select" id="select" className="form-control">
                    <option value={0}>Please select</option>
                    <option value={1}>Option #1</option>
                    <option value={2}>Option #2</option>
                    <option value={3}>Option #3</option>
                  </select>
                </div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="selectLg" className=" form-control-label">Select Large</label></div>
                <div className="col-12 col-md-9">
                  <select name="selectLg" id="selectLg" className="form-control-lg form-control">
                    <option value={0}>Please select</option>
                    <option value={1}>Option #1</option>
                    <option value={2}>Option #2</option>
                    <option value={3}>Option #3</option>
                  </select>
                </div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="selectSm" className=" form-control-label">Select Small</label></div>
                <div className="col-12 col-md-9">
                  <select name="selectSm" id="SelectLm" className="form-control-sm form-control">
                    <option value={0}>Please select</option>
                    <option value={1}>Option #1</option>
                    <option value={2}>Option #2</option>
                    <option value={3}>Option #3</option>
                    <option value={4}>Option #4</option>
                    <option value={5}>Option #5</option>
                  </select>
                </div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="disabledSelect" className=" form-control-label">Disabled Select</label></div>
                <div className="col-12 col-md-9">
                  <select name="disabledSelect" id="disabledSelect" disabled className="form-control">
                    <option value={0}>Please select</option>
                    <option value={1}>Option #1</option>
                    <option value={2}>Option #2</option>
                    <option value={3}>Option #3</option>
                  </select>
                </div>
              </div>
              <br />
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
           
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="file-input" className=" form-control-label">File input</label></div>
                <div className="col-12 col-md-9"><input type="file" id="file-input" name="file-input" className="form-control-file" /></div>
              </div>
              <div className="row form-group">
                <div className="col col-md-3"><label htmlFor="file-multiple-input" className=" form-control-label">Multiple File input</label></div>
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

export default ProductCreate