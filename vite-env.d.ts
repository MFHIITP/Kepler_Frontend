interface ImportMetaEnv {
    readonly VITE_SERV_ADDR: string;
    readonly VITE_WEBS_ADDR: string;
    readonly VITE_RAZORPAY_KEY_ID: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}