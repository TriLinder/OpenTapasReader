// Stores

// Configuration Store holds application configuration settings.
export type ConfigurationStore = {
    dataTypeVersion: number; // Version of the data type for potential migrations
    language: "en" | "cs"; // Language preference
    showProfilePictures: boolean; // Toggle to show/hide profile pictures
}

// Page State Store manages the state of the current page in the application.
export type PageStateStore = {
    dataTypeVersion: number; // Version of the data type for potential migrations
    currentPage: "library" | "settings" | "about" | "dependencyAcknowledgments" | "search" | "seriesDetail" | "episodeDetail" | "episodeComments";
    seriesDetailPage: {
        series: Series | null; // Details of the current series being viewed
        episodeListVerticalScrollPosition: number; // Scroll position in the episode list
    };
    episodeDetailPageEpsiode: { seriesId: number; episodeId: number } | null; // Currently viewed episode details
    episodeCommentsPageEpisode: { seriesId: number; episodeId: number } | null; // Episode details for comments page
}

// Page State History Store keeps track of the history of visited pages.
export type PageStateHistoryStore = {
    dataTypeVersion: number; // Version of the data type for potential migrations
    currentIndex: number; // Index of the current page in the history
    history: string[]; // List of historical pages
}

// Url To Hash Store maps URLs to corresponding hash values.
export type UrlToHashStore = {
    dataTypeVersion: number; // Version of the data type for potential migrations
    urls: Record<string, string>; // Mapping of URLs to hash values
}

// Library Store contains information about the library of series in the application.
export type LibraryStore = {
    dataTypeVersion: number; // Version of the data type for potential migrations
    lastUpdate: string; // Timestamp of the last library update
    series: Record<string, Series>; // Collection of series data (with the series' id as the key)
}

// Episode Store stores information about downloaded episodes.
export type EpisodeStore = {
    dataTypeVersion: number; // Version of the data type for potential migrations
    episodes: Record<number, Episode>; // Collection of episode data with episode ID as the key
}

// Read Episodes Store keeps track of the user's reading progress for each series.
export type ReadEpisodesStore = {
    dataTypeVersion: number; // Version of the data type for potential migrations
    series: Record<number, {
        lastReadEpisode: Episode | null; // Last read episode of the series
        readEpisodes: number[]; // Array of read episode IDs for the series
        episodeListReveresed: boolean; // Flag indicating the order of episode list
    }>;
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
    isFree: boolean;
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