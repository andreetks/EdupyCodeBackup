import React, { Component } from 'react'

import axios from 'axios';
import Cookies from 'js-cookie';
import { PayPalButtons } from '@paypal/react-paypal-js'
import toast from 'react-hot-toast';

var csrfCookie = Cookies.get('csrftoken');

export class PagoPaypal extends Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {

        var sessionKey = this.props.sessionKey;

        return (
            <PayPalButtons
                style={{layout: 'horizontal'}}
                createOrder={(data,actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: this.props.costo,
                                }
                            }
                        ]
                    })
                }}
                onApprove={((data, actions) => {
                    return actions.order.capture().then(details => {
                        toast.success(`Felicidades, ${details.payer.name.given_name}. Tu pago ha sido registrado.`, {
                            duration: 5000
                        });
                        axios.patch(`/api/crear-sesion/${this.props.session_id}/`, {
                            "nuevo": false
                        }, {
                            headers: {
                                'X-CSRFTOKEN': csrfCookie,
                            }
                        })
                        .then(res => {
                            // console.log("REDIRIGEMEEEE");
                            setTimeout(function(){
                                window.location.replace(`/chat/${sessionKey}`);
                            }, 3000)
                        })
                    })
                })}
                onCancel={() => {
                    toast("Pago cancelado", {
                        duration: 5000
                    })
                }}
                onError={(err) => {
                    toast.error(`Hubo un error con su pago.`, {
                        duration: 5000
                    })
                }}
            />
        )
    }
}

export default PagoPaypal
