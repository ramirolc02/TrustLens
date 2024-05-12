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
        <Button variant="solid" color="primary">
          Select Posts
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="comment"
          onClick={() => {
            setType(ExplorePublicationsOrderByType.Latest)
          }}
        >
          Latest
        </DropdownItem>
        <DropdownItem
          key="comment"
          onClick={() => {
            setType(ExplorePublicationsOrderByType.TopCommented)
          }}
        >
          Most Comments
        </DropdownItem>
        <DropdownItem
          key="copy"
          onClick={() => {
            setType(ExplorePublicationsOrderByType.TopReacted)
          }}
        >
          Most Reactions
        </DropdownItem>
        <DropdownItem
          key="edit"
          onClick={() => {
            setType(ExplorePublicationsOrderByType.TopMirrored)
          }}
        >
          Most Mirrored
        </DropdownItem>
        <DropdownItem
          key="delete"
          onClick={() => {
            setType(ExplorePublicationsOrderByType.TopCollectedOpenAction)
          }}
        >
          Most Collects
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
