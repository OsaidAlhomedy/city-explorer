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
      link: "",
      errorDisplay: false,
    };
  }

  getData = async (event) => {
    event.preventDefault();

    try {
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

      let mapData = await axios.get(
        `https://maps.locationiq.com/v3/staticmap?key=pk.6cc59fcee1f602355720267e7d74f0c4&center=${this.state.lat},${this.state.lon}&markers=icon:large-red-cutout|${this.state.lat},${this.state.lon}`
      );

      this.setState({
        link: mapData.config.url,
      });
    } catch (err) {
      console.log(err.response);
      this.setState({
        errorDisplay: true,
        errorStatus: err.response.status,
        errorText: err.response.data.error,
      });
    }
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
        {!this.state.errorDisplay ? (
          <Row>
            <Col>
              <h1>The city you entered : {this.state.name}</h1>
              <h2>The longitude : {this.state.lon}</h2>
              <h2>The Latitude : {this.state.lat}</h2>
            </Col>
            <Col>
              {this.state.link ? <img src={this.state.link} alt="map" /> : ""}
            </Col>
          </Row>
        ) : (
          <>
            <h1>Error:{this.state.errorStatus}</h1>
            <h2>{this.state.errorText}</h2>
          </>
        )}
      </Container>
    );
  }
}

export default App;
