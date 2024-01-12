import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const Major = ({ major }) => {
	return (
		<Card style={{ width: "18rem" }}>
			<Card.Body>
				<Card.Title as="h4">
					<strong>{major.name}</strong>
				</Card.Title>

				<Card.Text as="p">
					{major.num_students} students of these major registered.
				</Card.Text>
				<Link to={`/major/`}>	
					<Button variant="primary">Get More Info &gt; &gt;</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};


export default Major;
