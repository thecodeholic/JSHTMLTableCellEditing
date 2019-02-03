import './scss/style.scss';

fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(result => drawUsersTable(result))
  ;

function drawUsersTable(users) {
  const tbody = document.querySelector('table > tbody');

  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td contenteditable>${user.id}</td>
      <td contenteditable>${user.name}</td>
      <td contenteditable>${user.username}</td>
      <td contenteditable>${user.email}</td>
    `;
    tbody.appendChild(tr);
  });

  const allTds = tbody.querySelectorAll('td');
  for (let td of allTds) {
    td.addEventListener('mousedown', (ev) => {
      const td = ev.currentTarget;
      if (!td.classList.contains('input-editing')){
        const currentValue = td.innerHTML;
        td.setAttribute('data-value', currentValue);
        td.className = 'input-editing';
        const toolbar = createButtons();
        const btnCancel = toolbar.querySelector('.btn-cancel');
        const btnSave = toolbar.querySelector('.btn-save');

        btnCancel.addEventListener('click', (ev) => onCancel(ev, td));
        btnSave.addEventListener('click', (ev) => onSave(ev, td));

        td.appendChild(toolbar);
      }
    });

    // td.addEventListener('focusout', (ev) => {
      // const td = ev.currentTarget;
      // td.className = '';
    // })
  }
}

function createButtons(){
  const div = document.createElement('div');
  div.className = 'button-toolbar';
  div.setAttribute('contenteditable', false);
  div.innerHTML = `
    <div class="button-wrapper">
      <button class="btn btn-danger btn-sm btn-cancel">Cancel</button>
      <button class="btn btn-success btn-sm btn-save">Save</button>
    </div>
  `;
  return div;
}

function onCancel(ev, td){
  td.innerHTML = td.getAttribute('data-value');
  td.classList.remove('input-editing');
}

function onSave(ev, td){
  td.classList.remove('input-editing');
}