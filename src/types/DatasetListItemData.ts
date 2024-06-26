import DatasetTask from "./DatasetTask.ts";
import SiteUserData from "./SiteUserData.ts";

interface DatasetListItemData {
    id: string;
    task: DatasetTask;
    name: string;
    description: string;
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

export default DatasetListItemData;