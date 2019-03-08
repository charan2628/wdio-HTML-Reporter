const Step = ({steps}) =>
        steps.map((step, i) => 
            <li className={step.result ? "step passed": "step failed"} key={i}>
            {step.title}
            </li>
            )

export default Step