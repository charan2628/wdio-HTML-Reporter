import React from 'react'
import { render } from 'react-dom'
import Feature from './FeatureDiv'

window.React = React

let data = [
    {
        title: "FEATURE: THD Checkout page automation",
        result: true,
        scenarios: [{
            title: "SCENARIO: Placing Order",
            result: true,
            steps: [
                {
                    title: "WHEN: I search for an item",
                    result: true
                },
                {
                    title: "AND: I add the first item available to cart",
                    result: true
                },
                {
                    title: "THEN: I should have one item in cart",
                    result: true
                },
                {
                    title: "THEN: I proceed to checkout page and guest sign in",
                    result: false
                }, 
                {
                    title: "THEN: I fill the checkout page form and places the order",
                    result: true
                }
        ]
        }]
    },
    {
        title: "FEATURE: THD Loyality Page Automation",
        result: false,
        scenarios: [
            {
                title: "SCENARIO: Siging in",
                result: true,
                steps: [

                ]
            },
            {
                title: "SCENARIO: Adding Order",
                result: false,
                steps: [

                ]
            }
        ]
    }
]

render(<Feature features={data} result={true} />,
                document.getElementById('react-container'))