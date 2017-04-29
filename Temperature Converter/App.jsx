import React from 'react';

function willWaterBoil(temperature) {
  if(temperature >= 100) {
    return "Water will boil";
  }
  return "Water will NOT boil"
}

function convertToFahrenheit(celcius) {
  if(celcius && !isNaN(Number(celcius))) {
    return ((celcius * 9) / 5) + 32;
  }
  return "";
}

function convertToCelcius(fahrenheit) {
  if(fahrenheit && !isNaN(Number(fahrenheit))) {
    return ((fahrenheit - 32) * 5) / 9;
  }
  return "";
}

class DisplayUnit extends React.Component {
  render() {
    let temperature = this.props.temperature;
    let unit = this.props.unit;
    let handleChange = this.props.handleChange;

    return(
      <fieldset>
        <legend> {unit === 'c' ? "Celcius" : "Fahrenheit"} </legend>
        <input type = "number" value = {temperature} onChange = {handleChange}/>
      </fieldset>
    );
  }
}

class TemperatureConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: "",
      unit: ""
    }
    this.handleCelcius = this.handleCelcius.bind(this);
    this.handleFahrenheit = this.handleFahrenheit.bind(this);
  }

  handleCelcius(event) {
    this.setState({
      unit: event.target.value ? "c" : "",
      temperature: event.target.value
    })
  }

  handleFahrenheit(event) {
    this.setState({
      unit: event.target.value ? "f" : "",
      temperature: event.target.value 
    })
  }

  render() {
    let unit = this.state.unit;
    let temperature = this.state.temperature;
    let waterBoilMessage = unit === "c" ? willWaterBoil(temperature) : (unit === "f" ? willWaterBoil(convertToCelcius(temperature)) : null);

    return(
      <div>
        <h2>Temperature Converter</h2>
        <DisplayUnit unit = "c" temperature = {unit === "c" ? temperature : convertToCelcius(temperature)} handleChange = {this.handleCelcius} />
        <br/>
        <DisplayUnit unit = "f" temperature = {unit === "f" ? temperature : convertToFahrenheit(temperature)} handleChange = {this.handleFahrenheit} />
        <br/>
        <fieldset>
          <legend> Result </legend>
          <div> {waterBoilMessage} </div>
        </fieldset>
      </div>
    );
  }
}

export default TemperatureConverter;