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
      link: null,
      errorDisplay: false,
      weatherError: false,
      weatherText: "",
      weatherStrings: [],
    };
  }

  getData = async (event) => {
    event.preventDefault();

    try {
      await this.setState({
        city: event.target.cityName.value,
      });

      let cityData = await axios.get(
        `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${this.state.city}&format=json`
      );

      this.setState({
        name: cityData.data[0].display_name,
        lon: cityData.data[0].lon,
        lat: cityData.data[0].lat,
      });
      console.log(cityData);

      let mapData = await axios.get(
        `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.lat},${this.state.lon}&markers=icon:large-red-cutout|${this.state.lat},${this.state.lon}`
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

    this.getWeather();
  };

  getWeather = async () => {
    try {
      let weatherData = await axios.get(
        `http://localhost:3010/weather?q=${this.state.city}&lon=${this.state.lon}&lat=${this.state.lat}`
      );

      let arrayOfStrings = weatherData.data.map((element) => {
        return `The Date is : ${element.date} and the description is : ${element.description}`;
      });

      this.setState({
        weather: weatherData.data,
        weatherStrings: arrayOfStrings,
      });
    } catch (err) {
      console.log(err);
      this.setState({
        weatherError: true,
        weatherText: "There is an Error",
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
          <Row className="mb-4">
            <Row>
              <h1>The city you entered : {this.state.name}</h1>
              <h2>The longitude : {this.state.lon}</h2>
              <h2>The Latitude : {this.state.lat}</h2>
            </Row>
            <Row>
              {this.state.link ? (
                <img
                  style={{ height: "40rem", width: "40rem" }}
                  src={this.state.link}
                  alt="map"
                />
              ) : (
                ""
              )}
            </Row>
          </Row>
        ) : (
          <>
            <h1>Error:{this.state.errorStatus}</h1>
            <h2>{this.state.errorText}</h2>
          </>
        )}
        {!this.state.weatherError ? (
          <Row className="mb-4">
            <Row>
              <h1>The Weather Status :</h1>
            </Row>
            <Col>
              <h2>{this.state.weatherStrings[0]}</h2>
              <h2>{this.state.weatherStrings[1]}</h2>
              <h2>{this.state.weatherStrings[2]}</h2>
            </Col>
          </Row>
        ) : (
          <>
            <h1>Error:{this.state.weatherText}</h1>
          </>
        )}
      </Container>
    );
  }
}

export default App;
