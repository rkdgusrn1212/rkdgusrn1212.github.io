avoidjekyllparse---
title: Node.js 웹 서버가 JAVA 웹 서버보다 성능이 뛰어날까?
description: Node.js 웹 서버가 JAVA 웹 서버보다 성능이 뛰어나다는 소문에 대한 진실.
slug: node-js-웹 서버가-java-웹 서버보다-성능이-뛰어날까
date: 2023-07-14T04:15:55.011Z
tags:
  - node.js
  - libuv
---

# Node.js 웹 서버가 JAVA 웹 서버보다 성능이 뛰어날까?

<br/>

Node.js 웹 서버가 JAVA 웹 서버보다 성능이 뛰어나다는 소문에 대한 진실을 파해쳐겠다. 이 글에서는
해당 소문을 재시하는 다양한 사람들의 근거와 진실 여부를 파악하여 결론을 도출하겠다.

<br/>
<br/>

## 1. 많은 사람들이 그 이유를 제대로 설명하지 못한다.

<br/>

아래는 여러 블로그 글들을 읽어보고 가장 많이 사람들이 근거로 드는 내용을 정리 한 것이다.

> Node.js는 싱글 쓰레드 기반의 논블로킹 방식의 I/O를 사용하고, 멀티 쓰레드와 블로킹 방식 I/O를 사용하는 자바 웹 서버보다 빠르다. 왜냐하면 멀티 쓰레드 방식은 컨텍스트 스위치 오버헤드가 있기 때문이다???

<br/>

정말 어이없다. 이는 더 성능이 빠른 이유가 될수 없고, 그나마 싱글 쓰레드 기반인 Node.js가 멀티 쓰레드 기반인 자바 웹 서버 처럼 여러 요청에 대한 동시적인 처리를 할 수 있는 이유가 될 뿐, 이 사실 자체로는 더 나은 성능을 나타내는 이유가 될 수는 없다. 생각해보라, 논블로킹 방식의 I/O를 지원하는 것도 결국 Node.js가 내부적으로 멀티 쓰레드를 구현하고 있다라는 의미 밖에 안되고, 이도 마찬가지로 자체적인 컨텍스트스위칭이 필요할 것이다. 즉, 단순히 **논블로킹 싱글 쓰레드라서 블로킹 멀티 쓰레드보다 빠르다는건** 논리적으로 **근거가 빈약하다**

<br/>
<br/>
 
## 2. 내가 여러 기술 스펙들을 읽어보고 정리해 보았다

<br/>
개인적인 주장이니 어디가서 정답인양 말하지 말라.

<br/>

### 2.1. NodeJS가 비동기 I/O 시스템 콜의 활용성이 더 좋다.

<br/>

본래 태초에 OS가 등장 했을 때는 I/O 시스템 콜<sup>[1]</sup>은 동기 요청 방식만 제공하였었다. 프로그램은 I/O요청에 대한 비동기적인 처리를 위해 별도의 쓰래드를 생성하는 것이 일반적이 었다. 그리고 이러한 비동기 방식의 사용자 I/O 요청이 보편화 되자 이를 표준화한 **POSIX 1.b의 AIO**도 등장하여 이를 따르는 많은 OS들에서 더욱 쉽게 비동기 I/O 요청을 사용할 수 있게 되었다. 물론 오직 API 규격으로써 당시에 그 내부적인 구현이 있지도 않은 비동기 I/O 시스템 콜을 이용한다는 말은 아니다.

> 태초의 OS는 동기 방식의 I/O 시스템 콜만을 지원. 사용자 레벨의 쓰레드와 동기 I/O 시스템 콜을 활용하여 사용자 레벨의 비동기 I/O를 구현.

<small>[1] 여기서 말하는 시스템 콜은 POSIX 시스템 콜이 아니다.(_시스템 콜에 대한 POSIX 규격 인터페이스를 POSIX 시스템 콜이라고 부르기도 한다_)</small>

<br/>

