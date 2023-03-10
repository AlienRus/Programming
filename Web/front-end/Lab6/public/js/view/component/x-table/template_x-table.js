import { ProductFactory } from '../../../domain/service.js'
import { RouterFactory } from './../../route/router.js'

function ProductTable(props) {
  const handleDelete = async (id) => {
    const product = ProductFactory.createInstance();
    const result = await product.delete(id);
    if (result.status === 200) {
      props.onDelete();
    } else if (result.status === 401) {
      localStorage.removeItem('AutoSellUserToken');
      const router = RouterFactory.createInstance();
      router.go('login');
    } else {
      props.onDelete();
    }
  }

  return (
    <div>
      <br />
      <table border="1" bordercolor="black" bgcolor="CornflowerBlue">
        <caption><b>Products</b></caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button value={product.id} onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
