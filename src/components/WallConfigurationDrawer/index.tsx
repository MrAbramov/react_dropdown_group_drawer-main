import {Fragment, useState} from "react";
import {nanoid} from "nanoid";
import {WallConfiguration} from "../WallConfiguration";
import {DEFAULT_SIDES_DROPDOWN, DEFAULT_SIZES_DROPDOWN, DEFAULT_STAGES_DROPDOWN} from "../WallConfiguration/constants";
import {WallConfigurationChange} from "../WallConfiguration/types";
import {WallConfigurationDrawerProps, WallConfiguration as WallConfigurationType} from "./types";
import {isDropdownOptionEvent} from "./utils/is-dropdown-option";
import {createFirstConfiguration} from "./utils/create-configuration";

export const WallConfigurationDrawer = (props: WallConfigurationDrawerProps) => {
   const [configurations, setConfigurations] = useState<WallConfigurationType[]>([createFirstConfiguration()])

   const onConfigurationChange = (id: string): WallConfigurationChange => (event) => {
      const configurationsCopy = [...configurations]
      const configurationIndex = configurationsCopy.findIndex(configuration => configuration.id === id);

      /**
       * This condition is needed because the event object is not the same for the dropdown and the input.
       * When this is a dropdown event, infer the type of the event and assign the value to the corresponding key.
       * Else, just assign the value to the corresponding key because it's inferred as an input event.
       *
       * - Sergey Sovgut
       */
      if (isDropdownOptionEvent(event)) {
        configurationsCopy[configurationIndex][event.kind] = event.value;
      } else {
        configurationsCopy[configurationIndex][event.kind] = event.value;
      }

      setConfigurations(configurationsCopy);
   }

   const onConfigurationRemove = (id: string) => () => {
      setConfigurations(prevState => prevState.filter(configuration => configuration.id !== id))
   }

   const createConfiguration = () => {
      const defaultSideValue = DEFAULT_SIDES_DROPDOWN.filter(side => !configurations.map(configuration => configuration.side.id).includes(side.id))[0];
      const defaultSizeValue = DEFAULT_SIZES_DROPDOWN[0];
      const defaultStageValue = DEFAULT_STAGES_DROPDOWN[0];
      const defaultQuantityValue = 0x1;

      return {
         id: nanoid(),
         side: defaultSideValue,
         size: defaultSizeValue,
         stages: defaultStageValue,
         quantity: defaultQuantityValue,
      }
   }

   const onAddConfiguration = () => {
      setConfigurations(prevState => [...prevState, createConfiguration()]);
   }

   const onSave = () => {
      props.onSave(configurations.map(configuration => {
         const output: Record<string, string | number> = {
            side: configuration.side.value,
            size: configuration.size.value,
            stages:  configuration.stages.value,
            quantity: configuration.quantity,
         }

         return output
      }));
   }

   const onCancel = () => {
      setConfigurations([createFirstConfiguration()]);
   }

   return (
       <Fragment>
          {configurations.map((configuration) => (
              <WallConfiguration
                  key={configuration.id}
                  configuration={configuration}
                  exclude={configurations.filter(binding => binding.id !== configuration.id).map(binding => binding.side.id)}
                  isRemovable={configurations.length > 1}
                  onChange={onConfigurationChange(configuration.id)}
                  onRemove={onConfigurationRemove(configuration.id)}
              />
          ))}

          <button onClick={onAddConfiguration} disabled={DEFAULT_SIDES_DROPDOWN.length <= configurations.length}>Add</button>
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
       </Fragment>
   )
}