 /*
------------------------------------------------------------
Random Character Style
UI_StyleRow.jsx

负责创建一行字符样式设置

Adobe InDesign ExtendScript ES3

Author : Lya Peng
Version : 1.0
------------------------------------------------------------
*/

if (typeof UI === "undefined")
{
    throw new Error("UI_Config.jsx must be loaded first.");
}

//==================================================
// StyleRow
//==================================================

UI.StyleRow = function(parent, styleList)
{
    this.parent = parent;

    this.styleList = styleList || [];

    this.group = null;

    this.styleDropdown = null;

    this.probabilityEdit = null;

    this.removeButton = null;

    this.addButton = null;
};


//==================================================
// Create
//==================================================

UI.StyleRow.prototype.create = function()
{
    this.group = this.parent.add("group");

    this.group.orientation = "row";

    this.group.alignChildren = ["left","center"];

    this.group.spacing = UI.SPACING;

    this.group.margins = 0;

    //------------------------------------------
    // Style
    //------------------------------------------

    this.createDropdown();

    //------------------------------------------
    // Probability
    //------------------------------------------

    this.createProbabilityEdit();

    //------------------------------------------
    // Remove
    //------------------------------------------

    this.removeButton = this.group.add(
        "button",
        undefined,
        UI.STRING.REMOVE
    );

    this.removeButton.preferredSize.width =
        UI.BUTTON_SIZE;

    //------------------------------------------
    // Add
    //------------------------------------------

    this.addButton = this.group.add(
        "button",
        undefined,
        UI.STRING.ADD
    );

    this.addButton.preferredSize.width =
        UI.BUTTON_SIZE;

    return this.group;
};


//==================================================
// Dropdown
//==================================================

UI.StyleRow.prototype.createDropdown =
function()
{
    this.styleDropdown =
        this.group.add(
            "dropdownlist",
            undefined,
            this.styleList
        );

    this.styleDropdown.preferredSize.width =
        UI.STYLE_WIDTH;

    if(this.styleDropdown.items.length > 0)
    {
        this.styleDropdown.selection = 0;
    }
};


//==================================================
// Probability
//==================================================

UI.StyleRow.prototype.createProbabilityEdit =
function()
{
    this.probabilityEdit =
        this.group.add(
            "edittext",
            undefined,
            UI.DEFAULT_PROBABILITY
        );

    this.probabilityEdit.characters = 6;

    this.probabilityEdit.preferredSize.width =
        UI.PROBABILITY_WIDTH;

    this.probabilityEdit.justify = "center";
};


//==================================================
// Enable
//==================================================

UI.StyleRow.prototype.enable =
function()
{
    this.styleDropdown.enabled = true;

    this.probabilityEdit.enabled = true;

    this.removeButton.enabled = true;

    this.addButton.enabled = true;
};


//==================================================
// Disable
//==================================================

UI.StyleRow.prototype.disable =
function()
{
    this.styleDropdown.enabled = false;

    this.probabilityEdit.enabled = false;

    this.removeButton.enabled = false;

    this.addButton.enabled = false;
};
