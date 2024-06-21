import { useState } from "react";


// NOTE: state의 값이 정상적으로 변경이 되도록 만들어주세요.
interface StateType {
  bar: {
    count: number
  }
}
export default function UseStateTest() {
  const [state, setState] = useState<StateType>({ bar: { count: 1 } });

  const increment = () => {
    setState(prevState => ({bar: {count: prevState.bar.count + 1}}));
  }

  return (
    <div>
      count: {state.bar.count}
      <button onClick={increment}>증가</button>
    </div>
  );
}
