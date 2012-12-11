describe("MyObject demo Before and After", function(){
    describe("Before", function() {
    var obj = new MyObject();
    beforeEach(function () {
        obj.setState("clean");
    });
    it("changes state", function () {
        obj.setState("dirty");
        expect(obj.getState()).toEqual("dirty");
    });
    it("adds states", function() {
        obj.addState("packaged");
        expect(obj.getState()).toEqual(["clean","packaged"]);
    });
    });
    describe("After", function(){
        var obj = new MyObject("clean");
        afterEach(function() {
            obj.setState("clean");
        });
        it("changes state", function(){
            obj.setState("dirty");
            expect(obj.getState()).toEqual("dirty");
        });
        it("add states", function() {
            obj.addState("packaged");
            expect(obj.getState()).toEqual(["clean","packaged"]);
        })
    });
});
