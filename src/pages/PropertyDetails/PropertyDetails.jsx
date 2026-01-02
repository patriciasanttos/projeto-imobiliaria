import { useParams } from 'react-router-dom';

function PropertyDetails() {
	const { id } = useParams();
	return <div>Property Details Page for ID: {id}</div>;
}

export default PropertyDetails;
