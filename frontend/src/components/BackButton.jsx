import React from "react";
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate();

	return (
        <Button variant="outline-dark" onClick={() => navigate(-1)}>Back</Button>
	);
};


export default BackButton;
