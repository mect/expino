import React from 'react';
import { Row, Col } from 'react-materialize'
import { Timeline } from 'react-twitter-widgets'
import FacebookProvider, { Page } from 'react-facebook';
import '../css/social.css';

export default () => {
    return <Row>
        <Col s={12}><h1 className="social-title">Zorginnovatie op social media:</h1></Col>
        <Col s={6}>
            <Timeline dataSource={{sourceType: 'profile', screenName: 'MoreMobilab'}} options={{ username: 'MoreMobilab', height: '65vh'}}/>
        </Col>
        <Col s={6}>
            <FacebookProvider appId="325609894599288">
                <Page href="https://www.facebook.com/mobilabTM/" tabs="timeline" height="100vh" width="750px"  />
            </FacebookProvider>  
        </Col>
    </Row>
}