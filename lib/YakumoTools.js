import _ from 'lodash';
import { StartRailWiki } from './BiliwikiApi/StartRailWiki.js';
import { GenshinWiki } from './BiliwikiApi/GenshinWiki.js';
import plugin from '../../../lib/plugins/plugin.js'
import { ZZZWiki } from './BiliwikiApi/ZZZWiki.js';
export class YakumoTools extends plugin {
    starRailWiki = new StartRailWiki();
    genshinWiki = new GenshinWiki();
    zzzWiki = new ZZZWiki();
}