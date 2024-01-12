import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const University = ({ university }) => {
	return (
		<Card style={{ width: "18rem" }}>
			<Badge
				bg="success"
				className="position-absolute top-0 start-100 translate-middle rounded-pill"
			>
				{university.activity_lvl} lvl
			</Badge>
			<Link to={`/university/`}>
				{/* <Card.Img src={university.profile_photo} variant="top" /> */}
			</Link>
			<Card.Body>
				<Card.Title as="h4">
					<strong>{university.name} ({university.short_name})</strong>
				</Card.Title>

				<Card.Text as="p">
					{university.num_teachers} teachers ({university.num_teachers_registered} registered) <br/>
					{university.num_students} students ({university.num_students_registered} registered)
				</Card.Text>
				<hr />
				<Row>
					<Col className="d-flex justify-content-between">
						<span>
							{university.description}
						</span>
					</Col>
				</Row>
				<hr />
				<Link to={`/university/`}>
					<Button variant="primary">Get More Info &gt; &gt;</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};


export default University;
