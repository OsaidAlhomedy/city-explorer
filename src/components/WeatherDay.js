import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class WeatherDay extends Component {
  render() {
    return (
      <Card>
        {this.props.arrayStrings.map((item) => {
          return <Card.Body>{item}</Card.Body>;
        })}
      </Card>
    );
  }
}

export default WeatherDay;
