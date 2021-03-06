import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Explore from "./components/Explore";
import axios from "axios";
import Movies from "./components/Movies";
import WeatherDay from "./components/WeatherDay";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "",
      link: null,
      errorDisplay: false,
      weatherError: false,
      weatherText: "",
      arrayStrings: [],
      weather: [],
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

      let mapData = await axios.get(
        `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_KEY}&center=${this.state.lat},${this.state.lon}&markers=icon:large-red-cutout|${this.state.lat},${this.state.lon}`
      );

      this.setState({
        link: mapData.config.url,
      });
    } catch (err) {
      this.setState({
        errorDisplay: true,
        errorStatus: err.response.status,
        errorText: err.response.data.error,
      });
    }
    console.log(this.state.lon, this.state.lat);
    this.getWeather();
    this.getMovies();
  };

  getWeather = async () => {
    try {
      let weatherData = await axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/weather?q=${this.state.city}&lon=${this.state.lon}&lat=${this.state.lat}`
      );

      this.setState({
        weather: weatherData.data,
      });
    } catch (err) {
      this.setState({
        weatherError: true,
        weatherText: "There is an Error",
      });
    }
    this.stringHandler(this.state.weather);
  };

  stringHandler = (data) => {
    const stringArray = [];
    for (let i = 0; i < data.length; i++) {
      stringArray.push(
        `${data[i].date} the weather status : Low of ${data[i].low}, high of ${data[i].high} with ${data[i].description}`
      );
    }
    this.setState({
      arrayStrings: stringArray,
    });
  };

  getMovies = async () => {
    try {
      let weatherData = await axios.get(
        `${process.env.REACT_APP_BACKEND_DOMAIN}/movies?q=${this.state.city}`
      );

      this.setState({
        moviesArr: weatherData.data,
      });
    } catch (err) {
      this.setState({
        movieError: true,
        movieText: "There is an Error",
      });
    }
  };

  render() {
    return (
      <Container className="">
        <Row className="mb-4" sm={12}>
          <Col className="d-flex justify-content-center mt-3" sm={12}>
            <h1>City Explorer</h1>
          </Col>
        </Row>
        <Row className="mb-4">
          <Explore getData={this.getData} />
        </Row>
        {!this.state.errorDisplay ? (
          <Row className="mb-4">
            <Row className="mb-3">
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
          </Row>
        ) : (
          <>
            <h1>Error:{this.state.weatherText}</h1>
          </>
        )}
        <Row className="mb-4">
          {this.state.arrayStrings ? (
            <WeatherDay arrayStrings={this.state.arrayStrings} />
          ) : null}
        </Row>
        <Row className="mb-4">
          <h1>Movies Related :</h1>
        </Row>
        <Row className="justify-content-around">
          {this.state.moviesArr
            ? this.state.moviesArr.map((item) => {
                return <Movies item={item} />;
              })
            : null}
        </Row>
      </Container>
    );
  }
}

export default App;
