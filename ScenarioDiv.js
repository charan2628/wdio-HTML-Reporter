import Step from './StepsDiv'

const Scenario = ({scenarios}) => 
    scenarios.map((scenario, i) => 
        <li className={scenario.result ? "passed scenario": "failed scenario"} key={i}>
        <h2>{scenario.title}</h2>
        <ul>
            <Step steps={scenario.steps}/>
        </ul>
        </li>
        )

export default Scenario