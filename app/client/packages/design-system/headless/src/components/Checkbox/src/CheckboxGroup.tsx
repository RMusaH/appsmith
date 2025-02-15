import React, { forwardRef, useRef } from "react";
import { Field } from "@design-system/headless";
import { useDOMRef } from "@react-spectrum/utils";
import type { DOMRef } from "@react-types/shared";
import { useCheckboxGroup } from "@react-aria/checkbox";
import { useCheckboxGroupState } from "@react-stately/checkbox";

import { CheckboxGroupContext } from "./context";
import type { CheckboxGroupProps } from "./types";
import { useGroupOrientation } from "../../../hooks";

export type CheckboxGroupRef = DOMRef<HTMLDivElement>;

const _CheckboxGroup = (props: CheckboxGroupProps, ref: CheckboxGroupRef) => {
  const {
    children,
    fieldClassName,
    isDisabled = false,
    optionsLabelPosition = "end",
  } = props;
  const domRef = useDOMRef(ref);
  const state = useCheckboxGroupState(props);
  const { descriptionProps, errorMessageProps, groupProps, labelProps } =
    useCheckboxGroup(props, state);
  const containerRef = useRef<HTMLDivElement>(null);
  const { orientation } = useGroupOrientation(
    {
      orientation: props.orientation,
      optionsLabelPosition: optionsLabelPosition,
    },
    containerRef,
  );

  return (
    <Field
      {...props}
      descriptionProps={descriptionProps}
      errorMessageProps={errorMessageProps}
      fieldType="field-group"
      labelProps={labelProps}
      ref={domRef}
      wrapperClassName={fieldClassName}
    >
      <div
        {...groupProps}
        data-disabled={isDisabled ? "" : undefined}
        data-field-group=""
        data-orientation={orientation}
        ref={containerRef}
      >
        <CheckboxGroupContext.Provider
          value={{
            state,
            isDisabled,
            optionsLabelPosition,
          }}
        >
          {children}
        </CheckboxGroupContext.Provider>
      </div>
    </Field>
  );
};

export const CheckboxGroup = forwardRef(_CheckboxGroup);
