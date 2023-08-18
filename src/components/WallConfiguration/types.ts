import {WallConfiguration} from "../WallConfigurationDrawer/types";
import {DropdownOption} from "../Dropdown/types";

export type WallConfigurationEvent = { kind: 'side' | 'size' | 'stages', value: DropdownOption } | { kind: 'quantity', value: number }
export type WallConfigurationChange = (event: WallConfigurationEvent) => void
export type WallConfigurationProps = {
    exclude: (string | number)[];
    configuration: WallConfiguration;
    isRemovable: boolean;
    onChange: WallConfigurationChange;
    onRemove: () => void;
}
