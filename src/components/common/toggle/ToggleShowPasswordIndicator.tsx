import { Icon } from "@/assets/icon/icons";
import { InputGroupAddon } from "@/components/ui/input-group";

export default function ToggleShowPasswordIndicator({
  show,
  toggle,
}: {
  show: boolean;
  toggle: () => void;
}) {
  return (
    <InputGroupAddon
      align="inline-end"
      className="cursor-pointer"
      onClick={toggle}
    >
      {show ? <Icon.EyeClosedIcon /> : <Icon.EyeIcon />}
    </InputGroupAddon>
  );
}
