import DatasetTask from "./DatasetTask.ts";

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
    owner: {
        id: string;
        username: string;
        avatarUrl: string;
        verified: boolean;
    };
}

export default DatasetListItemData;