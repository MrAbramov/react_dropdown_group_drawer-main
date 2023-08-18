import {DropdownOption} from "../Dropdown/types";

export type WallConfiguration = { id: string, side: DropdownOption, size: DropdownOption, stages: DropdownOption, quantity: number }
export type WallConfigurationDrawerProps = { onSave: (output: Record<string, string | number>[]) => void; }
