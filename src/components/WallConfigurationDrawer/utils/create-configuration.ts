import {nanoid} from "nanoid";
import {
    DEFAULT_SIDES_DROPDOWN,
    DEFAULT_SIZES_DROPDOWN,
    DEFAULT_STAGES_DROPDOWN
} from "../../WallConfiguration/constants";

export function createFirstConfiguration() {
    return {
        id: nanoid(),
        side: DEFAULT_SIDES_DROPDOWN[0],
        size: DEFAULT_SIZES_DROPDOWN[0],
        stages: DEFAULT_STAGES_DROPDOWN[0],
        quantity: 1,
    };
}