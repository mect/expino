import React from 'react';
import { Row, Col } from 'react-materialize'
import { Timeline } from 'react-twitter-widgets'
import FacebookProvider, { Page } from 'react-facebook';
import '../css/social.css';

export default () => {
    return <Row>
        <Col s={12}><h1 className="social-title">Zorginnovatie op social media:</h1></Col>
        <Col s={6} >
            <div className={"twitter-margin"}>
                <Timeline dataSource={{sourceType: 'profile', screenName: 'MoreMobilab'}} options={{ username: 'MoreMobilab', height: '65vh', chrome:'noscrollbar'}}/>
            </div>
        </Col>
        <Col s={6}>
            <FacebookProvider appId="325609894599288">
                <Page href="https://www.facebook.com/mobilabTM/" tabs="timeline" width="600" height="620" showFacepile={false} showsVerticalScrollIndicator={false}/>
            </FacebookProvider>  
        </Col>
    </Row>
}