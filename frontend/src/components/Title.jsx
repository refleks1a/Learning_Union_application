import React from "react";
import { Helmet } from "react-helmet";

const Title = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
		</Helmet>
	);
};

Title.defaultProps = {
	title: "Welcome to Learning Union",
	description: "We have answers which you are looking for",
	keywords: "question, answer, university, student, teacher, universities",
};

export default Title;