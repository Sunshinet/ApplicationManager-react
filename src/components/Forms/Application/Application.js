import React from 'react' ;

const application = (props) => {
   return(
    <React.Fragment>
        <li  className="collection-item" id = {props.keyId} onClick = {props.clicked}>{props.name}</li>
    </React.Fragment>
   )
}

export default application