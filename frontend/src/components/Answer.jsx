import React from "react";
import { Badge,  } from "antd";

import { Link } from "react-router-dom";
import moment from "moment";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";



const Answer = ({ answer }) => {
	return (
        <Card style={{width: "320px", minHeight: "250px"}}>
            {answer.is_solution ? (
                <Badge.Ribbon text="Solution" color="green"></Badge.Ribbon>
            ): (null)}
            <Card.Img variant="top" src={answer.profile_photo} style={{height: "220px"}}/>
            <Card.Header><b>{answer.username}</b> ({answer.full_name})</Card.Header>
            <Card.Body>
            <Card.Title>{answer.title}</Card.Title>
            <Card.Text>{answer.description.substr(0, 200)}...</Card.Text>
            </Card.Body>
            <Card.Footer>
            <small className="text-muted"><b>Answered</b> {moment(answer.date_answered).format("YYYY/MM/DD kk:mm:ss")}</small><br />
            {answer.date_answered != answer.date_modified ? (
                <small className="text-muted"><b>Modified</b> {moment(answer.date_modified).format("YYYY/MM/DD kk:mm:ss")}</small>
            ): (null)}
            <Link to={`/answer/${answer.uid}`} >
                <Button variant="primary">Get More Info &gt; &gt;</Button>
			</Link>
            </Card.Footer>
        </Card>
	);
};

export default Answer;