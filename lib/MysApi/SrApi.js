export default class SrApi extends MysApi {
    constructor(uid, cookie) {
        super(uid, cookie);
        this.uid = uid;
        this.cookie = cookie;
        this.server = this.getServer();
        this.game = 'honkaisr';
        this.uuid = crypto.randomUUID();
        if (typeof this.cookie != 'string' && this.cookie) {
            var ck = this.cookie[Object.keys(this.cookie).filter(x => this.cookie[x].ck)[0]];
            this._device = ck?.device_id || ck?.device;
            this.cookie = ck?.ck;
        }
        if (!this._device) {
            this._device = crypto.randomUUID();
        }
    }
    getServer() {
        switch (String(this.uid).slice(0, -8)) {
            case '1':
            case '2':
                return 'prod_gf_cn'; //官服
            case '5':
                return 'prod_qd_cn'; // B服
            case '6':
                return 'prod_official_usa'; //美服
            case '7':
                return 'prod_official_euro'; // 欧服
            case '8':
            case '18':
                return 'prod_official_asia';// 亚服
            case '9':
                return 'prod_official_cht'; // 港澳台服
        }
        return 'prod_gf_cn';
    }
}