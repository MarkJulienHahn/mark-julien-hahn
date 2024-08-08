import Link from "next/link";

const ProjectsList = ({
  work,
  setFocus,
  projOnly,
  setProjOnly,
  focus,
  focusDisc,
  focusCoop,
  focusClnt,
}) => {
  return (
    <ul className="grid-4fr">
      {work.map((entry, i) => (
        <li
          onMouseEnter={() => {
            setFocus(entry);
            setProjOnly(true);
          }}
          onMouseLeave={() => {
            setFocus({});
            setProjOnly(false);
          }}
          style={{
            opacity:
              (!projOnly || focus.title === entry.title) &&
              (entry.disciplines.some((discipline) =>
                focusDisc.some(
                  (focusDiscipline) =>
                    focusDiscipline?.title === discipline.title
                )
              ) ||
                entry.cooperations?.some((cooperation) =>
                  focusCoop.some(
                    (focusCooperation) =>
                      focusCooperation?.title === cooperation.title
                  )
                ) ||
                entry?.clients?.some((client) =>
                  focusClnt.some(
                    (focusClient) => focusClient?.title === client.title
                  )
                ))
                ? 1
                : 0.2,
            textDecoration:
              entry?.images?.length <= 1 || entry?.images?.length == undefined
                ? "line-through"
                : "inherit",
            textDecorationThickness: "2px",
            cursor: entry?.images?.length <= 1 ? "default" : "pointer",
          }}
          key={i}
        >
          <span className="year">
            {entry.month && entry.year
              ? entry.month < 10
                ? `0${entry.month}/${entry.year}`
                : `${entry.month}/${entry.year}`
              : "[wip]"}
          </span>
          {entry?.images?.length > 1 ? (
            <Link href={`/${entry.slug.current}`}>{entry.title}</Link>
          ) : (
            entry.title
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProjectsList;
