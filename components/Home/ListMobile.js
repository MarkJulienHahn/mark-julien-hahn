const ListMobile = ({
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
        onClick={() => {
          onMouseEnter(entry);
          setProjOnly(false);
          onMouseLeave(entry)
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

export default ListMobile;
