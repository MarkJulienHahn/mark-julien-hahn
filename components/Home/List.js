const List = ({
  items,
  onMouseEnter,
  onMouseLeave,
  focusItems,
  focusType,
  setProjOnly,
  setFocus
}) => (
  <ul className={focusType}>
    {items.map((entry, i) => (
      <li
        onMouseEnter={() => onMouseEnter(entry)}
        onMouseLeave={() => onMouseLeave(entry)}
        onClick={() => {
          setProjOnly(false);
        }}
        style={{
          opacity: focusItems.some((obj) => obj?.title === entry.title)
            ? 1
            : 0.2,
        }}
        key={i}
      >
        {entry.title}
      </li>
    ))}
  </ul>
);

export default List;
