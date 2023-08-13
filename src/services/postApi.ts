import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import FrontMatter from 'front-matter';
import removeMarkdown from 'markdown-to-text';
import PostFiles from 'assets/posts';
import fetch from 'cross-fetch';

export const postTotal = PostFiles.length;

export interface PostInfo {
  layout: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface Post {
  layout: string;
  title: string;
  date: string;
  body: string;
  tags: string[];
}

const postApi = createApi({
  baseQuery: fetchBaseQuery({ fetchFn: fetch }),
  reducerPath: 'postApi',
  endpoints: (builder) => ({
    readPostInfo: builder.query<PostInfo, number>({
      query: (data) => ({
        method: 'GET',
        responseHandler: 'text',
        url: PostFiles[data],
      }),
      transformResponse: (response: string) => {
        const frontMatterResult = FrontMatter<{
          layout: string;
          title: string;
          date: Date;
          tags: string[];
        }>(response);

        const date = frontMatterResult.attributes.date.toISOString();

        let tags = frontMatterResult.attributes.tags;

        //단일 값일땐 길이 1인 배열, null(undefined)인경우 empty array로
        if (!tags) {
          tags = [];
        } else if (!Array.isArray(tags)) {
          tags = [tags];
        }
        tags = tags.map((cat) => cat.toLowerCase()); //카테고리 전부 소문자화.

        return {
          ...frontMatterResult.attributes,
          date,
          tags,
          summary: removeMarkdown(frontMatterResult.body),
        };
      },
    }),
    readPost: builder.query<Post, number>({
      query: (data) => ({
        method: 'GET',
        responseHandler: 'text',
        url: PostFiles[data],
      }),
      transformResponse: (response: string) => {
        const frontMatterResult = FrontMatter<{
          layout: string;
          title: string;
          date: Date;
          tags: string[];
        }>(response);

        const date = frontMatterResult.attributes.date.toISOString();

        let tags = frontMatterResult.attributes.tags;

        //단일 값일땐 길이 1인 배열, null(undefined)인경우 empty array로
        if (!tags) {
          tags = [];
        } else if (!Array.isArray(tags)) {
          tags = [tags];
        }
        tags = tags.map((cat) => cat.toLowerCase()); //카테고리 전부 소문자화.

        return {
          ...frontMatterResult.attributes,
          date,
          tags,
          body: frontMatterResult.body,
        };
      },
    }),
  }),
});
export default postApi;
export const {
  useLazyReadPostInfoQuery,
  useReadPostInfoQuery,
  useReadPostQuery,
  useLazyReadPostQuery,
} = postApi;
