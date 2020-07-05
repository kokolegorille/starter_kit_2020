import { useReducer } from 'react';

const SET_POS_XY       = "SET_POS_XY";
const SET_SIZE         = "SET_SIZE";
const SET_LINE_WIDTH   = "SET_LINE_WIDTH";
const SET_LINE_CAP     = "SET_LINE_CAP";
const SET_STROKE_STYLE = "SET_STROKE_STYLE";
const SET_FILL_STYLE   = "SET_FILL_STYLE";
const SET_STATUS       = "SET_STATUS";

const defaultState = {
  posXY: {x: 0, y: 0},
  size: {width: 800, height: 600},
  // 
  lineWidth: 1,
  lineCap: "round",
  strokeStyle: "#c0392b",
  fillStyle: "#c0392b",
  // 
  status: "standby",
}

const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case SET_POS_XY:
      newState = {...state, posXY: action.payload}
      break;

    case SET_SIZE:
      newState = {...state, size: action.payload}
      break;

    case SET_LINE_WIDTH:
      newState = {...state, lineWidth: action.payload}
      break;

    case SET_LINE_CAP:
      newState = {...state, lineCap: action.payload}
      break;

    case SET_STROKE_STYLE:
      newState = {...state, strokeStyle: action.payload}
      break;

    case SET_FILL_STYLE:
      newState = {...state, fillStyle: action.payload}
      break;

    case SET_STATUS:
      newState = {...state, status: action.payload}
      break;

    default: 
      newState = Object.assign({}, state);
      break;
  };

  // console.log(state, action, newState);

  return newState;
};

let state, dispatch;

const useCanvas = (initialState = defaultState) => {
  [state, dispatch] = useReducer(reducer, initialState);

  const setPosXY = payload => dispatch({type: SET_POS_XY, payload});

  const setSize = payload => dispatch({type: SET_SIZE, payload});

  const setLineWidth = payload => dispatch({type: SET_LINE_WIDTH, payload});

  const setLineCap = payload => dispatch({type: SET_LINE_CAP, payload});

  const setStrokeStyle = payload => dispatch({type: SET_STROKE_STYLE, payload});

  const setFillStyle = payload => dispatch({type: SET_FILL_STYLE, payload});

  const setStatus = payload => dispatch({type: SET_STATUS, payload});

  return [
    state, 
    {
      setPosXY, setSize,
      setLineWidth, setLineCap,
      setStrokeStyle, setFillStyle,
      setStatus,
     }
  ];
};

export default useCanvas;