import React from 'react';
import Template from './template.js';
import XLoginWindow from '../../composition/x-login_window/component.js';

class XLogin extends React.Component {
render() {
return (
<div>
<XLoginWindow />
<Template />
</div>
);
}
}

export default XLogin;