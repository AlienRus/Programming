import React from 'react';
import "../../css/title.css"

const Title = (props) => {
    return (
        <div>
            <h1 className="main_zag">{props.title}</h1>
        </div>
    );
};

export default Title;