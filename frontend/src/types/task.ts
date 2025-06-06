export default interface Task {
    id: string;
    title: string;
    description?: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}
