import React, {PropsWithChildren} from 'react';
import type { ComponentProps } from './Component.types';
import {Root} from './Component.ui'

function Component(props: PropsWithChildren<ComponentProps>) {
    return (
        <Root></Root>
    );
}

export default Component;
