import BaseStore from './baseStore'
import { observable, action, computed } from "mobx"

export default class RecipeStore extends BaseStore {
    @observable recipes = [];

    async fetchRecipes(searchTerm, page) {
        if (!page) { page = 1 }

        let params = (searchTerm.includes(',') ? 'i=' + searchTerm : 'q=' + searchTerm);
            params += '&p=' + page;

        let { data } = await this.service.sendRequest({
            method: 'GET',
            url: '/api/?' + params
        });

        if (page === 1 && data.results.length) {
            this.set({recipes: data.results});
            this.fetchRecipes(searchTerm, 2);
        }else{
            this.set({recipes: this.recipes.concat(data.results)});
        }
    }
}
