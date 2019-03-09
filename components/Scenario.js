import Step from './Steps'

const Scenario = ({scenarios}) => 
    scenarios.map((scenario, i) => 
        <li className="scenario" key={i}>
        <p><i className="fa fa-caret-down" aria-hidden="true"></i> {scenario.title}</p>
        <ul>
            <Step steps={scenario.steps}/>
        </ul>
        </li>
        )

export default Scenario