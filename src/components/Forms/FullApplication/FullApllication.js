import React, {Component} from 'react';
import axios from '../../../axios';
import {Link} from 'react-router-dom';
import './FullApplication.css';
class FullApplication extends Component {

    state = {
        application: [
            {homeStudy: 'No'}
        ],
        id: ''
    }

    componentDidMount() {

        axios.get('https://react-app-ab29b.firebaseio.com/students/' + this.props.match.params.id + '.json')
            .then(res => {
                this.setState({
                    application: res.data,
                    id:this.props.match.params.id
                })
            })
            .catch(err => {
                console.log(err)
            })
  
          
    }
    onDelete(){
        axios.delete('https://react-app-ab29b.firebaseio.com/students/' + this.state.id + '.json')
        .then(res => {
            this.props.history.push('/');
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
         let homeStudy;
        if(this.state.application.homeStudy === true) {
            homeStudy = <div>Yes</div>
        }else if(this.state.application.homeStudy === false){
            homeStudy = <div>No</div>
        }
        return(
            <div className = "container FullApplication">
                <div className = "row">
                <div className = "col s12">
                    <h1>Application</h1>
                    </div>
                    </div>
                <div className = "row ">
                <div className = "col s6">
                    <div className = "label">Name: </div>
                    </div>
                    <div className = "col s6 text">
                    <div>{this.state.application.name}</div>
                    </div>
                </div>
                <div className = "row">
                <div className = "col s6">
                <div className = "label">Email: </div>
                </div>
                <div className = "col s6 text">
                <div>{this.state.application.email}</div>
                </div>
                </div>
                <div className = "row">
                <div className = "col s6">
                    <div className = "label">Age: </div>
                    </div>
                    <div className = "col s6 text">
                    <div>{this.state.application.age}</div>
                    </div>
                </div>
                <div className = "row">
                <div className = "col s6">
                    <div className = "label">Phone Number: </div>
                    </div>
                    <div className = "col s6 text">
                    <div>{this.state.application.phoneNumber}</div>
                    </div>
                </div>
                <div className = "row">
                <div className = "col s6">
                    <div className = "label">Comunication Way: </div>
                    </div>
                    <div className = "col s6 text">
                    <div>{this.state.application.comunicationWay}</div>
                    </div>
                </div>
                <div className = "row">
                <div className = "col s6">
                <div className = "label">English Level: </div>
                </div>
                <div className = "col s6 text">
                <div>{this.state.application.englishLevel}</div>
                </div>
                </div>
                <div className = "row">
                <div className = "col s6">
                <div className = "label">Start Date</div>
                </div>
                <div className = "col s6 text">
                <div>{this.state.application.startDate}</div>
                </div>
                </div>
                <div className = "row">
                <div className = "col s6 ">
                <div className = "label">Technical Skills and Courses </div>
                </div>
                <div className = "col s6 text">
                <div>{this.state.application.skills}</div>
                </div>
                </div>
             
                <div className = "row">
                 <div className = "col s6">
                <div className = "label">Introduction </div>
                </div>
                <div className = "col s6 text">
                <div>{this.state.application.introduction}</div>
                </div>
                </div>
                <div className = "row">
                 <div className = "col s6">
                <div className = "label">Home Study </div>
                </div>
                <div className = "col s6 text">
                <div>{homeStudy}</div>
                </div>
                </div>
                <div className = "row">
                <div className = "col s6 ">
                    <Link  className="waves-effect waves-light blue btn edit" to = {`/all-applications/${this.props.match.params.id}/edit`}>Edit</Link>
                    </div>
                    <div className = "col s6 ">
                    <button className="waves-effect waves-dark red btn delete" onClick = { () => {if(window.confirm('Are you sure you want to delete this application?')) this.onDelete()}}>Delete</button>
                </div>
                </div>
            </div>
        )
    }
}

    export default FullApplication;