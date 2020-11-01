import { useState } from 'react';
import demos from './Demo/index';

const App = () => {
  const [index, setIndex] = useState(0);
  const Demo = demos[index].Component;

  return (
    <main
      style={{
        display: 'flex',
        padding: 20,
        minHeight: 'calc(100vh)',
      }}
    >
      <ol
        start={0}
        style={{
          color: 'darkblue',
          marginRight: 100,
          paddingRight: 100,
          borderRight: '1px solid #eee',
          flexShrink: 0,
        }}
      >
        {demos.map(({ description }, idx) => (
          <li
            style={{ cursor: 'pointer', marginBottom: 8 }}
            key={description}
            onClick={() => {
              setIndex(idx);
            }}
          >
            {description}
          </li>
        ))}
      </ol>
      <div style={{ minWidth: 800 }}>
        <Demo />
      </div>
    </main>
  );
};

export default App;
