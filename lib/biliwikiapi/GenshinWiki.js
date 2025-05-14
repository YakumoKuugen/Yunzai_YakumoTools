import HtmlTools from "../../utils/HtmlTools.js";
import { BILIWIKI_GI_API, URL } from "./BiliWikiConfig.js";
export class GenshinWiki {
    async LiveSummary() {
        var data = await this.GetSummaryVersionBaseData();
        var allData = await this.GetSummaryVersionAllData(data[1]);
        var sendText = `原神Ver.${data[2]} ${allData.dates.start}-${allData.dates.end}
前瞻节目兑换码：（有效期至 ${allData.dates.codeOver}）
    ${allData.codes[0]}
    ${allData.codes[1]}
    ${allData.codes[2]}
新任务:
${allData.task}
新敌人：
${allData.monster}
角色祈愿：
${allData.gacha}
武器祈愿：
${allData.wopen}
七圣召唤：
${allData.cardGame}
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
     * @returns [1]链接 [2]版本号
     */
    async GetSummaryVersionBaseData() {
        const response = await fetch(BILIWIKI_GI_API);
        if (!response.ok) {
            this.e.reply('基础请数据求失败');
        }
        var html = await response.text();
        const regex1 = /<a href="([^"]+)" title="原神(\d+\.\d+)版本前瞻直播总结">[^>]+<\/a>/g;
        const match1 = html.match(regex1);
        var text = match1[match1.length - 1];
        var data = regex1.exec(text);
        // logger.info(`【版本链接】${URL + data[1]}`);
        // logger.info(`【版本】${data[2]}版本`);
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
            task: HtmlTools.GetElement(html, "任务"),
            event: HtmlTools.GetElement(html, "活动"),
            gacha: HtmlTools.GetElement(html, "角色"),
            monster: HtmlTools.GetElement(html, "敌人"),
            cardGame: HtmlTools.GetElement(html, "七圣召唤"),
            update: HtmlTools.GetElement(html, "优化"),
            wopen: HtmlTools.GetElement(html, "武器"),
        }
        return data;
    }
    GetCodes(html) {
        const codeSection = html.match(/兑换码：([\s\S]*?)(?:<br\/>\*|\*)/);
        if (codeSection) {
            // 2. 提取纯文本兑换码
            const plainCodes = codeSection[1].replace(/<[^>]*>/g, '');
            // 3. 按行分割并过滤有效兑换码
            const codes = plainCodes.split('\n')
                .map(line => line.trim())
                .filter(line => /^[A-Z0-9]+$/.test(line));
            // logger.info(codes[0], codes[1], codes[2]);
            return codes;
        }
    }
}
