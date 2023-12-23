import { getRequest } from "..";
import type { Series, TapasUser, Episode } from "$lib/types";

export async function getSeries(id: number): Promise<Series> {
    const response = await getRequest(`/series/${id}/`);

    // I know this parsing isn't really typesafe, and I'll probably
    // have to fix it up sometime later, but it's good enough for now.
    const creators: TapasUser[] = [];

    for (const creator of (response.creators as any[])) {
        creators.push({
            id: creator.id,
            username: creator.uname,
            displayName: creator.display_name,
            profilePictureUrl: creator.profile_pic_url
        });
    }

    return {
        id: id,
        title: response.title,
        thumbnailUrl: response.thumb.file_url,
        coverImageUrl: response.book_cover_url,
        creators: creators,
        description: response.description,
        genre: response.genre.abbr,
        tags: response.tags,
        episodes: await getEpisodes(id)
    }
}

export async function getEpisodes(seriesId: number): Promise<Episode[]> {
    const response: any[] = await getRequest(`/series/${seriesId}/episodes/`);

    // I know this parsing isn't really typesafe, and I'll probably
    // have to fix it up sometime later, but it's good enough for now.
    
    const episodes: Episode [] = [];

    for (const episode of response) {
        episodes.push({
            id: episode.id,
            title: episode.title,
            creationDate: episode.created_date,
            scheduledDate: episode.scheduled_date,
            thumbnailUrl: episode.thumb.file_url,
            description: "",
            commentCount: -1,
            likeCount: -1,
            contentImageUrls: []
        });
    }
    
    return episodes;
}