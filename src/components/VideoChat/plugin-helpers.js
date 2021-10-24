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

import OT from '@opentok/client'

import {store} from '../../redux-store'
import {handleSubscribtion} from '../../actions/subscription'

function handleError (error) {
  if (error) {
    alert(error.message)
  }
}

let session, publisher, subscriber

export function initializeSession (apiKey, sessionId, token) {
  session = OT.initSession(apiKey, sessionId)

  // Create a publisher
  publisher = OT.initPublisher(
    'publisher',
    {
      insertMode: 'append',
      style: {buttonDisplayMode: 'off'},
      width: '100%',
      height: '100%'
    },
    handleError
  )

  // Subscribing to stream
  session.on('streamCreated', function (event) {
    subscriber = session.subscribe(
      event.stream,
      'subscriber',
      {
        insertMode: 'append',
        style: {buttonDisplayMode: 'off'},
        width: '100%',
        height: '100%'
      },
      handleError
    )
    store.dispatch(handleSubscribtion(true))
  })

  // Do some action on destroying the stream
  session.on('streamDestroyed', function (event) {
    // eslint-disable-next-line no-console
    console.log('The Video chat has ended')
    store.dispatch(handleSubscribtion(false))
  })

  // Connect to the session
  session.connect(token, function (error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error)
    } else {
      session.publish(publisher, handleError)
    }
  })
}

export function stopStreaming () {
  session && session.unpublish(publisher)
}

// The following functions are used in functionlaity customization
export function toggleVideo (state) {
  publisher.publishVideo(state)
}
export function toggleAudio (state) {
  publisher.publishAudio(state)
}
export function toggleAudioSubscribtion (state) {
  subscriber.subscribeToAudio(state)
}
export function toggleVideoSubscribtion (state) {
  subscriber.subscribeToVideo(state)
}
