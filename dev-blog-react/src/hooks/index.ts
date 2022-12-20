import useGetPostInfo from './useGetPostInfo';
import { useDispatch } from 'react-redux';

const useAppDispatch = () => useDispatch();

export { useGetPostInfo, useAppDispatch };
