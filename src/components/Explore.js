import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Explore extends Component {
  render() {
    return (
      <Form onSubmit={this.props.getData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter City Name Here :</Form.Label>
          <Form.Control type="text" placeholder="Amman, Ma'an, Aqaba" name="cityName" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Explore!
        </Button>
      </Form>
    );
  }
}

export default Explore;
