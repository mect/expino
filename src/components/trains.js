import React from "react";
import { Row, Col } from "react-materialize";
import { Liveboard } from "react-irail";

export default () => {
  return (
    <Row className="train-rowstyle">
      <Col s={8} offset="s2">
        <Liveboard
          station="Antwerpen-Centraal"
          lang="nl"
          max={10}
          tableClassName="striped"
        />
      </Col>
    </Row>
  );
};
