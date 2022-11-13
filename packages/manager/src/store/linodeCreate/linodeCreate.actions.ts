import actionCreatorFactory from 'typescript-fsa';

const actionBase = actionCreatorFactory('@@manager/create-linode');

export type CreateTypes =
  | 'fromApp'
  | 'fromStackScript'
  | 'fromImage'
  | 'fromBackup'
  | 'fromLinode'
  | 'fromYesDone';

export const handleChangeCreateType = actionBase<CreateTypes>('change-type');
