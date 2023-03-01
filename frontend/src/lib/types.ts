export interface StrapiFetchOptions {
    headers?: Record<string, string>;
    [key: string]: any;
}

export interface Post {
    id: number;
    attributes: {
        Title: string;
        Content: string;
        Slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface Page {
    id: number;
    attributes: {
        Title: string;
        Content: string;
        Slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface MenuItem {
    id: number;
    attributes: {
        title: string;
        url: string;
        target: string;
        order: number;
    }
};