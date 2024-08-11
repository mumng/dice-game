import { useRef, useEffect, useState } from "react";

function FileInput({ name, initialUrl, value, onChange }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(initialUrl);

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview(initialUrl);
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  function handleChange(e) {
    console.log(name, e.target.files[0]);
    onChange(name, e.target.files[0]);
  }

  function handleClearClick() {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    onChange(name, null);
  }

  return (
    <div>
      <img src={preview} alt="이미지 미리보기" />
      <input ref={inputRef} type="file" onChange={handleChange} />
      {value && <button onClick={handleClearClick}> X </button>}
    </div>
  );
}

export default FileInput;
