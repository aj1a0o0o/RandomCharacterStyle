/*
------------------------------------------------------------
Random Character Style

UI_Window.jsx

负责创建整个 ScriptUI Window

Author : Lya Peng
Version : 1.0
------------------------------------------------------------
*/

if (typeof UI === "undefined")
{
    throw new Error("UI_Config.jsx 必须先加载。");
}

//==================================================
// Constructor
//==================================================

UI.Window = function ()
{
    this.window = null;

    this.scopeGroup = null;

    this.scopeDropdown = null;

    this.rowPanel = null;

    this.headerGroup = null;

    this.rowContainer = null;

    this.totalGroup = null;

    this.totalLabel = null;

    this.buttonGroup = null;

    this.okButton = null;

    this.cancelButton = null;
};

//==================================================
// Create Window
//==================================================

UI.Window.prototype.create = function ()
{
    //--------------------------------------------------
    // Window
    //--------------------------------------------------

    this.window = new Window(
        "dialog",
        UI.STRING.TITLE
    );

    this.window.orientation = "column";

    this.window.alignChildren = "fill";

    this.window.spacing = UI.SPACING;

    this.window.margins = UI.MARGIN;

    this.window.preferredSize.width = UI.WINDOW_WIDTH;

    //--------------------------------------------------
    // Scope
    //--------------------------------------------------

    this.createScope();

    //--------------------------------------------------
    // Row Panel
    //--------------------------------------------------

    this.createRowPanel();

    //--------------------------------------------------
    // Total
    //--------------------------------------------------

    this.createTotal();

    //--------------------------------------------------
    // Buttons
    //--------------------------------------------------

    this.createButtons();

    //--------------------------------------------------
    // Layout
    //--------------------------------------------------

    this.window.layout.layout(true);

    this.window.layout.resize();
};

//==================================================
// Scope
//==================================================

UI.Window.prototype.createScope = function ()
{
    this.scopeGroup =
        this.window.add("group");

    this.scopeGroup.orientation = "row";

    this.scopeGroup.alignChildren = ["left","center"];

    this.scopeGroup.add(
        "statictext",
        undefined,
        UI.STRING.APPLY_TO
    );

    this.scopeDropdown =
        this.scopeGroup.add(
            "dropdownlist",
            undefined,
            [
                UI.STRING.DOCUMENT,
                UI.STRING.STORY,
                UI.STRING.SELECTION
            ]
        );

    this.scopeDropdown.selection =
        UI.SCOPE_DOCUMENT;
};

//==================================================
// Row Panel
//==================================================

UI.Window.prototype.createRowPanel =
function ()
{
    this.rowPanel =
        this.window.add(
            "panel",
            undefined,
            UI.STRING.STYLE
        );

    this.rowPanel.orientation =
        "column";

    this.rowPanel.alignChildren =
        "fill";

    this.rowPanel.margins =
        UI.MARGIN;

    //------------------------------------------------

    this.headerGroup =
        this.rowPanel.add("group");

    this.headerGroup.orientation =
        "row";

    //------------------------------------------------

    var styleLabel =
        this.headerGroup.add(
            "statictext",
            undefined,
            UI.STRING.STYLE
        );

    styleLabel.preferredSize.width =
        UI.STYLE_WIDTH;

    //------------------------------------------------

    var probabilityLabel =
        this.headerGroup.add(
            "statictext",
            undefined,
            UI.STRING.PROBABILITY
        );

    probabilityLabel.preferredSize.width =
        UI.PROBABILITY_WIDTH;

    //------------------------------------------------

    this.rowContainer =
        this.rowPanel.add("group");

    this.rowContainer.orientation =
        "column";

    this.rowContainer.alignChildren =
        "fill";
};

//==================================================
// Total
//==================================================

UI.Window.prototype.createTotal =
function ()
{
    this.totalGroup =
        this.window.add("group");

    this.totalGroup.orientation =
        "row";

    this.totalGroup.alignment =
        "right";

    this.totalLabel =
        this.totalGroup.add(
            "statictext",
            undefined,
            UI.STRING.TOTAL + " : 0.00"
        );
};

//==================================================
// Buttons
//==================================================

UI.Window.prototype.createButtons =
function ()
{
    this.buttonGroup =
        this.window.add("group");

    this.buttonGroup.orientation =
        "row";

    this.buttonGroup.alignment =
        "right";

    //------------------------------------------------

    this.cancelButton =
        this.buttonGroup.add(
            "button",
            undefined,
            UI.STRING.CANCEL,
            {
                name:"cancel"
            }
        );

    //------------------------------------------------

    this.okButton =
        this.buttonGroup.add(
            "button",
            undefined,
            UI.STRING.OK,
            {
                name:"ok"
            }
        );
};

//==================================================
// Refresh Layout
//==================================================

UI.Window.prototype.refresh =
function ()
{
    this.window.layout.layout(true);

    this.window.layout.resize();
};

//==================================================
// Show
//==================================================

UI.Window.prototype.show =
function ()
{
    return this.window.show();
};

//==================================================
// Close
//==================================================

UI.Window.prototype.close =
function ()
{
    this.window.close();
};
