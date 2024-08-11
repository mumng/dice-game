function LocaleSelector({ value, onChange }) {
  function handleChange(e) {
    onChange(e.target.value);
  }
  return (
    <select value={value} onChange={handleChange}>
      <option value="ko">한국어</option>
      <option value="en">영어</option>
    </select>
  );
}

export default LocaleSelector;
