const HtmlTools = {}
/**
 * 
 * @param {string} html html文本
 * @param {string} title 需要寻找的标签
 * @returns 
 */
HtmlTools.GetElement = function (html, title) {
    const taskPattern = new RegExp(`<h2>.*?<span class="mw-headline" id="${title}">${title}<\/span>.*?<\/h2>(.*?)<h2>`, 's');
    // 1. 匹配 <ul>...</ul> 内部的内容，并替换其标签为空格
    const ulPattern = /<ul[^>]*>([\s\S]*?)<\/ul>/g;
    html = html.replace(ulPattern, (_, innerContent) => {
        return innerContent.replace(/<[^>]*>|&[^;]+;/g, ' ');
    });
    const match = html.match(taskPattern);
    if (match == null) return;
    const taskContent = match[1];
    // 1. 去除 HTML 标签和实体
    let plainText = taskContent.replace(/<[^>]*>|&[^;]+;/g, '');  // 替换标签为空格
    // 2. 按行分割，过滤空行
    let lines = plainText.split('\n').filter(line => line.trim() !== '');

    lines = lines.map(line => {
        // 去除行内的重复短语（以中文顿号、逗号或空格分隔）
        const words = line.split(/[、\s]/).filter(word => word.trim() !== '');
        return [...new Set(words)].join(' '); // 用顿号重新连接
    });
    // 5. 再次去重（防止行内去重后整行重复）
    lines = [...new Set(lines)];
    // 6. 每行前加 2 个空格
    plainText = lines.map(line => '  ' + line).join('\n');

    return plainText;
};
HtmlTools.GetDate = function (html) {
    var regex = /<p><big>[\s\S]*?(\d{4}年\d{1,2}月\d{1,2}日)[\s\S]*?<\/big>/;
    const match = html.match(regex);
    if (match == null) {
        regex = /<big>[\s\S]*?(\d{4}年\d{1,2}月\d{1,2}日)[\s\S]*?<\/big>/;
        match = html.match(regex);
    }
    if (match == null) {
        logger.error("没有找到前瞻日期");
        return date;
    }
    const [year, month, day] = match[1].split(/[年月日]/).map(Number);
    const date = new Date(year, month, day);
    var startDate = new Date(date.getTime() + 24 * 60 * 60 * 1000 * 13);
    var endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000 * 41);
    var codeOverDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    var dates = {
        start: `${startDate.getFullYear()}年${startDate.getMonth()}月${startDate.getDate()}日`,
        end: `${endDate.getFullYear()}年${endDate.getMonth()}月${endDate.getDate()}日`,
        codeOver: `${codeOverDate.getFullYear()}年${codeOverDate.getMonth()}月${codeOverDate.getDate()}日 23:59`
    }
    return dates;
}
export default HtmlTools;
