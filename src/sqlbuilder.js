var SQLQueryBuilder = function() {
};
SQLQueryBuilder.prototype.select = function() {
    return this;
};
SQLQueryBuilder.prototype.from = function(table) {
    this.table = table;
    return this;
}
SQLQueryBuilder.prototype.build = function() {
    return 'SELECT * FROM ' + this.table;
}

