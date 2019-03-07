import Scenario from './ScenarioDiv';

const Feature = ({data}) =>
        data.map((feature, i) => 
            <div className={feature.result ? "passed": "failed"} key={i}>
            {feature.title}
            <Scenario scenarios={feature.scenarios}/>
            </div>)

export default Feature