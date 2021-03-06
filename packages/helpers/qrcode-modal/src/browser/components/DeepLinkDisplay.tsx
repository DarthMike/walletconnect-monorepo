// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from "react";
import MobileRegistry from "@walletconnect/mobile-registry";
import { IMobileRegistryEntry } from "@walletconnect/types";
import { isIOS, getLocation, appendToQueryString } from "@walletconnect/utils";

import { DEFAULT_BUTTON_COLOR, WALLETCONNECT_CTA_TEXT_ID } from "../constants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ConnectButton from "./ConnectButton";

function formatIOSDeepLink(uri: string, entry: IMobileRegistryEntry) {
  const loc = getLocation();
  const encodedUri: string = encodeURIComponent(uri);
  const redirectUrlQueryString = appendToQueryString(loc.search, {
    walletconnect: true,
  });
  const redirectUrl: string = encodeURIComponent(
    `${loc.origin}${loc.pathname}${redirectUrlQueryString}`,
  );

  return entry.universalLink
    ? `${entry.universalLink}/wc?uri=${encodedUri}&redirectUrl=${redirectUrl}`
    : entry.deepLink
    ? `{wallet.deepLink}${uri}`
    : "";
}

interface DeepLinkDisplayProps {
  uri: string;
}

function DeepLinkDisplay(props: DeepLinkDisplayProps) {
  return (
    <div>
      <p id={WALLETCONNECT_CTA_TEXT_ID} className="walletconnect-qrcode__text">
        {"Choose your preferred wallet"}
      </p>
      <div className="walletconnect-connect__buttons__wrapper">
        {isIOS() ? (
          MobileRegistry.map((entry: IMobileRegistryEntry) => {
            const { name, color } = entry;
            const href = formatIOSDeepLink(props.uri, entry);
            return <ConnectButton name={name} color={color} href={href} />;
          })
        ) : (
          <ConnectButton
            name={"Connect to Mobile Wallet"}
            color={DEFAULT_BUTTON_COLOR}
            href={props.uri}
          />
        )}
      </div>
    </div>
  );
}

export default DeepLinkDisplay;
