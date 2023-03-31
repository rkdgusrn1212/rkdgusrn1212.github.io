import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import FrontMatter, { FrontMatterResult } from 'front-matter';
import removeMarkdown from 'markdown-to-text';
import PostFiles from 'posts';

export const postTotal = PostFiles.length;

export interface Post {
  layout: string;
  title: string;
  date: string;
  body: string;
  categories: string[];
}

const postApi = createApi({
  baseQuery: fetchBaseQuery(),
  reducerPath: 'postApi',
  endpoints: (builder) => ({
    readPost: builder.query<Post, number>({
      query: (data) => ({
        method: 'GET',
        responseHandler: 'text',
        url: PostFiles[data],
      }),
      transformResponse: (response: string) => {
        response = response.substring(16);
        const frontMatterResult: FrontMatterResult<{
          layout: string;
          title: string;
          date: string;
          categories: string[];
        }> = FrontMatter(response);

        let categories = frontMatterResult.attributes.categories;

        //단일 값일땐 길이 1인 배열, null(undefined)인경우 empty array로
        if (!categories) {
          categories = [];
        } else if (!Array.isArray(categories)) {
          categories = [categories];
        }
        categories = categories.map((cat) => cat.toLowerCase()); //카테고리 전부 소문자화.

        return {
          ...frontMatterResult.attributes,
          categories,
          body: removeMarkdown(frontMatterResult.body),
        };
      },
    }),
  }),
});
export default postApi;
export const { useLazyReadPostQuery, useReadPostQuery } = postApi;
