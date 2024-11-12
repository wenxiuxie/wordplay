import { getContext, setContext } from 'svelte';
import type { Readable, Writable } from 'svelte/store';
import type Concept from '@concepts/Concept';
import type ConceptIndex from '@concepts/ConceptIndex';
import type { InsertionPoint } from '../../edit/Drag';
import type Caret from '../../edit/Caret';
import type Project from '@models/Project';
import type Node from '@nodes/Node';
import type { Highlights } from '../editor/util/Highlights';
import type Evaluate from '@nodes/Evaluate';
import type Step from '@runtime/Step';
import type { StreamChange } from '@runtime/Evaluator';
import type Conflict from '@conflicts/Conflict';
import type { Path } from '@nodes/Root';
import type Source from '@nodes/Source';
import type { User } from 'firebase/auth';
import type Evaluator from '@runtime/Evaluator';
import type LocaleText from '@locale/LocaleText';
import type Root from '@nodes/Root';
import type {
    CommandContext,
    Edit,
    ProjectRevision,
} from '../editor/util/Commands';
import type { CaretPosition } from '../../edit/Caret';
import type LanguageCode from '../../locale/LanguageCode';
import type Spaces from '@parser/Spaces';
import type { LocalizedValue } from '@db/LocalizedSetting';

// App related contexts

export const UserSymbol = Symbol('user');
export type UserContext = Writable<User | null>;
export function getUser(): UserContext {
    return getContext(UserSymbol);
}

export const LocalesSymbol = Symbol('locales');
export function getLocales(): LocaleText[] {
    return getContext(LocalesSymbol);
}

// Project related contexts

export type ProjectContext = Readable<Project | undefined>;
export const ProjectSymbol = Symbol('project');
export function getProject() {
    return getContext<ProjectContext>(ProjectSymbol);
}

export enum IdleKind {
    /** Indicates no keyboard activity. */
    Idle = 'idle',
    /** Indicates active typing (generally a flurry of insertion or deletion) */
    Typing = 'typing',
    /** Indicates a single command that will not come in a flurry  */
    Typed = 'typed',
}

export type KeyboardEditIdleContext = Writable<IdleKind>;
export const KeyboardEditIdleSymbol = Symbol('idle');
export function getKeyboardEditIdle() {
    return getContext<KeyboardEditIdleContext>(KeyboardEditIdleSymbol);
}

export type KeyModifierState = {
    control: boolean;
    alt: boolean;
    shift: boolean;
};
export const KeyModfifierSymbol = Symbol('modifiers');
export function getKeyboardModifiers() {
    return getContext<Writable<KeyModifierState> | undefined>(
        KeyModfifierSymbol,
    );
}

export type ProjectCommandContext = { context: CommandContext };
export const ProjectCommandContextSymbol = Symbol('projectcommand');
export function getProjectCommandContext() {
    return getContext<ProjectCommandContext>(ProjectCommandContextSymbol);
}

// Evaluation related contexts

export type EvaluatorContext = Readable<Evaluator>;
export const EvaluatorSymbol = Symbol('evaluator');
export function getEvaluator() {
    return getContext<EvaluatorContext>(EvaluatorSymbol);
}

/** A collection of state that changes each time the evaluator updates. */
export type EvaluationContext = {
    evaluator: Evaluator;
    playing: boolean;
    step: Step | undefined;
    stepIndex: number;
    streams: StreamChange[];
};
export const EvaluationSymbol = Symbol('evaluation');
export function getEvaluation(): Writable<EvaluationContext> {
    return getContext(EvaluationSymbol);
}

export const AnimatingNodesSymbol = Symbol('animatingNodes');
export type AnimatingNodesContext = Writable<Set<Node>>;
export function getAnimatingNodes(): AnimatingNodesContext | undefined {
    return getContext(AnimatingNodesSymbol);
}

// Editor related contexts

export type CaretContext = Writable<Caret> | undefined;
export const CaretSymbol = Symbol('caret');
export function getCaret() {
    return getContext<CaretContext>(CaretSymbol);
}

export type EditHandler = (
    edit: Edit | ProjectRevision | undefined,
    idle: IdleKind,
    focus: boolean,
) => void;

/** Various components outside the editor use this to apply edits */
export const EditorsSymbol = Symbol('editors');
export type EditorState = {
    caret: Caret;
    project: Project;
    edit: EditHandler;
    focused: boolean;
    blocks: boolean;
    toggleMenu: () => void;
    grabFocus: (message: string) => void;
};
export type EditorsContext = Writable<Map<string, EditorState>>;
export function getEditors() {
    return getContext<EditorsContext>(EditorsSymbol);
}