그러나 얼마전부터 자체적으로 비동기 I/O 시스템 콜을 지원해 주는 OS들이 등장하기 시작했다. 대표적으로 linux AIO(_kernel ver 2.6부터 표준_)을 들수가 있다. 이들은 모두 커널 레벨의 비동기 I/O 요청을 구현함으로서 커널에서 내부적으로 비동기 처리에 쓰일 쓰레드를 생성 관리하기 때문에 성능이 아주 우수하다. 물론 그 구현과 지원 여부는 OS마다 다른데, **Node.js는 구동 OS의 지원 여부에 따라 이러한 커널 수준의 비동기 I/O를 사용**한다. 그렇다면, JAVA는 커널 수준의 비동기 I/O를 사용하지 않는가? 아니다. JAVA도 OS 커널의 비동기 I/O 시스템 콜을 사용하는 java.nio 가 마련되어 있다. JAVA 1.4 때 등장해서 웹 서버에 사용되기 시작했는데, Tomcat에서는 NIO Connector를 통해 소켓 연결할 때 사용한다. NIO Connector 같은 경우 Tomcat 6.0때 등장해서 8.0부터는 개선된 java.nio2를 사용하는 기본 Connector가 되었으니, Tomcat 8.0부터 본격적으로 커널 레벨의 비동기 I/O를 사용하기 시작했다고 할 수 있다. 이후 9.0부터는 블로킹(동기)방식의 BIO Connector는 아예 사라졌다고 한다. 톰켓 8.0 나온 시점보다 한참 전인 2009년에 Node.js가 나왔으니, 적어도 그 기간 동안에는 Node.js의 비동기 I/O 성능이 압도적이었다고 할 수 있다.

> 각종 OS에 비동기 I/O 시스템 콜의 등장하고 이를 활용하는 Node.js가 등장했다. 이는 비동기 I/O에 있어서 기존의 동기방식 I/O 시스템 콜과 멀티 쓰레드를 활용하는 자바 웹 서버보다 성능이 뛰어났다.

<br/>

### 2.2. Node.js 웹 서버는 보다 I/O 집약적인 Thread Pool을 가진다

<br/>

Tomcat 8.0이후 시점으로 봤을 때도, 여전히 Node.js의 비동기 I/O속도가 빠른가? 라는 의문이 생기는데, 이 부분에서도 Yes라고 할 수 있다. 우선 Node.js에서는 기본적으로 **Network I/O를 이벤트 루프에서 Polling 메커니즘<sup>[1]</sup>을 통해 처리**한다.<sup>[2]</sup> Node.js는 Polling을 통한 Single Thread Non-Blocking Network I/O 방식을 OS와 무관하게 제공한다. 이를 위해 Node.js가 각 OS에서 사용하는 기술들은 다음과 같다.

- linux : epoll
- OSX, BSDs : kqueue
- SunOS, windows : event ports

