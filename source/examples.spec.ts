/// <reference path="index.ts" />
import {Linter, Rule, ParseState, RuleError} from 'template-lint';
import {SelfCloseRule, ParserRule} from 'template-lint';
import {ProjectionRule} from '../dist/projection';
import {RequireRule} from '../dist/require';
import {TemplateRule} from '../dist/template';

describe("Aurelia Examples", () => {

    var linter: Linter = new Linter([
        new SelfCloseRule(),
        new ParserRule(),
        new ProjectionRule(),
        new TemplateRule(),
        new RequireRule(),
    ]);

    it("linter okay with 'A Simple Template'", (done) => {
        var html = `
<template>
    <div>Hello World!</div>
</template>
        `
        linter.lint(html)
            .then((errors) => {
                expect(errors.length).toBe(0);
                done();
            });
    });

    it("linter okay with 'Requiring Resources'", (done) => {
        var html = `
<template>
  <require from='nav-bar'></require>

  <nav-bar router.bind="router"></nav-bar>

  <div class="page-host">
    <router-view></router-view>
  </div>
</template>  
`
        linter.lint(html)
            .then((errors) => {
                expect(errors.length).toBe(0);
                done();
            });
    });

    it("linter not okay with 'Illegal Table Code '", (done) => {
        var html = `
<template>
  <table>
    <template repeat.for="customer of customers">
       <td>\${customer.fullName}</td>
    </template>
  </table>
</template>
`
        linter.lint(html)
            .then((errors) => {
                expect(errors.length).toBeGreaterThan(0);
                done();
            });
    });

    it("linter okay with 'Correct Table Code'", (done) => {
        var html = `

<template>
  <table>
    <tr repeat.for="customer of customers">
      <td>\${customer.fullName}</td>
    </tr>
  </table>
</template>
`
        linter.lint(html)
            .then((errors) => {
                expect(errors.length).toBe(0);
                done();
            });
    });
  
  
  
  
  
  
      it("linter not okay with 'Illegal Select Code'", (done) => {
        var html = `
<template>
  <select>
    <template repeat.for="customer of customers">
      <option>...</option>
    </template>
  </select>
</template>

  
`
        linter.lint(html)
            .then((errors) => {
                expect(errors.length).toBeGreaterThan(0);
                done();
            });
    });

    it("linter okay with 'Correct Select Code'", (done) => {
        var html = `  
<template>
  <select>
    <option repeat.for="customer of customers">...</option>
  </select>
</template>
`
        linter.lint(html)
            .then((errors) => {
                expect(errors.length).toBe(0);
                done();
            });
    });
});