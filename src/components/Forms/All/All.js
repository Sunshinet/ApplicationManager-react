import React, {Component} from 'react';
import axios from '../../../axios';
import Application from '../Application/Application';
import {NavLink} from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import './All.css'
class All extends Component {

    state = {
        applications: [],
        loading: true
    }
    componentDidMount() {
        axios.get('https://react-app-ab29b.firebaseio.com/students.json')
            .then(res => {
                let fetchApplication = []
                for (let key in res.data) {
                    fetchApplication.push({
                        ...res.data[key],
                        id: key
                    })
                    this.setState({
                        applications: fetchApplication, 
                        loading: false
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    clickedHandle = (id) => {
        this.props.history.push('/all-applications/' + id);
    }

    render(){
        let allApplications;
        if(this.state.loading){
            allApplications = <Spinner />
        }else{
            allApplications = this.state.applications.map(application => {
                return (
                    <Application 
                    clicked = { () => this.clickedHandle (application.id)}
                    key = {application.id}
                    keyId= {application.id}
                    name = {application.name}
                    age = {application.age}
                />)
        })
        }
        return(
            <div className = "All">
            <h1>All Applications</h1>
                <div>
                    <ul className="collection">
                      {allApplications}
                    </ul>
                </div>
                <button className="waves-effect waves-light btn newButton"><NavLink to="/new-application">New Application</NavLink></button>
            </div>
        )
}
}

export default All;