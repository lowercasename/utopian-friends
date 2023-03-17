export interface StrapiFetchOptions {
    headers?: Record<string, string>;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
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
};

export interface Block {
    id: number;
    __component: string;
    content: string;
    title: string;
    image: {
        url: string;
        alternativeText: string;
    };
};

export interface Page {
    id: number;
    attributes: {
        Title: string;
        Content: string;
        Slug: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        blocks: Block[];
    };
}

export interface MenuItem {
    title: string;
    url: string;
    order: number;
};