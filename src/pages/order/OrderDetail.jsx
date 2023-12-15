import React, { useEffect } from 'react'
import "./orderDetail.css"
import { useGetBillbyIdQuery, useGetPaymentQuery, useLazyGetPaymentQuery } from '../../app/service/orderApi'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';
import { useState } from 'react';
function OrderDetail() {
    const { orderId } = useParams();
    const { auth, token } = useSelector((state) => state.auth);
    const [getData, { data, isLoading }] = useLazyGetPaymentQuery();
    const { data: Items, isError } = useGetBillbyIdQuery(data?.orderBill.id)
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [note, setNote] = useState('');

    const [showModal1, setShowModal1] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState(1);
    const [showForm1, setShowForm1] = useState(false);
    const [note1, setNote1] = useState('');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


    useEffect(() => {
        getData(orderId);
    }, [])

    const handlenBtnAccpect = async () => {
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/order/getAccept/${orderId}`);
            toast.success("Accpect Seccess !! ")
            getData(orderId);
        } catch (err) {
            toast.error("Product Quantity is not enough")
        }
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOptionChange = (e) => {
        const selectedValue = parseInt(e.target.value);
        setSelectedOption(selectedValue);

        if (selectedValue === 3) {
            setShowForm(true);
        } else {
            setShowForm(false);
        }
    };

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleConfirm = async () => {
        let text;
        if (selectedOption === 1) {
            text = "Out of stock, not updated system"
        }
        if (selectedOption === 2) {
            text = "difference in quantity and size in the store"
        }
        const objPush = {
            note: selectedOption === 3 ? note : text,
        }
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/order/cancleOrder/${orderId}`, objPush);
            toast.success("Cancle Order Seccess !! ")
            getData(orderId);
        } catch (err) {
            toast.error("Fail !! ")
        }
        getData(orderId);
        // Đóng popup menu
        handleCloseModal();
    };

    const handleShowModal1 = () => {
        setShowModal1(true);
    };

    const handleCloseModal1 = () => {
        setShowModal1(false);
    };

    const handleOptionChange1 = (e) => {
        const selectedValue1 = parseInt(e.target.value);
        setSelectedOption1(selectedValue1);

        if (selectedValue1 === 3) {
            setShowForm1(true);
        } else {
            setShowForm1(false);
        }
    };

    const handleNoteChange1 = (e) => {
        setNote1(e.target.value);
    };

    const handlenBtnRefund = async () => {
        let text;
        if (selectedOption1 === 1) {
            text = "Out of stock, not updated system"
        }
        if (selectedOption1 === 2) {
            text = "difference in quantity and size in the store"
        }
        const objPush1 = {
            note: selectedOption1 === 3 ? note1 : text,
        }

        try {
            const response = await axios.post(`http://localhost:8888/api/v1/order/refundOrder/${orderId}`, objPush1);
            toast.success("Refund Order Seccess !! ")
        } catch (err) {
            toast.error("Fail !! ")
        }
        getData(orderId);
        // Đóng popup menu
        handleCloseModal1();
    };

    const handlenBtnReturn = async () => {
        try {
            const response = await axios.post(`http://localhost:8888/api/v1/order/returnOrder/${orderId}`);
            toast.success("Return Order Seccess !! ")
            getData(orderId);
        } catch (err) {
            toast.error("Fail !! ")
        }
    }

    if (isLoading || isError) {
        return <h2>Is loading ...</h2>
    }
    return (
        <>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.3.0/mdb.min.css" rel="stylesheet" />
            <div className="main">
            <Link  type="button" className="btn btn-success waves-effect waves-light mx-3 mb-3" to={"/admin/order"}>Back</Link>
                <div class="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <strong className="card-title">Infomation Order </strong>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                     
                        <div className="content1">
                            <section className="module">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-8 col-sm-offset-3">
                                            <h1 className="module-title font-alt">Checkout</h1>
                                        </div>
                                    </div>
                                    <hr className="divider-w pt-20" />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table className="table table-striped table-border checkout-table">
                                                <tbody>
                                                    <tr>
                                                        <th className="hidden-xs">Thumbail</th>
                                                        <th className="hidden-xs">Item</th>
                                                        <th>Price</th>
                                                        <th className="hidden-xs">Nums</th>
                                                        <th>Total</th>
                                                        <th>View</th>
                                                    </tr>
                                                    {Items?.orderItems.length > 0 && Items.orderItems.map((e) => (
                                                        <tr>
                                                            <td>
                                                                <img src={e.product.thumbail} alt="contact-img" title="contact-img" className="img-thumbnail rounded-circle" height="100px" width="50px" />
                                                            </td>
                                                            <td>
                                                                <h5 className="product-title font-alt">{e.product.name}</h5>
                                                            </td>
                                                            <td className="hidden-xs">
                                                                <h6 className="product-title font-alt">

                                                                    {e?.product.sales > 0 ? (

                                                                        <small className="card-text mb-1 me-1 text-danger">{
                                                                            parseFloat(e?.product.sales).toLocaleString('en-US', {
                                                                                minimumFractionDigits: 0,
                                                                                maximumFractionDigits: 0,
                                                                                minimumIntegerDigits: 3,
                                                                            })
                                                                        }đ

                                                                            <a class="text-warning text-test mx-3"><s>
                                                                                {
                                                                                    parseFloat(e?.product.price).toLocaleString('en-US', {
                                                                                        minimumFractionDigits: 0,
                                                                                        maximumFractionDigits: 0,
                                                                                        minimumIntegerDigits: 3,
                                                                                    })
                                                                                }đ
                                                                            </s></a>
                                                                        </small>

                                                                    ) : (
                                                                        <small className="card-text mb-1 me-1 ">
                                                                            {
                                                                                parseFloat(e?.product.price).toLocaleString('en-US', {
                                                                                    minimumFractionDigits: 0,
                                                                                    maximumFractionDigits: 0,
                                                                                    minimumIntegerDigits: 3,
                                                                                })
                                                                            }đ
                                                                        </small>
                                                                    )
                                                                    }
                                                                </h6>
                                                            </td>
                                                            <td>
                                                                <h5 className="product-title font-alt">{e.nums}</h5>
                                                            </td>
                                                            <td>
                                                                <h6 className="product-title font-alt">
                                                                    {
                                                                        parseFloat(e.price).toLocaleString('en-US', {
                                                                            minimumFractionDigits: 0,
                                                                            maximumFractionDigits: 0,
                                                                            minimumIntegerDigits: 3,
                                                                        })
                                                                    } đ
                                                                </h6>
                                                            </td>
                                                            <td className="pr-remove">
                                                                <Link type="button" class="btn btn-eye btn-primary m-2"><i class="fa fa-eye"></i></Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                    )
                                                    }


                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <input className="form-control" type="text" id name placeholder="Coupon code" />
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div className="form-group">
                                                <button className="btn btn-primary btn-g" type="submit">Apply</button>
                                            </div>
                                        </div>
                                        <div className="col-sm-3 col-sm-offset-3">
                                            <div className="form-group">
                                                <button className="btn btn-danger btn-round btn-d pull-right" type="submit"> Export File</button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="divider-w" />
                                    <div className="row mt-70">
                                        <div className="col-sm-5 col-sm-offset-7">
                                            <div className="shop-Cart-totalbox">
                                                <h4 className="font-alt"> Totals</h4>
                                                <table className="table table-striped table-border checkout-table">
                                                    <tbody>
                                                        <tr>
                                                            <th>Cart Subtotal :</th>
                                                            <td>
                                                                {
                                                                    parseFloat(data?.price).toLocaleString('en-US', {
                                                                        minimumFractionDigits: 0,
                                                                        maximumFractionDigits: 0,
                                                                        minimumIntegerDigits: 3,
                                                                    })
                                                                } Đ
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>Shipping Total :</th>
                                                            {
                                                                data?.transport == 1 ? (
                                                                    <td>
                                                                        {
                                                                            parseFloat(50000.000).toLocaleString('en-US', {
                                                                                minimumFractionDigits: 0,
                                                                                maximumFractionDigits: 0,
                                                                                minimumIntegerDigits: 3,
                                                                            })
                                                                        } Đ
                                                                    </td>
                                                                ) : (
                                                                    <td>
                                                                        {
                                                                            parseFloat(30000.000).toLocaleString('en-US', {
                                                                                minimumFractionDigits: 0,
                                                                                maximumFractionDigits: 0,
                                                                                minimumIntegerDigits: 3,
                                                                            })
                                                                        } Đ
                                                                    </td>
                                                                )
                                                            }
                                                            <td>

                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <Modal show={showModal} onHide={handleCloseModal}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Why reason cancle this order </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group controlId="formReason">
                                                                <Form.Label>Why Reason</Form.Label>
                                                                <Form.Control as="select" onChange={handleOptionChange} value={selectedOption}>
                                                                    <option value={1}>Out of stock, not updated system</option>
                                                                    <option value={2}>difference in quantity and size in the store</option>
                                                                    <option value={3}>Reason diffirent</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {showForm && (
                                                                <Form.Group controlId="formNote">
                                                                    <Form.Label>Note : </Form.Label>
                                                                    <Form.Control type="text" value={note} onChange={handleNoteChange} />
                                                                </Form.Group>
                                                            )}
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleCloseModal}>
                                                            Hủy
                                                        </Button>
                                                        <Button variant="primary" onClick={handleConfirm}>
                                                            Xác nhận
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                <br></br>
                                                <Modal show={showModal1} onHide={handleCloseModal1}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title> Why Reason Refund this Order  </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Form>
                                                            <Form.Group controlId="formReason">
                                                                <Form.Label>Lý do:</Form.Label>
                                                                <Form.Control as="select" onChange={handleOptionChange1} value={selectedOption1}>
                                                                    <option value={1}>Customers Do Not Receive</option>
                                                                    <option value={2}>Delivery Time Too Long</option>
                                                                    <option value={3}>Other Reason</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            {showForm1 && (
                                                                <Form.Group controlId="formNote">
                                                                    <Form.Label>Note:</Form.Label>
                                                                    <Form.Control type="text" value={note1} onChange={handleNoteChange1} />
                                                                </Form.Group>
                                                            )}
                                                        </Form>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={handleCloseModal1}>
                                                            Cancle
                                                        </Button>
                                                        <Button variant="primary" onClick={handlenBtnRefund}>
                                                            Accpect
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                {
                                                    data?.paymentStatus == "INITIAL" && (
                                                        <>
                                                            <button className='btn btn-danger mx-3 ma-3' onClick={handleShowModal} id="payment-button-amount">Cancle</button>
                                                            <button className='btn btn-primary' onClick={handlenBtnAccpect} id="payment-button-amount">Accpect</button>
                                                        </>

                                                    )
                                                }
                                                {
                                                    data?.paymentStatus == "PROCEED" && (
                                                        <>
                                                            <button className='btn btn-danger mx-3' onClick={handleShowModal1} id="payment-button-amount" >Refund Order</button>
                                                            <button className='btn btn-warning' onClick={handlenBtnReturn} id="payment-button-amount" >Return The Order</button>
                                                        </>

                                                    )
                                                }
                                                {
                                                    data?.paymentStatus == "Not_Receive" && (
                                                        <>
                                                            <button className='btn btn-danger mx-3 mb-4' onClick={handleShowModal1} id="payment-button-amount" >Refund Order</button>
                                                            <button className='btn btn-info mb-4 ' onClick={handlenBtnReturn} id="payment-button-amount" >Return The Order</button>
                                                        </>

                                                    )
                                                }
                                                {
                                                    data?.paymentStatus == "REFUND" && (
                                                        <>
                                                            <button className='btn btn-danger mb-3' id="payment-button-amount" disabled>Is Cancled</button>
                                                        </>

                                                    )
                                                } {
                                                    data?.paymentStatus == "CANCLE" && (
                                                        <>
                                                            <button className='btn btn-danger mb-3' id="payment-button-amount" disabled>Is Cancled</button>
                                                        </>

                                                    )
                                                }
                                                {
                                                    data?.paymentStatus == "SUCCESS" && (
                                                        <>
                                                            <button className='btn btn-success' id="payment-button-amount" disabled >Seccess</button>
                                                        </>

                                                    )
                                                }
                                                <br></br>
                                                {
                                                    data?.reasonCancle && (
                                                        <div className="form-group mb-3">
                                                            <button htmlFor="cc-number" className="btn btn-warning control-label mb-2">Reason Cancle / Refund </button>



                                                            <input id="cc-number" name="cc-number" className="form-control cc-number identified visa" value={data?.reasonCancle} />

                                                        </div>
                                                    )
                                                }




                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>


                        </div>

                        <div className="card-body">

                            <div id="pay-invoice">
                                <div className="card-body">
                                    <div className="card-title">
                                        <h3 className="text-center">Garenal Infomation</h3>
                                    </div>

                                    <form action method="post" noValidate="novalidate">
                                        <div className="form-group">
                                            <label htmlFor="cc-payment" className="control-label mb-1"> Username</label>
                                            <input id="cc-pament" name="cc-payment" type="text" className="form-control" aria-required="true" aria-invalid="false" value={data?.user.name} />
                                        </div>
                                        <div className="form-group has-success">
                                            <label htmlFor="cc-name" className="control-label mb-1">Email</label>
                                            <input type="text" className="form-control cc-name valid" data-val="true" aria-invalid="false" value={data?.user.email} />
                                            <span className="help-block field-validation-valid" data-valmsg-for="cc-name" data-valmsg-replace="true" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cc-number" className="control-label mb-1">Phone Number</label>
                                            <input id="cc-number" name="cc-number" className="form-control cc-number identified visa" value={data?.user.phone} />
                                            <span className="help-block" data-valmsg-for="cc-number" data-valmsg-replace="true" />
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <label htmlFor="cc-exp" className="control-label mb-1">Address</label>
                                                    <input id="cc-number" name="cc-number" className="form-control cc-number identified visa" value={data?.address} />
                                                    <span className="help-block" data-valmsg-for="cc-exp" data-valmsg-replace="true" />
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <label htmlFor="cc-exp" className="control-label mb-1">Text Note</label>
                                                <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} value={data?.text}
                                                />
                                            </div>
                                        </div>
                                        {
                                            data?.accountBank && (

                                                <div>
                                                    <div className="card-title">
                                                        <h3 className="text-center">Information Card</h3>
                                                    </div>
                                                    <hr />
                                                    <form action method="post" noValidate="novalidate">

                                                        <div className="form-group">
                                                            <label htmlFor="cc-payment" className="control-label mb-1">Account Name</label>
                                                            <input id="cc-number" name="cc-number" className="form-control cc-number identified visa" value={data?.accountBank.nameAccount} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="cc-payment" className="control-label mb-1">Number Account</label>
                                                            <input id="cc-number" name="cc-number" className="form-control cc-number identified visa" value={data?.accountBank.numberAccount} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="cc-payment" className="control-label mb-1">Bank Branch</label>
                                                            <input id="cc-number" name="cc-number" className="form-control cc-number identified visa" value={data?.accountBank.bankBranch} />
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="cc-exp" className="control-label mb-1">Date </label>
                                                                    <input id="cc-number" name="cc-number" className="form-control cc-number identified visa" value={new Date(...data?.createAt).toLocaleDateString()} />
                                                                    <span className="help-block" data-valmsg-for="cc-exp" data-valmsg-replace="true" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <br></br>
                                                        <label htmlFor="cc-exp" className="control-label mb-1 mx-3">Transfer Amount </label>
                                                        <button className='btn btn-primary' id="payment-button-amount"
                                                        >
                                                            {
                                                                parseFloat(data?.price).toLocaleString('en-US', {
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 0,
                                                                    minimumIntegerDigits: 3,
                                                                })
                                                            } Đ
                                                        </button>

                                                    </form></div>

                                            )
                                        }
                                        <br></br>


                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> &lt;

                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>


        </>
    )
}

export default OrderDetail