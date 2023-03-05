export default function(result) {
  let page = ` 
  <div>
  <br>
  <table border="1" bordercolor = "black" bgcolor = "CornflowerBlue">
  <caption><b>Products</b></caption>
  <tr>
  <th>ID</th>
  <th>Name</th>
  <th>Price</th>
  <th>Description</th>
  <th>Delete</th>
  </tr>          
   `;
  result.data.forEach(function(item){
    page = page + `
    <tr><td>${item.id}</td><td>${item.name}</td><td>${item.price}</td><td>${item.description}</td><td><button value=${item.id}><slot>Delete</slot></button></td></tr>          
    `
  });
  page = page + `
  </table>
  </div>
  `;
  return page
}