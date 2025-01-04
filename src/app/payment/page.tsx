'use client'

import Script from "next/script";
import { useEffect } from "react";

export default function payment() {

    

    useEffect(()=>{
        const Script = document.createElement("script");
        //id should be same as given to form element
        const Form = document.getElementById('donateForm');

        const paymentScript = Form?.querySelector('script')
        if(paymentScript) return

        Script.setAttribute('src','https://checkout.razorpay.com/v1/payment-button.js')
        Script.setAttribute('data-payment_button_id','pl_Pea4dFMqYwSRxS') //pl_PeUYchhyaOLhZZ //pl_PeYLMITX7rqjvR
        Form!.appendChild(Script);
        console.log('running done')
    },[])
      
    
    return(
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <h1>
                This is the payment page
            </h1>
            <form id='donateForm'> </form>
        </div>
    )
}