import { useState } from "react";

export default function Test() {
  const [states, setStates] = useState<{ [key: string]: string }>({});

  const updateState = (key: string, value: string) => {
    setStates((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <button onClick={() => updateState("item1", "Value 1")}>
        Set Item 1
      </button>
      <button onClick={() => updateState("item2", "Value 2")}>
        Set Item 2
      </button>

      <p>Item 1: {states.item1}</p>
      <p>Item 2: {states.item2}</p>
    </div>
  );
}
