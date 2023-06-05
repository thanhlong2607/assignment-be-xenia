import { SetMetadata } from '@nestjs/common';

import { SPEC_KEY } from '../../constants';
import { EUserType } from 'src/enums';

export const Auth = (specs: EUserType[], permission = false) => SetMetadata(SPEC_KEY, { specs, permission });
