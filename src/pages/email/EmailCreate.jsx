import React from 'react'
import "./emailCreate.css"

function EmailCreate() {
  return (
    <>
    <div className='main'>
  <section>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-15">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">Send New Email</h3>
            </div>
            {/* /.card-header */}
            <div className="card-body">
              <div className="form-group">
                <input className="form-control" placeholder="To:" />
              </div>
              <div className="form-group">
                <input className="form-control" placeholder="Subject:" />
              </div>
              <div className="form-group">
                <textarea id="compose-textarea" className="form-control" style={{height: '300px'}} />
              </div>
              
            </div>
            {/* /.card-body */}
            <div className="card-footer">
              <div className="float-right">
               
                <button type="submit" className="btn btn-primary"><i className="far fa-envelope" /> Send</button>
                <button type="reset" className="btn btn-danger"><i className="fas fa-times" /> Cancle</button>
              </div>
         
            </div>
            {/* /.card-footer */}
          </div>
          {/* /.card */}
        </div>
        {/* /.col */}
      </div>
      {/* /.row */}
    </div>{/* /.container-fluid */}
  </section>
  {/* /.content */}


    
  </div>
    
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default EmailCreate