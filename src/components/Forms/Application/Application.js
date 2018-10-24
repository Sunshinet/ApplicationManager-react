import React from 'react' ;

const application = (props) => {
    console.log(props.key)
   return(
    <React.Fragment>
    
        <a  className="collection-item" key = {props.key} onClick = {props.clicked}>{props.name}</a>
       
    </React.Fragment>
   )
}

export default application