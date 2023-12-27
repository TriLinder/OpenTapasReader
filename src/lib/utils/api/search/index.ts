import type { Series } from "$lib/types";

import { getSeries } from "../series";
import { getRequest } from "..";

let seriesCache: Record<string, Series> = {};

export async function getSearchResults(query: string) {
    const response = await getRequest(`/search?q=${encodeURIComponent(query)}`);

    // Ok, let's parse the results.
    // The important parts of the response look like this:
    /*
        {
            "top": {
                "series": {
                    "id": 12345,
                    "title": "The series you probably searched for",
                    [.....]
                }
            },
            "comics": [
                {
                    "series": {
                        "id": 56789,
                        "title": "You might have also meant this series",
                        [.....]
                    }
                }
            ]
        }
    */

    // An array of IDs of the series in the response
    const seriesIds: number[] = [];

    // Add the top result to the IDs array
    if (response.top && response.top.series) {
        seriesIds.push(response.top.series.id);
    }

    // Now add all the comics
    response.comics.forEach(function(comic: any) {
        seriesIds.push(comic.series.id);
    });

    // Great! We've now got an array of the IDs of series.
    // But we want to return an array of Series objects.
    // We now need to make a seperate API call for all the different series.
    const series: Series[] = [];

    for (const id of seriesIds) {
        if (!(id in seriesCache)) {
            seriesCache[id] = await getSeries(id);
        }
        
        series.push(seriesCache[id]);
    }

    return series;
}