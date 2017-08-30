import "jest";
import { cloneObject, deepAssign, isObjectType } from "../../src/utils/index";

// jest.resetAllMocks();
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

// tslint:disable:no-empty
beforeAll(() => { });

beforeEach(() => {

});

afterAll(() => { });

afterEach(() => { });

describe("ObjectUtils", async () => {

    it("checks isObject", async () => {
        expect.assertions(4);
        const obj = { a: 1 };
        const fn = () => 1;
        const str = "1";
        const num = 1;
        expect(isObjectType(obj)).toEqual(true);
        expect(isObjectType(fn)).toEqual(false);
        expect(isObjectType(str)).toEqual(false);
        expect(isObjectType(num)).toEqual(false);
    });
    it("checks deepAssign", async () => {
        expect.assertions(4);
        const tobj = { a: 1 , h: { k: 5} , c: 9};
        const tobj1 = { h: { b: { c: 1 } } };
        const tobj2 = { h: { b: { c: 4 }, d: { e: 1 } } };
        const actual = deepAssign(tobj, tobj1, tobj2);
        expect(actual.a).toEqual(1);
        expect(actual.c).toEqual(9);
        expect(actual.h.b.c).toEqual(4);
        expect(actual.h.d.e).toEqual(1);
    });
    it("checks cloneObject", async () => {
        expect.assertions(3);
        const tobj = { a: 1 , h: { k: 5} , c: 9};
        const actual = cloneObject(tobj);
        expect(actual.a).toEqual(1);
        expect(actual.c).toEqual(9);
        expect(actual.h.k).toEqual(5);
    });

});