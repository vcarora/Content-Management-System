export type content={
    "cid"?: number;
    "title"?: string;
    "description"?: string;
    "time"?: Date;

}

export type userData={
    "email"?: string;
    "name"?: string;
    "role"?: string;
    "contentList"?: content[]
}