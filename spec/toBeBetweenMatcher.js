beforeEach(function (){
    this.addMatchers({
        toBeBetween: function (rangeFloor, rangeCeil) {
            if (rangeFloor > rangeCeil) {
                var temp = rangeFloor;
                rangeFloor = rangeCeil;
                rangeCeil = temp;
            }
            return this.actual > rangeFloor && this.actual < rangeCeil;
        }
    });
});
