// Stores
export type PageStateStore = {
    currentPage: "loading" | "library" | "search" | "seriesDetail" | "episodeDetail" | "episodeComments";
    seriesDetailPageSeries: Series | null;
    episodeDetailPageEpsiode: { seriesId: number; episodeId: number } | null;
    episodeCommentsPageEpisode: { seriesId: number; episodeId: number } | null;
}

export type UrlToHashStore = {
    dataTypeVersion: number;
    urls: Record<string, string>;
}

export type LibraryStore = {
    dataTypeVersion: number;
    series: Record<string, Series>;
}

export type EpisodeStore = {
    dataTypeVersion: number;
    episodes: Record<number, Episode>;
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
    seriesId: number;
    title: string;
    creationDate: string;
    scheduledDate: string | null;
    thumbnailUrl: string;
    description: string;
    commentCount: number;
    likeCount: number;
    contentImageUrls: string[];
    previousEpisodeId: number | null;
    nextEpisodeId: number | null;
}