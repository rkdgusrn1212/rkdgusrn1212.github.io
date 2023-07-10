---
title: Github Page's Dependencies
date: 2023-07-10T04:14:07.185Z
categories: null
description: Introduction of dependency list provided by Github Page
keywords:
  - github page
slug: github-page-dependencies
---
# Github Page가 제공하는 의존성들

## 1. Github Page가 제공하는 의존성을 왜 알아야하는가

Github Page를 사용할 때, 사용자는 Github Page가 기본적으로 재공하는 Gem 패키지들만 사용해야한다. Github Page의 빌드 서버에 설치된 Gem 패키지 목록을 관리하거나 사용자가 제공한 Gemfile내의 의존성 설치를 위한 Bundle install을 실행할 수 있는 옵션을 제공하지 않는다. 서버 기능, 성능, 용량에 제한을 두기위해서는 어쩔수 없는 조치이기도 하다. 따라서 우리는 Github Page가 제공하는 의존성을 알아야한다.

## 2. Github Page가 제공하는 의존성들

다음 링크에서 확인 가능하다.

> https://pages.github.com/versions/

현재 기준으로 다음과 같은 의존성을 제공한다.

| Dependency | Version |
|---|---|
| jekyll | 3.9.3
| github-pages-health-check | 1.17.9
| github-pages | 228
| html-pipeline | 2.14.3 |
| jekyll-avatar | 0.7.0 |
| jekyll-coffeescript | 1.1.1 |
| jekyll-commonmark-ghpages | 0.4.0 |
| jekyll-default-layout | 0.1.4 |
| jekyll-feed |	0.15.1 |
| jekyll-gist | 1.5.0 |
| jekyll-github-metadata | 2.13.0 |
| jekyll-include-cache | 0.2.1 |
| jekyll-mentions | 1.6.0 |
| jekyll-optional-front-matter | 0.3.2 |
| jekyll-paginate | 1.1.0 |
| jekyll-readme-index | 0.3.0 |
| jekyll-redirect-from | 0.16.0 |
| jekyll-relative-links | 0.6.1 |
| jekyll-remote-theme | 0.4.3 |
| jekyll-sass-converter | 1.5.2 |
| jekyll-seo-tag | 2.8.0 |
| jekyll-sitemap | 1.4.0 |
| jekyll-swiss | 1.0.0 |
| jekyll-theme-architect | 0.2.0 |
| jekyll-theme-cayman | 0.2.0 |
| jekyll-theme-dinky | 0.2.0 |
| jekyll-theme-hacker | 0.2.0 |
| jekyll-theme-leap-day | 0.2.0 |
| jekyll-theme-merlot | 0.2.0 |
| jekyll-theme-midnight | 0.2.0 |
| jekyll-theme-minimal | 0.2.0 |
| jekyll-theme-modernist | 0.2.0 |
| jekyll-theme-primer | 0.6.0 |
| jekyll-theme-slate | 0.2.0 |
| jekyll-theme-tactile | 0.2.0 |
| jekyll-theme-time-machine | 0.2.0 |
| jekyll-titles-from-headings | 0.5.3 |
| jemoji | 0.12.0 |
| kramdown-parser-gfm | 1.1.0 |
| kramdown | 2.3.2 |
| liquid | 4.0.4 |
| minima | 2.5.1 |
| nokogiri | 1.15.2 |
| rouge | 3.26.0 |
| ruby | 2.7.4 |
| safe_yaml | 1.0.5 |
| sass | 3.7.4 |

## 3. Github Page에 플러그인 추가시 주의할 점

### 3.1. Github Page 제공 의존성이 아니거나 다른 버전을 플러그인으로 추가한다면

다음과 같은 경고 로그를 볼 수 있다.

> Warning:  github-pages can't satisfy your Gemfile's dependencies.

**Github Page 제공 의존성 버전과 호환되지 않는 버전**을 플러그인에 추가 해 사용할 때, 별도의 Gemfile을 통해 사용자가 명시한 그 버전으로 빌드되지는 않는다. 최종적으로 사용자 명시 버전은 빌드 시 Warning 로그를 남긴채 무시되며, Github Page가 제공하는 버전을 통해 빌드를 수행한다.

**Github Page 에서 제공하지 않는 의존성**을 플러그인에 추가한다면, 최종적으로 해당 Gem 패키지를 빌드에서 제외한 상태로 Warning 로그를 남긴 채 빌드를 수행한다.

### 3.2. Github Page가 기본으로 플러그인에 추가하는 의존성이 있다

다음 항목들은 Github Page가 기본으로 프로젝트 플러그인에 추가시키는 의존성들이다. _config.yml에 사용자가 직접 플러그인에 추가할 필요가 없다. 또한 **비활성화가 불가능하다**

- jekyll-coffeescript
- jekyll-default-layout
- jekyll-gist
- jekyll-github-metadata
- jekyll-optional-front-matter
- jekyll-paginate
- jekyll-readme-index
- jekyll-titles-from-headings
- jekyll-relative-links

기본적으로 플러그인된 의존성 목록이 Jekyll에 대한 의존성을 재귀적으로 포함하고 있기 때문에 **Jekyll도 기본적으로 포함되게 된다**.

### 3.3. Github Page에서 제공하지 않는 의존성을 추가하고 싶다면

Github Page에 업로드 하기 전에 먼저 로컬에서 지원 되지 않는 의존성들만 플러그인을 사용하여 따로 빌드를 마치고, 빌드 결과물을 일종의 정적 파일로 포함시켜 업로드 하면된다.
