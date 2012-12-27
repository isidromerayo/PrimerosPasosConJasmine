var SQLQueryBuilder = function() {
};
SQLQueryBuilder.prototype.select = function(columns) {
    this.operacion = 'SELECT';
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
SQLQueryBuilder.prototype.delete = function() {
  this.operacion = 'DELETE';
  this.columns = [];
  return this;
};
SQLQueryBuilder.prototype.update = function(table) {
  this.operacion = 'UPDATE';
  this.table = table;
  return this;
};
SQLQueryBuilder.prototype.insert = function(table) {
    this.operacion = 'INSERT';
    this.table = table;
    return this;
};
SQLQueryBuilder.prototype.values = function(params) {
    var size = 0;
    for (var idx in params)
        size++;
    this.columns = [];
    this.valores = [];
    for(var idx in params) {
        this.columns.push({
          col: idx,
          value: params[idx],
          last: this.columns.length + 1 == size
        });
    }
    return this;
};
SQLQueryBuilder.prototype.set = function(values) {
    var size = 0;
    for (var idx in values)
        size++;
    this.columns = [];
    for(var idx in values) {
        this.columns.push({
          col: idx,
          value: values[idx],
          last: this.columns.length + 1 == size
        });
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
    var criteria = '';
    if (this.hasCriteria()) {
      criteria = ' WHERE ' + this.prepareColumnsValues();
    }
    var tpls = {
        SELECT:   'SELECT ' + this.prepareColumnsTo(this.columns) + ' FROM ' + this.table,
        DELETE: 'DELETE FROM ' + this.table,
        UPDATE: 'UPDATE ' + this.table + ' SET ' + this.preparePairColumnValue(),
        INSERT: 'INSERT INTO ' + this.table  + this.prepareElementInsert('col') + 
          ' VALUES' + this.prepareElementInsert('value')
    }
    return tpls[this.operacion] + criteria;
};
SQLQueryBuilder.prototype.prepareColumnsTo = function(args) {
    var cols = '';
    for (var idx = 0; idx < args.length; idx++) {
        var tmp = args[idx];
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
};
SQLQueryBuilder.prototype.preparePairColumnValue = function() {
  var result = '';
  for (var idx = 0; idx < this.columns.length; idx++) {
    var tmp = this.columns[idx];
    if (tmp.last) {
      result += tmp.col + ' = ' + tmp.value;
    }
    else {
      result += tmp.col + ' = ' + tmp.value + ', ';
    }
  }
  return result; 

};
SQLQueryBuilder.prototype.prepareElementInsert = function(element) {
  var result='';
  result +='(';
  for (var idx = 0; idx < this.columns.length; idx++) {
    var tmp = this.columns[idx];
    if (tmp.last) {
      result += tmp[element] ;
    }
    else {
      result += tmp[element] + ', ';
    }
  }
  result +=')';
  return result;
}
