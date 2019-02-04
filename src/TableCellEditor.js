export default class TableCellEditor {
  constructor(table) {
    this.tbody = table.querySelector('tbody');

  }

  init() {
    const allTds = this.tbody.querySelectorAll('td');
    for (let td of allTds) {
      td.setAttribute('contenteditable', true);
      td.addEventListener('mousedown', (ev) => {
        const td = ev.currentTarget;
        if (!td.classList.contains('input-editing')) {
          this.startEditing(td);
        }
      });

      td.addEventListener('focusout', (ev) => this.finishEditing(td));
    }
  }

  startEditing(td) {
    const currentValue = td.innerHTML;
    td.setAttribute('data-value', currentValue);
    td.className = 'input-editing';
    const toolbar = this.createButtons();
    const btnCancel = toolbar.querySelector('.btn-cancel');
    const btnSave = toolbar.querySelector('.btn-save');

    btnCancel.addEventListener('click', (ev) => this.cancelEditing(td));
    btnSave.addEventListener('click', (ev) => this.finishEditing(td));

    td.appendChild(toolbar);
  }

  cancelEditing(td){
    td.innerHTML = td.getAttribute('data-value');
    td.classList.remove('input-editing');
    this.removeToolbar(td);
  }

  finishEditing(td){
    td.classList.remove('input-editing');
    this.removeToolbar(td);
  }

  removeToolbar(td){
    const toolbar = td.querySelector('.button-toolbar');
    toolbar.remove();
  }

  createButtons() {
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
}