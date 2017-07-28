import { IS_FETCHING } from '../types';

export default function setIsFetchingState(isFetching) {
  return {
    type: IS_FETCHING,
    isFetching,
  };
}
