import React from "react";
import { Row, Col } from "react-materialize";
import { Liveboard } from "react-irail";

export default () => {
  return (
    <Row className="train-rowstyle">
      <Col s={12}>
        <Liveboard
          station="Antwerpen-Centraal"
          lang="nl"
          max={5}
          tableClassName="striped"
        />
      </Col>
    </Row>
  );
};
