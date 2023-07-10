import type { NameAndDoc } from './Locale';

type InputTexts = {
    Random: NameAndDoc & {
        min: NameAndDoc;
        max: NameAndDoc;
    };
    Choice: NameAndDoc;
    Button: NameAndDoc & { down: NameAndDoc };
    Pointer: NameAndDoc;
    Key: NameAndDoc & {
        key: NameAndDoc;
        down: NameAndDoc;
    };
    Time: NameAndDoc & { frequency: NameAndDoc };
    Mic: NameAndDoc & {
        frequency: NameAndDoc;
    };
    Camera: NameAndDoc & {
        width: NameAndDoc;
        height: NameAndDoc;
        frequency: NameAndDoc;
    };
    Reaction: NameAndDoc;
    Motion: NameAndDoc & {
        type: NameAndDoc;
        vx: NameAndDoc;
        vy: NameAndDoc;
        vz: NameAndDoc;
        vangle: NameAndDoc;
        mass: NameAndDoc;
        gravity: NameAndDoc;
        bounciness: NameAndDoc;
    };
};

export default InputTexts;