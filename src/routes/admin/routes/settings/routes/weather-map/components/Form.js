import React from "react";

import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class Form extends React.Component {
  state = {
    locationSelect: 0,
    city: "salihli",
    country: "tr"
  };
  handleChange = event => {
    if (event.target.name === "locationSelect")
      this.setState({
        city: "",
        country: ""
      });
    else this.setState({ locationSelect: 0 });

    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <form className="form-inline" onSubmit={this.props.getWeather}>
        <Select
          value={this.state.locationSelect}
          onChange={this.handleChange}
          className="mr-2"
          inputProps={{
            name: "locationSelect",
            id: "location-selection"
          }}
        >
          <MenuItem value={1}>Salihli, Manisa</MenuItem>
          <MenuItem value={2}>Sivrihisar, Eskişehir</MenuItem>
          <MenuItem value={3}>Atkaracalar, Çankırı</MenuItem>
          <MenuItem value={4}>Kurşunlu, Çankırı</MenuItem>
          <MenuItem value={5}>Polatlı, Ankara</MenuItem>
          <MenuItem value={6}>Kulu, Konya</MenuItem>
        </Select>
        <Input
          name="city"
          type="text"
          placeholder="City"
          className="mr-2"
          value={this.state.city}
          onChange={this.handleChange}
        />
        <Input
          name="country"
          placeholder="Country"
          type="text"
          className="mr-2"
          value={this.state.country}
          onChange={this.handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="btn-w-md"
        >
          Get Weather
        </Button>
      </form>
    );
  }
}

export default Form;
