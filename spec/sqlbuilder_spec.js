describe('SQL Builder', function(){
    describe('Builder SELECT statement', function(){
        it('Just with a table name', function(){
            var b = new SQLQueryBuilder();
            var sql = b.select().from('cocotero').build();
            expect(sql).toEqual('SELECT * FROM cocotero');
        });
    });
});
