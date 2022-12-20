import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import FrontMatter, { FrontMatterResult } from 'front-matter';
import removeMarkdown from 'markdown-to-text';
import axios, { AxiosResponse } from 'axios';
import PostFiles from 'posts';

export const fetchPostInfoByIdx = createAsyncThunk(
  'postInfo/fetchByIdx',
  async (idx: number, { rejectWithValue }) => {
    const response = await axios<Text>({
      method: 'get',
      url: PostFiles[idx],
      responseType: 'text',
    });
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(response.data);
    }
    const postObj: FrontMatterResult<{
      categories: string | string[] | null | undefined;
    }> = FrontMatter(response.data.textContent);

    const attributes = postObj.attributes;

    //단일 값일땐 길이 1인 배열, null(undefined)인경우 empty array로
    if (!attributes.categories) {
      attributes.categories = [];
    } else if (!Array.isArray(attributes.categories)) {
      attributes.categories = [attributes.categories];
    }
    attributes.categories = attributes.categories.map((cat) =>
      cat.toLowerCase(),
    ); //카테고리 전부 소문자화.
    const data = attributes;

    //listPage.fmArr에 body 할당.
    attributes['body'] = removeMarkdown(postObj.body);

    return data;
  },
);

export const postInfoByIdxSlice = createSlice({
  name: 'postInfo',
  initialState: { data: {}, status: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPostInfoByIdx.pending, (state, action) => {
      state.status[action.meta.arg] = 'pending';
    });
    builder.addCase(fetchPostInfoByIdx.fulfilled, (state, action) => {
      state.status[action.meta.arg] = 'fulfilled';
      state.data[action.meta.arg] = action.payload;
    });
    builder.addCase(fetchPostInfoByIdx.rejected, (state, action) => {
      state.status[action.meta.arg] = 'rejected';
    });
  },
});

export const selectStatus = (state, idx) => state.postInfo.status[idx];
export const selectData = (state, idx) => state.postInfo.data[idx];
