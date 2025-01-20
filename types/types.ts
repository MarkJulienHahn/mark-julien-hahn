export interface TextBlock {
    _key: string;
    _type: 'block';
    style: string;
    children: Array<{
        _key: string;
        _type: 'span';
        text: string;
        marks: string[];
    }>;
    markDefs?: Array<{
        _key: string;
        _type: string;
        [key: string]: any;
    }>;
}

export interface ImageType {
    media: {
        url: string,
        color: string,
        caption?: string,
        dimensions: {
            aspectRatio: number
        }
    };
    imageUrl: string;
    alt: string;
    type?: string;
}

interface Discipline {
    slug: string,
    title: string
}

export type WorkData = {
    ongoing?: string;
    year: string;
    month: string;
    title: string;
    slug: { current: string };
    description: TextBlock[];
    clientInformation: TextBlock[];
    images: ImageType[];
    disciplines: Discipline[], length: number
};