import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Explore from "./components/Explore";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
    };
  }

  getData = async (event) => {
    event.preventDefault();

    await this.setState({
      city: event.target.cityName.value,
    });

    let cityData = await axios.get(
      `https://eu1.locationiq.com/v1/search.php?key=pk.6cc59fcee1f602355720267e7d74f0c4&q=${this.state.city}&format=json`
    );

    this.setState({
      name: cityData.data[0].display_name,
      lon: cityData.data[0].lon,
      lat: cityData.data[0].lat,
    });
    console.log(cityData.data[0]);
    console.log(this.state.name);
    console.log(this.state.lat);
    console.log(this.state.lon);
  };

  render() {
    return (
      <Container className="">
        <Row className="mb-4">
          <h1>City Explorer</h1>
        </Row>
        <Row className="mb-4">
          <Explore getData={this.getData} />
        </Row>

        {this.state.name ? (
          <Row>
            <h1>The city you entered : {this.state.name}</h1>
            <h2>The longitude : {this.state.lon}</h2>
            <h2>The Latitude : {this.state.lat}</h2>
          </Row>
        ) : (
          ""
        )}
      </Container>
    );
  }
}

export default App;
