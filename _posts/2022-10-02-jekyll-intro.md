---
layout: post
title:  "Jekyll 정적 사이트 생성기"
date:   2022-10-02 14:44:00 +0900
categories: jekyll
---
# Jekyll 이란?
**Jekyll** *(지킬)*은 **Ruby**언어로 작성된 정적 사이트 생성기이다. **Jekyll**은 특히 **Github**의 정적 웹 호스팅 서비스인 **Github Pages**에서 유용한데, **Github Pages**에는 **Jekyll**이 내장되어 있어서, **Jekyll**을 활용하면 **Github Pages**에서의 사이트 구축과 포스팅이 훨신 빠르고 간편해진다.

# Jekyll의 특징
- DB를 안쓴다. 댓글을 달수가 없고 모든 게시글 및 각 경로의 페이지가 모두 완성된 HTML파일로 서버에 저장된 정적 사이트를 생성한다.
- Markdown + Liquid문법을 통해 콘텐츠 위주의 빠른 게시글 작성을 마치고 빌드를 하면 알아서 사이트의 Header, Footer 등이 추가된 HTML/CSS파일로 생성해준다.
- 게시글을 작성할때 레이아웃을 고려할 필요가 없다. 빌드시에 설정된 레이아웃으로 HTML/CSS파일을 생성하고 옵션으로 여러가지 기본 레이아웃들을 제공하고 커스터마이징이 가능하다.

# Jekyll의 작동 원리
1. **Jekyll** 프로젝트를 생성한다. **Jekyll**은 **Ruby Gem**으로 **Ruby** 환경에서 설치가 가능하다.
1. **YAML**으로 작성된 프로젝트 설정파일에서 사이트의 기본 메타 데이터와 레이아웃 같은 사이트 구성 정보들을 설정한다.
2. 사이트에 올릴 게시글의 콘텐츠를 DB에서 로드하지 않고 각 게시글마다 하나의 Markdown파일로 작성해준다. 동적으로 로드할 콘텐츠가 있다면 Liquid 템플릿 문법을 Markdown과 함께 사용한다.
3. 작성한 게시글 Markdown문서는 **Jekyll** 프로젝트 빌드를 통해 빌드 경로에 **YAML** 설정값과 작성한 게시글 **Markdown**들을 참고하여 HTML/CSS파일들을 생성하게 된다.
