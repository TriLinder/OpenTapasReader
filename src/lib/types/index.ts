// Stores
export type PageStateStore = {
    currentPage: string
}

export type MediaStore = {
    dataTypeVersion: number,
    media: Record<string, string>
}

export type UrlToHashStore = {
    dataTypeVersion: number,
    urls: Record<string, string>
}