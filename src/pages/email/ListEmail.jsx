import React, { useState } from 'react'
import "./emailList.css"
function ListEmail() {
  return (
    <>
      <div className="main">
        <div className="row">
          <div className="col-12">
            <div className="mails card-box">
              <div className="table-box">
                <div className="table-detail">
                  <div className="p-4">
                    <div className="list-group mail-list mt-3">
                      <a href="#" className="list-group-item border-0 text-success"><i className="fas fa-download font-13 mr-2" />Inbox <b>(8)</b></a>
                    </div>
                    <h5 className="mt-4 text-uppercase hidden-xxs">Chat</h5>
                  </div>

                </div>
                <div className="container-fluid" id="content">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title">Tab with icon</h4>
                          {/* Nav tabs */}
                          <ul className="nav nav-tabs mb-3" role="tablist">
                            <li className="nav-item"><button className="nav-link" data-toggle="tab" href="#home8"  ><span>

                              <i className="fa fa-home" /></span></button>
                            </li>
                            <li className="nav-item"><button className="nav-link" data-toggle="tab" href="#profile8" ><span><i className="fas fa-paper-plane" /></span></button>
                            </li>
                          </ul>
                          {/* Tab panes */}
                              <div className="tab-content tabcontent-border">
                                <div className="tab-pane fade show active" id="home8" role="tabpanel">
                                  <div className="table-detail mail-right">
                                    <div className="table-responsive mt-3">
                                      <table className="table table-hover mails m-0">
                                        <thead>
                                          <tr>
                                            <th className="cell">Order</th>
                                            <th className="cell">Customer</th>
                                            <th className="cell">Date</th>
                                            <th className="cell">Status</th>
                                            <th className="cell">Total</th>
                                            <th className="cell">Total</th>

                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr className="unread">
                                            <td className="mail-select">
                                              <div className="checkbox checkbox-primary mr-4">
                                                <input id="checkbox1" type="checkbox" />
                                                <label htmlFor="checkbox1" />
                                              </div>
                                            </td>
                                            <td>
                                              <p href="email-read.html" className="email-name">Google Inc</p>
                                            </td>
                                            <td className="d-none d-lg-inline-block">
                                              <p href="email-read.html" className="email-msg">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
                                            </td>

                                            <td className="text-right mail-time">
                                              <a>
                                                12:30
                                              </a>
                                            </td>
                                            <td className=" mail-time">
                                              <span>
                                                <button type="button" class="btn btn-eye btn-primary "><i class="fa fa-eye"></i></button>
                                                <button type="button" class="btn btn-success "><i class="fas fa-pen-fancy"></i></button>
                                              </span>
                                            </td>
                                            <td className="text-right mail-time">
                                              <a>
                                                <button type="button" class="btn btn-eye btn-danger "><i class="fa fa-trash"></i></button>
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="row mt-3 mb-3">
                                      <div className="col-7 mt-3">
                                        Showing 1 - 20 of 289
                                      </div>
                                      <div className="col-5 mt-3">
                                        <div className="btn-group float-right">
                                          <button type="button" className="btn btn-secondary waves-effect"><i className="fa fa-chevron-left" /></button>
                                          <button type="button" className="btn btn-secondary waves-effect"><i className="fa fa-chevron-right" /></button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                  
                         

                        </div>
                      </div>
                    </div>


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

export default ListEmail