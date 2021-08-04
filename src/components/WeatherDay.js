import React, { Component } from "react";

class WeatherDay extends Component {
  render() {
    return (
      <>
        {this.props.arrayStrings.map((item) => {
          return <h2>{item}</h2>;
        })}
      </>
    );
  }
}

export default WeatherDay;
