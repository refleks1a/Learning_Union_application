import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Question = ({ question }) => {
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	return (
		<Card style={{ width: "18rem" }}>
			<Badge
				bg="success"
				className="position-absolute top-0 start-100 translate-middle rounded-pill"
			>
				{question.is_solved}
			</Badge>
			<Link to={`/question/`}>
				<Card.Img src={question.cover_photo} variant="top" />
			</Link>
			<Card.Body>
				<Card.Title as="h4">
					<strong>{question.title}</strong>
				</Card.Title>

				<Card.Text as="p">
					{question.description.substring(0, 70)}...
				</Card.Text>
				<hr />
				<Row>
					<Col className="d-flex justify-content-between">
						<span>
							{question.subject}
						</span>
					</Col>
				</Row>
				<hr />
				<Link to={`/question/`}>
					<Button variant="primary">Get More Info &gt; &gt;</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default Question;