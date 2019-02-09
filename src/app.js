import './scss/style.scss';
import TableCellEditor from './TableCellEditor';

fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(result => {
    drawUsersTable(result)
    initTableCellEditing();
  })
  ;

function drawUsersTable(users) {
  const tbody = document.querySelector('table > tbody');

  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.username}</td>
      <td>${user.email}</td>
    `;
    tbody.appendChild(tr);
  });
}

function initTableCellEditing() {
  const editor = new TableCellEditor(document.querySelector('table'));
  editor.init();
}
