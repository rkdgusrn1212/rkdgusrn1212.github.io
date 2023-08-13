- prettier 3 버전에서 printWidth를 통한 wrap 이 되지 않는 버그가 있음. 따라서 2.8.8버전을 사용함
- 2.8.8 버전에서는 eslint-plugin-prettier@>5버전과 호환이 되지않아 4.2.1버전을 사용함.
- react-snap은 include된 파일을 기준으로 href 링크를 따라 크롤링됨. 따라서 a또는 Link를 사용하는게 좋으나. 해시주소가 아닌 Brouser router환경에서 필연적인 페이지 리프레시를 href를 쓰면서 막으려면 Link를 써야되기 때문에 Link를 써야함

## react-snap의 200.html과 404.html

react-snap은 pre rendered hydrate를 지원하기 위해 200과 404.html 파일을 빌드 파일에 생성한다.

- 200.html은 아무런 역할을 하지 않는다. get 요청에서는 해당 경로의 리소스가 있어야 200 request가 뜨는데 이 경우 해당 리소스가 응답되어지게 되고, 경로에 리소스가 없다면 404 request와 함께 404.html이 반환될것이기 때문에 적어도 200.html이 get요청에서 응답되어 질 일은 없을 것이다.
- 404.html은 static 서버 환경에서의 브라우저 라우터에서 필수 적이다. 404.html을 통해 html 파일이 존재하지 않는 경로에 대한 페이지 요청도 404.html에 연동될 리엑트 라우터를 통해 처리할 수 있게 되기 때문이다. 404.html이 없다면 해당 경로는 아예 github 자체 404와 함께 접근 불가 될것이다.
- react-snap의 pre-rendered html 파일은 UI 불일치 애러 메시지를 유발해서 그냥 hydrate를 통한 페이지 렌더링은 포기하고 render로 처음부터 랜더링하게 하였다. 허나, 여전히 js가 구동되기전 bot은 pre-rendered된 html파일을 볼것이다.
