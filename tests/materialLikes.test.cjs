/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { QueryClient } = require("@tanstack/react-query");
const load = require("./helpers/loadSource.cjs");

test("liking and unliking invalidate cached saved materials across filters", async () => {
  const client = new QueryClient();
  const savedKeys = [["saved-materials", "", 10], ["saved-materials", "cement", 10]];
  let mutation;
  const calls = [];
  const state = { currentUser: { _id: "buyer" }, openModal() {}, setIsModalFlow() {} };
  const { useToggleMaterialLike } = load("src/features/materials/hooks/useToggleMaterialLike.ts", {
    "@tanstack/react-query": {
      useQueryClient: () => client,
      useMutation: (options) => { mutation = options; return { mutate() {}, isPending: false }; },
    },
    "../api": { likeMaterial: async (id) => calls.push(["like", id]), unlikeMaterial: async (id) => calls.push(["unlike", id]) },
    "@/lib/helpers/promiseError": { promiseErrorFunction() {} },
    "@/store/authStore": { useStore: (selector) => selector(state) },
  });
  useToggleMaterialLike({ materialId: "material-id", initialIsLiked: false });
  for (const shouldLike of [true, false]) {
    for (const key of savedKeys) client.setQueryData(key, { pages: [{ data: [], meta: {} }], pageParams: [1] });
    for (const key of savedKeys) assert.equal(client.getQueryState(key).isInvalidated, false);
    await mutation.mutationFn(shouldLike);
    await mutation.onSuccess();
    for (const key of savedKeys) assert.equal(client.getQueryState(key).isInvalidated, true);
  }
  assert.deepEqual(calls, [["like", "material-id"], ["unlike", "material-id"]]);
  client.clear();
});
