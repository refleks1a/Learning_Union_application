import React from "react";

import { Image, Col, Row } from 'antd';
import Carousel from 'react-bootstrap/Carousel';


const DetailsBody = ({ item, item_name }) => {
	return (
        <Row style={{minHeight: "150px"}}>
            <Col>
            {item.image_1 || item.image_2 || item.image_3 ? (
                <Carousel slide={false} style={{width: 720, height: 480}}>
                {item.image_1 ? (
                    <Carousel.Item>
                        <Image
                            width={720}
                            height={480}
                        src={item.image_1}
                            alt="First slide"
                        />
                    </Carousel.Item>
                ) : (null)}
                {item.image_2 ? (
                    <Carousel.Item>
                        <Image
                            width={720}
                            height={480}
                            src={item.image_2}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                ) : (null)}
                {item.image_3 ? (
                    <Carousel.Item>
                        <Image
                            width={720}
                            height={480}
                            src={item.image_3}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                ) : (null)}
            </Carousel>
            ) : (null)}
            </Col>
            <Col style={{marginLeft: "60px", width: "830px", }}>
                <h4 style={{fontSize: "17px"}}>Details of the {item_name}</h4>
                <p>{item.details} {item.description}</p>
            </Col>
        </Row> 
	);
};

export default DetailsBody;




