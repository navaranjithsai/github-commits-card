// Type declarations for Cloudflare Workers special modules

declare module '__STATIC_CONTENT_MANIFEST' {
    const manifest: string;
    export default manifest;
}

declare module '__STATIC_CONTENT' {
    const namespace: KVNamespace;
    export default namespace;
}
