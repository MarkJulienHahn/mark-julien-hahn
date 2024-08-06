import Single from "../../../components/Single/Single";
import { getWork } from "../../../sanity/sanity-utils";

export default async function ({ params }) {
  const work = await getWork();
  const entry = work.filter(
    (project) => project.slug.current == params.slug
  )[0];

  return (
    <>
      <Single entry={entry} />
    </>
  );
}
