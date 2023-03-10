import React from 'react';
import Template from './template.js';
import XProductsEditor from '../../composition/x-products_editor/component.js';

class XMain extends React.Component {
render() {
return (
<div>
<XProductsEditor />
<Template />
</div>
);
}
}

export default XMain;