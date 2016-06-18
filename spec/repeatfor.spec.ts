
import {Linter, Rule} from 'template-lint';
import {RepeatForRule} from '../source/rules/repeatfor';

describe("RepeatFor Rule", () => {

  var linter: Linter = new Linter([
    new RepeatForRule()
  ]);

  it("will pass item of items", (done) => {
    linter.lint('<div repeat.for="item of items"></div>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        done();
      });
  });

  it("will pass i of 10", (done) => {
    linter.lint('<div repeat.for="i of 10"></div>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        done();
      });
  });

  it("will pass i of 10|converter:'format'", (done) => {
    linter.lint('<div repeat.for="i of 10|converter:\'format\'"></div>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        done();
      });
  });

  it("will pass item of items|converter:'format'", (done) => {
    linter.lint('<div repeat.for="i of 10|converter:\'format\'"></div>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        done();
      });
  });

  it("will pass [foo, boo] of items", (done) => {
    linter.lint('<div repeat.for="[foo, boo] of items"></div>')
      .then((issues) => {
        expect(issues.length).toBe(0);
        done();
      });
  });

  it("will reject item of", (done) => {
    linter.lint('<div repeat.for="item of  "></div>')
      .then((issues) => {
        expect(issues.length).toBeGreaterThan(0);
        done();
      });
  });

  it("will reject item", (done) => {
    linter.lint('<div repeat.for="item "></div>')
      .then((issues) => {
        expect(issues.length).toBeGreaterThan(0);
        done();
      });
  });
});