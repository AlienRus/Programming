import React, {useState} from 'react';
import "../../css/tabl.css"

const Tabl = function(props) {

        const [value, setValue] = useState([])

        function checkElem(id){
            setValue((prevState) => {
                if (prevState.includes(id)) {
                    return prevState.filter((f) => f !== id)
                } else {
                    return  [...prevState, id];
                }
            });
        }
    return (
            <div>
                <table className="iksweb">
                    <thead>
                    <tr>
                        {props.tytles.map((post) =>
                            <th key={post.id}>{post.name}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {props.items.map((item) =>
                        <tr className={value.includes(item.id) ? "back" : "applicat"} key={item.id} onChange={props.onChange(value)} onClick={() => {checkElem(item.id)}}>
                            {item.item.map((elem)=>
                                <td >{elem.name}</td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
    );
};

export default Tabl;