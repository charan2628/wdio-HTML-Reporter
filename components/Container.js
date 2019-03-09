import Summary from './Summary';
import Feature from './Feature';

const Container = ({data}) =>
    <div id="container">
        <Summary summary={data.metaData} />
        <Feature features={data.features} />
    </div>

export default Container;