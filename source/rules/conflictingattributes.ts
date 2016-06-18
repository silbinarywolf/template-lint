"use strict";

import {Rule, Parser, Issue, IssueSeverity} from 'template-lint';
import {Attribute, StartTagLocationInfo} from 'parse5';

export class ConflictingAttributes {
  constructor(public attrs: string[], public msg: string) {
  }
}

/**
 * Rule to ensure tags don't have attributes that shouldn't be used at the same time.
 */
export class ConflictingAttributesRule extends Rule {
  static ERRMSG_PREFIX = "conflicting attributes: ";

  constructor(public conflictingAttributesList?: ConflictingAttributes[]) {
    super();
    if (!conflictingAttributesList) {
      this.conflictingAttributesList = ConflictingAttributesRule.createDefaultConflictingAttributes();
    } else if (conflictingAttributesList.length === 0) {
      throw new Error("Illegal argument: empty conflictingAttributesList");
    }
  }

  static createDefaultConflictingAttributes() {
    return [
      new ConflictingAttributes(["repeat.for", "if.bind", "with.bind"], ConflictingAttributesRule.ERRMSG_PREFIX),
    ];
  }

  init(parser: Parser) {
    parser.on("startTag", (tag, attrs, selfClosing, loc) => {
      this.conflictingAttributesList.forEach((conflictingAttributes) => {
        this.checkConflictsWith(attrs, loc, conflictingAttributes);
      });
    });
  }

  private checkConflictsWith(attrs: Attribute[], loc: StartTagLocationInfo, conflictingAttributes: ConflictingAttributes) {
    const attributes = [];
    attrs.forEach(attr => {
      if (conflictingAttributes.attrs.indexOf(attr.name) >= 0) {
        attributes.push(attr.name);
      }
    });
    if (attributes.length > 1) {
      const fullErrMsg = ConflictingAttributesRule.ERRMSG_PREFIX + "[" + attributes.join(", ") + "]";
      this.reportIssue(new Issue({
        message: fullErrMsg,
        line: loc.line,
        column: loc.col,
        detail: conflictingAttributes.msg
      }));
    }
  }
}
