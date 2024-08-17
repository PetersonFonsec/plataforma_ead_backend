export interface CloudFlareStreamUpload {
  result: {
    uid: string,
    creator: string | null,
    thumbnail: string,
    thumbnailTimestampPct: number,
    readyToStream: boolean,
    readyToStreamAt: string | null,
    status: {
      state: string,
      errorReasonCode: string,
      errorReasonText: string
    },
    meta: {
      name: string
    },
    created: string,
    modified: string,
    scheduledDeletion: string | null,
    size: number,
    preview: string,
    allowedOrigins: string[],
    requireSignedURLs: boolean,
    uploaded: string,
    uploadExpiry: string | null,
    maxSizeBytes: string | null,
    maxDurationSeconds: string | null,
    duration: number,
    input: {
      width: number,
      height: number
    },
    playback: {
      hls: string,
      dash: string
    },
    watermark: null,
    clippedFrom: null,
    publicDetails: null
  },
  success: boolean,
  errors: any[],
  messages: any[]
}
