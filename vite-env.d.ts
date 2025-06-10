interface ImportMetaEnv {
    readonly VITE_SERV_ADDR: string;
    readonly VITE_WEBS_ADDR: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}