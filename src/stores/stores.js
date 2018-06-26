import { store } from "rfx-core";

import RecipeStore from "./RecipeStore";

export default store.setup({
    recipe: RecipeStore,
});
