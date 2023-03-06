import react, {useState,useEffect} from 'react';

const ChatEntry = ({chat}) => {


  return(
    <div>
      <div className='chat-entry-container'>
        <div className='chat-entry-user-image-container'>
          image
        </div>
        <div className='chat-entry-user-info-container'>
          <div className='chat-entry-user-header-container'>
            username:left lastSeen:right
          </div>
          <div className='chat-entry-user-content-continer'>
            last text seen
          </div>
        </div>
      </div>
    </div>
  )
}