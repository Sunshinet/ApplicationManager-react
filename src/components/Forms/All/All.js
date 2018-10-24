import React, {Component} from 'react';
import axios from '../../../axios';
import Application from '../Application/Application';
import {NavLink} from 'react-router-dom';
import './All.css'
class All extends Component {

    state = {
        applications: [],
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
                        applications: fetchApplication
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

        let allApplications = this.state.applications.map(application => {
                return (
                    <Application 
                    clicked = { () => this.clickedHandle (application.id)}
                    key = {application.id}
                    name = {application.name}
                    age = {application.age}
                />)
        })

        return(
            <div className = "All">
            <h1>All Application</h1>
                <div className="collection">
                {allApplications}
                </div>
            <button className="waves-effect waves-light btn newButton"><NavLink to="/new-application">New Application</NavLink></button>
            </div>
        )
}
}

export default All;