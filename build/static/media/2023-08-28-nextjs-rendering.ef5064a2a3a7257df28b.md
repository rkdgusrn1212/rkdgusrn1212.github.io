---
title: NextJS의 4가지 Rendering 방식과 그 구현
date: 2023-08-28T11:03:36.388Z
tags:
  - javascript
  - nextjs
  - ssr
  - ssg
slug: nextjs의-4가지-rendering-방식과-그-구현
---

# NextJS의 4가지 Rendering 방식과 그 구현

Next.js는 React 기반의 프레임워크로, 다양한 종류의 렌더링을 지원하며 쉽게 구현할 수 있도록 도와줍니다.

## 1. 4가지 렌더링 방법과 그 구현 방법

1. **Static Generation (정적 생성):**
   정적 생성은 빌드 타임에 페이지의 HTML을 생성하는 방식입니다. 동적 데이터를 포함할 수도 있습니다.

   구현 방법:

   ```jsx
   // pages/about.js
   function AboutPage({ data }) {
     return (
       <div>
         <h1>About Page</h1>
         <p>{data}</p>
       </div>
     );
   }

   export async function getStaticProps() {
     const data = 'This is dynamic data.';
     return {
       props: {
         data,
       },
     };
   }

   export default AboutPage;
   ```

2. **Server-side Rendering (서버 사이드 렌더링):**
   서버 사이드 렌더링은 요청이 들어올 때마다 서버에서 페이지의 HTML을 생성하는 방식입니다. 동적 데이터를 포함할 수 있습니다.

   구현 방법:

   ```jsx
   // pages/blog/[slug].js
   import { useRouter } from 'next/router';

   function BlogPost({ post }) {
     return (
       <div>
         <h1>{post.title}</h1>
         <p>{post.content}</p>
       </div>
     );
   }

   export async function getServerSideProps(context) {
     const { params } = context;
     const res = await fetch(`https://api.example.com/posts/${params.slug}`);
     const post = await res.json();
     return {
       props: {
         post,
       },
     };
   }

   export default BlogPost;
   ```

3. **Client-side Rendering (클라이언트 사이드 렌더링):**
   클라이언트 사이드 렌더링은 초기 HTML은 서버에서 제공하지만, 페이지의 구성 요소들은 JavaScript를 통해 클라이언트 측에서 렌더링되는 방식입니다.

   구현 방법:

   ```jsx
   // pages/products.js
   import { useState, useEffect } from 'react';

   function ProductsPage() {
     const [products, setProducts] = useState([]);

     useEffect(() => {
       // Fetch products data using client-side API calls
       fetch('/api/products')
         .then((response) => response.json())
         .then((data) => setProducts(data));
     }, []);

     return (
       <div>
         <h1>Products</h1>
         <ul>
           {products.map((product) => (
             <li key={product.id}>{product.name}</li>
           ))}
         </ul>
       </div>
     );
   }

   export default ProductsPage;
   ```

4. **Incremental Static Regeneration (증분 정적 생성):**
   증분 정적 생성은 빌드 타임에 정적 페이지를 생성하고, 일정 주기마다 페이지를 다시 생성하여 업데이트하는 방식입니다.

   구현 방법:

   ```jsx
   // pages/blog/[slug].js
   function BlogPost({ post }) {
     return (
       <div>
         <h1>{post.title}</h1>
         <p>{post.content}</p>
       </div>
     );
   }

   export async function getStaticProps(context) {
     const { params } = context;
     const res = await fetch(`https://api.example.com/posts/${params.slug}`);
     const post = await res.json();

     return {
       props: {
         post,
       },
       revalidate: 60, // Re-generate after 60 seconds
     };
   }

   export default BlogPost;
   ```

이렇게 Next.js는 다양한 렌더링 종류를 제공하며 각각의 요구에 맞게 선택하여 사용할 수 있습니다.

## 2. 각 렌더링 방법의 장단점

다음은 Next.js의 4가지 주요 렌더링 방법인 정적 생성(Static Generation), 서버 사이드 렌더링(Server-side Rendering), 클라이언트 사이드 렌더링(Client-Side Rendering), 그리고 증분 정적 생성(Incremental Static Regeneration)의 간단한 장단점을 요약한 것이다.

**정적 생성 (Static Generation):**

- 장점: 초기 로딩 속도가 빠르고 SEO에 좋음. CDN 캐싱 가능.
- 단점: 동적 데이터 처리가 어려울 수 있음.

**서버 사이드 렌더링 (Server-side Rendering):**

- 장점: 동적 데이터 처리가 용이하며, 초기 로딩 속도와 SEO에 좋음.
- 단점: 서버 부하가 있을 수 있고, 초기 로딩 속도가 정적 생성보다 느릴 수 있음.

**클라이언트 사이드 렌더링 (Client-Side Rendering):**

- 장점: 초기 로딩이 빠르고, 복잡한 인터랙션 구현 가능.
- 단점: SEO와 초기 렌더링 속도에 제약이 있을 수 있으며, 검색 엔진 크롤링에 문제가 될 수 있음.

**증분 정적 생성 (Incremental Static Regeneration):**

- 장점: 정적 생성의 이점을 유지하면서 일부 페이지만 주기적으로 업데이트 가능.
- 단점: 정적 생성에 비해 복잡할 수 있고, 주기적 갱신이 필요한 페이지에 적합.

각 방법은 상황과 요구에 따라 선택되며, 성능, SEO, 데이터 업데이트 빈도 등의 요소를 고려하여 결정하는 것이 중요하다.

## 2. 요약 정리

Next.js의 4가지 주요 렌더링 종류와 간단한 구현 방법을 요약하자면 다음과 같다.

1. **정적 생성 (Static Generation):**

   - 빌드 타임에 페이지의 HTML을 생성.
   - `getStaticProps` 함수를 사용하여 데이터를 가져옴.
   - 주로 동적 데이터를 포함할 수 있음.

2. **서버 사이드 렌더링 (Server-Side Rendering):**

   - 요청 시 서버에서 페이지의 HTML을 생성.
   - `getServerSideProps` 함수를 사용하여 데이터를 가져옴.
   - 동적 데이터를 포함 가능.

3. **클라이언트 사이드 렌더링 (Client-Side Rendering):**

   - 초기 HTML은 서버에서 제공.
   - 페이지의 요소들은 클라이언트에서 JavaScript로 렌더링.
   - 주로 동적 로딩에 사용.

4. **증분 정적 생성 (Incremental Static Regeneration):**
   - 빌드 타임에 정적 페이지 생성 후 일정 주기마다 업데이트.
   - `getStaticProps`에서 `revalidate` 값을 설정하여 갱신 주기 설정.
