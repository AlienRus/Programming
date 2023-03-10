import React from 'react';
import Template from './template.js';
import XRegisterWindow from '../../composition/x-register_window/component.js';

class XRegister extends React.Component {
render() {
return (
<div>
<XRegisterWindow />
<Template />
</div>
);
}
}

export default XRegister;