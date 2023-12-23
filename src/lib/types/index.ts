// Stores
export type PageStateStore = {
    currentPage: "library" | "seriesDetail" | "episodeDetail";
    seriesDetailPageSeries: Series | null;
    episodeDetailPageEpsiode: Episode | null;
}

export type MediaStore = {
    dataTypeVersion: number;
    media: Record<string, string>;
}

export type UrlToHashStore = {
    dataTypeVersion: number;
    urls: Record<string, string>;
}

// Tapas
export type TapasUser = {
    id: number;
    username: string;
    displayName: string;
    profilePictureUrl: string;
}

// Series
export type Series = {
    id: number;
    title: string;
    thumbnailUrl: string;
    coverImageUrl: string;
    creators: TapasUser[];
    description: string;
    genre: string;
    tags: string[];
    episodes: Episode[];
}

export type Episode = {
    id: number;
    title: string;
    creationDate: string;
    scheduledDate: string | null;
    thumbnailUrl: string;
    description: string;
    commentCount: number;
    likeCount: number;
    contentImageUrls: string[];
}