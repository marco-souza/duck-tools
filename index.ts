import * as _ from 'lodash'

type Action = {
  payload: any,
  type: string
}

export const defineReducer = (reducersMap: any, getDefaultState = () => {}) => {
  reducersMap = _.defaults(reducersMap, {
    beforeReduce: _.identity,
    afterReduce: _.identity
  })

  return (state: any, action: Action) => {
    if (state === undefined) {
      state = getDefaultState()
    }

    const payload = action.payload

    state = reducersMap.afterReduce(state, payload)

    const reducer = reducersMap[action.type]

    if (reducer) {
      state = reducer(state, payload)
    }

    return reducersMap.afterReduce(state, payload)
  }
}

export const defineTypes = ( obj: any, valuePrefix: string ) => {
  valuePrefix = valuePrefix || ''
  let ret = obj

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = valuePrefix ? valuePrefix + '#' + key : key
    }
  }

  return ret
}
