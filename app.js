import React from 'react'
import { render } from 'react-dom'
import Feature from './components/Feature'

window.React = React

let data = [
    {
        title: "Feature: THD Checkout page automation",
        result: true,
        scenarios: [{
            title: "Scenario: Placing Order",
            result: true,
            steps: [
                {
                    title: "When: I search for an item",
                    result: true
                },
                {
                    title: "And: I add the first item available to cart",
                    result: true
                },
                {
                    title: "Then: I should have one item in cart",
                    result: false
                },
                {
                    title: "Then: I proceed to checkout page and guest sign in",
                    result: false
                }, 
                {
                    title: "Then: I fill the checkout page form and places the order",
                    result: true
                }
        ]
        }]
    },
    {
        title: "Feature: THD Loyality Page Automation",
        result: false,
        scenarios: [
            {
                title: "Scenario: Siging in",
                result: true,
                steps: [
                    {
                        title: "Given: Admin login page",
                        result: true
                    },
                    {
                        title: "When: I login using admin credentials",
                        result: true
                    },
                    {
                        title: "Then: I logged into admin page",
                        result: true
                    }
                ]
            },
            {
                title: "Scenario: Adding Program",
                result: false,
                steps: [
                    {
                        title: "Given: Admin page",
                        result: true
                    }, 
                    {
                        title: "When: I add a program",
                        result: true
                    },
                    {
                        title: "Then: a program should be added",
                        result: false
                    }
                ]
            }
        ]
    }
]

render(<Feature features={data} result={true} />,
                document.getElementById('react-container'))