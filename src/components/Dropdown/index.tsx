import {ChangeEvent} from "react";
import {DropdownOption, DropdownProps} from "./types";

export const Dropdown = (props: DropdownProps) => {
    const controlledValue = props.value?.id;

    const renderOptions = (option: DropdownOption) => {
        return <option key={option.id} value={option.id}>{option.value}</option>
    }

    const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const option = props.list.find(option => option.id === event.target.value) as DropdownOption;

        props.onChange?.(option);
    }

    return (
        <select placeholder={props.placeholder} value={controlledValue} onClick={props.onClick} onChange={onSelectChange}>
            {props.list.map(renderOptions)}
        </select>
    )
}