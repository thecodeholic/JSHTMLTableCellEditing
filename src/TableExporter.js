export default class TableExporter {
  constructor(tableEditor, table) {
    this.tableEditor = tableEditor;
    this.table = table;
  }

  export(type, filename) {
    if (type.toLowerCase() === 'csv') {
      this.exportCsv(filename)
    } else {
      this.exportXls(filename);
    }
  }

  exportCsv(filename) {
    const trs = this.table.querySelectorAll('tbody tr');
    const tableData = [];
    trs.forEach(tr => {
      const tableRowData = [];
      const tds = tr.children;
      Array.prototype.forEach.call(tds, td => {
        tableRowData.push(this.tableEditor.getValue(td));
      });
      tableData.push(tableRowData);
    });
    const csvContent = encodeURI("\uFEFF" + this.generateCSVFromData(tableData));
    console.log(csvContent);
    this.triggerDownload(filename, `data:text/csv;charset=utf-8,${csvContent}`);
  }

  generateCSVFromData(data) {
    return data.map(row => row.join(",")).join('\n');
  }

  exportXls(filename) {
    const tableContent = "\uFEFF"+this.table.outerHTML.replace(/ /g, '%20').replace(/(\n\r)*/, '');
    const tableHTML = "data:application/vnd.ms-excel;charset=utf-8,"+tableContent;
    this.triggerDownload(filename, tableHTML)
  }

  triggerDownload(filename, uri) {
    const downloadLink = document.createElement('a');
    downloadLink.href = uri;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click()
  }
}