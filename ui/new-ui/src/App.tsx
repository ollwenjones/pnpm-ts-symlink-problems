import  { useState } from 'react';
import { increment } from "@sj-test/server-api/increment";
import { IIncrementArg } from "@sj-test/server-api/IIncrementArg";

function App() {
  const [count, setCount] = useState(0);
  const onIncrement = () => {
    // error here, because symlinks break the absolute imports inside, "by" is not inherited
    const arg: IIncrementArg = {in:count, by: 1}; 
    setCount(increment(arg).out);
  };
  return (
    <div className="App">
      <header className="App-header">
        <i className='App-logo'></i>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {count}
      <button onClick={onIncrement}>Increment</button>
      </header>
    </div>
  );
}

export default App;
