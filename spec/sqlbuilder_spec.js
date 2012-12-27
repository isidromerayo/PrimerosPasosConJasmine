describe('SQL Builder', function(){
    var b;
    beforeEach(function() {
        b = new SQLQueryBuilder();  
    });

    describe('Builds SELECT statement', function(){
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
          expect(sql).toEqual('SELECT * FROM cocotero ' +
                              'WHERE a = 1 AND b = 2 AND c = 3');
        });

    });
    
    describe('Builds DELETE statements', function(){
        it('Just with a table name', function(){
            var sql = b.delete().from('cocotero').build();
            expect(sql).toEqual('DELETE FROM cocotero');
        });
        it('With some criteria', function(){
            var criteria = {a: 1, b: 2, c: 3};
            var sql = b.delete().from('cocotero').where(criteria).build();
            expect(sql).toEqual('DELETE FROM cocotero ' +
                                'WHERE a = 1 AND b = 2 AND c = 3');
        })
    });

    describe('Builds UPDATE statements', function(){
        it('Just with a table name and value map', function(){
            var values = {a: 1, b: 2, c: 3};
            var sql = b.update('cocotero').set(values).build();
            expect(sql).toEqual('UPDATE cocotero SET a = 1, b = 2, c = 3');
        });
        it('Just with a table with criteria', function(){
            var values = {a: 1, b: 2, c: 3};
            var criteria = {d: 4};
            var sql = b.update('cocotero').set(values).where(criteria).build();
            expect(sql).toEqual('UPDATE cocotero SET ' + 
                                'a = 1, b = 2, c = 3 ' +
                                'WHERE ' + 
                                'd = 4');
        });
    });

    describe('Build INSERT statements', function(){
      it('With a table name an value map', function(){
            var values = {a: 1, b: 2, c: 3};
            var criteria = {d: 4};
            var sql = b.insert('cocotero').values(values).build();
            expect(sql).toEqual('INSERT INTO cocotero(a, b, c) VALUES(1, 2, 3)');
      });
    });
});
