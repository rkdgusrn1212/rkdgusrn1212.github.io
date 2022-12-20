import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '.';
import {
  fetchPostInfoByIdx,
  selectStatus,
  selectData,
} from '../services/postInfoByIdxSlice';

export default function useGetPostInfoByIdx(idx: number) {
  const dispatch = useAppDispatch();
  const status = useSelector((state) => selectStatus(state, idx));
  const categoryInfo = useSelector((state) => selectData(state, idx));
  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchPostInfoByIdx(idx));
    }
  }, [status, dispatch, idx]);

  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return { categoryInfo, isUninitialized, isLoading, isError, isSuccess };
}
