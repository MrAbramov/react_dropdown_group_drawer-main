import {WallConfiguration} from "../types";
import {DropdownOption} from "../../Dropdown/types";

export function isDropdownOptionEvent(event: { kind: keyof WallConfiguration, value: DropdownOption | number }): event is { kind: 'side' | 'size' | 'stages', value: DropdownOption } {
    return event.kind === 'side' || event.kind === 'size' || event.kind === 'stages';
}