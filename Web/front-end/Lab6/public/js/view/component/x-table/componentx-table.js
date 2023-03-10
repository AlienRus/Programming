import { ProductFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'
import { useState, useEffect } from 'react';

function XTable() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let product = ProductFactory.createInstance();
      let result = await product.getList();
      if (result.status === 200) {
        setTableData(result.data);
      } else {
        localStorage.removeItem('AutoSellUserToken');
        let router = RouterFactory.createInstance();
        router.go('login');
      }
    }

    fetchData();
  }, []);

  async function handleDelete(id) {
    let deleteButtonValue = id;
    console.log(deleteButtonValue);
    let product = ProductFactory.createInstance();
    let result = await product.delete(deleteButtonValue);
    if (result.status === 200) {
      let updatedData = tableData.filter(item => item.id !== id);
      setTableData(updatedData);
    } else if (result.status === 401) {
      localStorage.removeItem('AutoSellUserToken');
      let router = RouterFactory.createInstance();
      router.go('login');
    } else {
      // handle error
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default XTable;
