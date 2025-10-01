import { navBarItems as items } from "@/constants/navBarItems";
import BubbleMenu from "./BubbleMenu";
const NavBar = () => {
  return (
    <BubbleMenu
      logo={<span style={{ fontWeight: 700 }}>RB</span>}
      items={items}
      menuAriaLabel="Toggle navigation"
      menuBg="#ffffff"
      menuContentColor="#111111"
      useFixedPosition={false}
      animationEase="back.out(1.5)"
      animationDuration={0.5}
      staggerDelay={0.12}
    />
  );
};

export default NavBar;
