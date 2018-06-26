Array.prototype.any = function(f) {
    if (f) {
        return !!this.filter(f).length;
    }
    return this[0];
};

Array.prototype.all = function(f) {
    var length = this.length;
    for (var index = 0; index < length; index++) {
        var currentKey = index;
        if (!f(this[currentKey], currentKey, this)) return false;
    }
    return true;
};