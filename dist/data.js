let data = {
    metaData: {
        browser: 'firefox v50.9',
        startTime: 'Friday',
        duration: 1234,
        scenarios: {
            passed: 2,
            failed: 0
        },
        features: {
            passed: 1,
            failed: 0
        },
        tests: {
            passed: 10,
            failed: 3
        }
    },
    features: [
        {
            title: "Feature: THD Checkout page automation",
            scenarios: [{
                title: "Scenario: Placing Order",
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
            scenarios: [
                {
                    title: "Scenario: Siging in",
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
}

window.data = data;