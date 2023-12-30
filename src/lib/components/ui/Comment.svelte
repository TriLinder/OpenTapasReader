<script lang="ts">
    import { _, date } from "svelte-i18n";
    import type { Comment } from "$lib/types";
    import Ripple from '@smui/ripple';

    export let comment: Comment;
    let repliesShown = false;
</script>

<style>
    .comment {
        border-style: solid;
        border-width: 1px;
        border-color: rgb(220, 220, 220);
        padding: 10px;
        margin: 10px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
    }
  
    .info {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
    }
  
    .profile-picture {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
  
    .username {
        font-weight: bold;
    }
  
    .creation-date {
        color: rgb(136, 136, 136);
        font-size: 0.8rem;
    }
  
    .comment-content {
        margin: 0;
        margin-top: 3px;
        margin-bottom: 8px;
    }
  
    .reactions {
        color: rgb(136, 136, 136);
        font-size: 0.8rem;
        text-align: right;
    }
</style>
  
<div class="comment">
    <div class="info">
        <img class="profile-picture" src={comment.creator.profilePictureUrl} alt="Profile" />
        
        <div>
            <span class="username">{comment.creator.displayName}</span> <br>
            <span class="creation-date">{$date(new Date(comment.creationDate), {format: "long"})}</span>
        </div>
    </div>
    
    <p class="comment-content">{comment.body}</p>

    <div class="reactions">
        <span>{$_("comment.likeCount", {values: {likeCount: comment.likeCount}})}</span>
        
        <div class="show-replies" on:click={function() {repliesShown = !repliesShown;}} on:keypress use:Ripple={{ surface: true }} tabindex="0" role="button">
            {#if !repliesShown}
                <span>{$_("comment.showReplies", {values: {replyCount: comment.replyCount}})}</span>
            {:else}
                <span>{$_("comment.hideReplies", {values: {replyCount: comment.replyCount}})}</span>
            {/if}
        </div>
    </div>
</div>