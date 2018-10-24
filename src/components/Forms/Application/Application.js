import React from 'react' ;

const application = (props) => {
   return(
    <React.Fragment>
        <a  className="collection-item" id = {props.keyId} onClick = {props.clicked}>{props.name}</a>
    </React.Fragment>
   )
}

export default application