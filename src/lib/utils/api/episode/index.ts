import { getRequest } from "..";
import { episodeStore } from "../../../../stores";
import { get } from "svelte/store";
import type { Episode } from "$lib/types";

export async function loadEpisode(seriesId: number, episodeId: number, storeOffline=false) {
    // First, let's check if the episode is already stored offline
    if (episodeId in get(episodeStore).episodes) {
        // Great! It is. Return the episode from storage
        return get(episodeStore).episodes[episodeId];
    }

    // Ok, let's fetch the episode information from the internet
    const response: any = await getRequest(`/series/${seriesId}/episodes/${episodeId}/`);

    const contentImageUrls: string[] = [];

    for (const image of response.contents) {
        contentImageUrls.push(image.file_url);
    }

    let previousEpisodeId = null;
    if (response.prev_episode) {
        previousEpisodeId = response.prev_episode.id;
    }

    let nextEpisodeId = null;
    if (response.next_episode) {
        nextEpisodeId = response.next_episode.id;
    }

    const episode: Episode = {
        id: response.id,
        seriesId: seriesId,
        title: response.title,
        creationDate: response.created_date,
        scheduledDate: null,
        thumbnailUrl: response.thumb.file_url,
        description: response.description,
        commentCount: response.comment_cnt,
        likeCount: response.like_cnt,
        contentImageUrls: contentImageUrls,
        previousEpisodeId: previousEpisodeId,
        nextEpisodeId: nextEpisodeId
    }

    // Alright, we've got the Episode object.
    // Shall we store it for offline use?
    if (storeOffline) {
        // Save the episode to the episodeStore
        const episodeStoreValue = get(episodeStore);
        episodeStoreValue.episodes[episodeId] = episode;
        episodeStore.set(episodeStoreValue);
    }

    // And finally, return the episode
    return episode;
}