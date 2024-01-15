import React from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


const Question = ({ question }) => {
	return (
		<Card style={{ width: "18rem" }}>
			{question.solved_status ? (
				<Badge
					bg="success"
					className="position-absolute top-0 start-100 translate-middle rounded-pill"
				>
					Solved
				</Badge>
			) : (
				<Badge
					bg="danger"
					className="position-absolute top-0 start-100 translate-middle rounded-pill"
				>
					Not solved
				</Badge>
			)}
			
			<Link to={`/question/${question.uid}`} >
				<Card.Img src={question.profile_photo} variant="top" />
			</Link>
			<Card.Body>
				<Card.Title as="h4">
					<strong>{question.title}</strong>
				</Card.Title>

				<Card.Text as="p">
					{question.short_description.substring(0, 70)}...
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
				<Link to={`/question/${question.uid}`}>
					<Button variant="primary">Get More Info &gt; &gt;</Button>
				</Link>
			</Card.Body>
		</Card>
	);
};

export default Question;