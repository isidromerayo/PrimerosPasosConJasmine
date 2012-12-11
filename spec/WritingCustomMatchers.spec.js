describe("Writing custom matchers", function() {
    it("is between 5 and 30", function () {
        expect(10).toBeBetween(5, 30);
    });
    it("is between 30 and 500", function () {
        expect(100).toBeBetween(500, 30);
    });
})
