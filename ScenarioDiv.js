const Scenario = ({scenarios}) => 
    scenarios.map((scenario, i) => 
        <div className={scenario.result ? "passed scenario": "failed scenario"} >{scenario.title}</div>)

export default Scenario