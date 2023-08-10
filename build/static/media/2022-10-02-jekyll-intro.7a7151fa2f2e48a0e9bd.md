avoidjekyllparse---
title: Jekyll 정적 사이트 생성기
date: 2022-10-02T05:44:00.000Z
tags: jekyll
---

# Jekyll 이란?

_Jekyll_ *(지킬)*은 *Ruby*언어로 작성된 정적 사이트 생성기이다. *Jekyll*은 특히 *Github*의 정적 웹 호스팅 서비스인 *Github Pages*에서 유용한데, *Github Pages*에는 *Jekyll*이 내장되어 있어서, *Jekyll*을 활용하면 *Github Pages*에서의 사이트 구축과 포스팅이 훨신 빠르고 간편해진다.

# Jekyll의 특징

- DB를 안쓴다. 따라서 댓글 기능이 없다. 또한 모든 페이지가 HTML파일로 서버에 존재한다.
  > 프로젝트 폴더의 _\_posts_ 폴더에 각 게시글을 나타내는 Markdown 문서를 유지한다. 각 Markdown 문서는 빌드 후 웹 서버 루트 디렉토리인 _\_site_ 의 하위 경로에 페이지를 구성하는 모든 레이아웃 요소가 적용된 하나의 완성된 _HTML_ 문서로 저장된다.
- *Liquid*문법을 통해 컨텐츠의 동적 로드를 구현
  > 게시글에 미리 Markdown으로 작성할 수 없는 동적인 콘텐츠를 추가하려고 한다면 Markdown문서에 Liquid 템플릿 언어를 사용하여 서버 런타임에 동적인 콘텐츠를 로드하도록 할 수 있다. Liquid로 작성한 구문은 빌드 시 동적으로 HTML을 변경하는 스크립트를 생성한다.
- 테스트용 웹 서버 기능 제공.
  > Jekyll serve \-\-host SERVER*IP(default는 127.0.0.1) \-\-port SERVER_PORT (default는 4000) 를 하면 프로젝트를 빌드하면 생성되는 *\_site\_ 디렉토리를 루트 디렉토리로 하는 정적 웹 서버를 구동시킨다. 그러나 언제까지나 테스트용 서버라는 것을 명심해야 한다. 다른 ip에서 접근하기 위해선 server_ip를 루프백이 아닌 외부에서 접근 가능한 ip로 설정해주고, 포트 방화벽을 해제 시켜줘야한다.

# Jekyll의 작동 원리

1. **Jekyll** 프로젝트를 생성한다. **Jekyll**은 **Ruby Gem**으로 **Ruby** 환경에서 설치가 가능하다.
1. **YAML**으로 작성된 프로젝트 설정파일에서 사이트의 기본 메타 데이터와 레이아웃 같은 사이트 구성 정보들을 설정한다.
1. 사이트에 올릴 게시글의 콘텐츠를 DB에서 로드하지 않고 각 게시글마다 하나의 Markdown파일로 작성해준다. 동적으로 로드할 콘텐츠가 있다면 Liquid 템플릿 문법을 Markdown과 함께 사용한다.
1. 작성한 게시글 Markdown문서는 **Jekyll** 프로젝트 빌드를 통해 빌드 경로에 **YAML** 설정값과 작성한 게시글 **Markdown**들을 참고하여 HTML/CSS파일들을 생성하게 된다.
