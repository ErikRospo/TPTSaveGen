class Float32Array2D {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = new Float32Array(width * height);
    }
    get(x, y) {
        return this.data[x + y * this.width];
    }
    set(x, y, value) {
        this.data[x + y * this.width] = value;
    }
}
class Float64Array2d {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = new Float64Array(width * height);
    }
    get(x, y) {
        return this.data[x + y * this.width];
    }
    set(x, y, value) {
        this.data[x + y * this.width] = value;
    }
    
}
class Int2DArray {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = new Int32Array(width * height);
    }
    get(x, y) {
        return this.data[x + y * this.width];
    }
    set(x, y, value) {
        this.data[x + y * this.width] = value;
    }
}
class CharArray2d {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.data = new Uint8Array(width * height);
    }
    get(x, y) {
        return this.data[x + y * this.width];
    }
    set(x, y, value) {
        this.data[x + y * this.width] = value;
    }
}

module.exports = { Float32Array2D, Float64Array2d, Int2DArray, CharArray2d };