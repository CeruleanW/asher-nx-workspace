// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react';
// @ts-expect-error -- Storybook is not installed; this story file is orphan code preserved as-is per migration spec.
import { storiesOf } from '@storybook/react';
// @ts-expect-error -- 'components' is not a valid module path; preserved as-is per migration spec.
import { HomePage } from 'components';

storiesOf('HomePage', module).add('default', () => <HomePage />);
