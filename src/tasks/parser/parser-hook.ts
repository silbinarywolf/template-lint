import { Parser } from './parser';
import { Issue } from '../../issue';
import { ContentContext } from '../../content';

/**
* Parser Hook
*/
export abstract class ParserHook {
  protected parser: Parser;
  protected context: ContentContext;

  /**
  * Initialise and hook into the parser. 
  */
  public init(parser: Parser, context: ContentContext): void {
    if (!parser) { throw Error("parser is null"); }
    if (!context) { throw Error("context is null"); }
    this.parser = parser;
    this.context = context;
    this.hook();
  }

  /**
  * hook into the parser events
  */
  protected abstract hook(): void;

  /**
  * Called when parsing is complete. 
  */
  public abstract finalise(): void;

  /**
  * Save an issue that will be added to the file . 
  */
  protected reportIssue(issue: Issue): void {
    this.context.issues = this.context.issues || [];
    if (issue) {
      this.context.issues.push(issue);
    }
  }
}