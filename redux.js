import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import thunk from "redux-thunk";
// Action name constants
const init = "account/init";
const inc = "account/increment";
const dec = "account/decrement";
const incrntByAmnt = "account/incrementByAmount";
const incBonus = "bonus/incrementBonus";
const incByAmt = "bonus/incrementBonusByAmount";

// store
const store = createStore(
  combineReducers({
    account: accountReducer,
    bonus: bonusReducer,
  }),
  applyMiddleware(logger.default, thunk.default)
);

let history = [];
// reducer
function accountReducer(state = { amount: 1 }, action) {
  console.log("---- action ----: ", action);
  switch (action.type) {
    case init:
      return { amount: action.payload };
    case inc:
      return { amount: state.amount + 1 };
    case dec:
      return { amount: state.amount - 1 };
    case incrntByAmnt:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

function bonusReducer(state = { bonus: 0 }, action) {
  switch (action.type) {
    case incBonus:
        console.log('-----points----: ', action.type);
      return { points: state.points + 1 };
    case incByAmt:
      if (action.payload >= 100) return { points: state.points + 1 };
    default:
      return state;
  }
}

// global state = It will give the current value of the global state = store.getState()
// console.log(store.getState());

// **** Action Creators ****
function increment() {
  return { type: inc };
}
// **** Action Creators ****
function decrement() {
  return { type: dec };
}

// **** Action Creators ****
function incrementByAmount(value) {
  return { type: incrntByAmnt, payload: value };
}

function incrementBonus() {
    return { type: incBonus };
  }
// This access which is dispatch and getState has been given by thunk
function getUser(id) {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
    // console.log('----data----: ', data);
    dispatch(initUser(data.amount));
  };
}

function initUser(value) {
  return { type: init, payload: value };
}
// dispatching the action to reducer
setTimeout(() => {
//   store.dispatch(getUser(2));
store.dispatch(incrementBonus());
}, 2000);

// console.log(store.getState());

// When ever the state changes, Mujhe naayi state return karke btaa do, store.subscriber will automatically run and gives the updated state.
store.subscribe(() => {
  history.push(store.getState());
  console.log(history);
});

// Async Api calling

// async function getUser(){
//     const {data} = await axios.get('http://localhost:3000/accounts/1')

//     console.log('----data----: ', data.amount);
// }
// getUser();
