/*
 * Copyright 2021 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {HANDLE_SUBSCRIBTION} from '../actions/subscription'

const initialState = {isStreamSubscribed: false}

export default (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_SUBSCRIBTION:
      return {...state, isStreamSubscribed: action.payload}
    default:
      return state
  }
}
