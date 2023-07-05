import React from 'react'
import "./orderDetail.css"
function OrderDetail() {
    return (
        <>
            <div class="main">
                <div class="col-lg-10">
                    <div>
                        <div className="card">
                            <div className="card-header">
                                <strong className="card-title">Credit Card</strong>
                            </div>
                            <div className="card-body">
                                {/* Credit Card */}
                                <div id="pay-invoice">
                                    <div className="card-body">
                                        <div className="card-title">
                                            <h3 className="text-center">Pay Invoice</h3>
                                        </div>
                                        <hr />
                                        <form action method="post" noValidate="novalidate">

                                            <div className="form-group">
                                                <label htmlFor="cc-payment" className="control-label mb-1">Payment amount</label>
                                                <input id="cc-pament" name="cc-payment" type="text" className="form-control" aria-required="true" aria-invalid="false" defaultValue={100.00} />
                                            </div>
                                            <div className="form-group has-success">
                                                <label htmlFor="cc-name" className="control-label mb-1">Name on card</label>
                                                <input id="cc-name" name="cc-name" type="text" className="form-control cc-name valid" data-val="true" data-val-required="Please enter the name on card" autoComplete="cc-name" aria-required="true" aria-invalid="false" aria-describedby="cc-name-error" />
                                                <span className="help-block field-validation-valid" data-valmsg-for="cc-name" data-valmsg-replace="true" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="cc-number" className="control-label mb-1">Card number</label>
                                                <input id="cc-number" name="cc-number" type="tel" className="form-control cc-number identified visa" defaultValue data-val="true" data-val-required="Please enter the card number" data-val-cc-number="Please enter a valid card number" autoComplete="cc-number" />
                                                <span className="help-block" data-valmsg-for="cc-number" data-valmsg-replace="true" />
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label htmlFor="cc-exp" className="control-label mb-1">Expiration</label>
                                                        <input id="cc-exp" name="cc-exp" type="tel" className="form-control cc-exp" defaultValue data-val="true" data-val-required="Please enter the card expiration" data-val-cc-exp="Please enter a valid month and year" placeholder="MM / YY" autoComplete="cc-exp" />
                                                        <span className="help-block" data-valmsg-for="cc-exp" data-valmsg-replace="true" />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="x_card_code" className="control-label mb-1">Security code</label>
                                                    <div className="input-group">
                                                        <input id="x_card_code" name="x_card_code" type="tel" className="form-control cc-cvc" defaultValue data-val="true" data-val-required="Please enter the security code" data-val-cc-cvc="Please enter a valid security code" autoComplete="off" />
                                                        <div className="input-group-addon">
                                                            <span className="fas fa-pager fa-lg" data-toggle="popover" data-container="body" data-html="true" data-title="Security Code" data-content="<div class='text-center one-card'>The 3 digit code on back of the card..<div class='visa-mc-cvc-preview'></div></div>" data-trigger="hover" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <br></br>
                                                <div>
                                                    <div className="card-title">
                                                        <h3 className="text-center">Pay Invoice</h3>
                                                    </div>
                                                    <hr />
                                                    <form action method="post" noValidate="novalidate">

                                                        <div className="form-group">
                                                            <label htmlFor="cc-payment" className="control-label mb-1">Payment amount</label>
                                                            <input id="cc-pament" name="cc-payment" type="text" className="form-control" aria-required="true" aria-invalid="false" defaultValue={100.00} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="cc-payment" className="control-label mb-1">Payment amount</label>
                                                            <input id="cc-pament" name="cc-payment" type="text" className="form-control" aria-required="true" aria-invalid="false" defaultValue={100.00} />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="cc-payment" className="control-label mb-1">Payment amount</label>
                                                            <input id="cc-pament" name="cc-payment" type="text" className="form-control" aria-required="true" aria-invalid="false" defaultValue={100.00} />
                                                        </div>
                                                    </form></div>


                                                <br></br>
                                                <button id="payment-button" type="submit" className="btn btn-lg btn-info btn-block">
                                                    <i className="fa fa-lock fa-lg" />;
                                                    <span id="payment-button-amount">Pay $100.00</span>
                                                    <span id="payment-button-sending" style={{ display: 'none' }}>Sending…</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div> &lt;
                    </div>



                </div>





                <div className="content1">


                    <section className="module">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6 col-sm-offset-3">
                                    <h1 className="module-title font-alt">Checkout</h1>
                                </div>
                            </div>
                            <hr className="divider-w pt-20" />
                            <div className="row">
                                <div className="col-sm-12">
                                    <table className="table table-striped table-border checkout-table">
                                        <tbody>
                                            <tr>
                                                <th className="hidden-xs">Item</th>
                                                <th>Description</th>
                                                <th className="hidden-xs">Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th>Remove</th>
                                            </tr>
                                          
                                            <tr>
                                                <td className="hidden-xs"><a href="#"><img src="assets/images/shop/product-13.jpg" alt="Men’s Casual Pack" /></a></td>
                                                <td>
                                                    <h5 className="product-title font-alt">Men’s Casual Pack</h5>
                                                </td>
                                                <td className="hidden-xs">
                                                    <h5 className="product-title font-alt">£20.00</h5>
                                                </td>
                                                <td>
                                                    <input className="form-control" type="number" name defaultValue={1} max={50} min={1} />
                                                </td>
                                                <td>
                                                    <h5 className="product-title font-alt">£20.00</h5>
                                                </td>
                                                <td className="pr-remove"><a href="#" title="Remove"><i className="fa fa-times" /></a></td>
                                            </tr>
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
                                        <button className="btn btn-round btn-g" type="submit">Apply</button>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-sm-offset-3">
                                    <div className="form-group">
                                        <button className="btn btn-block btn-round btn-d pull-right" type="submit">Update Cart</button>
                                    </div>
                                </div>
                            </div>
                            <hr className="divider-w" />
                            <div className="row mt-70">
                                <div className="col-sm-5 col-sm-offset-7">
                                    <div className="shop-Cart-totalbox">
                                        <h4 className="font-alt">Cart Totals</h4>
                                        <table className="table table-striped table-border checkout-table">
                                            <tbody>
                                                <tr>
                                                    <th>Cart Subtotal :</th>
                                                    <td>£40.00</td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping Total :</th>
                                                    <td>£2.00</td>
                                                </tr>
                                                <tr className="shop-Cart-totalprice">
                                                    <th>Total :</th>
                                                    <td>£42.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button className="btn btn-lg btn-block btn-round btn-d" type="submit">Proceed to Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                </div>


            </div>


        </>
    )
}

export default OrderDetail