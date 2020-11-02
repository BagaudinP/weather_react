import React, { Component } from "react";
import "bootswatch/yeti/bootstrap.css";
import "./App.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Назрань", zip: "523064" },
  { name: "Казань", zip: "551487" },
  { name: "Москва", zip: "524901" },
  { name: "Медина", zip: "109223" },
  { name: "Нью-Йорк", zip: "5128581" },
  { name: "Грозный", zip: "558418" },
  { name: "Санкт-Петербург", zip: "498817" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?id=" + zip + "&appid=c186b9806744a336303670987b03713d&lang=ru&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Загрузка...</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weatherData.name}
          <img src={iconUrl} />
        </h1>
        <p>Температура: {weatherData.main.temp} C°</p>
        <p>Давление: {weatherData.main.pressure}мм рт. ст.</p>
        <p>Влажность воздуха: {weatherData.main.humidity}%</p>
        <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              ПРОГНОЗ ПОГОДЫ
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Выберите город</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
