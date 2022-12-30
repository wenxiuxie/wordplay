import type Bind from "../nodes/Bind";
import type Context from "../nodes/Context";
import type Node from "../nodes/Node";
import Reference from "../nodes/Reference";
import Concept from "./Concept";

export default class BindConcept extends Concept {

    /** The type this concept represents. */
    readonly bind: Bind;
    
    /** A derived reference to the bind */
    readonly reference: Reference;

    constructor(bind: Bind, context: Context) {

        super(context);

        this.bind = bind;
        this.reference = Reference.make(this.bind);

    }

    getDocs() { return this.bind.docs; }

    getRepresentation() { return this.reference; }

    getNodes(): Set<Node> {
        return new Set([ this.reference ]);
    }

    getText(): Set<string> {
        return new Set();
    }

    getConcepts(): Set<Concept> {
        return new Set();
    }

    equals(concept: Concept) {
        return concept instanceof BindConcept && concept.bind === this.bind;
    }

}