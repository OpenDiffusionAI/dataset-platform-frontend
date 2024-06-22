import DatasetTask from "./DatasetTask.ts";
import SiteUserData from "./SiteUserData.ts";
import DatasetGuidelines from "./DatasetGuidelines.ts";

interface DatasetDetailData {
    id: string;
    task: DatasetTask;
    name: string;
    description: string;
    guidelines: DatasetGuidelines
    coverImageUrl: string;
    tags: string[];
    createdAt: number;
    updatedAt: number;
    size: number;
    completionAmount: number;
    completionGoal: number;
    open: boolean;
    owner: SiteUserData;
}

export default DatasetDetailData;