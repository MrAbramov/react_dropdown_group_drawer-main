import {DropdownOption} from "../Dropdown/types";
import {Dropdown} from "../Dropdown";
import {ChangeEvent, Fragment, useEffect, useState} from "react";
import {DEFAULT_SIDES_DROPDOWN, DEFAULT_SIZES_DROPDOWN, DEFAULT_STAGES_DROPDOWN} from "./constants";
import {WallConfigurationProps} from "./types";

export const WallConfiguration = (props: WallConfigurationProps) => {
    const [currentConfiguration, setCurrentConfiguration] = useState<DropdownOption>(
        DEFAULT_SIDES_DROPDOWN.find(side => side.id === props.configuration.side.id) as DropdownOption
    )
    const [sides, setSides] = useState<DropdownOption[]>([])

    useEffect(() => {
        setSides(DEFAULT_SIDES_DROPDOWN.filter(side => side.id === currentConfiguration.id || !props.exclude.includes(side.id)))
    }, [props.exclude])

    const onSideChange = (option: DropdownOption) => {
        setCurrentConfiguration(option)

        props.onChange({ kind: 'side', value: option })
    }
    const onSizeChange = (option: DropdownOption) => {
        props.onChange({ kind: 'size', value: option })
    }

    const onStagesChange = (option: DropdownOption) => {
        props.onChange({ kind: 'stages', value: option })
    }

    const onQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.onChange({ kind: 'quantity', value: +event.target.value })
    }

    return (
        <Fragment>
            <Dropdown list={sides} onChange={onSideChange} value={currentConfiguration}/>
            <Dropdown list={DEFAULT_SIZES_DROPDOWN} onChange={onSizeChange} />
            <Dropdown list={DEFAULT_STAGES_DROPDOWN} onChange={onStagesChange} />
            <input
                type="number"
                min={1}
                step={1}
                value={props.configuration.quantity}
                onChange={onQuantityChange}
            />

            {props.isRemovable && <button onClick={props.onRemove}>Remove</button>}
            <br />
        </Fragment>
    )
}