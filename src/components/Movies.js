import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

class Movies extends Component {
  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.item.url} />
        <Card.Body>
          <Card.Title>{this.props.item.title}</Card.Title>
          <Card.Text>
            <p>{this.props.item.overview}</p>
            <h3>Average votes:{this.props.item.vote}</h3>
            <h3>Total votes:{this.props.item.totalVotes}</h3>
            <h3>This movie was released in : {this.props.item.release}</h3>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Movies;
