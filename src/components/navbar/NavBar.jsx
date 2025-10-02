import { useEffect, useState } from "react";
import { navBarItems as items } from "@/constants/navBarItems";
import BubbleMenu from "../ui/BubbleMenu";

const NavBar = () => {
  return (
    <div className="relative">
      <BubbleMenu
        logo={<span style={{ fontWeight: 700 }}>RB</span>}
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
