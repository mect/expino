import React from 'react';
import { Row, Col } from 'react-materialize'
import { Timeline } from 'react-twitter-widgets'
import FacebookProvider, { Page } from 'react-facebook';

export default () => {
    return <Row>
        <Col s={6}>
            <Timeline dataSource={{sourceType: 'profile', screenName: 'MoreMobilab'}} options={{ username: 'MoreMobilab', height: '700px'}}/>
        </Col>
        <Col s={6}>
            <FacebookProvider appId="325609894599288">
                <Page href="https://www.facebook.com/mobilabTM/" tabs="timeline" height="700px" width="750px"  />
            </FacebookProvider>  
        </Col>
    </Row>
}