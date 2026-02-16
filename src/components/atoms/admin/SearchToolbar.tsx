import { Icon } from "@/assets/icon/icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SearchToolbar({ name }: { name: String }) {
  return (
    <InputGroup className="w-full @lg:w-sm">
      <InputGroupAddon>
        <InputGroupButton>
          <Icon.SearchIcon />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput
        placeholder={`Filter by ${name}...`}
        // value={search}
        // onChange={(e) => setSearch(e.target.value)}
      />
    </InputGroup>
  );
}
// const filteredCategories = categories.filter((category) =>
//   category.name.toLowerCase().includes(search.toLowerCase()),
// );
