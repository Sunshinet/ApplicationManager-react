import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Navigation extends Component {
    render() {
        return(
            <div>
            <header>
            <nav className = "nav">
              <ul>
                  <li><NavLink to="/all-applications">All</NavLink></li>
               </ul>
               <ul>
                 <li><NavLink to="/new-application">NEW</NavLink></li>
              </ul>
              </nav>
            </header>
            </div>
        )
    }
}

export default Navigation