describe('SQL Builder', function(){
    describe('Builder SELECT statement', function(){
    var b = new SQLQueryBuilder();  
        it('Just with a table name', function(){
            var sql = b.select().from('cocotero').build();
            expect(sql).toEqual('SELECT * FROM cocotero');
        });
        it('With a column set', function() {
            var sql = b.select(['a','b','c']).from('cocotero').build();
            expect(sql).toEqual('SELECT a, b, c FROM cocotero');
        });
        it('With some criteria', function(){
          var criteria = {a: 1, b: 2, c: 3};
          var sql = b.select().from('cocotero').where(criteria).build();
          expect(sql).toEqual('SELECT * FROM cocotero WHERE a = 1 AND b = 2 AND c = 3');
        })
    });
});
