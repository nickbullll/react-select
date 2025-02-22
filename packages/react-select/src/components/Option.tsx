/** @jsx jsx */
import { ReactNode, RefCallback } from 'react';
import { jsx } from '@emotion/react';

import {
  CommonPropsAndClassName,
  CSSObjectWithLabel,
  GroupBase,
} from '../types';
import { getStyleProps } from '../utils';

export interface OptionProps<
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends CommonPropsAndClassName<Option, IsMulti, Group> {
  /** The children to be rendered. */
  children: ReactNode;
  /** Inner ref to DOM Node */
  innerRef: RefCallback<HTMLDivElement>;
  /** props passed to the wrapping element for the group. */
  innerProps: JSX.IntrinsicElements['div'];
  /** Text to be displayed representing the option. */
  label: string;
  /** Type is used by the menu to determine whether this is an option or a group.
    In the case of option this is always `option`. **/
  type: 'option';
  /** The data of the selected option. */
  data: Option;
  /** Whether the option is disabled. */
  isDisabled: boolean;
  /** Whether the option is focused. */
  isFocused: boolean;
  /** Whether the option is selected. */
  isSelected: boolean;
}

export const optionCSS = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  {
    isDisabled,
    isFocused,
    isSelected,
    theme: { spacing, colors },
  }: OptionProps<Option, IsMulti, Group>,
  unstyled: boolean
): CSSObjectWithLabel => ({
  label: 'option',
  cursor: 'default',
  display: 'block',
  fontSize: 'inherit',
  width: '100%',
  userSelect: 'none',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  ...(unstyled
    ? {}
    : {
        backgroundColor: isSelected
          ? colors.primary
          : isFocused
          ? colors.primary25
          : 'transparent',
        color: isDisabled
          ? colors.neutral20
          : isSelected
          ? colors.neutral0
          : 'inherit',
        padding: `${spacing.baseUnit * 2}px ${spacing.baseUnit * 3}px`,
        // provide some affordance on touch devices
        ':active': {
          backgroundColor: !isDisabled
            ? isSelected
              ? colors.primary
              : colors.primary50
            : undefined,
        },
      }),
});

const Option = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(
  props: OptionProps<Option, IsMulti, Group>
) => {
  const { children, isDisabled, isFocused, isSelected, innerRef, innerProps, htmlTag = 'div' } =
    props;

    const Tag = htmlTag;

  return (
    <Tag
      {...getStyleProps(props, 'option', {
        option: true,
        'option--is-disabled': isDisabled,
        'option--is-focused': isFocused,
        'option--is-selected': isSelected,
      })}
      ref={innerRef}
      aria-disabled={isDisabled}
      {...innerProps}
    >
      {children}
    </Tag>
  );
};

export default Option;