\* 자세한 내용은 [libuv 공식 홈페이지](https://docs.libuv.org/en/v1.x/design.html#the-i-o-loop)에서 확인할 수 있다.

Network I/O를 제외하고도 프로그램이 정상적으로 구동되기 위해 반드시 비동기로 처리해야할 것들은 크게 2종류가 있다. Network를 제외한 I/O-Intensive 작업과 CPU-Intensive 작업들이다. 이 둘은 긴 처리시간으로 프로그램의 흐름을 막을 것이다. Node.js는 OS에서 제공하는 비동기 시스템 콜을 우선적으로 활용하면서 제공되지 않는 요청에 대해서는 자체적인 Thread Pool인 Worker Pool에 작업을 할당해 처리한다. 그런데 여기서 중요한 점은, Node.js는 오로지 웹 서버의 수행에 필수적인 작업에 한해 Worker Pool에 할당된 API를 제공한다는 점이다. 따라서, CPU-Intensive 작업들은 극히 일부의 필수 항목만이 기본적으로 Worker Pool에 할당되어진다.<sup>[3]</sup> 다음은 대부분의 경우 Worker List에서 수행되어지는 작업 목록이다.

- I/O-Intensive
  1. DNS: dns.lookup(), dns.lookupService().
  2. File System: fs.FSWatcher()와 libuv의 스레드 풀을 명백하게 동기적으로 사용하는 경우를 제외한 모든 파일 시스템 API.<sup>[4]</sup>
- CPU-Intensive
  1. Crypto: crypto.pbkdf2(), crypto.scrypt(), crypto.randomBytes(), crypto.randomFill(), crypto.generateKeyPair().
  2. Zlib: libuv의 스레드 풀을 명백하게 동기적으로 사용하는 경우를 제외한 모든 zlib API.

\* 자세한 내용은 [Node.js Doc](https://nodejs.org/ko/docs/guides/dont-block-the-event-loop)를 참조.

따라서, **Node.js는 Thread Pool의 상당부분을 비동기 시스템 콜 미지원 I/O-Intensive 작업의 처리에 사용**한다는 점이다. 이는 기본적으로 각 Connection에 대해 Thread를 생성하고 사용자 코드를 포함한 모든 CPU-Intensive를 각 Thread에서 처리하는 대부분의 JAVA 웹 서버에 비해 I/O-Intensive 작업의 응답속도가 빨라질 수 밖에 없다. Node.js는 사용자 코드가 야기하는 CPU-Intensive 작업의 스케줄링을 포기하고 대신 I/O-Intensive 작업의 추가적인 할당을 선택했기 때문이다. Worker Pool 또는 커널을 통해 수행될 수 없는 작업은 모두 이벤트 루프에서 수행되기 때문에 **이벤트 루프를 사용자가 작성한 CPU-Intensive한 코드로 막지 말아야 한다**.<sup>[5]</sup> 복잡한 연산이 요구되는 사용자 코드의 작성은 Node.js의 설계 방향성과 맞지 않기에 그 장점을 살리지 못한다.

> Node.js는 I/O 특화 Thread Pool을 가진다, Thread Pool 자원은 일부 필수 CPU-Intensive 작업을 제외하고 모두 I/O-Intensive 작업에게 할당되어진다. 정리하자면, 필수가 아닌 CPU-Inensive 작업들의 평균 응답속도를 포기해서 I/O-Intensive 작업의 평균 응답속도를 높혔다.

<br/>

<small>[1] Polling은 Socket이나 Pipe에서 사용될 수 있는 다중 입출력 방식으로, 여러 FD들을 모니터링하다가 특정 FD에 읽기/쓰기가 가능한 상태가 되었을 때 데이터가 해당 FD에 읽고 쓰는 방식으로, 예를 들어 읽을 데이터가 없는 FD에 대한 Blocking이나 현재 쓸수 없는 상태인 fd에 대한 Blocking을 발생시지 않기 때문에 다중 네트워크 입력을 Single Thread Non-blocking I/O 방식으로 처리할 수 있게 한다.</small><br/>
<small>[2] 이벤트 루프를 I/O 루프라고도 부른다.</small><br/>
<small>[3] 사용자 코드에서 API에서 제공하지 않는 자신만의 I/O-Intensive 요청을 작성할 일이 없지만, CPU-Intensive 코드는 비즈니스 로직에 따라, 기타 사용자 의도에 따라 그 종류가 무한하므로 사용자가 사용할 수 있는 모든 CPU-Intensive를 API로 제공하기는 것은 불가능 하다.</small><br/>
<small>
[4] 사실 여기서 더 자세히 들어가면, 커널 레벨의 비동기 시스템 콜이 없다고 해서 무조건 Worker Pool로 관리 되는 것도 아니다. OS 편차에 따라 다음과 같은 API를 사용한다고 한다.

- linux AIO (supported in kernel)
- posix AIO (supported by linux, BSD, Mac OS X, solaris, AIX, et)
- Windows'overlapped I/O

</small>
<small>[5] <a href="https://nodejs.org/ko/docs/guides/dont-block-the-event-loop#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EB%A5%BC-%EB%A7%89%EC%A7%80%EB%A7%88%EC%84%B8%EC%9A%94">Node.js공식 문서</a>에서는 이벤트 루프에 수행될 이벤트 콜백에 시간 복잡도가 높은 연산을 포함시켜 서버 전체의 평균 응답시간으로 늘리는 것을 <i>"막는다"</i>라고 표현했다.</small>
