const PI = Math.PI;


class Vec2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Vec2(this.x, this.y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }

    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }

    mult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    mag() {
        return Vec2.mag(this);
    }

    normalize() {
        this.div(this.mag());
        return this;
    }

    setMag(scalar) {
        this.normalize();
        this.mult(scalar);
        return this;
    }

    rotate(radian) {
        this.set(
            this.x * Math.cos(radian) - this.y * Math.sin(radian),
            this.x * Math.sin(radian) + this.y * Math.cos(radian)
        );
        return this;
    }

    static add(vec1, vec2) {
        return new Vec2(0, 0)
            .add(vec1)
            .add(vec2);
    }

    static sub(vec1, vec2) {
        return new Vec2(0, 0)
            .add(vec1)
            .sub(vec2);
    }

    static mult(vec, scalar) {
        return new Vec2(0, 0)
            .add(vec)
            .mult(scalar);
    }

    static div(vec, scalar) {
        return new Vec2(0, 0)
            .add(vec)
            .div(scalar);
    }

    static mag(vec) {
        return Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
    }
}