import React, {Component} from 'react';
import axios from '../../../axios';

class Edit extends Component {
  state = {
    name: "",
    email: "",
    age: "",
    phoneNumber: "",
    comunicationWay: '',
    englishLevel: '',
    startDate: '',
    skills: "",
    introduction: "",
    homeStudy: false,
    phoneNumberValid: false,
    formErrors: {
      name: '',
      email: '',
      age: '',
      phoneNumber: ''
    },
    emailValid: true,
    nameValid: true,
    ageValid: true,
    formValid: true,

  }

  componentDidMount() {
    this.getStudentsInfo();
  }

  getStudentsInfo() {
    axios.get('/students/' + this.props.match.params.id + '.json')
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          age: res.data.age,
          phoneNumber: res.data.phoneNumber,
          comunicationWay: res.data.comunicationWay,
          englishLevel: res.data.englishLevel,
          startDate: res.data.startDate,
          skills: res.data.skills,
          introduction: res.data.introduction,
          homeStudy: res.data.homeStudy
        })
      })

  }

  stateChangeHandler = (event) => {
    const target = event.target,
      value = target.value,
      name = target.name;

    this.setState({
      [name]: value
    })
  }

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
      homeStudy: this.state.homeStudy
    }
   
    axios.put('https://react-app-ab29b.firebaseio.com/students/' + this.props.match.params.id + '.json', student)
      .then(res => {
        this.props.history.push('/all-applications/' + this.props.match.params.id);
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return(
     
        <div className = "container">
        <h1>Edit Application</h1>
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



  export default Edit;