export interface StrapiFetchOptions {
    headers?: Record<string, string>;
    [key: string]: any;
}

export interface GlobalSettings {
    siteTitle: string;
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
    title: string;
    url: string;
    order: number;
};