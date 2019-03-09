const Summary = ({ summary }) =>
    <div id="summary">
        <table>
            <caption>SUMMARY</caption>
            <tr>
                <th>BROWSER: </th>
                <td>{summary.browser}</td>
            </tr>
            <tr>
                <th>TEST START TIME: </th>
                <td>{summary.startTime}</td>
            </tr>
            <tr>
                <th>DURATION: </th>
                <td>{summary.duration}</td>
            </tr>
            <tr>
                <td>
                    <table>
                        <tr>
                            <td>&nbsp;&nbsp;</td>
                        </tr>
                        <tr>
                            <th>FEATURES: </th>
                        </tr>
                        <tr>
                            <th>SCENARIOS: </th>
                        </tr>
                        <tr>
                            <th>TESTS: </th>
                        </tr>
                    </table>
                </td>
                <td>
                    <table>
                        <tr>
                            <th>PASSED</th>
                            <th>FAILED</th>
                        </tr>
                        <tr>
                            <td style={{textAlign: "center"}}>{summary.features.passed}</td>
                            <td style={{textAlign: "center"}}>{summary.features.failed}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: "center"}}>{summary.scenarios.passed}</td>
                            <td style={{textAlign: "center"}}>{summary.scenarios.failed}</td>
                        </tr>
                        <tr>
                            <td style={{textAlign: "center"}}>{summary.tests.passed}</td>
                            <td style={{textAlign: "center"}}>{summary.tests.failed}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>

export default Summary;