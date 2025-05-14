import HtmlTools from "../../utils/HtmlTools.js";
import { BILIWIKI_SR_API, URL } from "./BiliWikiConfig.js";

export class StartRailWiki {
    async LiveSummary() {
        var data = await this.GetSummaryVersionBaseData();
        var allData = await this.GetSummaryVersionAllData(data[1]);
        var sendText = `崩铁Ver.${data[2]} 「${data[3]}」 ${allData.dates.start}-${allData.dates.end}
    前瞻节目兑换码：（有效期至 ${allData.dates.codeOver}）
    ${allData.codes[0]}
    ${allData.codes[1]}
    ${allData.codes[2]}
    新任务:
    ${allData.task}
    新地图：
    ${allData.map}
    新敌人：
    ${allData.monster}
    新遗器：
    ${allData.equip}
    新材料：
    ${allData.material}
    角色跃迁：
    ${allData.gacha}
    新活动:
    ${allData.event}
    系统优化:
    ${allData.update}
    `
        // logger.info(sendText);
        return sendText;
    }
    /**
     * 
     * @param {String} baseurl 
     * @returns [1]链接 [2]版本号 [3]版本名
     */
    async GetSummaryVersionBaseData() {
        const response = await fetch(BILIWIKI_SR_API);
        if (!response.ok) {
            this.e.reply('基础请数据求失败');
        }
        var html = await response.text();
        const regex1 = /<a href="([^"]+)" title="(\d+\.\d+)版本「([^"]+)」前瞻直播总结">[^>]+<\/a>/g;
        const match1 = html.match(regex1);
        var text = match1[match1.length - 1];
        var data = regex1.exec(text);
        // logger.info(`【版本链接】${baseurl + data[1]}`);
        // logger.info(`【版本】${data[2]}版本`);
        // logger.info(`【版本名称】「${data[3]}」前瞻直播总结`);
        return data;
    }
    /**
     * 
     * @param {string} url 
     * @returns 
     */
    async GetSummaryVersionAllData(url) {
        const response = await fetch(URL + url);
        if (!response.ok) {
            this.e.reply('详细数据请求失败');
        }
        var html = await response.text();
        var data = {
            codes: this.GetCodes(html),
            dates: HtmlTools.GetDate(html),
            task: HtmlTools.GetElement(html, "新任务"),
            event: HtmlTools.GetElement(html, "新活动"),
            equip: HtmlTools.GetElement(html, "新遗器"),
            map: HtmlTools.GetElement(html, "新场景"),
            monster: HtmlTools.GetElement(html, "新敌人"),
            material: HtmlTools.GetElement(html, "新材料"),
            gacha: HtmlTools.GetElement(html, "角色/光锥活动跃迁"),
            update: HtmlTools.GetElement(html, "系统更新"),
        }
        return data;
    }
    GetCodes(html) {
        var codes = [];
        const regex = /<dd>(第一次|第二次|第三次)：([A-Z0-9]+)<\/dd>/g;
        for (let index = 0; index < 3; index++) {
            var match = regex.exec(html)
            if (match == null) break;
            codes.push(match[2]);
        }
        // logger.info(codes[0],codes[1],codes[2]);
        return codes;
    }
    
}
