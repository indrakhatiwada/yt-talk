async function createCompletion(model: string, prompt: String, context: any) {
  const parsed = context.transcript.events
    .filter((x: { segs: any }) => x.segs)
    .map((x: { segs: any }) =>
      x.segs.map((y: { utf8: any }) => y.utf8).join(" ")
    )
    .join(" ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")
}
