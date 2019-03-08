const Step = ({steps}) =>
        steps.map((step, i) => 
            <li className={step.result ? "passed step": "failed step"} key={i}>
            <h3>{step.title}</h3>
            </li>
            )

export default Step