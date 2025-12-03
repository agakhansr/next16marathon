"use client";
import { Atom, atom, useAtom } from "jotai";
import React from "react";
import { useState } from "react";
  const myAtom: Atom<number> = atom(0);

function TestComponent() {

  const [value, setValue]: [number, (v: number) => void] = useAtom(myAtom);
  return <div>
    <p color="white">Value: {value}</p>
    <button onClick={() => setValue(value + 1)}>Increment</button>
  </div>;
}

export default TestComponent;
