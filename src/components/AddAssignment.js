import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {SERVER_URL} from '../constants.js';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

class AddAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {assignmentname: '', duedate: '', coursename: ''};
  };

  handleChange = (event) =>  {
     this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = ( ) => {
    console.log("AddAssignment.handleSubmit");
    const token = Cookies.get('XSRF-TOKEN');
    
    fetch(`${SERVER_URL}/assignment` , 
        {  
          method: 'POST', 
          headers: { 'Content-Type': 'application/json',
                     'X-XSRF-TOKEN': token }, 
          body: JSON.stringify({assignmentName: this.state.assignmentname,  dueDate: this.state.duedate, courseId: this.state.coursename})
        } )
    .then(res => {
        if (res.ok) {
          toast.success("Grades successfully updated", {
          position: toast.POSITION.BOTTOM_LEFT
          });
          this.fetchGrades();
        } else {
          toast.error("Grade updated failed", {
          position: toast.POSITION.BOTTOM_LEFT
          });
          console.error('Put http status =' + res.status);
    }})
    .catch(err => {
      toast.error("Grade updated failed", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.error(err);
    });
  };

  render() {
      return(
        <div className="App" >
          <TextField autoFocus style = {{width:200}} label="Assignment Name" name="assignmentname" 
                onChange={this.handleChange} value={this.state.assignmentname} />
	  <br/>
	  <TextField autoFocus style = {{width:200}} label="Due Date" name="duedate" 
                onChange={this.handleChange} value={this.state.duedate} />
	  <br/>
	  <TextField autoFocus style = {{width:200}} label="Course Name" name="coursename" 
                onChange={this.handleChange} value={this.state.coursename} />
	  <br/>
	  <Button id="Submit" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleSubmit} >
             Submit
          </Button>
        </div>
      );
  };
}  

export default AddAssignment;