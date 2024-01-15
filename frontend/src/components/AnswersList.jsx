import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getAnswers } from "../features/answers/answerSlice";

import Answer from "../components/Answer";
import Spinner from "../components/Spinner";

import { Col, Row, Divider } from 'antd';


const AnswersList = ({ question_uid }) => {

    const { answers, isLoadingAnswers, isErrorAnswers, messageAnswers } = useSelector(
		(state) => state.answers
	);

    const dispatch_answers = useDispatch();

    useEffect(() => {
		if (isLoadingAnswers) {
			toast.error(messageAnswers, { icon: "😭" });
		}

        dispatch_answers(getAnswers(question_uid));
	}, [dispatch_answers, isErrorAnswers, messageAnswers, question_uid]);

	if (isLoadingAnswers) {
		return <Spinner/>;
	}
    

	return (
        <>
        {answers.length !=0 ? (
						<Divider>Answer(s)</Divider>
					) : (null)}
        <Row>
            {answers.map((answer) => (
                <Col
                key={answer.uid}
                offset={1}
                >
                    <Answer answer={answer} key={question_uid}/>
                </Col>
            ))}
        </Row>            
        </>
        
	)
};

export default AnswersList;