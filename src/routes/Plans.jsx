import React from 'react';
import basic from '../assets/images/basic.png';
import standard from '../assets/images/standard.png';
import premium from '../assets//images/professional.png';

import './Plans.css';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../context/authContext';
import { updatePlanForUser } from '../utils/firebase';

// Stripe public key
const PUBLIC_KEY = 'stripekey'; // Place your stripe public key here
let stripePromise;

// Initialize Stripe with public key
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(PUBLIC_KEY);
    }
    return stripePromise;
};

// Subscription plan data
const data = [
    {
        id: 1,
        src: basic,
        title: "Basic",
        price: "Free",
        productId: "none"
    },
    {
        id: 2,
        src: standard,
        title: "Standard",
        price: "199",
        productId: "price_1O15CcSEsIpVgtRQPYvzUqSo"
    },
    {
        id: 3,
        src: premium,
        title: "Premium",
        price: "299",
        productId: "price_1NzQYFSEsIpVgtRQKyPxEgM7"
    }
];

export default function Plans() {
    // Navigation and user context hooks
    const login = useNavigate();
    const { user } = useAuth();

    // Handle redirection to Stripe checkout
    const redirectToCheckout = async (productId, id) => {
        if(!user){
            alert("You first need to login before purchasing a plan.");
            login('/login');
            return;
        }
        if (id === 1){
            await updatePlanForUser(user.uid, 'basic');
            alert("Successfully subscribed to basic plan");
            return;
        }
        if (id === 2) {
            await updatePlanForUser(user.uid, 'Standard');
        } else if (id === 3) {
            await updatePlanForUser(user.uid, 'Premium');
        }
        const stripe = await getStripe();
        const checkoutOptions = {
            lineItems: [{
                price: productId,
                quantity: 1,
            }],
            mode: 'subscription',
            successUrl: `${window.location.origin}/`,
            cancelUrl: `${window.location.origin}/plans`,
        };
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        if (error) {
            console.error(error);
        }
    };

    return (
        <div className='plans-container'>
            <div className='plan-column'>
                {data.map((item, idx) => (
                    <div className='plan' key={idx}>
                        <img className='plan-image' src={item.src} alt='' width={200} height={200} />
                        <div className='plan-title'>
                            {item.title}
                        </div>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione provident expedita adipisci vel ipsum. perferendis earum iste dolores impedit itaque?</p>
                        <div className='plan-title'>
                            <i className="fa fa-dollar"></i>{item.price}
                        </div>
                        <button className="subscribe-button"
                            onClick={() => redirectToCheckout(item.productId, item.id)}>
                            <i className="fa fa-shopping-cart"></i> 
                            {item.price === "Free" ? " Get for Free" : " Subscribe"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
