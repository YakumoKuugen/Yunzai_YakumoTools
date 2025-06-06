import HtmlTools from "../../utils/HtmlTools.js";
import { BILIWIKI_ZZZ_API, URL } from "./BiliWikiConfig.js";
export class ZZZWiki {
    async LiveSummary() {
        var data = await this.GetSummaryVersionBaseData();
        var allData = await this.GetSummaryVersionAllData(data[1]);
        var sendText = `绝区零Ver.${data[2]} ${allData.dates.start}-${allData.dates.end}
前瞻节目兑换码：（有效期至 ${allData.dates.codeOver}）
    ${allData.codes[0]}
任务:
${allData.main_task}
调频：
${allData.gacha}
时装：
${allData.skin}
新区域:
${allData.area}
活动:
${allData.new_event}
驱动盘:
${allData.driver}
其他:
${allData.other}
`
        // logger.info(sendText);
        return sendText;
    }
    /**
     * 
     * @returns [1]链接 [2]版本号
     */
    async GetSummaryVersionBaseData() {
        const response = await fetch(BILIWIKI_ZZZ_API);
        if (!response.ok) {
            this.e.reply('基础请数据求失败');
        }
        var html = await response.text();
        const regex1 = /<a href="([^"]+)" title="绝区零(\d+\.\d+)版本前瞻直播总结">[^>]+<\/a>/g;
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
            gacha: HtmlTools.GetElement(html, "代理人/音擎活动调频"),
            skin: HtmlTools.GetElement(html, "全新时装"),
            area: HtmlTools.GetElement(html, "全新区域"),
            main_task: HtmlTools.GetElement(html, "全新剧情"),
            driver: HtmlTools.GetElement(html, "全新驱动盘"),
            other: HtmlTools.GetElement(html, "其他"),
            new_event: HtmlTools.GetElement(html, "活动"),
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
