import './scss/style.scss';
import TableCellEditor from './TableCellEditor';
import TableExporter from './TableExporter'

let tableEditor;
let tableExporter;
let btnExportCSV = document.querySelector('#exportCSVBtn');
let btnExportXLS = document.querySelector('#exportExcelBtn');

btnExportCSV.onclick = () => {
  tableExporter.export('csv', 'users.csv');
}

btnExportXLS.onclick = () => {
  tableExporter.export('xls', 'users.xls');
}

fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(result => {
    drawUsersTable(result)
    initTableCellEditing();

    tableExporter = new TableExporter(tableEditor, document.querySelector('table'));
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
  tableEditor = new TableCellEditor(document.querySelector('table'));
  tableEditor.init();
}
