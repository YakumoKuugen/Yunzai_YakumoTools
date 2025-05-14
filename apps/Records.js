import { YakumoTools } from "../lib/YakumoTools.js";

export class Records extends YakumoTools {
    constructor() {
        super(
            {
                name: '挑战玩法记录查询',
                desc: '挑战玩法记录查询',
                event: 'message',//发出提示信息
                priority: 5000,//优先级
                rule: [
                    {
                        /** 命令正则匹配 reg: '^#*(星铁)?(.*)(养成|计算)([0-9]|,|，| )*$',*/
                        reg: '^#*(星铁)混沌|混沌回忆$',
                        /** 执行方法 */
                        fnc: 'ForgottenHallRecords'
                    },
                    {
                        reg: '^#*(星铁)虚构|虚构叙事$',
                        fnc: 'PureFictionRecords',
                    },
                    {
                        reg: '^#*(星铁)末日|末日幻影$',
                        fnc: 'ApocalypticShadowRecords',
                    }
                ]
            },
        )
    }
    /**
     * 混沌回忆记录
     */
    async ForgottenHallRecords() {
        var text = "混沌回忆记录";
        this.reply(text, false, { at: false });
    }
    /**
     * 虚构叙事记录
     */
    async PureFictionRecords() {
        var text = "虚构叙事记录";
        this.reply(text, false, { at: false });
    }
    /**
     * 末日幻影记录
     */
    async ApocalypticShadowRecords() {
        var text = "末日幻影记录"
        this.reply(text, false, { at: false });
    }
}