import { useEffect, useState } from "react";
import { navBarItems as items } from "@/constants/navBarItems";
import BubbleMenu from "../ui/BubbleMenu";
import DecryptedText from "../ui/DecryptedText";

const NavBar = () => {
  return (
    <div className="relative">
      <BubbleMenu
        logo={
          <DecryptedText
            text="Davit"
            speed={100}
            maxIterations={50}
            characters="ABCD1234!?"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
            animateOn="view"
          />
        }
        items={items}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />
    </div>
  );
};

export default NavBar;