export type EditorContext = Writable<EditorState>;
export const EditorSymbol = Symbol('editor');
export function getEditor(): EditorContext | undefined {
    return getContext<EditorContext>(EditorSymbol);
}

export const ConflictsSymbol = Symbol('conflicts');
export type ConflictsContext = Writable<Conflict[]>;
export function getConflicts(): ConflictsContext | undefined {
    return getContext(ConflictsSymbol);
}

export type HoveredContext = Writable<Node | undefined> | undefined;
export const HoveredSymbol = Symbol('hovered');
export function getHovered() {
    return getContext<HoveredContext>(HoveredSymbol);
}

export type InsertionPointContext =
    | Writable<InsertionPoint | undefined>
    | undefined;
export const InsertionPointsSymbol = Symbol('insertions');
export function getInsertionPoint() {
    return getContext<InsertionPointContext>(InsertionPointsSymbol);
}

export type DraggedContext = Writable<Node | undefined>;
export const DraggedSymbol = Symbol('dragged');
export function getDragged() {
    return getContext<DraggedContext | undefined>(DraggedSymbol);
}

export type HighlightContext = Writable<Highlights> | undefined;
export const HighlightSymbol = Symbol('highlight');
export function getHighlights() {
    return getContext<HighlightContext>(HighlightSymbol);
}

export const SpaceSymbol = Symbol('space');
export type SpaceContext = Writable<Spaces>;
export function getSpace() {
    return getContext<SpaceContext>(SpaceSymbol);
}

export const HiddenSymbol = Symbol('hidden');
export type HiddenContext = Writable<Set<Node>>;
export function getHidden() {
    return getContext<HiddenContext | undefined>(HiddenSymbol);
}

export const LocalizeSymbol = Symbol('localize');
export function getLocalize() {
    return getContext<Writable<LocalizedValue> | undefined>(LocalizeSymbol);
}

export const ConceptPathSymbol = Symbol('palette-path');
export type ConceptPathContext = Writable<Concept[]>;
export function getConceptPath() {
    return getContext<ConceptPathContext>(ConceptPathSymbol);
}

const ConceptIndexSymbol = Symbol('palette-index');
export type ConceptIndexContext = { index: ConceptIndex | undefined };
export function setConceptIndex(context: ConceptIndexContext) {
    return setContext(ConceptIndexSymbol, context);
}
export function getConceptIndex(): ConceptIndexContext | undefined {
    return getContext<ConceptIndexContext>(ConceptIndexSymbol);
}

export const RootSymbol = Symbol('root');
export type RootContext = { root: Root | undefined };
export function getRoot() {
    return getContext<RootContext>(RootSymbol)?.root;
}

export const MenuNodeSymbol = Symbol('menu');
export type MenuNodeContext = Writable<
    (position: CaretPosition | undefined) => void
>;
export function getSetMenuNode() {
    return getContext<MenuNodeContext>(MenuNodeSymbol);
}

export const ShowLinesSymbol = Symbol('lines');
export type ShowLinesContext = Writable<boolean>;
export function getShowLines() {
    return getContext<ShowLinesContext>(ShowLinesSymbol);
}

export const BlocksSymbol = Symbol('blocks');
export type BlocksContext = Writable<boolean>;
export function isBlocks() {
    return getContext<BlocksContext>(BlocksSymbol);
}

// Output related contexts
export type SelectedOutputPaths = {
    source: Source | undefined;
    path: Path | undefined;
}[];

export type SelectedPhrase = {
    name: string;
    index: number | null;
} | null;

export type SelectedOutputContext = {
    selectedPaths: SelectedOutputPaths;
    selectedOutput: Evaluate[];
    selectedPhrase: SelectedPhrase;
    setSelectedOutput: (project: Project, evaluates: Evaluate[]) => void;
    setSelectedPhrase: (phrase: SelectedPhrase) => void;
};

export const SelectedOutputSymbol = Symbol('selected-output');

export function getSelectedOutput(): SelectedOutputContext {
    return getContext(SelectedOutputSymbol);
}

// Accessibility contexts

// These are lists of announcements rendered invisiblily in the project view
// for screen readers. Children can override by ID to change what's announced.
// This minimizes the number of live regions on the page, increasing the likelihood
// that they're read.
export const AnnouncerSymbol = Symbol('announcer');
export type Announce = (
    id: string,
    language: LanguageCode | undefined,
    message: string,
) => void;
export function getAnnounce(): Readable<Announce | undefined> {
    return getContext(AnnouncerSymbol);
}
