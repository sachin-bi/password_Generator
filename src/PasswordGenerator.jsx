import { useState, useCallback, useEffect, useRef } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //New hook -- useRef(default_value)
  const passwordRef = useRef(null); //for effect on pass copied

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); //for effect on pass copied
    passwordRef.current?.setSelectionRange(0, 5); //for effect on pass copied

    window.navigator.clipboard.writeText(password); //real Job for coping
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) str += "!@#$^&*()_+-=[]{}':,./<>?";
    if (numberAllowed) str += "0123456789";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  //if password is given in dependencies it'll loop

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <div className="border w-full max-w-md mx-auto shadow-md rounded-lg px-4  my-8 text-orange-500 bg-gray-700 ">
      <h1 className="text-white text-center my-3">Password Generator!</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className=" outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 px-3 text-white py-1 shrink-0"
        >
          Copy
        </button>
      </div>
      <div className="flex justify-evenly text-sm gap-x-2 my-5">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="cursor-pointer"
            name="lengthBar"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor="lengthBar"> Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            name="numberInput"
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput"> Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            name="charInput"
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput"> Characters</label>
        </div>
      </div>
    </div>
  );
}
