import homeIcon from "../assets/icons/home.png";
import followIcon from "../assets/icons/follow.png";
import sendIcon from "../assets/icons/send.png";
import userIcon from "../assets/icons/user.png";
import officeIcon from "../assets/icons/office.png";

export const menuItems = [
  { icon: homeIcon, label: "Explore", onSelect: true },
  { icon: followIcon, label: "Following", onSelect: false },
  { icon: sendIcon, label: "Messages", onSelect: false },
  { icon: userIcon, label: "Profile", showOnMore: true, onSelect: false },
  { icon: officeIcon, label: "Business", showOnMore: true, onSelect: false },
];