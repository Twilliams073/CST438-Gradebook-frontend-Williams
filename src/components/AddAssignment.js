import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../constants.js'

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

class AddAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {selected: 0, assignments: []};
    };
 
   componentDidMount() {
    this.fetchAssignments();
  }

  handleSubmit = () => {
    const { attempt, alias } = this.state;
    this.props.submit( attempt.trim(), alias.trim() );
  }
 
  handleChange = (event) =>  {
     this.setState({[event.target.name]: event.target.value});
  }
  
  render() {
      
      <div align="left" >
        <TextField autoFocus style = {{width:200}} label="Assignment Name" name="assignmentName" 
             onChange={this.handleChange} value={this.state.attempt} />
	<br/>
	<TextField autoFocus style = {{width:200}} label="Due Date" name="dueDate" 
             onChange={this.handleChange} value={this.state.attempt} />
	<br/>
	<TextField autoFocus style = {{width:200}} label="Course Name" name="courseName" 
             onChange={this.handleChange} value={this.state.attempt} />
	<br/>
	<Button variant="outlined" color="primary" style={{margin: 10}}
              onClick={this.handleSubmit} >Submit</Button>
      </div>
  }
}  

export default AddAssignment;