import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
// import {
//   MicIcon,
//   MicOffIcon,
//   VideocamIcon,
//   VideocamOffIcon,
//   VolumeUpIcon,
//   VolumeOffIcon,
//   VisibilityIcon,
//   VisibilityOffIcon
// } from '@mui/icons-material'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import {Tooltip, Button} from '@mui/material'

import {apiKey, sessionId, token} from './constants'

import {
  toggleAudio,
  toggleVideo,
  toggleAudioSubscribtion,
  toggleVideoSubscribtion,
  initializeSession,
  stopStreaming
} from './plugin-helpers'
import './index.scss'

function VideoChat () {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false)
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isAudioSubscribed, setIsAudioSubscribed] = useState(true)
  const [isVideoSubscribed, setIsVideoSubscribed] = useState(true)
  const [isStreamSubscribed, setIsStreamSubscribed] = useState(false)
  const isSubscribed = useSelector(
    (state) => state.subscription.isStreamSubscribed
  )

  useEffect(() => {
    isInterviewStarted ?
      initializeSession(apiKey, sessionId, token) :
      stopStreaming()
  }, [isInterviewStarted])

  useEffect(() => {
    setIsStreamSubscribed(isSubscribed)
  }, [isSubscribed])

  const onToggleAudio = (action) => {
    setIsAudioEnabled(action)
    toggleAudio(action)
  }
  const onToggleVideo = (action) => {
    setIsVideoEnabled(action)
    toggleVideo(action)
  }
  const onToggleAudioSubscribtion = (action) => {
    setIsAudioSubscribed(action)
    toggleAudioSubscribtion(action)
  }
  const onToggleVideoSubscribtion = (action) => {
    setIsVideoSubscribed(action)
    toggleVideoSubscribtion(action)
  }

  const renderToolbar = () => {
    return (
      <>
        {isInterviewStarted && (
          <div className='video-toolbar'>
            {isAudioEnabled ? (
              <Tooltip title='mic on'>
                <MicIcon
                  className='on-icon'
                  onClick={() => onToggleAudio(false)}
                />
              </Tooltip>
            ) : (
              <Tooltip title='mic off'>
                <MicOffIcon
                  className='off-icon'
                  onClick={() => onToggleAudio(true)}
                />
              </Tooltip>
            )}
            {isVideoEnabled ? (
              <Tooltip title='camera on'>
                <VideocamIcon
                  className='on-icon'
                  onClick={() => onToggleVideo(false)}
                />
              </Tooltip>
            ) : (
              <Tooltip title='camera off'>
                <VideocamOffIcon
                  className='off-icon'
                  onClick={() => onToggleVideo(true)}
                />
              </Tooltip>
            )}

            {isStreamSubscribed && (
              <>
                {isAudioSubscribed ? (
                  <Tooltip title='sound on'>
                    <VolumeUpIcon
                      className='on-icon'
                      onClick={() => onToggleAudioSubscribtion(false)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title='sound off'>
                    <VolumeOffIcon
                      className='off-icon'
                      onClick={() => onToggleAudioSubscribtion(true)}
                    />
                  </Tooltip>
                )}
                {isVideoSubscribed ? (
                  <Tooltip title='screen on'>
                    <VisibilityIcon
                      className='on-icon'
                      onClick={() => onToggleVideoSubscribtion(false)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title='screen of'>
                    <VisibilityOffIcon
                      className='off-icon'
                      onClick={() => onToggleVideoSubscribtion(true)}
                    />
                  </Tooltip>
                )}
              </>
            )}
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <div className='actions-btns'>
        <Button
          color='primary'
          disabled={isInterviewStarted}
          onClick={() => setIsInterviewStarted(true)}
          variant='contained'
        >
          {'Start chat'}
        </Button>
        <Button
          color='secondary'
          disabled={!isInterviewStarted}
          onClick={() => setIsInterviewStarted(false)}
          variant='contained'
        >
          {'End chat'}
        </Button>
      </div>
      <div className='video-container'>
        <div
          className={`${
            isStreamSubscribed ? 'main-video' : 'additional-video'
          }`}
          id='subscriber'
        >
          {isStreamSubscribed && renderToolbar()}
        </div>
        <div
          className={`${
            isStreamSubscribed ? 'additional-video' : 'main-video'
          }`}
          id='publisher'
        >
          {!isStreamSubscribed && renderToolbar()}
        </div>
      </div>
    </>
  )
}

export default VideoChat
