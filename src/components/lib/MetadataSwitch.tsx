import { PublicationMetadata } from "@lens-protocol/react-web"

export function MetadataSwitch({
  metadata,
}: {
  metadata: PublicationMetadata
}) {
  switch (metadata.__typename) {
    case "ArticleMetadataV3":
    case "TextOnlyMetadataV3":
      return (
        <div>
          <p className="font-bold text-xl">{metadata.content}</p>
        </div>
      )

    case "ImageMetadataV3":
      return (
        <img
          src={metadata.asset.image.raw.uri}
          alt={metadata.asset.altTag ?? undefined}
        />
      )

    default:
      return <p>{metadata.__typename} not supported in this example</p>
  }
}
