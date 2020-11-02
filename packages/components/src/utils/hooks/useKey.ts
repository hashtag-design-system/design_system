// // * https://github.com/arthurtyukayev/use-keyboard-shortcut/blob/master/useKeyboardShortcut.js

import { useEffect, useRef } from "react";

// import { useCallback, useEffect, useReducer } from "react";

// const blacklistedTargets = ["INPUT", "TEXTAREA"];

// const keysReducer = (
//   state: Record<string | number | symbol, unknown>,
//   action: {
//     type: string;
//     key: string;
//   }
// ) => {
//   switch (action.type) {
//     case "set-key-down":
//       return { ...state, [action.key]: true };
//     case "set-key-up":
//       return { ...state, [action.key]: false };
//     default:
//       return state;
//   }
// };

// const useKey = (shortcutKeys: any[], callback: (...args: any[]) => any): void =>  {
//   if (!Array.isArray(shortcutKeys))
//     throw new Error(
//       "The first parameter to `useKeyboardShortcut` must be an ordered array of `KeyboardEvent.key` strings."
//     );

//   if (!shortcutKeys.length)
//     throw new Error(
//       "The first parameter to `useKeyboardShortcut` must contain at least one `KeyboardEvent.key` string."
//     );

//   if (!callback || typeof callback !== "function")
//     throw new Error(
//       "The second parameter to `useKeyboardShortcut` must be a function that will be invoked when the keys are pressed."
//     );

//   const initialKeyMapping = shortcutKeys.reduce((currentKeys, key) => {
//     currentKeys[key.toLowerCase()] = false;
//     return currentKeys;
//   }, {});
//   const [keys, setKeys] = useReducer(keysReducer, initialKeyMapping);

//   const keydownListener = useCallback(
//     keydownEvent => {
//       const { key, target, repeat } = keydownEvent;
//       const loweredKey = key.toLowerCase();

//       if (repeat) return;
//       if (blacklistedTargets.includes(target.tagName)) return;
//       if (keys[loweredKey] === undefined) return;

//       if (keys[loweredKey] === false)
//         setKeys({ type: "set-key-down", key: loweredKey });
//     },
//     [keys]
//   );

//   const keyupListener = useCallback(
//     keyupEvent => {
//       const { key, target } = keyupEvent;
//       const loweredKey = key.toLowerCase();

//       if (blacklistedTargets.includes(target.tagName)) return;
//       if (keys[loweredKey] === undefined) return;

//       if (keys[loweredKey] === true)
//         setKeys({ type: "set-key-up", key: loweredKey });
//     },
//     [keys]
//   );

//   useEffect(() => {
//     if (!Object.values(keys).filter(value => !value).length) callback(keys);
//   }, [callback, keys]);

//   useEffect(() => {
//     window.addEventListener("keydown", keydownListener, true);
//     return () => window.removeEventListener("keydown", keydownListener, true);
//   }, [keydownListener]);

//   useEffect(() => {
//     window.addEventListener("keyup", keyupListener, true);
//     return () => window.removeEventListener("keyup", keyupListener, true);
//   }, [keyupListener]);

// }

// export default useKey;

const useKey = (key: string, cb: (event: any) => any) => {
  const callbackRef = useRef(cb);

  useEffect(() => {
    callbackRef.current = cb;
  });

  useEffect(() => {
    function handle(e: any) {
      if (e.code === key) {
        callbackRef.current(e);
      }
    }

    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
};

export default useKey;
