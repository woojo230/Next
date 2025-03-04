# Page Rendering

### 사전 랜더링 방식

1. **SSR(Server-Side Rendering)**
   - 실시간 데이터가 필요한 경우나 복잡한 로직을 처리해야 할 때 유리
2. **SSG(Static Site Generation)**
   - 정적 콘텐츠가 많은 경우나 빠른 로딩 속도가 필요한 경우에 적합
3. **ISR(Incremental Static Regeneration)**
   - SSR 방식과 SSG 방식이 혼합되어 서로의 단점을 보완해 줄 수 있는 강력한 사전 랜더링 방식
   - 웬만하면 ISR 방식으로 사전 랜더링 할 것을 추천, 오늘날에 Next로 만든 웹사이트들은 거의 ISR 방식을 채택
   - 그러나 즉각적인 데이터가 반영되어야 하는 경우에는 유연하게 대처할 수 없다는 문제점.
   - 그렇다고 SSR 방식을 사용한다면 사용자가 많아지는 경우 불필요한 데이터 요청과 서버 과부화가 걸릴 수도 있음
     - 그래서 **On-Demand ISR** 방식을 사용함.
     - 요청을 받을 때 마다 페이지를 다시 생성하는 방식

### Page Rendering 단점

1. 페이지별 레이아웃 설정이 번거로움
2. 데이터 패칭이 페이지 컴포넌트에 집중됨.
   - 상태 관리 도구(redux, tanstackQuery)를 통해 해결 가능하지만 번거롭다는 단점
3. 불필요한 컴포넌트들도 JS Bundle에 포함된다.
   - Interaction 필요하지 않은 컴포넌들까지 JS Bundle에 포함되어 버림
   - 따라서 보다 길어진 JS Bundle을 hydration 하는 시간도 길어진다는 단점.
