import Scenario from './Scenario';

const Feature = ({ features }) =>
    <ul id="feature" className="main">
        {
            features.map((feature, i) =>
                <li className={feature.result ? "feature passed" : "feature failed"} key={i}>
                    <p><i className="fa fa-caret-down" aria-hidden="true"></i> {feature.title}</p>
                    <ul id="scenario">
                        <Scenario scenarios={feature.scenarios} />
                    </ul>
                </li>)
        }
    </ul>

export default Feature