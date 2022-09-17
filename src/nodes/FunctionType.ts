import type Node from "./Node";
import Token from "./Token";
import TokenType from "./TokenType";
import Type from "./Type";
import Unparsable from "./Unparsable";
import type Context from "./Context";
import AnyType from "./AnyType";
import { FUNCTION_NATIVE_TYPE_NAME } from "../native/NativeConstants";
import { EVAL_CLOSE_SYMBOL, EVAL_OPEN_SYMBOL, FUNCTION_SYMBOL } from "../parser/Tokenizer";
import Bind from "./Bind";

export default class FunctionType extends Type {

    readonly fun: Token;
    readonly open: Token;
    readonly inputs: (Bind|Unparsable)[];
    readonly close: Token;
    readonly output: Type | Unparsable;
    
    constructor(inputs: (Bind|Unparsable)[], output: Type | Unparsable, fun?: Token, open?: Token, close?: Token) {
        super();

        this.fun = fun ?? new Token(FUNCTION_SYMBOL, [ TokenType.FUNCTION ]);
        this.open = open ?? new Token(EVAL_OPEN_SYMBOL, [ TokenType.EVAL_OPEN ]);
        this.inputs = inputs;
        this.close = close ?? new Token(EVAL_CLOSE_SYMBOL, [ TokenType.EVAL_CLOSE ]);;
        this.output = output;
    }

    computeChildren() {
        let children: Node[] = [ this.fun, this.open, ...this.inputs ];
        children.push(this.close);
        children.push(this.output);
        return children;
    }

    isCompatible(type: Type, context: Context): boolean {
        if(type instanceof AnyType) return true;
        if(!(type instanceof FunctionType)) return false;
        if(!(this.output instanceof Type)) return false;
        if(!(type.output instanceof Type)) return false;
        if(!this.output.isCompatible(type.output, context)) return false;
        if(this.inputs.length != type.inputs.length) return false;
        for(let i = 0; i < this.inputs.length; i++) {
            const thisBind = this.inputs[i];
            const thatBind = type.inputs[i];
            if(thisBind instanceof Unparsable) return false;
            if(thatBind instanceof Unparsable) return false;
            if(thisBind.type instanceof Type && thatBind.type instanceof Type && !thisBind.type.isCompatible(thatBind.type, context)) return false;
            if(thisBind.isVariableLength() !== thatBind.isVariableLength()) return false;
            if(thisBind.hasDefault() !== thatBind.hasDefault()) return false;
        }
        return true;
    }

    getNativeTypeName(): string { return FUNCTION_NATIVE_TYPE_NAME; }
    
    clone(original?: Node, replacement?: Node) { 
        return new FunctionType(
            this.inputs.map(i => i.cloneOrReplace([ Bind, Unparsable ], original, replacement)),
            this.output.cloneOrReplace([ Type, Unparsable ], original, replacement)
        ) as this;
    }

}