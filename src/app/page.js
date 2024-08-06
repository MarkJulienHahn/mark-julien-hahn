import {
  getWork,
  getDisciplines,
  getCooperations,
  getClients,
} from "../../sanity/sanity-utils";
import Work from "../../components/Home/Work";

export default async function Home() {
  const work = await getWork();

  const disciplines = await getDisciplines();
  const cooperations = await getCooperations();
  const clients = await getClients();
  return (
    <main>
      <Work
        work={work}
        disciplines={disciplines}
        cooperations={cooperations}
        clients={clients}
      />
    </main>
  );
}

export const revalidate = 10;