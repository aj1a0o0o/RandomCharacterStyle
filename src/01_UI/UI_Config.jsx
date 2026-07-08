/*
------------------------------------------------------------
Random Character Style
UI_Config.jsx

UI 常量配置
Adobe InDesign ExtendScript (ES3)

Author : Lya Peng
Version : 1.0
------------------------------------------------------------
*/

if (typeof UI === "undefined")
{
    var UI = {};
}

//==================================================
// Version
//==================================================

UI.VERSION = "1.0.0";


//==================================================
// Window
//==================================================

UI.WINDOW_TITLE = "随机字符样式";

UI.WINDOW_WIDTH = 460;

UI.WINDOW_MIN_HEIGHT = 360;


//==================================================
// Row
//==================================================

UI.MIN_ROWS = 3;

UI.MAX_ROWS = 10;


//==================================================
// Control Size
//==================================================

UI.STYLE_WIDTH = 220;

UI.PROBABILITY_WIDTH = 60;

UI.BUTTON_SIZE = 24;

UI.LABEL_WIDTH = 60;


//==================================================
// Margin
//==================================================

UI.MARGIN = 15;

UI.SPACING = 8;

UI.ROW_HEIGHT = 26;


//==================================================
// Scope
//==================================================

UI.SCOPE_DOCUMENT = 0;

UI.SCOPE_STORY = 1;

UI.SCOPE_SELECTION = 2;


//==================================================
// Default Probability
//==================================================

UI.DEFAULT_PROBABILITY = "0.0";


//==================================================
// String
//==================================================

UI.STRING = {};

UI.STRING.TITLE = "随机字符样式";

UI.STRING.APPLY_TO = "应用于";

UI.STRING.DOCUMENT = "文档";

UI.STRING.STORY = "文章";

UI.STRING.SELECTION = "选区";

UI.STRING.STYLE = "字符样式";

UI.STRING.PROBABILITY = "概率";

UI.STRING.TOTAL = "总概率";

UI.STRING.OK = "确定";

UI.STRING.CANCEL = "取消";

UI.STRING.ADD = "+";

UI.STRING.REMOVE = "−";


//==================================================
// Color
//==================================================

UI.COLOR = {};

UI.COLOR.NORMAL = [0, 0.45, 0, 1];

UI.COLOR.ERROR = [1, 0, 0, 1];


//==================================================
// Character Style Filter
//==================================================

UI.FILTER_STYLE = [];

UI.FILTER_STYLE.push("[None]");

UI.FILTER_STYLE.push("[无]");

UI.FILTER_STYLE.push("Basic Character Style");


//==================================================
// Utility
//==================================================

UI.isFilteredStyle = function(name)
{
    var i;

    for(i = 0; i < UI.FILTER_STYLE.length; i++)
    {
        if(name == UI.FILTER_STYLE[i])
        {
            return true;
        }
    }

    return false;
};


//==================================================
// Get Character Style List
//==================================================

UI.getCharacterStyleNames = function(document)
{
    var list = [];

    var i;

    var style;

    for(i = 0; i < document.characterStyles.length; i++)
    {
        style = document.characterStyles[i];

        if(UI.isFilteredStyle(style.name))
        {
            continue;
        }

        list.push(style.name);
    }

    return list;
};
