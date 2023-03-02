import type { GlobalSettings, MenuItem, StrapiFetchOptions } from './types';

export const strapiFetch = async (path: string, options: StrapiFetchOptions = {}) => {
    console.log(`${import.meta.env.STRAPI_URL}/api${path}`);
    try {
        const response = await fetch(`${import.meta.env.STRAPI_URL}/api${path}`, {
            headers: {
                'Authorization': `Bearer ${import.meta.env.STRAPI_TOKEN}`,
                ...options.headers,
            },
            ...options,
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            console.error(data);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getGlobalSettings = async (): Promise<GlobalSettings> => {
    try {
        const reponse = await strapiFetch('/global');
        return reponse.data.attributes as GlobalSettings;
    } catch (error) {
        console.error(error);
        return {
            siteTitle: 'Site Title',
        };
    }
}

export const getPostBySlug = async (slug: string) => {
    try {
        const reponse = await strapiFetch(`/posts?filters[Slug][$eq]=${slug}`);
        return reponse.data[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getPageBySlug = async (slug: string) => {
    try {
        const reponse = await strapiFetch(`/pages?filters[Slug][$eq]=${slug}`);
        return reponse.data[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getMenuBySlug = async (slug: string): Promise<MenuItem[]> => {
    try {
        const reponse = await strapiFetch(`/navigation/render/${slug}`);
        return reponse
            .sort((a: any, b: any) => a.order - b.order)
            .map((item: any) => {
                if (item.type === 'EXTERNAL') {
                    return {
                        order: item.order,
                        title: item.title,
                        url: item.externalPath,
                    } as MenuItem;
                } else if (item.type === 'INTERNAL') {
                    return {
                        order: item.order,
                        title: item.title,
                        url: `/${item.path}`
                    } as MenuItem;
                }
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}