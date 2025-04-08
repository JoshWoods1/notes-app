export class Note {
    constructor(
        public _id: string,       
        public title: string,
        public content: string,
        public category?: string,
        public createdAt?: string,
    ) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.category = category;
        this.createdAt = createdAt;
    }
}