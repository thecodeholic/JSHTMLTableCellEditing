export default class TableCellEditing {
  constructor(table) {
    this.tbody = table.querySelector('tbody');
  }

  init() {
    this.tds = this.tbody.querySelectorAll('td');
    this.tds.forEach(td => {
      td.setAttribute('contenteditable', true);
      td.addEventListener('click', (ev) => {

        const activeTd = this.findActiveCell();
        if (activeTd) {
          this.cancelEditing(activeTd);
        }
        if (!this.inEditing(td)) {
          this.startEditing(td);
        }
      });
    });
  }

  startEditing(td) {
    td.classList.add('in-editing');
    td.setAttribute('data-old-value', td.innerHTML);

    this.createToolbar(td);
  }

  cancelEditing(td) {
    this.removeToolbar(td);

    td.innerHTML = td.getAttribute('data-old-value');
  }

  inEditing(td) {
    return td.classList.contains('in-editing')
  }

  finishEditing(td) {
    this.removeToolbar(td);
  }

  findActiveCell() { 
    return Array.prototype.find.call(this.tds, td => this.inEditing(td));
  }

  createToolbar(td) {
    const div = document.createElement('div');
    div.className = 'button-toolbar';
    div.setAttribute('contenteditable', false);
    div.innerHTML = `
    <div class="button-wrapper">
      <button class="btn btn-danger btn-sm btn-cancel">Cancel</button>
      <button class="btn btn-primary btn-sm btn-save">Save</button>
    </div>
    `;
    td.appendChild(div);

    const saveBtn = td.querySelector('.btn-save');
    const cancelBtn = td.querySelector('.btn-cancel');
    saveBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.finishEditing(td);
    });
    cancelBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      this.cancelEditing(td);
    });


    return div;
  }

  removeToolbar(td) {
    td.classList.remove('in-editing');
    const toolbar = td.querySelector('.button-toolbar');
    toolbar.remove();
  }
}