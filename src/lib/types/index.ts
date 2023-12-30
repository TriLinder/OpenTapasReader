// Stores
export type PageStateStore = {
    dataTypeVersion: number;
    currentPage: "library" | "search" | "seriesDetail" | "episodeDetail" | "episodeComments";
    seriesDetailPage: {
        series: Series | null;
        reversed: boolean;
        episodeListVerticalScrollPosition: number;
    };
    episodeDetailPageEpsiode: { seriesId: number; episodeId: number } | null;
    episodeCommentsPageEpisode: { seriesId: number; episodeId: number } | null;
}

export type PageStateHistoryStore = {
    dataTypeVersion: number;
    currentIndex: number;
    history: string[]
}

export type UrlToHashStore = {
    dataTypeVersion: number;
    urls: Record<string, string>;
}

export type LibraryStore = {
    dataTypeVersion: number;
    lastUpdate: string;
    series: Record<string, Series>;
}

export type EpisodeStore = {
    dataTypeVersion: number;
    episodes: Record<number, Episode>;
}

// Tapas
export type TapasUser = {
    id: number | null;
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

export type Comment = {
    id: number;
    episodeId: number;
    creator: TapasUser;
    creationDate: string;
    likeCount: number;
    replyCount: number | null;
    body: string;
}