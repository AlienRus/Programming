import React from 'react';
import "../../css/error.css"

const Error = (props) => {
    return (
            <h4 className="error">{props.text}</h4>
    );
};

export default Error;