"use strict";

import { Issue, IssueSeverity } from '../../../issue';
import { Options } from '../../../options';
import { File, FileLocation } from '../../../file';
import { ParserHook } from '../parser-hook';
import { Parser } from '../parser';

/**
 * Hook to ensure non-void elements do not self-close
 */
export class SelfCloseHook extends ParserHook {
  constructor(private opts: Options) {
    super();
  }

  protected hook() {
    if (this.opts["report-html-self-close"] == false)
      return;

    this.parser.on('startTag', (name, attrs, selfClosing, loc) => {

      let scope = this.parser.state.scope;

      if (scope == 'svg' || scope == 'math') {
        return;
      }
      if (selfClosing && this.parser.state.isVoid(name) == false) {
        if (loc == null) throw new Error("loc is " + loc);
        let issue = new Issue({
          message: "self-closing element",
          severity: IssueSeverity.Error,
          location: new FileLocation({
            line: loc.line,
            column: loc.col,
            start: loc.startOffset,
            end: loc.endOffset
          }),
        });
        this.reportIssue(issue);
      }
    });
  }
  finalise() { }
}