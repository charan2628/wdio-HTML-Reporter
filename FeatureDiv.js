import Scenario from './ScenarioDiv';

const Feature = ({features}) =>
    features.map((feature, i) => 
            <div className={feature.result ? "passed": "failed"} key={i}>
            <h1>{feature.title}</h1>
            <ul>
                <Scenario scenarios={feature.scenarios}/>
            </ul>
            </div>)

export default Feature