export const BASE_URL = 'https://api-takumi.mihoyo.com',
    NEW_URL = 'https://api-takumi-record.mihoyo.com';

export const SR_API = `${NEW_URL}/event/game_record_zzz/api/zzz`,
    SR_INDEX_API = `${SR_API}/index`,
    SR_NOTE_API = `${SR_API}/note`,
    SR_BUDDY_INFO_API = `${SR_API}/buddy/info`,
    SR_AVATAR_BASIC_API = `${SR_API}/avatar/basic`,
    SR_AVATAR_INFO_API = `${SR_API}/avatar/info`,
    SR_CHALLENGE_API = `${SR_API}/challenge`,
    SR_BIND_API = `${OLD_URL}/binding/api`,
    SR_GAME_INFO_API = `${SR_BIND_API}/getUserGameRolesByCookie?game_biz=nap_cn`;

export const PUBLIC_API = 'https://public-data-api.mihoyo.com/',
    PUBILC_GACHA_LOG_API = `${PUBLIC_API}/common/gacha_record/api`,
    SR_GET_GACHA_LOG_API = `${PUBILC_GACHA_LOG_API}/getGachaLog`;