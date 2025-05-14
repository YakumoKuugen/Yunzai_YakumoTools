import _ from 'lodash';
import NoteUser from '../../genshin/model/mys/NoteUser.js';
import { StartRailWiki } from './BiliwikiApi/StartRailWiki.js';
import { GenshinWiki } from './BiliwikiApi/GenshinWiki.js';
import plugin from '../../../lib/plugins/plugin.js'
import HtmlTools from '../utils/HtmlTools.js';
export class YakumoTools extends plugin {
    starRailWiki = new StartRailWiki();
    genshinWiki = new GenshinWiki();
}