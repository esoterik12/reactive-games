import { useState } from 'react';
import { SocialTabs } from '../social/SocialTabs';
import { SocialFeedStream } from '../social/Feed';
import { Messages } from '../social/Messages';
import { Friends } from '../social/Friends';

export interface ISocialFeedProps {
}

export function SocialFeed (props: ISocialFeedProps) {
  const [activeSocial, setActiveSocial] = useState("feed");

  return (
    <div>
      <SocialTabs setActiveSocial={setActiveSocial} activeSocial={activeSocial}>
        {activeSocial === "feed" && <SocialFeedStream />}
        {activeSocial === "messages" && <Messages />}
        {activeSocial === "friends" && <Friends/> }
      </SocialTabs>
    </div>
  );
}
