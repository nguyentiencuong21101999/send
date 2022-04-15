import React, { useState } from "react";
import {
  Channel as SBConversation,
  ChannelList as SBChannelList,
  ChannelSettings as SBChannelSettings,
  MessageSearch,
} from "sendbird-uikit";

import TypingIndicator from "./CustomTypingIndicator";

function CustomizedApp(props) {
  // props

  // useState
  const [currentChannelUrl, setCurrentChannelUrl] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  return (
    <div className="customized-app">
      <div className="sendbird-app__wrap">
        <div className="sendbird-app__channellist-wrap">
          <SBChannelList
            onChannelSelect={(channel) => {
              if (channel && channel.url) {
                setCurrentChannelUrl(channel.url);
              }
            }}
          />
        
        </div>
        <div className="sendbird-app__conversation-wrap">
          <SBConversation
            channelUrl={currentChannelUrl}
            onChatHeaderActionClick={() => {
              setShowSettings(true);
            }}
          />
          <TypingIndicator currentChannelUrl={currentChannelUrl} />
        </div>
        {showSettings && (
          <div className="sendbird-app__settingspanel-wrap">
            <SBChannelSettings
              channelUrl={currentChannelUrl}
              onCloseClick={() => {
                setShowSettings(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomizedApp;
