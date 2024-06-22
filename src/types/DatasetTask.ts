type DatasetTask = 'image-labeling'

class DatasetTaskLocalizations {
    static readonly il8n = {'image-labeling': 'Image Labeling'}
    static readonly modalityIl8n = {'image-labeling': 'images'}

    static getTaskName(task: DatasetTask): string {
        return this.il8n[task] ?? 'Unknown task'
    }

    static getModalityName(task: DatasetTask | undefined): string {
        if(!task) return 'Unknown modality'

        return this.modalityIl8n[task] ?? 'Unknown modality'
    }
}

export default DatasetTask;

export {DatasetTaskLocalizations};