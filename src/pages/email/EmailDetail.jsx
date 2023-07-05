import React from 'react'

function EmailDetail() {
    return (
        <>
            <div id="wrapper">
            
                <div className=" content-page ">
                    <div className="content">
                        {/* Start Content*/}
                        <div className="container-fluid">
                            {/* start page title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Zircos</a></li>
                                                <li className="breadcrumb-item"><a href="javascript: void(0);">Email</a></li>
                                                <li className="breadcrumb-item active">Email Read</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">Email Read </h4>
                                    </div>
                                </div>
                            </div>
                            {/* end page title */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="mails card-box">
                                        <div className="table-box">
                                            <div className="table-detail mail-right">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="btn-toolbar mt-4" role="toolbar">
                                                            <div className="btn-group mr-2">
                                                                <button type="button" className="btn btn-primary waves-effect waves-light"><i className="fa fa-inbox" /></button>
                                                                <button type="button" className="btn btn-primary waves-effect waves-light"><i className="fa fa-exclamation-circle" /></button>
                                                                <button type="button" className="btn btn-primary waves-effect waves-light"><i className="far fa-trash-alt" /></button>
                                                            </div>
                                                            <div className="btn-group mr-2">
                                                                <button className="btn btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="fa fa-folder" />
                                                                    <i className="mdi mdi-chevron-down" />
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Action</a></li>
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Another action</a></li>
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Something else here</a></li>
                                                                    <li className="dropdown-divider" />
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Separated link</a></li>
                                                                </ul>
                                                            </div>
                                                            <div className="btn-group mr-2">
                                                                <button className="btn btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className="fa fa-tag" />
                                                                    <i className="mdi mdi-chevron-down" />
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Action</a></li>
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Another action</a></li>
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Something else here</a></li>
                                                                    <li className="dropdown-divider" />
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Separated link</a></li>
                                                                </ul>
                                                            </div>
                                                            <div className="btn-group">
                                                                <button className="btn btn-primary dropdown-toggle waves-effect waves-light" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    More <i className="mdi mdi-chevron-down" />
                                                                </button>
                                                                <ul className="dropdown-menu">
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Dropdown link</a></li>
                                                                    <li><a href="javascript:void(0);" className="dropdown-item">Dropdown link</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* End row */}
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="card-box mt-4">
                                                            <h5 className="mt-0"><b>Hi Bro, How are you?</b></h5>
                                                            <hr />
                                                            <div className="media mb-4">
                                                                <a href="#" className="float-left mr-2">
                                                                    <img alt="" src="assets\images\users\avatar-2.jpg" className="media-object avatar-sm rounded-circle" />
                                                                </a>
                                                                <div className="media-body">
                                                                    <span className="media-meta float-right">07:23 AM</span>
                                                                    <h5 className="text-primary font-16 m-0">Jonathan Smith</h5>
                                                                    <small className="text-muted">From: jonathan@domain.com</small>
                                                                </div>
                                                            </div>
                                                            {/* media */}
                                                            <p><b>Hi Bro...</b></p>
                                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
                                                            <p>Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.</p>
                                                            <p>Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,</p>
                                                            <hr />
                                                            <h5 className="font-18"> <i className="fa fa-paperclip mr-2 mb-2" /> Attachments <span>(3)</span> </h5>
                                                            <div className="row">
                                                                <div className="col-xl-2 col-sm-4">
                                                                    <a href="#"> <img src="assets\images\small\img-1.jpg" alt="attachment" className="img-thumbnail img-fluid " /> </a>
                                                                </div>
                                                                <div className="col-xl-2 col-sm-4">
                                                                    <a href="#"> <img src="assets\images\small\img-2.jpg" alt="attachment" className="img-thumbnail img-fluid" /> </a>
                                                                </div>
                                                                <div className="col-xl-2 col-sm-4">
                                                                    <a href="#"> <img src="assets\images\small\img-3.jpg" alt="attachment" className="img-thumbnail img-fluid" /> </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* card-box */}
                                                    </div>
                                                    {/* end col */}
                                                </div>
                                                {/* end row */}
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="text-right">
                                                            <button type="button" className="btn btn-primary waves-effect waves-light width-md mb-4"> <i className="mdi mdi-reply mr-2" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* End row */}
                                            </div>
                                            {/* table detail */}
                                        </div>
                                        {/* end table box */}
                                    </div>
                                    {/* mails */}
                                </div>
                            </div>
                            {/* end row */}
                        </div>
                        {/* end container-fluid */}
                    </div>
                    {/* end content */}
                    {/* Footer Start */}
                    <footer className="footer">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    2018 - 2020 © Zircos theme by <a href>Coderthemes</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                    {/* end Footer */}
                </div>
                {/* ============================================================== */}
                {/* End Page content */}
                {/* ============================================================== */}
            </div>
















        </>
    )
}

export default EmailDetail