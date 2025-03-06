# App Routing

### 클라이언트 컴포넌트와 서버 컴포넌트의 이해

1. React Server Component
   - 일반적인 컴포넌트들과 달리 서버측에서 딱 한번 실행되는 컴포넌트(Interaction 필요 X)
2. React Client Component
   - 일반적인 컴포넌트, 즉 상호작용(Interaction)이 지속적으로 발생하는 컴포넌트

### Interaction

1. 상호작용
   - 어렵게 생각할 것 없이 입력이나, 클릭같이 이벤트를 처리할 그러한 상호작용이라고 생각

### 사전 랜더링 과정

1. Next 서버가 브라우저로부터 접속요청을 받아서 사전랜더링을 하는 과정에서는 server&client 컴포넌트 모두 실행됨
2. 이후 hydration을 위해 컴포넌트들을 모아 JS Bundle로 전달하는 과정에서는 server 컴포넌트들은 제외됨
3. 따라서 client 컴포넌트들만 JS Bundle에 포함되어 브라우저에 전달되기 때문에, client 컴포넌트들만 client측(브라우저)에서 한번 더 실행됨.

### 초기 접속 이후 요청되는 페이지 이동

1. 기본적으로 CSR방식으로 처리, 그렇다면 브라우저가 이동할 페이지에 대한 데이터가 필요
   - 따라서 JS Bundle + RSC Payload를 함께 전달해주게 됨.
     - JS Bundle: Client Component 만 들어있음
     - RSC Paayload: Server Component 만 들어있음
2. 마지막으로 브라우저에서는 JS Bundle과 RSC Payload 를 합쳐서 페이지를 적절히 교체하게됨

### 정리

1. 서버 컴포넌트
   - 서버측에서 사전 랜더링 진행 시 딱 한번만 실행됨.
2. 클라이언트 컴포넌트
   - 사전 랜더링 진행 시 한 번, hydration 진행 시 한 번 총 2번 실행됨
3. 따라서 Next에서는 페이지의 대부분을 서버 컴포넌트로 구성할 것을 권장.
   - 클라이언트 컴포넌트는 꼭 필요할 경우에만 사용할 것을 권장.

### 주의사항

1. 서버 컴포넌트에서는 브라우저에서 사용하는 문법 사용 불가
   - ex: React hooks (useEffect, useState...)
   - 라이브러리 사용시, 만약 브라우저에서 실행되는 기능을 담고 있는 라이브러리라면 사용 불가함
2. 클라이언트 문법을 사용하려면 컴포넌트 파일의 가장 첫 줄에 'use client'을 명시하여 클라이언트 컴포넌트로 지정해야 함
3. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않음. (처음에 서버에서 한번 실행됨)
4. 클라이언트 컴포넌트에서 서버 컴포넌트 import 불가
   - 그러나 클라이언트 컴포넌트가 반드시 서버 컴포넌트를 자식으로 가져야 한다면 가능은 함.
   - Client Component :
     ```tsx
     function ClientComponent({ children }: { children: ReactNode }) {
       return <div>{children}</div>;
     }
     ```
   - Home :
     ```tsx
     funtion Home() {
        return (
           <ClientComponent>
            <ServerComponent>
           <ClientComponent>
        )}
     ```
5. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화(RSC payload) 되지 않는 props는 전달 불가
   - 직렬화 : 객체, 배열, 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 아주 단순한 형태(byte,문자열)로 변환하는 것
   - ex: `const person = {name: '카리나', age: 27} -> {'name':'카리나', 'age':27}`
   - 참고로 JS 함수는 직렬화 불가능함

### Query string 가져오기

1. 기존 Page router 방식 :

   - useRouter 매서드 사용

   ```tsx
   const router = useRouter();
   const q = router.query.q;
   ```

2. App router 방식 :
   - useSearchParams 매서드 사용
   ```tsx
   const searchParams = useSearchParams();
   const q = searchParams.get('q');
   ```
