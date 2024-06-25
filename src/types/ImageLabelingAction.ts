import MaturityRating from "./MaturityRating.ts";

type ImageLabelingAction = {
    id: string
    imageUrl: string
    // imageId: string
    descriptions: Record<string, Record<string, string>>
    metaAttributes: Record<string, string>
    wasHumanReviewed: boolean
    wasHumanEdited: boolean
    maturityRating: MaturityRating
    hasHumanGeneratedMaturityRating: boolean
    quality: 0 | 1 | 2 | 3 | 4 | 5
    vlms: string[]
    elapsedSeconds: number
}

export default ImageLabelingAction;