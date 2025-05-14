import { YakumoTools } from "../lib/YakumoTools.js";

export class LiveSummary extends YakumoTools {
    constructor() {
        super(
            {
                name: '前瞻直播总结',
                desc: '前瞻总结',
                event: 'message',//发出提示信息
                priority: 5000,//优先级
                rule: [
                    {
                        /** 命令正则匹配 reg: '^#*(星铁)?(.*)(养成|计算)([0-9]|,|，| )*$',*/
                        reg: '^#*(星铁)前瞻总结$',
                        /** 执行方法 */
                        fnc: 'SummaryStarRail'
                    },
                    {
                        reg: '^#前瞻总结$',
                        fnc: 'SummaryGenshin',
                    }
                ]
            },
        )
    }
    async SummaryStarRail() {
        var text = this.starRailWiki.LiveSummary();
        this.reply(text, false, { at: false });
    }
    async SummaryGenshin() {
        var text = this.genshinWiki.LiveSummary();
        this.reply(text, false, { at: false });
    }
}