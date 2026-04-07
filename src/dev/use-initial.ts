import { InitialHookStatus } from '@react-buddy/ide-toolbox';

export const useInitial = (): InitialHookStatus => ({
  loading: false,
  error: false,
});
