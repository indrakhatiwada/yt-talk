const YT_INITIAL_PLAYER_RESPONSE_RE =
  /ytInitialPlayerResponse\s*=\s*({.+?})\s*;\s*(?:var\s+(?:meta|head)|<\/script|\n)/

//compare tracks based on priority

function compareTracks(track1, track2) {
  const lang1 = track1.languageCode
  const lang2 = track2.languageCode

  //if track1 is english and track2 is not, track1 has higher priority

  if (lang1 === "en" && lang2 !== "en") {
    return -1
  }
  //if track2 is english and track1 is not, track2 has higher priority
  else if (lang2 === "en" && lang1 !== "en") {
    return 1
  }
  //if track1 is asr and track2 is not, track1 has higher priority
  else if (track1.kind !== "asr" && track2.kind === "asr") {
    return -1
  } //if track2 is asr and track1 is not, track2 has higher priority
  else if (track2.kind !== "asr" && track1.kind === "asr") {
    return 1
  }
  return 0
}

export const getVideoData = async (videoId: string) => {
  //@ts-ignore
  let player = window.ytInitialPlayerResponse

  if (!player && videoId !== player?.videoDetails.videoId) {
    const pageData = await fetch(`https://www.youtube.com/watch?v=${videoId}`)
    const body = await pageData.text()

    const playerResponseMatch = body.match(YT_INITIAL_PLAYER_RESPONSE_RE)
    if (!playerResponseMatch) {
      console.warn("No player response found")
      return
    }

    player = JSON.parse(playerResponseMatch[1])

    const metadata = {
      title: player.videoDetails.title,
      duration: player.videoDetails.lengthSeconds,
      author: player.videoDetails.author,
      views: player.videoDetails.viewCount
    }
    if (player.captions && player.captions.playerCaptionsTracklistRenderer) {
      const tracks =
        player.captions.playerCaptionsTracklistRenderer.captionTracks

      if (tracks && tracks.length > 0) {
        tracks.sort(compareTracks)
        //fetch the transcript
        const transcriptResponse = await fetch(tracks[0].baseUrl + "&fmt=json3")
        const transcript = await transcriptResponse.json()
        return { metadata, transcript }
      }
    }
    return { metadata, transcript: null }
  }
}
