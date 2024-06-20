import HomeIcon from "@mui/icons-material/Home"
import ExploreIcon from "@mui/icons-material/Explore"
import NotificationIcon from "@mui/icons-material/Notifications"
import MessageIcon from "@mui/icons-material/Message"
import ListAltIcon from '@mui/icons-material/ListAlt'
import GroupIcon from '@mui/icons-material/Group'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PendingIcon from '@mui/icons-material/Pending';

export const navigationMenu=[
  {
    title: "Home",
    icon: <HomeIcon/>,
    path: "/home"
  },
  {
    title: "Explore",
    icon: <ExploreIcon/>,
    path: "/explore"
  },
  {
    title: "Notification",
    icon: <NotificationIcon/>,
    path: "/notification"
  },
  {
    title: "Message",
    icon: <MessageIcon/>,
    path: "/message"
  },
  {
    title: "Lists",
    icon: <ListAltIcon/>,
    path: "/list"
  },
  {
    title: "Communities",
    icon: <GroupIcon/>,
    path: "/communities"
  },
  {
    title: "Verified",
    icon: <VerifiedUserIcon/>,
    path: "/verified"
  },
  {
    title: "Profile",
    icon: <AccountCircleIcon/>,
    path: "/profile"
  },
  {
    title: "More",
    icon: <PendingIcon/>,
    path: "/more"
  },
]