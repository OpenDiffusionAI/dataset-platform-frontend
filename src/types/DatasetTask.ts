type DatasetTask = 'image-labeling'

class DatasetTaskLocalizations {
    static readonly il8n = {'image-labeling': 'Image Labeling'}

    static getTaskName(task: DatasetTask): string {
        return this.il8n[task] ?? 'Unknown task'
    }
}

export default DatasetTask;

export {DatasetTaskLocalizations};