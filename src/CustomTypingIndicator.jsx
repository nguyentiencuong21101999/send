import React, { useEffect, useState } from "react";
import { useSendbirdStateContext, sendBirdSelectors } from "sendbird-uikit";

import { v4 as uuidv4 } from "uuid";

function CustomTypingIndicator(props) {
  const { currentChannelUrl } = props;
  const context = useSendbirdStateContext();
  const sdkInstance = sendBirdSelectors.getSdk(context);
  const [indicator, setIndicator] = useState({
    show: false,
    name: null
  });
  useEffect(() => {
    const uuid = uuidv4();

    if (sdkInstance && sdkInstance.ChannelHandler && currentChannelUrl) {
      const channelHandler = new sdkInstance.ChannelHandler();
      channelHandler.onMessageReceived = (channel, message) => {
        // add a customType to BOT message and filter like
        /**
         * if (message.customType !== 'bot') {
         * return
         *}
         */
        if (channel.url !== currentChannelUrl) {
          return;
        }
        setIndicator({
          show: true,
          name: message.sender
        });
        setTimeout(() => {
          setIndicator({
            show: false,
            name: null
          });
        }, 2000);
      };
      sdkInstance.addChannelHandler(uuid, channelHandler);
    }

    return () => {
      if (sdkInstance && sdkInstance.removeChannelHandler) {
        sdkInstance.removeChannelHandler(uuid);
      }
    };
  }, [sdkInstance, currentChannelUrl]);
  return (
    <div className="typing-indicator">
      {indicator.show ? `${indicator.name} is typing` : null}
    </div>
  );
}

export default CustomTypingIndicator;
