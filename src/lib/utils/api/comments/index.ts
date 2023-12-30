import { getRequest } from "..";
import type { Comment } from "$lib/types";

// I couldn't figure out how the `https://api.tapas.io/v3/series/<series-id>/episodes/<episode-id>/comments` endpoint works,
// so we're fetching from the  `https://tapas.io/comment/<episode-id>` endpoint used by the website,
// which returns HTML that we need to parse. This is very likely to break in the future because of website updates,
// but it's the best I could do.

function parseCommentsHtml(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const commentElements = doc.querySelectorAll(".comment-row-wrap.js-comment-parent-row");
    const comments: Comment[] = [];

    for (const commentElement of commentElements) {
        const id = parseInt(commentElement.querySelector(".body__row")?.id.split("-").pop()!); // The whole element id looks like this: "comment-box-<COMMENT-ID>"
        const episodeId = parseInt(commentElement.querySelector(".info__button--reply")?.getAttribute("data-permalink")?.split("/")[2].split("?")[0]!); // The data-permalink attribute looks like this: "/episode/<EPISODE-ID>?_=_#comment-section"
        const creationDate = new Date(commentElement.querySelector(".writer__date")!.textContent!).toString();
        const likeCount = parseInt(commentElement.querySelector("a.info__button.js-have-to-sign")?.getAttribute("data-cnt")!);
        const replyCount = parseInt(commentElement.querySelector(".js-toggle-reply-btn")?.getAttribute("data-reply-cnt")!);
        const body = commentElement.querySelector(".body__comment")!.textContent;
        
        const creatorUsername = (commentElement.querySelector("a.writer__name") as HTMLAnchorElement).href.split("/").pop();
        const creatorDisplayName = commentElement.querySelector("a.writer__name")?.textContent;
        const creatorProfilePicture = commentElement.querySelector("img")?.src;

        comments.push({
            id: id,
            episodeId: episodeId,
            creator: {
                id: null,
                username: creatorUsername!,
                displayName: creatorDisplayName!,
                profilePictureUrl: creatorProfilePicture!
            },
            creationDate: creationDate,
            likeCount: likeCount,
            replyCount: replyCount,
            body: body!
        });
    }

    return comments;
}

export async function getEpisodeComments(episodeId: number, page: number, sort: "best" | "newest" | "oldest") {
    const sortNamesMap = {best: "TOP_COMMENT", newest: "NEWEST", oldest: "OLDEST"}
    const response = await getRequest(`/comment/${episodeId}?&page=${page}&sort=${sortNamesMap[sort]}&since=0&init_load=0&wr=true&ep=false`, "https://tapas.io");

    const html: string = response.data.html;
    
    const comments = parseCommentsHtml(html);
    return comments;
}