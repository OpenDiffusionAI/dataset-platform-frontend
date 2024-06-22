import DatasetGuidelines from "./DatasetGuidelines.ts";

interface ImageLabelingGuidelines extends DatasetGuidelines {
    imageGuidelines: string
    labelingGuidelines: string
    maturityGuidelines: string
    vlmGuidelines: string
}

export default ImageLabelingGuidelines;