import { ExplorePublicationsOrderByType } from "@lens-protocol/react-web"
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"

export default function Drop({ setType }: { setType: any }) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="solid" color="default">
          Select Posts
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="comment"
          onClick={() => setType(ExplorePublicationsOrderByType.Latest)}
          style={{ color: "black" }}
        >
          Latest
        </DropdownItem>
        <DropdownItem
          key="comment"
          onClick={() => setType(ExplorePublicationsOrderByType.TopCommented)}
          style={{ color: "black" }}
        >
          Most Comments
        </DropdownItem>
        <DropdownItem
          key="copy"
          onClick={() => setType(ExplorePublicationsOrderByType.TopReacted)}
          style={{ color: "black" }}
        >
          Most Reactions
        </DropdownItem>
        <DropdownItem
          key="edit"
          onClick={() => setType(ExplorePublicationsOrderByType.TopMirrored)}
          style={{ color: "black" }}
        >
          Most Mirrored
        </DropdownItem>
        <DropdownItem
          key="delete"
          onClick={() =>
            setType(ExplorePublicationsOrderByType.TopCollectedOpenAction)
          }
          style={{ color: "black" }}
        >
          Most Collects
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
