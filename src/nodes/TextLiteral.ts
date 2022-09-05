import type Conflict from "../conflicts/Conflict";
import Expression from "./Expression";
import TextType from "./TextType";
import type Token from "./Token";
import type Type from "./Type";
import type Evaluator from "../runtime/Evaluator";
import type Value from "../runtime/Value";
import Text from "../runtime/Text";
import type Step from "../runtime/Step";
import Finish from "../runtime/Finish";
import type { ConflictContext } from "./Node";
import type Language from "./Language";

export default class TextLiteral extends Expression {
    
    readonly text: Token;
    readonly format?: Language;

    constructor(text: Token, format?: Language) {
        super();
        this.text = text;
        this.format = format;
    }

    getChildren() { return this.format !== undefined ? [ this.text, this.format ] : [ this.text ]; }

    getConflicts(context: ConflictContext): Conflict[] { return []; }

    getType(context: ConflictContext): Type {
        return new TextType(undefined, this.format);
    }

    compile(context: ConflictContext):Step[] {
        return [ new Finish(this) ];
    }
    
    evaluate(evaluator: Evaluator): Value {
        // Remove the opening and optional closing quote symbols.
        const lastChar = this.text.text.length === 0 ? undefined : this.text.text.charAt(this.text.text.length - 1);
        const lastCharIsQuote = lastChar === undefined ? false : ["』", "」", "»", "›", "'", "’", "”", '"'].includes(lastChar);    
        return new Text(this.text.text.substring(1, this.text.text.length - (lastCharIsQuote ? 1 : 0)), this.format === undefined ? undefined : this.format.getLanguage());
    }

}