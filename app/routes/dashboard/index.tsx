import { Handlers, PageProps } from "$fresh/server.ts";

import State from "@/schemas/State.ts";
import { UserWithSocialProfiles } from "@/db/tables/CombinedTables.ts";
import Layout from "@/components/Layout.tsx";
import { pageTitle } from "@/signals/index.ts";
import SpotListTable from "@/db/tables/SpotListTable.ts";
import { findAll } from "@/db/queries/SpotList.ts";

interface DashboardPageProps {
  user?: UserWithSocialProfiles;
  lists: SpotListTable[];
}

export const handler: Handlers<DashboardPageProps, State> = {
  async GET(req, ctx) {
    const lists =
      (await findAll(ctx.state.userId as number) as unknown as SpotListTable[]);
    return ctx.render({
      user: ctx.state.user,
      lists,
    });
  },
};

export default function Home(
  { data }: PageProps<DashboardPageProps>,
) {
  pageTitle.value = "Dashboard";
  // TODO: use a signal
  return (
    <Layout user={data.user}>
      <div class="mt-5 w-full flex flex-col justify-center items-center container">
        <a href="/dashboard/lists/create" class="btn btn-lg btn-info">
          CREATE A LIST
        </a>
        {!data.lists.length && <h2>You have not created any lists!</h2>}
        <div class="mt-5 w-full">
          {data.lists.map((list) => (
            <div class="card border-success mb-3 w-full">
              <div class="card-header">{list.name}</div>
              <div class="card-body">
                <p class="card-text">{list.description}</p>
                <div class="flex justify-end">
                  <a
                    href={`/dashboard/lists/edit/${list.id}`}
                    class="btn btn-success"
                  >
                    EDIT
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
