import React from 'react'
import "./product.css"

function ProductList() {
  
  return (
    <>
      <div id="main">
        <div className="content mt-10">
          <div className="animated fadeIn">
            <div className="row">
              <div className="col-md-14">
                <div className="card">
                  <div className="card-header">
                    <strong className="card-title">Data Table</strong>
                  </div>
                  <div className="card-body">
                    <table id="bootstrap-data-table-export" className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Office</th>
                          <th>Salary</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Tiger Nixon</td>
                          <td>System Architect</td>
                          <td>Edinburgh</td>
                          <td>$320,800</td>
                          <td>
                            <a class="m-n5">
                              <button type="button" class="btn btn-eye btn-primary m-2"><i class="fa fa-eye"></i></button>
                              <button type="button" class="btn btn-square btn-danger m-2"><i class="fa fa-remove"></i></button>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>








    </>
  )
}

export default ProductList