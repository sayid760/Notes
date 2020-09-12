import { fromJS } from 'immutable';
import { ACTION } from './actionConst';

const defaultState = fromJS({
  recommendList: [],
  articleList: [],
  authorList:[],
  articlePage:1,
})

export default (state = defaultState, action) => {
  if (action.type === ACTION.GET_HOME_DATA) {
      return state.merge({
        recommendList:fromJS(action.recommendList),
        articleList:fromJS(action.articleList),
        authorList:fromJS(action.authorList),
        articlePage:state.get("articlePage")
      })
  }
  else if(action.type === ACTION.GET_ADD_HOME) {
    console.log(action);
    return state.merge({
      articleList:state.get('articleList').concat(fromJS(action.articleList)),
      articlePage:action.articlePage
    })
  }
  return state;
}; 