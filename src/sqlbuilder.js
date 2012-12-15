var SQLQueryBuilder = function() {
};
SQLQueryBuilder.prototype.select = function(columns) {
    this.columns = [];
    for(var idx in columns) {
        this.columns.push({
          name: columns[idx],
          last: this.columns.length + 1 == columns.length
        });
    }
    if (this.columns.length == 0) {
        this.columns.push({name: '*', last: true});
    }
    return this;
};
SQLQueryBuilder.prototype.from = function(table) {
    this.table = table;
    return this;
};
SQLQueryBuilder.prototype.where = function(criteria) {
    var size = 0;
    this.criteria = [];
    for(var col in criteria)
      size++;
    for(var col in criteria) {
      this.criteria.push({
        col: col,
        value: criteria[col],
        last: this.criteria.length + 1 == size
      });
    }
    return this;
};
SQLQueryBuilder.prototype.hasCriteria = function() {
    return this.criteria != null;
};
SQLQueryBuilder.prototype.build = function() {
    var result = 'SELECT ' + this.prepareColumnsTo() + ' FROM ' + this.table;
    if (this.hasCriteria()) {
      result += ' WHERE ' + this.prepareColumnsValues();
    }
    return result;
};
SQLQueryBuilder.prototype.prepareColumnsTo = function() {
    var cols = '';
    for (var idx = 0; idx < this.columns.length; idx++) {
        var tmp = this.columns[idx];
        if (tmp.last) {
          cols += tmp.name;
        }
        else {
          cols += tmp.name + ', ';
        }
    }
    return cols;
};
SQLQueryBuilder.prototype.prepareColumnsValues = function() {
  var result = '';
  for (var idx = 0; idx < this.criteria.length; idx++) {
    var tmp = this.criteria[idx];
    if (tmp.last) {
      result += tmp.col + ' = ' + tmp.value;
    }
    else {
      result += tmp.col + ' = ' + tmp.value + ' AND ';
    }
  }
  return result; 
}
