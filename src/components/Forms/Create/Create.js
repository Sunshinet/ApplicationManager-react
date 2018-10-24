import React, {Component} from 'react';
import axios from '../../../axios';
import './Create.css';
class Create extends Component {
  state = {
    name: "", //required
    email: "", //required
    age: "", //required
    phoneNumber: "", //required
    comunicationWay: 'mail', //required
    englishLevel: 'A1', //required
    startDate: '', //required
    skills: "",
    introduction: "",
    homeStudy: false,
    formErrors: {
      name: '',
      email: '',
      age: '',
      phoneNumber: ''
    },
    emailValid: false,
    nameValid: false,
    ageValid: false,
    formValid: false,
    phoneNumberValid: false
  }


  //Change the state with the input info
  stateChangeHandler = (event) => {
    const target = event.target,
      value = target.type === "checkbox" ? target.checked : target.value,
      name = target.name;
    this.setState({
        [name]: value
      },
      () => {
        this.validateField(name, value)
      });

  }

  validateField(fieldName, value) {

    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let nameValid = this.state.nameValid;
    let ageValid = this.state.age;
    let phoneNumberValid = this.state.phoneNumberValid;

    switch (fieldName) {
      case 'name':
        nameValid = value.length;
        fieldValidationErrors.name = nameValid ? '' : 'Name is required!';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'age':
        ageValid = value > 17 && value < 100;
        fieldValidationErrors.age = ageValid ? '' : 'You must be 18!';
        break;
      case 'phoneNumber':
        phoneNumberValid = value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
        fieldValidationErrors.phoneNumber = phoneNumberValid ? '' : 'is invalid!';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      nameValid: nameValid,
      ageValid: ageValid,
      phoneNumberValid: phoneNumberValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid &&
        this.state.nameValid &&
        this.state.ageValid &&
        this.state.phoneNumberValid
    });
  }


  //Send the data from state to the data storage
  onSubmit = (event) => {
    event.preventDefault()

    let student = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      phoneNumber: this.state.phoneNumber,
      comunicationWay: this.state.comunicationWay,
      englishLevel: this.state.englishLevel,
      startDate: this.state.startDate,
      skills: this.state.skills,
      introduction: this.state.introduction,
      homeStudy: this.state.homeStudy,

    }
    axios.post('https://react-app-ab29b.firebaseio.com/students.json', student)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className = "container">
      <h1>Application Form</h1>
       <form onSubmit = {this.onSubmit}>
          <input type="text" placeholder="Name" name="name" onChange = {(event) => this.stateChangeHandler(event)} value = {this.state.name}/>
          <input type="text" placeholder="Email" name="email" onChange = {(event) => this.stateChangeHandler(event)} value = {this.state.email}/>
          <input type="number" placeholder ="Age" name = "age" onChange = {(event) => this.stateChangeHandler(event)} value = {this.state.age}/>
          <input type="text" placeholder ="Phone Number" name = "phoneNumber" onChange = {(event) => this.stateChangeHandler(event)} value = {this.state.phoneNumber}/>
          <p className = "labels"> 
            <label>
                 <input type = "radio" value = "mail" name="comunicationWay" checked = {this.state.comunicationWay === 'mail'} onChange = {(event) => this.stateChangeHandler(event)}/>
                 <span>Email</span>
            </label>
          </p>
          <p className = "labels">
            <label>
                <input type = "radio" value = "phone" name="comunicationWay" checked = {this.state.comunicationWay === 'phone'} onChange = {(event) => this.stateChangeHandler(event)}/>
                <span>Phone Number</span>
            </label>
          </p> 
          <div className = "labels">
              <label>English Level</label>
                <select className="browser-default" value = {this.state.englishLevel} name = "englishLevel" onChange = {(event) => this.stateChangeHandler(event)} >
                <option value = "A1">A1</option>
                <option value = "A2">A2</option>
                </select>
          </div>
          <input type = "date" name = "startDate" onChange = {(event) => this.stateChangeHandler(event)} value = {this.state.startDate} />
          <textarea placeholder="Technical Skills and Courses" rows = "15" name = "skills" onChange = {(event) => this.stateChangeHandler(event)} value = {this.state.skills}/>
          <textarea  placeholder="Short Personal Presentation"  rows = "15" name = "introduction" onChange = {(event) => this.stateChangeHandler(event)} value = {this.state.introduction}/>
          <p>
             <label>
               <input type = "checkbox" name = 'homeStudy' onChange = {(event) => this.stateChangeHandler(event)}  />
               <span>Home Study</span>
            </label>
          </p>
          <button  className="waves-effect waves-light btn" type="submit" disabled={!this.state.formValid} name="action">Submit</button>
      </form>
      </div>
    );
  }
} 


  export default Create;