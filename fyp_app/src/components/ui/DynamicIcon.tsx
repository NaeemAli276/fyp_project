import {
  Vault,
  Send,
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
  Settings,
  Search,
  X,
  Loader,
  MessageSquare,
  ScanQrCode,
  Forward,
  UsersRoundCollaboration,
  MessageSquarePlus,
  Triangle,
  Server,
  Dot,
  UserPlus,
  LogOut,
  ChevronRight,
  User,
  EllipsisVertical
} from 'lucide-react-native';
import type { LucideProps } from 'lucide-react-native';


const iconMap = {
  Vault,
  Send,
  ArrowLeft,
  Eye,
  EyeOff,
  Check,
  Settings,
  Search,
  X,
  Loader,
  MessageSquare,
  ScanQrCode,
  Forward,
  UsersRoundCollaboration,
  MessageSquarePlus,
  Triangle,
  Server,
  Dot,
  UserPlus,
  LogOut,
  ChevronRight,
  User,
  EllipsisVertical
} as const;

type IconName = keyof typeof iconMap;

interface DynamicIconProps extends LucideProps {
  name: IconName;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    if (__DEV__) {
      console.warn(`Icon "${name}" is not in the iconMap.`);
    }
    return null;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;