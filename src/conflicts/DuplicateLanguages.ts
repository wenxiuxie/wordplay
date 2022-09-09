import type Docs from "../nodes/Docs";
import type Language from "../nodes/Language";
import Conflict, { type ConflictExplanations } from "./Conflict";

export class DuplicateLanguages extends Conflict {

    readonly docs: Docs[];
    readonly duplicates: Map<string, Language[]>;

    constructor(docs: Docs[], duplicates: Map<string, Language[]>) {

        super(false);

        this.docs = docs;
        this.duplicates = duplicates;

    }

    getConflictingNodes() {
        return Array.from(this.duplicates.values()).flat();
    }

    getExplanations(): ConflictExplanations { 
        return {
            eng: `Duplicate languages ${Array.from(this.duplicates.values()).flat().map(lang => lang.getLanguage())}.`
        }
    }

}