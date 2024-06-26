import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker , LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Axios from "axios";

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      date: "",
      duedate: null
    };
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: Date()
    });
  };

  handleDateChange = (event) => {
    let date = null
    if(event != null){
      date = new Date(event)
    }
    this.setState({
      duedate: date
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.content.trim()) {
      const jsonObject = {
        id: this.state.id,
        task: this.state.content,
        currentDate: this.state.date,
        dueDate: this.state.duedate
      };

      Axios({
        method: "POST",
        url: "http://localhost:8080/add/item", // replace with your port number
        data: {jsonObject},
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        console.log(res.data.message);
      });

      this.props.addTodo(this.state);
      this.setState({
        content: "",
        date: "",
        duedate: null
      });
    }
  };

  render() {
    return (
      <div>
        <TextField
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>         
          <DesktopDatePicker
              id="new-item-date"
              label="Due Date"
              value={this.state.duedate}
              onChange={this.handleDateChange}
              renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddTodo;